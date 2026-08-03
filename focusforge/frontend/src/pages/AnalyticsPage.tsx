import React, { useEffect, useState } from 'react';
import { analyticsApi } from '../api/analyticsApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Award, Flame, Clock } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    analyticsApi.getDashboardAnalytics()
      .then(setData)
      .catch((error) => {
        console.error("Failed to load analytics:", error);
      });
  }, []);

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Placement & Productivity Analytics</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time performance metrics computed directly from database records</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Total Focus Time</span>
          <div className="text-2xl font-bold text-white mt-1">{data.totalFocusHours} Hours</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">DSA Problems Solved</span>
          <div className="text-2xl font-bold text-purple-400 mt-1">{data.totalDsaSolved} / 175</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Avg Aptitude Score</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{data.averageAptitudeScore}%</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Current Study Streak</span>
          <div className="text-2xl font-bold text-orange-400 mt-1">{data.studyStreakDays} Days</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Focus Time Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">Weekly Focus Minutes Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyFocusTrend}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                <Bar dataKey="focusMinutes" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DSA Topic Coverage Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">DSA Topic Coverage Breakdown (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dsaTopicBreakdown} layout="vertical">
                <XAxis type="number" stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <YAxis type="category" dataKey="topicName" stroke="#64748b" fontSize={12} width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                <Bar dataKey="percentage" fill="#a855f7" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
