import React from 'react';
import { BarChart3, TrendingUp, Award, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const ProgressTracker: React.FC = () => {
  const subjectProgress = [
    { name: 'Biology', progress: 75, color: 'bg-brand-400' },
    { name: 'Chemistry', progress: 45, color: 'bg-brand-500' },
    { name: 'Physics', progress: 60, color: 'bg-brand-600' },
    { name: 'Math', progress: 90, color: 'bg-brand-700' },
    { name: 'English', progress: 30, color: 'bg-brand-300' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Overall Stats */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-brand-100 rounded-2xl text-brand-700 mb-4">
              <BarChart3 size={24} />
            </div>
            <p className="text-3xl font-serif font-bold text-brand-800">68%</p>
            <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mt-1">Total Progress</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-brand-100 rounded-2xl text-brand-700 mb-4">
              <Clock size={24} />
            </div>
            <p className="text-3xl font-serif font-bold text-brand-800">24h</p>
            <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mt-1">Study Time (Week)</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-brand-100 rounded-2xl text-brand-700 mb-4">
              <Award size={24} />
            </div>
            <p className="text-3xl font-serif font-bold text-brand-800">12</p>
            <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mt-1">Tasks Completed</p>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif font-bold text-brand-800">Subject Mastery</h3>
            <TrendingUp size={20} className="text-brand-400" />
          </div>
          <div className="space-y-6">
            {subjectProgress.map((sub) => (
              <div key={sub.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-brand-700">{sub.name}</span>
                  <span className="text-brand-400 font-medium">{sub.progress}%</span>
                </div>
                <div className="h-3 bg-brand-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${sub.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="glass-card p-6 flex flex-col">
        <h3 className="text-xl font-serif font-bold text-brand-800 mb-8 text-center">Activity Overview</h3>
        <div className="flex-1 flex items-end justify-between gap-2 px-2">
          {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center space-y-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-full bg-brand-200 rounded-t-lg hover:bg-brand-700 transition-colors cursor-pointer"
              />
              <span className="text-[10px] font-bold text-brand-400">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-brand-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-brand-600">Most Active Day</span>
            <span className="font-bold text-brand-800">Thursday</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-brand-600">Average Daily</span>
            <span className="font-bold text-brand-800">3.4 Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};
