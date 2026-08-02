import apiClient from './apiClient';
import { FocusStatistics } from '../types';

export const focusApi = {
  startSession: async (data: { taskId?: number; dsaProblemId?: number; durationMinutes?: number; sessionType?: string }) => {
    const res = await apiClient.post('/focus-sessions/start', data);
    return res.data;
  },

  completeSession: async (id: number) => {
    const res = await apiClient.post(`/focus-sessions/${id}/complete`);
    return res.data;
  },

  getStatistics: async (): Promise<FocusStatistics> => {
    const res = await apiClient.get<FocusStatistics>('/focus-sessions/statistics');
    return res.data;
  },
};
