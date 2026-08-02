import apiClient from './apiClient';
import { ScheduleBlock } from '../types';

export const scheduleApi = {
  getToday: async (): Promise<ScheduleBlock[]> => {
    const res = await apiClient.get<ScheduleBlock[]>('/schedule/today');
    return res.data;
  },

  getWeek: async (): Promise<ScheduleBlock[]> => {
    const res = await apiClient.get<ScheduleBlock[]>('/schedule/week');
    return res.data;
  },

  create: async (data: Partial<ScheduleBlock>): Promise<ScheduleBlock> => {
    const res = await apiClient.post<ScheduleBlock>('/schedule', data);
    return res.data;
  },

  update: async (id: number, data: Partial<ScheduleBlock>): Promise<ScheduleBlock> => {
    const res = await apiClient.put<ScheduleBlock>(`/schedule/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/schedule/${id}`);
  },
};
