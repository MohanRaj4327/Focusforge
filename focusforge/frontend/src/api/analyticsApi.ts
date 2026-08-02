import apiClient from './apiClient';

export const analyticsApi = {
  getDashboardAnalytics: async () => {
    const res = await apiClient.get('/analytics/dashboard');
    return res.data;
  },
};
