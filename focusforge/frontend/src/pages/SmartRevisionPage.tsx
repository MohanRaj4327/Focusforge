import React, { useEffect, useState } from 'react';
import { dsaApi } from '../api/dsaApi';
import { RevisionQueue } from '../types';
import { RotateCcw, CheckCircle2, AlertTriangle, Calendar, Sparkles } from 'lucide-react';

export const SmartRevisionPage: React.FC = () => {
  const [queue, setQueue] = useState<RevisionQueue | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'overdue' | 'upcoming'>('today');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const data = await dsaApi.getRevisionQueue();
      setQueue(data);
    } catch (err) {
      setQueue({
        dueToday: [
          { id: 1, problemId: 19, problemTitle: 'Trapping Rain Water', topicName: 'Arrays', difficulty: 'HARD', revisionStage: 2, scheduledDate: '2026-08-02', isCompleted: false },
          { id: 2, problemId: 4, problemTitle: 'Reverse a String In-Place', topicName: 'Strings', difficulty: 'EASY', revisionStage: 1, scheduledDate: '2026-08-02', isCompleted: false }
        ],
        overdue: [
          { id: 3, problemId: 11, problemTitle: 'Kadane\'s Algorithm (Max Subarray)', topicName: 'Arrays', difficulty: 'MEDIUM', revisionStage: 3, scheduledDate: '2026-07-31', isCompleted: false }
        ],
        upcoming: [
          { id: 4, problemId: 16, problemTitle: 'Minimum Window Substring', topicName: 'Strings', difficulty: 'HARD', revisionStage: 1, scheduledDate: '2026-08-05', isCompleted: false }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleCompleteRevision = async (id: number) => {
    try {
      await dsaApi.completeRevision(id);
      fetchQueue();
    } catch (err) {
      setQueue(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          dueToday: prev.dueToday.filter(r => r.id !== id),
          overdue: prev.overdue.filter(r => r.id !== id),
          upcoming: prev.upcoming.filter(r => r.id !== id),
        };
      });
    }
  };

  const getActiveList = () => {
    if (!queue) return [];
    if (activeTab === 'today') return queue.dueToday;
    if (activeTab === 'overdue') return queue.overdue;
    return queue.upcoming;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                Automated Spaced Repetition
              </span>
              <span className="text-xs text-slate-400">• Smart Retention</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Smart Revision Queue</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              When you mark a problem as difficult, FocusForge automatically schedules 5 review passes (+1, +3, +7, +14, and +30 days) to lock the solution into your long-term memory.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'today'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <span>Due Today</span>
          <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px]">
            {queue?.dueToday.length || 0}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'overdue'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <span>Overdue</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px]">
            {queue?.overdue.length || 0}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'upcoming'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <span>Upcoming</span>
          <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px]">
            {queue?.upcoming.length || 0}
          </span>
        </button>
      </div>

      {/* Revision Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getActiveList().length === 0 ? (
          <div className="col-span-2 glass-panel p-8 rounded-2xl text-center border border-slate-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">Queue Empty!</h3>
            <p className="text-xs text-slate-400 mt-1">No revision tasks pending for this category.</p>
          </div>
        ) : (
          getActiveList().map((item) => (
            <div key={item.id} className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-rose-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Stage {item.revisionStage} of 5
                  </span>
                  <span className="text-xs text-slate-400">Scheduled: {item.scheduledDate}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{item.problemTitle}</h4>
                <p className="text-xs text-slate-400">Topic: <span className="text-slate-200 font-medium">{item.topicName}</span></p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.difficulty === 'HARD' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {item.difficulty}
                </span>

                <button
                  onClick={() => handleCompleteRevision(item.id)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Complete Pass
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
