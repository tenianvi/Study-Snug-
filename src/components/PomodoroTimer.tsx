import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          setIsActive(false);
          const nextMode = mode === 'study' ? 'break' : 'study';
          setMode(nextMode);
          setMinutes(nextMode === 'study' ? 25 : 5);
          setSeconds(0);
          // Play sound or notification here if needed
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'study' ? 25 : 5);
    setSeconds(0);
  };

  const switchMode = (newMode: 'study' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    setMinutes(newMode === 'study' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="glass-card p-8 flex flex-col items-center justify-center space-y-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => switchMode('study')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            mode === 'study' ? 'bg-brand-700 text-white' : 'bg-brand-100 text-brand-700'
          }`}
        >
          Study Session
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            mode === 'break' ? 'bg-brand-700 text-white' : 'bg-brand-100 text-brand-700'
          }`}
        >
          Short Break
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-brand-100"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="552.92"
            initial={{ strokeDashoffset: 552.92 }}
            animate={{ 
              strokeDashoffset: 552.92 - (552.92 * (minutes * 60 + seconds)) / (mode === 'study' ? 25 * 60 : 5 * 60) 
            }}
            transition={{ duration: 1, ease: "linear" }}
            className="text-brand-500"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-bold font-serif text-brand-800">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-widest text-brand-400 mt-1">
            {mode === 'study' ? 'Focusing' : 'Resting'}
          </span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-700 text-white hover:bg-brand-800 transition-all shadow-lg"
        >
          {isActive ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-200 transition-all"
        >
          <RotateCcw size={20} />
        </button>
      </div>
      
      <div className="flex items-center space-x-2 text-brand-400 text-sm">
        {mode === 'study' ? <BookOpen size={16} /> : <Coffee size={16} />}
        <span>{mode === 'study' ? 'Deep work in progress' : 'Time to recharge'}</span>
      </div>
    </div>
  );
};
