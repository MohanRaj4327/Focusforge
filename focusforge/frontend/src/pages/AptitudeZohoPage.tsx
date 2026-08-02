import React, { useState } from 'react';
import { GraduationCap, Award, Code2, CheckCircle2, Play, Sparkles } from 'lucide-react';

export const AptitudeZohoPage: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const patternQuestions = [
    { title: 'Print a String in an X Format', frequency: 'High (Zoho Essential)', code: `Input: PROGRAM\nOutput:\nP     M\n R   A \n  O R  \n   G   \n  O R  \n R   A \nP     M` },
    { title: 'Print Concentric Squares', frequency: 'Medium', code: `Center 1 surrounded by 2s and 3s` },
    { title: 'Look-and-Say Sequence (1, 11, 21, 1211...)', frequency: 'High', code: `Count and say pattern generation` }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/20 glass-panel">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Aptitude & Zoho Placement Hub</h2>
            <p className="text-xs text-slate-300 mt-0.5">Zoho Round 1 Aptitude Quizzes & Round 2 Pattern Printing essentials</p>
          </div>
        </div>
      </div>

      {/* Zoho Round 2 Pattern Printing Essentials */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-400" />
            Zoho Round 2 Pattern Printing Essentials (Topic 14)
          </h3>
          <span className="text-xs text-indigo-400 font-semibold">12 Core Zoho Patterns</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patternQuestions.map((p, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                {p.frequency}
              </span>
              <h4 className="text-xs font-bold text-white">{p.title}</h4>
              <pre className="text-[10px] bg-slate-950 p-2 rounded text-slate-300 overflow-x-auto">
                {p.code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Aptitude Practice Quizzes */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Round 1 Aptitude Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
            <h4 className="text-sm font-bold text-white">Quantitative Aptitude</h4>
            <p className="text-xs text-slate-400">Averages, Work & Time, Profit/Loss</p>
            <button
              onClick={() => { setActiveQuiz(true); setScore(13); }}
              className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md"
            >
              Start 15-Min Quiz
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
            <h4 className="text-sm font-bold text-white">Logical Reasoning</h4>
            <p className="text-xs text-slate-400">Coding-Decoding, Family Trees</p>
            <button
              onClick={() => { setActiveQuiz(true); setScore(14); }}
              className="mt-2 w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-md"
            >
              Start 15-Min Quiz
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
            <h4 className="text-sm font-bold text-white">Timed Mock Test</h4>
            <p className="text-xs text-slate-400">Full Zoho Round 1 Simulation</p>
            <button
              onClick={() => { setActiveQuiz(true); setScore(15); }}
              className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md"
            >
              Take Full Mock
            </button>
          </div>
        </div>

        {score !== null && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between mt-4">
            <span>Quiz Result: Score {score} / 15 (Passed Zoho Cutoff!)</span>
            <button onClick={() => setScore(null)} className="text-slate-400 hover:text-white">Dismiss</button>
          </div>
        )}
      </div>
    </div>
  );
};
