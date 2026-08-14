import { supabase, getCurrentUserId } from '../lib/supabase';
import { Task } from '../types';

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const userId = getCurrentUserId();
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Map snake_case to camelCase
    return data.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      categoryId: task.category_id,
      categoryName: task.category_name,
      categoryColor: task.category_color,
      priority: task.priority,
      status: task.status,
      dueDate: task.due_date,
      estimatedMinutes: task.estimated_minutes,
      isCompleted: task.is_completed,
      completedAt: task.completed_at,
      createdAt: task.created_at,
    }));
  },

  getToday: async (): Promise<Task[]> => {
    const userId = getCurrentUserId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .gte('due_date', today.toISOString())
      .order('due_date', { ascending: true });
      
    if (error) throw error;
    
    return data.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      categoryId: task.category_id,
      categoryName: task.category_name,
      categoryColor: task.category_color,
      priority: task.priority,
      status: task.status,
      dueDate: task.due_date,
      estimatedMinutes: task.estimated_minutes,
      isCompleted: task.is_completed,
      completedAt: task.completed_at,
      createdAt: task.created_at,
    }));
  },

  create: async (data: Partial<Task>): Promise<Task> => {
    const userId = getCurrentUserId();
    
    const newTask = {
      user_id: userId,
      title: data.title,
      description: data.description,
      category_id: data.categoryId,
      category_name: data.categoryName,
      category_color: data.categoryColor,
      priority: data.priority || 'MEDIUM',
      status: data.status || 'PENDING',
      due_date: data.dueDate,
      estimated_minutes: data.estimatedMinutes,
      is_completed: data.isCompleted || false,
    };

    const { data: created, error } = await supabase
      .from('tasks')
      .insert(newTask)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: created.id,
      title: created.title,
      description: created.description,
      categoryId: created.category_id,
      categoryName: created.category_name,
      categoryColor: created.category_color,
      priority: created.priority,
      status: created.status,
      dueDate: created.due_date,
      estimatedMinutes: created.estimated_minutes,
      isCompleted: created.is_completed,
      completedAt: created.completed_at,
      createdAt: created.created_at,
    };
  },

  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const updates: any = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.description !== undefined) updates.description = data.description;
    if (data.categoryId !== undefined) updates.category_id = data.categoryId;
    if (data.categoryName !== undefined) updates.category_name = data.categoryName;
    if (data.categoryColor !== undefined) updates.category_color = data.categoryColor;
    if (data.priority !== undefined) updates.priority = data.priority;
    if (data.status !== undefined) updates.status = data.status;
    if (data.dueDate !== undefined) updates.due_date = data.dueDate;
    if (data.estimatedMinutes !== undefined) updates.estimated_minutes = data.estimatedMinutes;
    if (data.isCompleted !== undefined) {
      updates.is_completed = data.isCompleted;
      updates.completed_at = data.isCompleted ? new Date().toISOString() : null;
    }

    const { data: updated, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: updated.id,
      title: updated.title,
      description: updated.description,
      categoryId: updated.category_id,
      categoryName: updated.category_name,
      categoryColor: updated.category_color,
      priority: updated.priority,
      status: updated.status,
      dueDate: updated.due_date,
      estimatedMinutes: updated.estimated_minutes,
      isCompleted: updated.is_completed,
      completedAt: updated.completed_at,
      createdAt: updated.created_at,
    };
  },

  toggleComplete: async (id: number): Promise<Task> => {
    // First get current state
    const { data: current, error: getErr } = await supabase
      .from('tasks')
      .select('is_completed')
      .eq('id', id)
      .single();
      
    if (getErr) throw getErr;

    const newCompletedState = !current.is_completed;
    
    const { data: updated, error } = await supabase
      .from('tasks')
      .update({ 
        is_completed: newCompletedState,
        status: newCompletedState ? 'COMPLETED' : 'PENDING',
        completed_at: newCompletedState ? new Date().toISOString() : null
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: updated.id,
      title: updated.title,
      description: updated.description,
      categoryId: updated.category_id,
      categoryName: updated.category_name,
      categoryColor: updated.category_color,
      priority: updated.priority,
      status: updated.status,
      dueDate: updated.due_date,
      estimatedMinutes: updated.estimated_minutes,
      isCompleted: updated.is_completed,
      completedAt: updated.completed_at,
      createdAt: updated.created_at,
    };
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  },
};
