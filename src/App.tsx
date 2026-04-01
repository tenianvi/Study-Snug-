import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Timer, 
  BarChart2, 
  Library, 
  Quote,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { StudyPlanner } from './components/StudyPlanner';
import { NotesSection } from './components/NotesSection';
import { PomodoroTimer } from './components/PomodoroTimer';
import { ProgressTracker } from './components/ProgressTracker';
import { ResourcesSection } from './components/ResourcesSection';
import { MotivationalDashboard } from './components/MotivationalDashboard';
import { AIAssistant } from './components/AIAssistant';
import { ChatBot } from './components/ChatBot';

type Tab = 'home' | 'planner' | 'notes' | 'timer' | 'progress' | 'resources' | 'ai-assistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-assistant', label: 'AI Study Guide', icon: Sparkles },
    { id: 'planner', label: 'Planner', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'resources', label: 'Resources', icon: Library },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-12">
            <header className="text-center space-y-4 py-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif font-black text-brand-800 tracking-tight"
              >
                Study Smart, <br />
                <span className="text-brand-500 italic">Achieve More</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center space-x-2 text-brand-400"
              >
                <Quote size={16} />
                <p className="text-lg font-medium italic">"Success is the sum of small efforts, repeated day in and day out."</p>
              </motion.div>
            </header>
            <MotivationalDashboard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-brand-800 px-2">Quick Timer</h3>
                <PomodoroTimer />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-brand-800 px-2">Today's Focus</h3>
                <StudyPlanner />
              </div>
            </div>
          </div>
        );
      case 'planner': return <StudyPlanner />;
      case 'notes': return <NotesSection />;
      case 'timer': return <div className="max-w-md mx-auto"><PomodoroTimer /></div>;
      case 'progress': return <ProgressTracker />;
      case 'resources': return <ResourcesSection />;
      case 'ai-assistant': return <AIAssistant />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-brand-50/80 backdrop-blur-md border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 bg-brand-700 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <BookOpen size={24} />
              </div>
              <span className="text-2xl font-serif font-black text-brand-800 tracking-tighter">Study Snug</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center space-x-2 ${
                    activeTab === item.id 
                      ? 'bg-brand-700 text-white shadow-md' 
                      : 'text-brand-600 hover:bg-brand-100'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-brand-700 hover:bg-brand-100 rounded-xl transition-all"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-brand-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-base font-bold transition-all ${
                      activeTab === item.id 
                        ? 'bg-brand-100 text-brand-800' 
                        : 'text-brand-500 hover:bg-brand-50'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab !== 'home' && (
              <div className="mb-12">
                <h2 className="text-4xl font-serif font-black text-brand-800 capitalize">
                  {navItems.find(i => i.id === activeTab)?.label}
                </h2>
                <p className="text-brand-400 font-medium mt-2">Manage your academic journey with precision.</p>
              </div>
            )}
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-100/50 py-12 border-t border-brand-200">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-brand-800 font-serif font-black text-xl">
            <BookOpen size={20} className="text-brand-700" />
            <span>Study Snug</span>
          </div>
          <p className="text-sm text-brand-400 font-medium">Designed for students who want to excel. © 2026 Study Snug Inc.</p>
          <div className="flex justify-center space-x-6 text-xs font-bold text-brand-500 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-800 transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-800 transition-colors">Support</a>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}
