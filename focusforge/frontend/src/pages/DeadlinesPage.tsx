import React, { useEffect, useState } from 'react';
import { deadlineApi } from '../api/deadlineApi';
import { Deadline } from '../types';
import { AlarmClock, Plus, Calendar, AlertCircle, Trash2 } from 'lucide-react';

export const DeadlinesPage: React.FC = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<'ACADEMIC' | 'PLACEMENT' | 'PROJECT' | 'PERSONAL'>('PLACEMENT');

  const fetchDeadlines = async () => {
    try {
      const data = await deadlineApi.getAll();
      setDeadlines(data);
    } catch (err) {
      setDeadlines([
        { id: 1, title: 'Semester 5 Exam Dates', dueDate: '2026-11-15T09:00:00', priority: 'CRITICAL', category: 'ACADEMIC', isCompleted: false },
        { id: 2, title: 'Zoho Round 2 On-Campus Drive', dueDate: '2026-08-25T10:00:00', priority: 'HIGH', category: 'PLACEMENT', isCompleted: false }
      ]);
    }
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    try {
      await deadlineApi.create({ title, dueDate: new Date(dueDate).toISOString(), category, priority: 'HIGH' });
      setTitle('');
      fetchDeadlines();
    } catch (err) {
      setDeadlines(prev => [...prev, { id: Date.now(), title, dueDate, category, priority: 'HIGH', isCompleted: false }]);
      setTitle('');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deadlineApi.delete(id);
      fetchDeadlines();
    } catch (err) {
      setDeadlines(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Calendar & Deadlines</h2>
        <p className="text-xs text-slate-400 mt-1">Keep track of upcoming exams, campus drives, and project submissions</p>
      </div>

      <form onSubmit={handleAdd} className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Deadline title (e.g. Sem 5 Exams)..."
          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Attach to Calendar
        </button>
      </form>

      {/* Calendar View (Static Visualization) */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            Exam Dates & Deadlines Calendar
          </h3>
          <span className="text-[10px] text-slate-500">August 2026</span>
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-xs">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="font-bold text-slate-500 py-1">{d}</div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => {
            const dayNum = i - 5; // offset for Aug 2026 (starts Sat)
            const isValid = dayNum > 0 && dayNum <= 31;
            
            // Check if any deadline falls on this day
            const dayDeadlines = isValid ? deadlines.filter(d => new Date(d.dueDate).getDate() === dayNum && new Date(d.dueDate).getMonth() === 7) : [];
            const hasEvent = dayDeadlines.length > 0;

            return (
              <div 
                key={i} 
                className={`min-h-[40px] md:min-h-[60px] p-1 border rounded-lg flex flex-col items-center justify-start ${
                  isValid ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors' : 'border-transparent opacity-0'
                } ${hasEvent ? 'border-red-500/50 bg-red-500/5' : ''}`}
              >
                {isValid && (
                  <>
                    <span className={`text-xs font-bold ${hasEvent ? 'text-red-400' : 'text-slate-400'}`}>{dayNum}</span>
                    {hasEvent && (
                      <div className="mt-1 w-full flex flex-col gap-0.5 px-0.5">
                        {dayDeadlines.slice(0, 2).map(d => (
                          <div 
                            key={d.id} 
                            className="text-[8px] md:text-[9px] bg-red-500/20 text-red-300 px-1 py-0.5 rounded truncate w-full text-left" 
                            title={d.title}
                          >
                            {d.title}
                          </div>
                        ))}
                        {dayDeadlines.length > 2 && (
                          <div className="text-[8px] text-slate-500">+{dayDeadlines.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deadlines.map((item) => (
          <div key={item.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {item.category}
              </span>
              <h4 className="text-sm font-bold text-white mt-2">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">Due: {new Date(item.dueDate).toLocaleString()}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-slate-500 hover:text-red-400 p-1.5">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
