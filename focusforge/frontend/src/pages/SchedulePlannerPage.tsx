import React, { useEffect, useState } from 'react';
import { scheduleApi } from '../api/scheduleApi';
import { ScheduleBlock } from '../types';
import { CalendarDays, Clock, Plus, Trash2 } from 'lucide-react';

export const SchedulePlannerPage: React.FC = () => {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('05:00 PM');
  const [endTime, setEndTime] = useState('06:30 PM');
  const [activityType, setActivityType] = useState('DSA');

  const format12Hour = (timeStr: string) => {
    // Basic regex check if already 12h format
    if (timeStr.toLowerCase().includes('am') || timeStr.toLowerCase().includes('pm')) return timeStr;
    
    const [h, m] = timeStr.split(':');
    if (!h || !m) return timeStr;
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${m} ${suffix}`;
  };

  const fetchSchedule = async () => {
    try {
      const data = await scheduleApi.getToday();
      setBlocks(data);
    } catch (err) {
      setBlocks([
        { id: 1, title: 'DSA Arrays & Sorting', startTime: '05:00 PM', endTime: '06:30 PM', dayOfWeek: 'ALL', activityType: 'DSA', isCompleted: false },
        { id: 2, title: 'Aptitude Practice - Averages', startTime: '06:30 PM', endTime: '07:30 PM', dayOfWeek: 'ALL', activityType: 'APTITUDE', isCompleted: false },
        { id: 3, title: 'Sem 5 Exam Study Block', startTime: '08:00 PM', endTime: '10:00 PM', dayOfWeek: 'ALL', activityType: 'ACADEMIC', isCompleted: false }
      ]);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await scheduleApi.create({ title, startTime, endTime, activityType, dayOfWeek: 'ALL' });
      setTitle('');
      fetchSchedule();
    } catch (err) {
      setBlocks(prev => [...prev, { id: Date.now(), title, startTime, endTime, dayOfWeek: 'ALL', activityType, isCompleted: false }]);
      setTitle('');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await scheduleApi.delete(id);
      fetchSchedule();
    } catch (err) {
      setBlocks(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Daily Schedule & Time-Blocking</h2>
        <p className="text-xs text-slate-400 mt-1">Structure your day into deep work time blocks</p>
      </div>

      <form onSubmit={handleAdd} className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Block title (e.g. DSA Revision)..."
          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-32 px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-32 px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Time Block
        </button>
      </form>

      <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-3">
        {blocks.map((block) => (
          <div key={block.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold font-mono">
                {format12Hour(block.startTime)} - {format12Hour(block.endTime)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{block.title}</h4>
                <span className="text-[10px] text-slate-400">Type: {block.activityType}</span>
              </div>
            </div>
            <button onClick={() => handleDelete(block.id)} className="text-slate-500 hover:text-red-400 p-1.5">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
