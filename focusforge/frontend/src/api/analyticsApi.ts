import { dashboardApi } from './dashboardApi';

export const analyticsApi = {
  getDashboardAnalytics: async () => {
    // Fetch underlying data
    const dashData = await dashboardApi.getTodayDashboard();
    
    // Map to the format expected by AnalyticsPage
    return {
      totalFocusHours: Math.round((dashData.studyStats.monthlyFocusMinutes || 0) / 60) || 12,
      totalDsaSolved: dashData.dsaSummary.solvedProblems || 0,
      averageAptitudeScore: 85, // Mocked for now until aptitude module is fully integrated
      studyStreakDays: dashData.studyStats.currentStreakDays || 0,
      
      // Mocked historical data for charts
      weeklyFocusTrend: [
        { day: 'Mon', focusMinutes: 45 },
        { day: 'Tue', focusMinutes: 120 },
        { day: 'Wed', focusMinutes: 90 },
        { day: 'Thu', focusMinutes: 180 },
        { day: 'Fri', focusMinutes: dashData.focusMinutes || 60 },
        { day: 'Sat', focusMinutes: 0 },
        { day: 'Sun', focusMinutes: 0 },
      ],
      dsaTopicBreakdown: [
        { topicName: 'Arrays', percentage: 90 },
        { topicName: 'Strings', percentage: 85 },
        { topicName: 'Linked Lists', percentage: 70 },
        { topicName: 'Trees', percentage: 40 },
        { topicName: 'Dynamic Programming', percentage: 15 },
      ]
    };
  },
};
