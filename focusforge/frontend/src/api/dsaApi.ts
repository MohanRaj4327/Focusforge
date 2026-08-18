import { supabase, getCurrentUserId } from '../lib/supabase';
import { DsaTopic, DsaProblem, DsaSummary, RevisionQueue, RevisionItem } from '../types';

export const dsaApi = {
  getTopics: async (): Promise<DsaTopic[]> => {
    const { data, error } = await supabase
      .from('dsa_topics')
      .select('*')
      .order('month_number', { ascending: true })
      .order('id', { ascending: true });
      
    if (error) throw error;
    
    return data.map(topic => ({
      id: topic.id,
      topicName: topic.topic_name,
      monthNumber: topic.month_number,
      targetProblemCount: topic.target_problem_count,
      solvedProblemCount: topic.solved_problem_count,
      description: topic.description,
    }));
  },

  getProblems: async (topicId?: number, monthNumber?: number): Promise<DsaProblem[]> => {
    const userId = getCurrentUserId();
    
    let query = supabase
      .from('dsa_problems')
      .select(`
        *,
        dsa_topics (
          topic_name,
          month_number
        )
      `)
      .eq('user_id', userId);
      
    if (topicId) {
      query = query.eq('topic_id', topicId);
    }
    
    const { data, error } = await query.order('problem_order', { ascending: true });
      
    if (error) throw error;
    
    // Filter by monthNumber if provided, since we have to do it in JS if joined
    let filteredData = data;
    if (monthNumber) {
      filteredData = data.filter((p: any) => p.dsa_topics?.month_number === monthNumber);
    }
    
    return filteredData.map((p: any) => ({
      id: p.id,
      topicId: p.topic_id,
      topicName: p.dsa_topics?.topic_name || '',
      title: p.title,
      monthNumber: p.dsa_topics?.month_number || 1,
      difficulty: p.difficulty,
      isNew: p.is_new,
      problemOrder: p.problem_order,
      status: p.status,
      assignedDate: p.assigned_date,
      solvedDate: p.solved_date,
      attemptCount: p.attempt_count,
      timeTakenMinutes: p.time_taken_minutes,
      notes: p.notes,
      solutionUrl: p.solution_url,
      codeUrl: p.code_url,
      isFlaggedForRevision: p.is_flagged_for_revision,
    }));
  },

  getSummary: async (): Promise<DsaSummary> => {
    const userId = getCurrentUserId();
    
    // Get all problems for user
    const { data: problems, error: probErr } = await supabase
      .from('dsa_problems')
      .select('status')
      .eq('user_id', userId);
      
    if (probErr) throw probErr;
    
    // Get all topics to count expected
    const { data: topics, error: topErr } = await supabase
      .from('dsa_topics')
      .select('target_problem_count, topic_name, month_number')
      .order('month_number', { ascending: true })
      .limit(1); // Assume we are on month 1 topic 1 for simple summary
      
    if (topErr) throw topErr;

    const totalProblems = problems.length;
    const solvedProblems = problems.filter(p => p.status === 'SOLVED').length;
    
    return {
      totalProblems: totalProblems || 150, // Default to 150 if none assigned yet
      solvedProblems,
      remainingProblems: (totalProblems || 150) - solvedProblems,
      progressPercentage: totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0,
      currentMonth: topics?.[0]?.month_number || 1,
      currentTopic: topics?.[0]?.topic_name || 'Arrays & Strings',
      expectedProblems: topics?.[0]?.target_problem_count || 30,
      problemsBehind: 0,
      status: 'ON_TRACK',
    };
  },

  solveProblem: async (id: number): Promise<DsaProblem> => {
    const { data, error } = await supabase
      .from('dsa_problems')
      .update({ 
        status: 'SOLVED',
        solved_date: new Date().toISOString() 
      })
      .eq('id', id)
      .select(`
        *,
        dsa_topics (
          topic_name,
          month_number
        )
      `)
      .single();
      
    if (error) throw error;
    
    return {
      id: data.id,
      topicId: data.topic_id,
      topicName: data.dsa_topics?.topic_name || '',
      title: data.title,
      monthNumber: data.dsa_topics?.month_number || 1,
      difficulty: data.difficulty,
      isNew: data.is_new,
      problemOrder: data.problem_order,
      status: data.status,
      assignedDate: data.assigned_date,
      solvedDate: data.solved_date,
      attemptCount: data.attempt_count,
      timeTakenMinutes: data.time_taken_minutes,
      notes: data.notes,
      solutionUrl: data.solution_url,
      codeUrl: data.code_url,
      isFlaggedForRevision: data.is_flagged_for_revision,
    };
  },

  markDifficult: async (id: number): Promise<DsaProblem> => {
    const userId = getCurrentUserId();
    // Get current state
    const { data: current, error: getErr } = await supabase
      .from('dsa_problems')
      .select('is_flagged_for_revision')
      .eq('id', id)
      .single();
      
    if (getErr) throw getErr;
    
    const newFlaggedState = !current.is_flagged_for_revision;
    
    const { data, error } = await supabase
      .from('dsa_problems')
      .update({ is_flagged_for_revision: newFlaggedState })
      .eq('id', id)
      .select(`
        *,
        dsa_topics (
          topic_name,
          month_number
        )
      `)
      .single();
      
    if (error) throw error;

    // Handle space repetition queue
    if (newFlaggedState) {
      // Add to revision queue
      // First check if already exists
      const { data: existing } = await supabase
        .from('revision_items')
        .select('id')
        .eq('user_id', userId)
        .eq('problem_id', id)
        .eq('is_completed', false);

      if (!existing || existing.length === 0) {
        await supabase
          .from('revision_items')
          .insert({
            user_id: userId,
            problem_id: id,
            scheduled_date: new Date().toISOString(), // schedule for today/now so it appears in "Due Today"
            revision_stage: 1,
            is_completed: false
          });
      }
    } else {
      // Remove from revision queue (any uncompleted item)
      await supabase
        .from('revision_items')
        .delete()
        .eq('user_id', userId)
        .eq('problem_id', id)
        .eq('is_completed', false);
    }
    
    return {
      id: data.id,
      topicId: data.topic_id,
      topicName: data.dsa_topics?.topic_name || '',
      title: data.title,
      monthNumber: data.dsa_topics?.month_number || 1,
      difficulty: data.difficulty,
      isNew: data.is_new,
      problemOrder: data.problem_order,
      status: data.status,
      assignedDate: data.assigned_date,
      solvedDate: data.solved_date,
      attemptCount: data.attempt_count,
      timeTakenMinutes: data.time_taken_minutes,
      notes: data.notes,
      solutionUrl: data.solution_url,
      codeUrl: data.code_url,
      isFlaggedForRevision: data.is_flagged_for_revision,
    };
  },

  updateProgress: async (id: number, updateData: { status?: string; timeTakenMinutes?: number; notes?: string; solutionUrl?: string; codeUrl?: string; markAsDifficult?: boolean }): Promise<DsaProblem> => {
    const updates: any = {};
    if (updateData.status) updates.status = updateData.status;
    if (updateData.status === 'SOLVED') updates.solved_date = new Date().toISOString();
    if (updateData.timeTakenMinutes !== undefined) updates.time_taken_minutes = updateData.timeTakenMinutes;
    if (updateData.notes !== undefined) updates.notes = updateData.notes;
    if (updateData.solutionUrl !== undefined) updates.solution_url = updateData.solutionUrl;
    if (updateData.codeUrl !== undefined) updates.code_url = updateData.codeUrl;
    if (updateData.markAsDifficult !== undefined) updates.is_flagged_for_revision = updateData.markAsDifficult;

    const { data, error } = await supabase
      .from('dsa_problems')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        dsa_topics (
          topic_name,
          month_number
        )
      `)
      .single();
      
    if (error) throw error;

    // Handle space repetition queue if toggling via progress
    if (updateData.markAsDifficult !== undefined) {
      const userId = getCurrentUserId();
      if (updateData.markAsDifficult) {
        const { data: existing } = await supabase
          .from('revision_items')
          .select('id')
          .eq('user_id', userId)
          .eq('problem_id', id)
          .eq('is_completed', false);

        if (!existing || existing.length === 0) {
          await supabase
            .from('revision_items')
            .insert({
              user_id: userId,
              problem_id: id,
              scheduled_date: new Date().toISOString(),
              revision_stage: 1,
              is_completed: false
            });
        }
      } else {
        await supabase
          .from('revision_items')
          .delete()
          .eq('user_id', userId)
          .eq('problem_id', id)
          .eq('is_completed', false);
      }
    }
    
    return {
      id: data.id,
      topicId: data.topic_id,
      topicName: data.dsa_topics?.topic_name || '',
      title: data.title,
      monthNumber: data.dsa_topics?.month_number || 1,
      difficulty: data.difficulty,
      isNew: data.is_new,
      problemOrder: data.problem_order,
      status: data.status,
      assignedDate: data.assigned_date,
      solvedDate: data.solved_date,
      attemptCount: data.attempt_count,
      timeTakenMinutes: data.time_taken_minutes,
      notes: data.notes,
      solutionUrl: data.solution_url,
      codeUrl: data.code_url,
      isFlaggedForRevision: data.is_flagged_for_revision,
    };
  },

  getRevisionQueue: async (): Promise<RevisionQueue> => {
    const userId = getCurrentUserId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('revision_items')
      .select(`
        *,
        dsa_problems (
          title,
          difficulty,
          dsa_topics (
            topic_name
          )
        )
      `)
      .eq('user_id', userId)
      .eq('is_completed', false);
      
    if (error) throw error;
    
    const queue: RevisionQueue = {
      dueToday: [],
      upcoming: [],
      overdue: []
    };
    
    const now = new Date();
    now.setHours(0,0,0,0);
    
    data.forEach((item: any) => {
      const scheduledDate = new Date(item.scheduled_date);
      scheduledDate.setHours(0,0,0,0);
      
      const mapped: RevisionItem = {
        id: item.id,
        problemId: item.problem_id,
        problemTitle: item.dsa_problems?.title || 'Unknown Problem',
        topicName: item.dsa_problems?.dsa_topics?.topic_name || 'Unknown Topic',
        difficulty: item.dsa_problems?.difficulty || 'MEDIUM',
        revisionStage: item.revision_stage,
        scheduledDate: item.scheduled_date,
        isCompleted: item.is_completed,
      };
      
      if (scheduledDate < now) {
        queue.overdue.push(mapped);
      } else if (scheduledDate.getTime() === now.getTime()) {
        queue.dueToday.push(mapped);
      } else {
        queue.upcoming.push(mapped);
      }
    });
    
    return queue;
  },

  completeRevision: async (id: number): Promise<void> => {
    // 1. Get the current revision item
    const { data: item, error: getErr } = await supabase
      .from('revision_items')
      .select('*')
      .eq('id', id)
      .single();

    if (getErr) throw getErr;

    // 2. Mark it as completed
    const { error: updateErr } = await supabase
      .from('revision_items')
      .update({ is_completed: true })
      .eq('id', id);
      
    if (updateErr) throw updateErr;

    // 3. Schedule next pass if stage < 5
    if (item.revision_stage < 5) {
      const nextStage = item.revision_stage + 1;
      let daysOffset = 1;
      
      if (nextStage === 2) daysOffset = 3;       // Stage 2: +3 days
      else if (nextStage === 3) daysOffset = 7;  // Stage 3: +7 days
      else if (nextStage === 4) daysOffset = 14; // Stage 4: +14 days
      else if (nextStage === 5) daysOffset = 30; // Stage 5: +30 days

      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + daysOffset);

      await supabase
        .from('revision_items')
        .insert({
          user_id: item.user_id,
          problem_id: item.problem_id,
          scheduled_date: nextDate.toISOString(),
          revision_stage: nextStage,
          is_completed: false
        });
    } else {
      // Stage 5 completed! Unflag the problem as difficult automatically
      await supabase
        .from('dsa_problems')
        .update({ is_flagged_for_revision: false })
        .eq('id', item.problem_id);
    }
  },

  initializeUserRoadmap: async (): Promise<void> => {
    const userId = getCurrentUserId();
    
    // Dynamically import data to avoid loading it on every page
    const { ROADMAP_TOPICS, ROADMAP_PROBLEMS } = await import('../data/roadmapData');

    // 1. Ensure all topics exist
    const { data: existingTopics, error: fetchErr } = await supabase
      .from('dsa_topics')
      .select('id, topic_name');
      
    if (fetchErr) throw fetchErr;

    let topicsMap: Record<string, number> = {};
    
    // Build map of existing topics
    existingTopics.forEach(t => topicsMap[t.topic_name] = t.id);

    // Find missing topics
    const missingTopics = ROADMAP_TOPICS.filter(t => !topicsMap[t.topic_name]);
    
    if (missingTopics.length > 0) {
      const { data: insertedTopics, error: insertErr } = await supabase
        .from('dsa_topics')
        .insert(missingTopics)
        .select('id, topic_name');
        
      if (insertErr) throw insertErr;
      
      insertedTopics.forEach(t => topicsMap[t.topic_name] = t.id);
    }

    // 2. Insert problems for user
    // First double check they really don't have problems to avoid duplicates
    const { count } = await supabase
      .from('dsa_problems')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
      
    if (count && count > 0) return; // Already seeded

    const problemsToInsert = ROADMAP_PROBLEMS.map((prob, index) => ({
      user_id: userId,
      topic_id: topicsMap[prob.topic],
      title: prob.title,
      difficulty: prob.difficulty,
      is_new: prob.is_new,
      problem_order: index + 1,
      status: 'UNSOLVED',
    }));

    // Supabase can bulk insert max 1000 rows, we have 175, so one batch is fine
    const { error: seedErr } = await supabase
      .from('dsa_problems')
      .insert(problemsToInsert);

    if (seedErr) throw seedErr;
  },
};
