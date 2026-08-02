import apiClient from './apiClient';
import { Task } from '../types';

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const res = await apiClient.get<Task[]>('/tasks');
    return res.data;
  },

  getToday: async (): Promise<Task[]> => {
    const res = await apiClient.get<Task[]>('/tasks/today');
    return res.data;
  },

  create: async (data: Partial<Task>): Promise<Task> => {
    const res = await apiClient.post<Task>('/tasks', data);
    return res.data;
  },

  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const res = await apiClient.put<Task>(`/tasks/${id}`, data);
    return res.data;
  },

  toggleComplete: async (id: number): Promise<Task> => {
    const res = await apiClient.patch<Task>(`/tasks/${id}/complete`);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};
