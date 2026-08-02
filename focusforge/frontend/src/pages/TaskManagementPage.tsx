import React, { useEffect, useState } from 'react';
import { taskApi } from '../api/taskApi';
import { Task } from '../types';
import { Plus, CheckSquare, Clock, Trash2, Calendar, Tag } from 'lucide-react';

export const TaskManagementPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');
  const [newEstMinutes, setNewEstMinutes] = useState(30);

  const fetchTasks = async () => {
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (err) {
      setTasks([
        { id: 1, title: 'Solve 3 DSA Array Problems', priority: 'HIGH', status: 'PENDING', dueDate: '2026-08-02', estimatedMinutes: 60, isCompleted: false, categoryName: 'DSA' },
        { id: 2, title: 'Revise Aptitude Averages Formulas', priority: 'MEDIUM', status: 'COMPLETED', dueDate: '2026-08-02', estimatedMinutes: 30, isCompleted: true, categoryName: 'Aptitude' },
        { id: 3, title: 'Prepare Sem 5 DBMS Assignment', priority: 'URGENT', status: 'PENDING', dueDate: '2026-08-03', estimatedMinutes: 90, isCompleted: false, categoryName: 'Academic' }
      ]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      await taskApi.create({
        title: newTitle,
        priority: newPriority,
        estimatedMinutes: newEstMinutes,
        dueDate: new Date().toISOString().split('T')[0]
      });
      setNewTitle('');
      fetchTasks();
    } catch (err) {
      setTasks(prev => [
        ...prev,
        {
          id: Date.now(),
          title: newTitle,
          priority: newPriority,
          status: 'PENDING',
          dueDate: new Date().toISOString().split('T')[0],
          estimatedMinutes: newEstMinutes,
          isCompleted: false,
          categoryName: 'General'
        }
      ]);
      setNewTitle('');
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await taskApi.toggleComplete(id);
      fetchTasks();
    } catch (err) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await taskApi.delete(id);
      fetchTasks();
    } catch (err) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Task & Daily Habit Tracker</h2>
          <p className="text-xs text-slate-400 mt-1">Manage study tasks, academic work, and daily goals</p>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleCreate} className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new task (e.g. Implement Merge Sort from scratch)..."
          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />

        <select
          value={newPriority}
          onChange={(e: any) => setNewPriority(e.target.value)}
          className="px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
          <option value="URGENT">Urgent Priority</option>
        </select>

        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 flex items-center justify-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="glass-panel rounded-2xl border border-slate-800 divide-y divide-slate-800/60">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-900/40 transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggle(task.id)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className={`text-xs font-semibold ${task.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.title}
                </span>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span>Due: {task.dueDate}</span>
                  <span>• {task.estimatedMinutes} mins</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                task.priority === 'URGENT' ? 'bg-red-500/20 text-red-300' :
                task.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {task.priority}
              </span>

              <button
                onClick={() => handleDelete(task.id)}
                className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
