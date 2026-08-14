import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useStreak = (activityKey: string) => {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const storageKey = `streak_${activityKey}_${userId}`;

  const [streakData, setStreakData] = useState<{ streak: number; lastActiveDate: string | null }>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse streak data', e);
      }
    }
    return {
      streak: 0,
      lastActiveDate: null,
    };
  });

  // Calculate if the streak was lost due to inactivity
  useEffect(() => {
    if (!streakData.lastActiveDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActive = new Date(streakData.lastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If more than 1 day has passed since last activity, reset streak
    if (diffDays > 1 && streakData.streak > 0) {
      const newData = { ...streakData, streak: 0 };
      setStreakData(newData);
      localStorage.setItem(storageKey, JSON.stringify(newData));
    }
  }, [streakData.lastActiveDate, streakData.streak, storageKey, streakData]);

  const markActiveToday = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = streakData.streak;

    if (streakData.lastActiveDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastActive = new Date(streakData.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - lastActive.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1; // Active yesterday, increment streak
      } else if (diffDays > 1) {
        newStreak = 1; // Streak broken, restart
      }
      // If diffDays === 0, already active today, streak stays the same
    } else {
      newStreak = 1; // First ever activity
    }

    const newData = {
      streak: newStreak,
      lastActiveDate: todayStr,
    };

    setStreakData(newData);
    localStorage.setItem(storageKey, JSON.stringify(newData));
    
    return {
      isNewStreak: newStreak > streakData.streak,
      currentStreak: newStreak
    };
  };

  return {
    streak: streakData.streak,
    markActiveToday,
  };
};
