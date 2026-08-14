import { supabase, getCurrentUserId } from '../lib/supabase';
import { Deadline } from '../types';

export const deadlineApi = {
  getAll: async (): Promise<Deadline[]> => {
    const userId = getCurrentUserId();
    const { data, error } = await supabase
      .from('deadlines')
      .select('*')
      .eq('user_id', userId)
      .order('due_date', { ascending: true });
      
    if (error) throw error;
    
    return data.map(deadline => ({
      id: deadline.id,
      title: deadline.title,
      description: deadline.description,
      dueDate: deadline.due_date,
      priority: deadline.priority,
      category: deadline.category,
      isCompleted: deadline.is_completed,
    }));
  },

  create: async (data: Partial<Deadline>): Promise<Deadline> => {
    const userId = getCurrentUserId();
    
    const newDeadline = {
      user_id: userId,
      title: data.title,
      description: data.description,
      due_date: data.dueDate,
      priority: data.priority || 'MEDIUM',
      category: data.category || 'ACADEMIC',
      is_completed: data.isCompleted || false,
    };

    const { data: created, error } = await supabase
      .from('deadlines')
      .insert(newDeadline)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: created.id,
      title: created.title,
      description: created.description,
      dueDate: created.due_date,
      priority: created.priority,
      category: created.category,
      isCompleted: created.is_completed,
    };
  },

  update: async (id: number, data: Partial<Deadline>): Promise<Deadline> => {
    const updates: any = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.description !== undefined) updates.description = data.description;
    if (data.dueDate !== undefined) updates.due_date = data.dueDate;
    if (data.priority !== undefined) updates.priority = data.priority;
    if (data.category !== undefined) updates.category = data.category;
    if (data.isCompleted !== undefined) updates.is_completed = data.isCompleted;

    const { data: updated, error } = await supabase
      .from('deadlines')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: updated.id,
      title: updated.title,
      description: updated.description,
      dueDate: updated.due_date,
      priority: updated.priority,
      category: updated.category,
      isCompleted: updated.is_completed,
    };
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('deadlines')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  },
};
