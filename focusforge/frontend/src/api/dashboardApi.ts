import { taskApi } from './taskApi';
import { dsaApi } from './dsaApi';
import { deadlineApi } from './deadlineApi';
import { scheduleApi } from './scheduleApi';
import { focusApi } from './focusApi';
import { DailyDashboard } from '../types';

export const dashboardApi = {
  getTodayDashboard: async (): Promise<DailyDashboard> => {
    // Fetch all parts concurrently
    const [
      tasks,
      dsaSummary,
      revisionQueue,
      deadlines,
      focusStats,
      scheduleBlocks
    ] = await Promise.all([
      taskApi.getToday(),
      dsaApi.getSummary(),
      dsaApi.getRevisionQueue(),
      deadlineApi.getAll(),
      focusApi.getStatistics(),
      scheduleApi.getToday()
    ]);

    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const totalTasks = tasks.length;
    const todayProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Current focus based on schedule blocks
    const now = new Date();
    const currentTimeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    let currentFocus = null;
    let nextTask = null;
    
    for (const block of scheduleBlocks) {
      if (block.startTime <= currentTimeStr && block.endTime >= currentTimeStr) {
        currentFocus = {
          title: block.title,
          startTime: block.startTime,
          endTime: block.endTime,
          activityType: block.activityType
        };
      } else if (block.startTime > currentTimeStr && !nextTask) {
        nextTask = {
          title: block.title,
          startTime: block.startTime,
          endTime: block.endTime,
          category: block.activityType
        };
      }
    }

    if (!currentFocus) {
      currentFocus = { title: 'Free Time', startTime: currentTimeStr, endTime: '23:59', activityType: 'REST' };
    }
    if (!nextTask && scheduleBlocks.length > 0) {
      nextTask = { title: scheduleBlocks[0].title, startTime: scheduleBlocks[0].startTime, endTime: scheduleBlocks[0].endTime, category: scheduleBlocks[0].activityType };
    } else if (!nextTask) {
      nextTask = { title: 'No scheduled tasks left', startTime: '', endTime: '', category: 'NONE' };
    }

    // Upcoming deadlines (next 7 days)
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);
    
    const upcomingDeadlines = deadlines
      .filter(d => !d.isCompleted && new Date(d.dueDate) <= sevenDaysFromNow)
      .slice(0, 3)
      .map(d => ({
        id: d.id,
        title: d.title,
        dueDate: d.dueDate,
        priority: d.priority,
        category: d.category
      }));

    const awarenessMessages = [];
    if (dsaSummary.problemsBehind > 0) {
      awarenessMessages.push(`You are ${dsaSummary.problemsBehind} DSA problems behind schedule.`);
    }
    if (upcomingDeadlines.length > 0) {
      awarenessMessages.push(`You have ${upcomingDeadlines.length} deadlines approaching this week.`);
    }
    if (focusStats.todayFocusMinutes < 120) {
      awarenessMessages.push(`You've only focused for ${focusStats.todayFocusMinutes} minutes today. Try to hit your daily goal!`);
    }

    return {
      currentFocus,
      nextTask,
      todayProgress,
      completedTasks,
      totalTasks,
      focusMinutes: focusStats.todayFocusMinutes,
      dsaSummary,
      revisionTasks: revisionQueue.dueToday.slice(0, 5),
      upcomingDeadlines,
      awarenessMessages: awarenessMessages.length > 0 ? awarenessMessages : ["You're all caught up! Great job!"],
      studyStats: {
        currentStreakDays: focusStats.currentStreakDays,
        longestStreakDays: focusStats.currentStreakDays, // Simplified
        dailyFocusMinutes: focusStats.todayFocusMinutes,
        weeklyFocusMinutes: focusStats.weeklyFocusMinutes,
        monthlyFocusMinutes: focusStats.monthlyFocusMinutes,
        totalProblemsSolved: dsaSummary.solvedProblems,
        overallProductivityScore: todayProgress,
      }
    };
  },
};
