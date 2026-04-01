import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types';

export const StudyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete Biology Chapter 4 notes', completed: false, subject: 'Biology' },
    { id: '2', text: 'Practice Math integration problems', completed: true, subject: 'Math' },
    { id: '3', text: 'Read English literature essay', completed: false, subject: 'English' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Daily To-Do */}
      <div className="lg:col-span-2 glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif font-bold text-brand-800">Daily To-Do List</h3>
          <span className="text-xs font-medium bg-brand-100 text-brand-600 px-3 py-1 rounded-full">
            {tasks.filter(t => t.completed).length}/{tasks.length} Done
          </span>
        </div>

        <form onSubmit={addTask} className="flex space-x-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new study task..."
            className="flex-1 bg-brand-50 border border-brand-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
          />
          <button type="submit" className="bg-brand-700 text-white p-2 rounded-xl hover:bg-brand-800 transition-all">
            <Plus size={24} />
          </button>
        </form>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  task.completed ? 'bg-brand-50 border-transparent opacity-60' : 'bg-white border-brand-100 shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <button onClick={() => toggleTask(task.id)} className="text-brand-500 hover:text-brand-700 transition-colors">
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div>
                    <p className={`font-medium ${task.completed ? 'line-through text-brand-400' : 'text-brand-800'}`}>
                      {task.text}
                    </p>
                    {task.subject && (
                      <span className="text-[10px] uppercase tracking-wider text-brand-400 font-bold">
                        {task.subject}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-brand-200 hover:text-red-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Weekly Schedule Mini */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <CalendarIcon size={20} className="text-brand-500" />
          <h3 className="text-xl font-serif font-bold text-brand-800">Weekly Focus</h3>
        </div>
        <div className="space-y-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex items-center space-x-4">
              <span className="text-xs font-bold text-brand-400 w-8">{day}</span>
              <div className="flex-1 h-2 bg-brand-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-400 rounded-full" 
                  style={{ width: `${Math.random() * 80 + 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-brand-700 rounded-2xl text-brand-50">
          <p className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">Next Deadline</p>
          <p className="font-serif text-lg font-bold">Physics Midterm</p>
          <p className="text-xs mt-2 opacity-80">In 3 days • 10:00 AM</p>
        </div>
      </div>
    </div>
  );
};
