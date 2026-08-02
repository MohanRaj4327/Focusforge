import apiClient from './apiClient';
import { DailyDashboard } from '../types';

export const dashboardApi = {
  getTodayDashboard: async (): Promise<DailyDashboard> => {
    const res = await apiClient.get<DailyDashboard>('/dashboard/today');
    return res.data;
  },
};
