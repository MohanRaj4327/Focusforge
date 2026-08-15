import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../api/dashboardApi';
import { DailyDashboard } from '../types';
import {
  Sparkles,
  Flame,
  Code2,
  Clock,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Play,
  TrendingUp,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<DailyDashboard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dashboardApi.getTodayDashboard()
      .then((data) => setDashboard(data))
      .catch((error) => {
        console.error("Failed to load dashboard:", error);
        // We could set an error state here, but for now just leave dashboard null or handle it in the UI
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Computing your Daily Plan & Placement Metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Awareness Ticker */}
      <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                Daily Focus Dashboard
              </span>
              <span className="text-xs text-slate-400">• Today's Execution</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Ready for Today's Prep, {user?.fullName?.split(' ')[0] || user?.username || 'User'}?
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
              💡 <span className="font-semibold text-indigo-300">{dashboard.awarenessMessages[0]}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/focus"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start Focus Session
            </Link>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Execution */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Today's Progress</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{dashboard.todayProgress}%</span>
            <span className="text-xs text-slate-400">({dashboard.completedTasks}/{dashboard.totalTasks} tasks)</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${dashboard.todayProgress}%` }}
            />
          </div>
        </div>

        {/* Card 2: Focus Minutes */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Daily Focus Time</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{dashboard.focusMinutes}</span>
            <span className="text-xs text-slate-400">mins logged today</span>
          </div>
          <p className="text-[11px] text-indigo-400 mt-2 font-medium">Goal: 240 mins (4 hours)</p>
        </div>

        {/* Card 3: DSA Roadmap Progress */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">DSA Solved (175 List)</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{dashboard.dsaSummary.solvedProblems}</span>
            <span className="text-xs text-slate-400">/ 175 solved ({dashboard.dsaSummary.progressPercentage}%)</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
              dashboard.dsaSummary.status === 'BEHIND'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {dashboard.dsaSummary.status === 'BEHIND' ? `BEHIND by ${dashboard.dsaSummary.problemsBehind}` : 'ON TRACK'}
            </span>
            <span className="text-[11px] text-slate-400">Target: ~1.15/day</span>
          </div>
        </div>

        {/* Card 4: Revision Queue */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Smart Revisions Due</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{dashboard.revisionTasks.length}</span>
            <span className="text-xs text-slate-400">problems due today</span>
          </div>
          <Link to="/revision" className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold mt-2 inline-flex items-center gap-1">
            Review Queue Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Middle Section: Active Focus Block & Next Task */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Schedule Block */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Current Focus Block</h3>
            </div>
            <span className="text-xs text-indigo-400 font-medium">{dashboard.currentFocus.startTime} - {dashboard.currentFocus.endTime}</span>
          </div>
          <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/20 mb-4">
            <h4 className="text-lg font-bold text-white">{dashboard.currentFocus.title}</h4>
            <p className="text-xs text-slate-400 mt-1">Activity Type: <span className="text-indigo-300 font-semibold">{dashboard.currentFocus.activityType}</span></p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Next Task:</span>
            <span className="font-semibold text-slate-200">{dashboard.nextTask.title} ({dashboard.nextTask.startTime})</span>
          </div>
        </div>

        {/* Smart Revision Queue Widget */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Space Repetition Revisions Due Today</h3>
              <p className="text-xs text-slate-400">Automated +1, +3, +7, +14, +30 day revision queues</p>
            </div>
            <Link to="/revision" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {dashboard.revisionTasks.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No revision tasks due today. Great work!</p>
            ) : (
              dashboard.revisionTasks.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg text-xs font-bold ${
                      rev.difficulty === 'HARD' ? 'bg-red-500/20 text-red-300' :
                      rev.difficulty === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {rev.difficulty}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.problemTitle}</h4>
                      <p className="text-[11px] text-slate-400">Topic: {rev.topicName} • Stage {rev.revisionStage}/5</p>
                    </div>
                  </div>

                  <Link
                    to="/revision"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-medium transition-all"
                  >
                    Solve Now
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
