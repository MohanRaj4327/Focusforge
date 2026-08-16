import { dashboardApi } from './dashboardApi';

export const analyticsApi = {
  getDashboardAnalytics: async () => {
    const dashData = await dashboardApi.getTodayDashboard();
    
    // Only use REAL data from the database. Show 0 if nothing recorded yet.
    return {
      totalFocusHours: Math.round((dashData.studyStats.weeklyFocusMinutes || 0) / 60),
      totalDsaSolved: dashData.dsaSummary.solvedProblems || 0,
      averageAptitudeScore: 0, // Will show 0 until aptitude quiz module stores scores
      studyStreakDays: dashData.studyStats.currentStreakDays || 0,
      
      // Weekly chart: only Friday has real today data, others are 0
      weeklyFocusTrend: [
        { day: 'Mon', focusMinutes: 0 },
        { day: 'Tue', focusMinutes: 0 },
        { day: 'Wed', focusMinutes: 0 },
        { day: 'Thu', focusMinutes: 0 },
        { day: 'Fri', focusMinutes: 0 },
        { day: 'Sat', focusMinutes: 0 },
        { day: 'Sun', focusMinutes: dashData.focusMinutes || 0 },
      ],
      
      // DSA topic breakdown: real data based on problems solved
      // These will show 0 until topic-wise tracking is implemented
      dsaTopicBreakdown: [
        { topicName: 'Arrays', percentage: 0 },
        { topicName: 'Strings', percentage: 0 },
        { topicName: 'Linked Lists', percentage: 0 },
        { topicName: 'Trees', percentage: 0 },
        { topicName: 'Dynamic Programming', percentage: 0 },
      ]
    };
  },
};
