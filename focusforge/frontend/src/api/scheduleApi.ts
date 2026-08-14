import { supabase, getCurrentUserId } from '../lib/supabase';
import { ScheduleBlock } from '../types';

export const scheduleApi = {
  getToday: async (): Promise<ScheduleBlock[]> => {
    const userId = getCurrentUserId();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    
    const { data, error } = await supabase
      .from('schedule_blocks')
      .select('*')
      .eq('user_id', userId)
      .eq('day_of_week', today)
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    
    return data.map(block => ({
      id: block.id,
      title: block.title,
      startTime: block.start_time,
      endTime: block.end_time,
      dayOfWeek: block.day_of_week,
      activityType: block.activity_type,
      isCompleted: block.is_completed,
    }));
  },

  getWeek: async (): Promise<ScheduleBlock[]> => {
    const userId = getCurrentUserId();
    
    const { data, error } = await supabase
      .from('schedule_blocks')
      .select('*')
      .eq('user_id', userId)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    
    return data.map(block => ({
      id: block.id,
      title: block.title,
      startTime: block.start_time,
      endTime: block.end_time,
      dayOfWeek: block.day_of_week,
      activityType: block.activity_type,
      isCompleted: block.is_completed,
    }));
  },

  create: async (data: Partial<ScheduleBlock>): Promise<ScheduleBlock> => {
    const userId = getCurrentUserId();
    
    const newBlock = {
      user_id: userId,
      title: data.title,
      start_time: data.startTime,
      end_time: data.endTime,
      day_of_week: data.dayOfWeek,
      activity_type: data.activityType,
      is_completed: data.isCompleted || false,
    };

    const { data: created, error } = await supabase
      .from('schedule_blocks')
      .insert(newBlock)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: created.id,
      title: created.title,
      startTime: created.start_time,
      endTime: created.end_time,
      dayOfWeek: created.day_of_week,
      activityType: created.activity_type,
      isCompleted: created.is_completed,
    };
  },

  update: async (id: number, data: Partial<ScheduleBlock>): Promise<ScheduleBlock> => {
    const updates: any = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.startTime !== undefined) updates.start_time = data.startTime;
    if (data.endTime !== undefined) updates.end_time = data.endTime;
    if (data.dayOfWeek !== undefined) updates.day_of_week = data.dayOfWeek;
    if (data.activityType !== undefined) updates.activity_type = data.activityType;
    if (data.isCompleted !== undefined) updates.is_completed = data.isCompleted;

    const { data: updated, error } = await supabase
      .from('schedule_blocks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: updated.id,
      title: updated.title,
      startTime: updated.start_time,
      endTime: updated.end_time,
      dayOfWeek: updated.day_of_week,
      activityType: updated.activity_type,
      isCompleted: updated.is_completed,
    };
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('schedule_blocks')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  },
};
