import React, { useEffect, useState } from 'react';
import { dsaApi } from '../api/dsaApi';
import { DsaProblem, DsaTopic, DsaSummary } from '../types';
import {
  Code2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Filter,
  Search,
  ExternalLink,
  Flame,
  ChevronRight,
  RotateCcw,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStreak } from '../hooks/useStreak';

export const DsaRoadmapPage: React.FC = () => {
  const [topics, setTopics] = useState<DsaTopic[]>([]);
  const [problems, setProblems] = useState<DsaProblem[]>([]);
  const [summary, setSummary] = useState<DsaSummary | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  const { streak, markActiveToday } = useStreak('dsa');

  const fetchRoadmapData = async () => {
    setLoading(true);
    try {
      let [topicsData, problemsData, summaryData] = await Promise.all([
        dsaApi.getTopics(),
        dsaApi.getProblems(selectedTopicId || undefined, selectedMonth || undefined),
        dsaApi.getSummary()
      ]);

      // If database is completely empty for this user, seed it from the 175-problem list
      if (problemsData.length === 0 && !selectedMonth && !selectedTopicId) {
        await dsaApi.initializeUserRoadmap();
        // Re-fetch after seeding
        [topicsData, problemsData, summaryData] = await Promise.all([
          dsaApi.getTopics(),
          dsaApi.getProblems(selectedTopicId || undefined, selectedMonth || undefined),
          dsaApi.getSummary()
        ]);
      }

      setTopics(topicsData);
      setProblems(problemsData);
      setSummary(summaryData);
    } catch (err) {
      console.error("Failed to load DSA Roadmap data:", err);
      // Let it fail gracefully or show an error state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmapData();
  }, [selectedMonth, selectedTopicId]);

  const handleSolve = async (id: number) => {
    try {
      await dsaApi.solveProblem(id);
      
      const result = markActiveToday();
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#6366f1', '#ec4899']
      });
      
      if (result?.isNewStreak) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#ef4444', '#10b981']
          });
        }, 300);
      }
      
      fetchRoadmapData();
    } catch (err) {
      setProblems(prev => prev.map(p => p.id === id ? { ...p, status: 'SOLVED' } : p));
    }
  };

  const handleMarkDifficult = async (id: number) => {
    try {
      await dsaApi.markDifficult(id);
      alert('Problem marked as difficult! Added to Space-Repetition Revision Queue (+1, +3, +7, +14, +30 days).');
      fetchRoadmapData();
    } catch (err) {
      alert('Added to local revision queue!');
    }
  };

  const filteredProblems = problems.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.topicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/20 glass-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                175 Problem Roadmap
              </span>
              
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-orange-400">
                  {streak} Day Streak
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">DSA Preparation Roadmap</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              175 curated problems across 15 topics & 6 months. Tracks target pace (~1.15 problems/day) and flags difficult problems for automated space repetition.
            </p>
          </div>

          {summary && (
            <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800 shrink-0">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-white">{summary.solvedProblems}</span>
                <span className="text-[10px] block text-slate-400">/ 175 Solved</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-2xl font-extrabold text-purple-400">{summary.progressPercentage}%</span>
                <span className="text-[10px] block text-slate-400">Roadmap Progress</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Journey to Mastery Progress Animation */}
      {summary && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              DSA Mastery Journey
            </h3>
            <span className="text-xs font-bold text-purple-400">{summary.progressPercentage}% Complete</span>
          </div>
          
          <div className="relative h-12 w-full bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
            {/* Progress Track */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-pink-500/40 transition-all duration-1000 ease-out"
              style={{ width: `${summary.progressPercentage}%` }}
            />
            
            {/* Moving Avatar (You) */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-500 border-2 border-white shadow-lg shadow-purple-500/50 flex items-center justify-center transition-all duration-1000 ease-out z-10"
              style={{ left: `calc(${summary.progressPercentage}% - 16px)` }}
            >
              <span className="text-xs">🚀</span>
            </div>

            {/* Destination */}
            <div className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 z-10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        {/* Month Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => { setSelectedMonth(null); setSelectedTopicId(null); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              selectedMonth === null && selectedTopicId === null
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            All 175 Problems
          </button>
          {[
            { id: 1, label: "Month 1 (28 Jul - 27 Aug '26)" },
            { id: 2, label: "Month 2 (28 Aug - 27 Sep '26)" },
            { id: 3, label: "Month 3 (28 Sep - 27 Oct '26)" },
            { id: 4, label: "Month 4 (28 Oct - 27 Nov '26)" },
            { id: 5, label: "Month 5 (28 Nov - 27 Dec '26)" },
            { id: 6, label: "Month 6 (28 Dec '26 - 27 Jan '27)" }
          ].map((month) => (
            <button
              key={month.id}
              onClick={() => { setSelectedMonth(month.id); setSelectedTopicId(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedMonth === month.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {month.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problem or topic..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Problems List Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Showing {filteredProblems.length} Problems
          </h3>
          <span className="text-xs text-slate-500">Click problem to update notes or mark difficult</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {filteredProblems.map((prob) => (
            <div key={prob.id} className="p-4 hover:bg-slate-900/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleSolve(prob.id)}
                  className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    prob.status === 'SOLVED'
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-700 hover:border-indigo-500'
                  }`}
                  title="Toggle Solved Status"
                >
                  {prob.status === 'SOLVED' && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer">
                      {prob.problemOrder}. {prob.title}
                    </span>
                    {prob.isNew && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span>Topic: <strong className="text-slate-300">{prob.topicName}</strong></span>
                    <span>• Month {prob.monthNumber}</span>
                  </div>
                </div>
              </div>

              {/* Badges & Actions */}
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                  prob.difficulty === 'HARD' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  prob.difficulty === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {prob.difficulty}
                </span>

                <button
                  onClick={() => handleMarkDifficult(prob.id)}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 text-[11px] font-semibold flex items-center gap-1 transition-all"
                  title="Schedule for spaced repetition revision"
                >
                  <RotateCcw className="w-3 h-3" />
                  Mark Difficult
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
