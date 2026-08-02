import apiClient from './apiClient';
import { Deadline } from '../types';

export const deadlineApi = {
  getAll: async (): Promise<Deadline[]> => {
    const res = await apiClient.get<Deadline[]>('/deadlines');
    return res.data;
  },

  create: async (data: Partial<Deadline>): Promise<Deadline> => {
    const res = await apiClient.post<Deadline>('/deadlines', data);
    return res.data;
  },

  update: async (id: number, data: Partial<Deadline>): Promise<Deadline> => {
    const res = await apiClient.put<Deadline>(`/deadlines/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/deadlines/${id}`);
  },
};
