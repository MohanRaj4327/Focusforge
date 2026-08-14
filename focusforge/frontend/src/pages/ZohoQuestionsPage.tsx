import React, { useState } from 'react';
import { ZOHO_QUESTIONS } from '../data/zohoQuestionsData';
import { Building2, Search, Filter, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ZohoQuestionsPage: React.FC = () => {
  const [activeRound, setActiveRound] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = ZOHO_QUESTIONS.filter(q => {
    const matchesRound = q.round === activeRound;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRound && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/20 glass-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                Previous Year
              </span>
              <span className="text-xs text-slate-400">• Interview Preparation</span>
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
              <span className="text-2xl font-extrabold text-blue-400">{ZOHO_QUESTIONS.length}</span>
              <span className="text-[10px] block text-slate-400">Total Questions</span>
            </div>
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
          filteredQuestions.map((prob, index) => (
            <div key={prob.id} className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800/60 bg-slate-900/50 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-500/20">
                  {index + 1}
                </span>
                <h3 className="text-base font-bold text-slate-200">
                  {prob.title}
                </h3>
              </div>
              <div className="p-5 prose prose-invert max-w-none prose-sm prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
                <ReactMarkdown>{prob.description}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ZohoQuestionsPage;
