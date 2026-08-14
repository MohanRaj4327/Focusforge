import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface ZohoProgress {
  solvedIds: string[];
  streak: number;
  lastSolvedDate: string | null;
}

export const useZohoProgress = () => {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const storageKey = `zohoProgress_${userId}`;

  const [progress, setProgress] = useState<ZohoProgress>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse zoho progress', e);
      }
    }
    return {
      solvedIds: [],
      streak: 0,
      lastSolvedDate: null,
    };
  });

  // Calculate if the streak was lost due to inactivity
  useEffect(() => {
    if (!progress.lastSolvedDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastSolved = new Date(progress.lastSolvedDate);
    lastSolved.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - lastSolved.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If more than 1 day has passed since last solve, reset streak
    if (diffDays > 1 && progress.streak > 0) {
      const newProgress = { ...progress, streak: 0 };
      setProgress(newProgress);
      localStorage.setItem(storageKey, JSON.stringify(newProgress));
    }
  }, [progress.lastSolvedDate, progress.streak, storageKey, progress]);

  const markAsSolved = (id: string) => {
    if (progress.solvedIds.includes(id)) return; // already solved

    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = progress.streak;

    if (progress.lastSolvedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastSolved = new Date(progress.lastSolvedDate);
      lastSolved.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - lastSolved.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1; // Solved yesterday, increment streak
      } else if (diffDays > 1) {
        newStreak = 1; // Streak broken, restart
      }
      // If diffDays === 0, they already solved one today, streak stays the same
    } else {
      newStreak = 1; // First ever solve
    }

    const newProgress = {
      solvedIds: [...progress.solvedIds, id],
      streak: newStreak,
      lastSolvedDate: todayStr,
    };

    setProgress(newProgress);
    localStorage.setItem(storageKey, JSON.stringify(newProgress));
    
    return {
      isNewStreak: newStreak > progress.streak,
      currentStreak: newStreak
    };
  };

  const isSolved = (id: string) => {
    return progress.solvedIds.includes(id);
  };

  return {
    progress,
    markAsSolved,
    isSolved,
  };
};
