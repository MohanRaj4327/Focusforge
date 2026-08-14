import { dashboardApi } from './dashboardApi';

export const analyticsApi = {
  getDashboardAnalytics: async () => {
    // For now, reuse the dashboard summary
    // In the future, this can query historical data
    return await dashboardApi.getTodayDashboard();
  },
};
