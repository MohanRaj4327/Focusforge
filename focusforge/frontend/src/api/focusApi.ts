import { supabase, getCurrentUserId } from '../lib/supabase';
import { FocusStatistics } from '../types';

export const focusApi = {
  startSession: async (data: { taskId?: number; dsaProblemId?: number; durationMinutes?: number; sessionType?: string }) => {
    const userId = getCurrentUserId();
    
    const newSession = {
      user_id: userId,
      task_id: data.taskId,
      dsa_problem_id: data.dsaProblemId,
      duration_minutes: data.durationMinutes || 25,
      session_type: data.sessionType || 'POMODORO',
      start_time: new Date().toISOString(),
      completed: false,
    };

    const { data: session, error } = await supabase
      .from('focus_sessions')
      .insert(newSession)
      .select()
      .single();
      
    if (error) throw error;
    
    return session;
  },

  completeSession: async (id: number) => {
    const { data, error } = await supabase
      .from('focus_sessions')
      .update({ 
        completed: true,
        end_time: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  },

  getStatistics: async (): Promise<FocusStatistics> => {
    const userId = getCurrentUserId();
    
    // In a real app we would do proper aggregations here, 
    // but for simplicity we'll pull recent sessions and calculate
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data, error } = await supabase
      .from('focus_sessions')
      .select('duration_minutes, start_time, completed')
      .eq('user_id', userId)
      .eq('completed', true)
      .gte('start_time', thirtyDaysAgo.toISOString());
      
    if (error) throw error;
    
    const now = new Date();
    const todayStr = now.toDateString();
    
    // Start of week (Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0,0,0,0);
    
    let todayFocusMinutes = 0;
    let weeklyFocusMinutes = 0;
    let monthlyFocusMinutes = 0;
    
    data.forEach(session => {
      const sessionDate = new Date(session.start_time);
      const minutes = session.duration_minutes || 0;
      
      monthlyFocusMinutes += minutes;
      
      if (sessionDate >= startOfWeek) {
        weeklyFocusMinutes += minutes;
      }
      
      if (sessionDate.toDateString() === todayStr) {
        todayFocusMinutes += minutes;
      }
    });

    return {
      todayFocusMinutes,
      weeklyFocusMinutes,
      monthlyFocusMinutes,
      totalCompletedSessions: data.length,
      currentStreakDays: data.length > 0 ? 1 : 0, // Simplified streak logic
    };
  },
};
