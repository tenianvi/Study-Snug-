import React from 'react';
import { Trophy, Target, Sparkles, Flame, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const MotivationalDashboard: React.FC = () => {
  const badges = [
    { id: '1', name: 'Early Bird', icon: '🌅', earned: true },
    { id: '2', name: 'Deep Focus', icon: '🧠', earned: true },
    { id: '3', name: 'Math Wizard', icon: '📐', earned: false },
    { id: '4', name: '7 Day Streak', icon: '🔥', earned: true },
    { id: '5', name: 'Note Taker', icon: '✍️', earned: false },
  ];

  const dailyGoals = [
    { id: '1', text: 'Study for 4 hours', completed: true },
    { id: '2', text: 'Complete 2 subjects', completed: false },
    { id: '3', text: 'Review flashcards', completed: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Daily Goals */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Target size={20} className="text-brand-500" />
          <h3 className="text-xl font-serif font-bold text-brand-800">Daily Goals</h3>
        </div>
        <div className="space-y-4">
          {dailyGoals.map((goal) => (
            <div key={goal.id} className="flex items-center space-x-3 p-3 bg-brand-50 rounded-2xl">
              <div className={`p-1 rounded-full ${goal.completed ? 'text-brand-700' : 'text-brand-200'}`}>
                <CheckCircle size={20} />
              </div>
              <span className={`text-sm font-medium ${goal.completed ? 'text-brand-400 line-through' : 'text-brand-700'}`}>
                {goal.text}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-3 border-2 border-dashed border-brand-200 rounded-2xl text-brand-400 text-sm font-medium hover:bg-brand-50 transition-all">
          + Add Goal
        </button>
      </div>

      {/* Achievement Badges */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Trophy size={20} className="text-brand-500" />
          <h3 className="text-xl font-serif font-bold text-brand-800">Achievements</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                badge.earned ? 'bg-brand-100' : 'bg-brand-50 opacity-40 grayscale'
              }`}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[10px] font-bold text-center text-brand-700 leading-tight">
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inspirational Message */}
      <div className="flex flex-col space-y-6">
        <div className="glass-card p-6 bg-brand-700 text-brand-50 relative overflow-hidden">
          <Sparkles className="absolute -right-4 -top-4 w-24 h-24 opacity-10 rotate-12" />
          <h3 className="text-lg font-serif font-bold mb-2">Daily Inspiration</h3>
          <p className="text-sm italic opacity-90 leading-relaxed">
            "The beautiful thing about learning is that no one can take it away from you."
          </p>
          <p className="text-xs mt-4 font-bold uppercase tracking-widest opacity-60">— B.B. King</p>
        </div>

        <div className="glass-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-1">Current Streak</p>
            <p className="text-3xl font-serif font-bold text-brand-800">12 Days</p>
          </div>
          <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-700">
            <Flame size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
