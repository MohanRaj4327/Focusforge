import React, { useState } from 'react';
import { ZOHO_QUESTIONS } from '../data/zohoQuestionsData';
import { Building2, Search, Filter, BookOpen, CheckCircle, MapPin, Flame } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useZohoProgress } from '../hooks/useZohoProgress';
import { useMotivation } from '../hooks/useMotivation';
import confetti from 'canvas-confetti';

export const ZohoQuestionsPage: React.FC = () => {
  const [activeRound, setActiveRound] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { progress, markAsSolved, isSolved } = useZohoProgress();
  const { triggerMotivation } = useMotivation();

  const handleSolve = (id: string) => {
    const result = markAsSolved(id);
    if (result) {
      triggerMotivation();
      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899']
      });
      
      // If it's a new streak, fire more!
      if (result.isNewStreak) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#ef4444', '#10b981']
          });
        }, 300);
      }
    }
  };

  const filteredQuestions = ZOHO_QUESTIONS.filter(q => {
    const matchesRound = q.round === activeRound;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRound && matchesSearch;
  });

  // Calculate overall progress for the Journey to Zoho animation
  const totalQuestions = ZOHO_QUESTIONS.length;
  const solvedCount = progress.solvedIds.length;
  const progressPercent = totalQuestions > 0 ? (solvedCount / totalQuestions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                Previous Year
              </span>
              
              {/* Streak Display */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                <Flame className={`w-4 h-4 ${progress.streak > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-orange-400">
                  {progress.streak} Day Streak
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-400" />
              Zoho Question Bank
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              A curated list of authentic previous year Zoho interview questions separated by Round 1 (Aptitude/C), Round 2 (Programming), and Round 3 (Advanced/System Design).
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-center">
              <span className="text-2xl font-extrabold text-emerald-400">{solvedCount}</span>
              <span className="text-[10px] block text-slate-400">Solved</span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center">
              <span className="text-2xl font-extrabold text-blue-400">{totalQuestions}</span>
              <span className="text-[10px] block text-slate-400">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Journey to Zoho Progress Animation */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            Journey to Zoho HQ
          </h3>
          <span className="text-xs font-bold text-emerald-400">{Math.round(progressPercent)}% Complete</span>
        </div>
        
        <div className="relative h-12 w-full bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
          {/* Progress Track */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600/40 via-indigo-600/40 to-emerald-500/40 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
          
          {/* Moving Avatar (You) */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50 flex items-center justify-center transition-all duration-1000 ease-out z-10"
            style={{ left: `calc(${progressPercent}% - 16px)` }}
          >
            <span className="text-xs">🧑‍💻</span>
          </div>

          {/* Destination (Zoho HQ) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 z-10">
            <Building2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        {/* Round Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 1, label: "Round 1 (C / Outputs)" },
            { id: 2, label: "Round 2 (Programming)" },
            { id: 3, label: "Round 3 (Advanced)" },
          ].map((round) => (
            <button
              key={round.id}
              onClick={() => setActiveRound(round.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeRound === round.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {round.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-2xl border border-slate-800">
            <p className="text-slate-400">No questions found matching your search.</p>
          </div>
        ) : (
          filteredQuestions.map((prob, index) => {
            const solved = isSolved(prob.id);
            return (
              <div key={prob.id} className={`glass-panel rounded-2xl border overflow-hidden transition-all duration-300 ${solved ? 'border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-slate-800'}`}>
                <div className={`p-4 border-b flex items-center justify-between gap-3 ${solved ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-slate-900/50 border-slate-800/60'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${solved ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                      {index + 1}
                    </span>
                    <h3 className={`text-base font-bold ${solved ? 'text-emerald-300' : 'text-slate-200'}`}>
                      {prob.title}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => handleSolve(prob.id)}
                    disabled={solved}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      solved 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    }`}
                  >
                    {solved ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Solved
                      </>
                    ) : (
                      'Mark as Solved'
                    )}
                  </button>
                </div>
                <div className="p-5 prose prose-invert max-w-none prose-sm prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
                  <ReactMarkdown>{prob.description}</ReactMarkdown>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ZohoQuestionsPage;
