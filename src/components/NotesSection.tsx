import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, Search, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Subject, Note } from '../types';

const SUBJECTS: Subject[] = ['Biology', 'Chemistry', 'Physics', 'Math', 'English'];

export const NotesSection: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Biology');
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', subject: 'Biology', chapter: 'Cell Structure', content: 'The cell is the basic structural and functional unit of life...', updatedAt: Date.now() },
    { id: '2', subject: 'Biology', chapter: 'Genetics', content: 'Genetics is the study of genes, genetic variation, and heredity...', updatedAt: Date.now() },
    { id: '3', subject: 'Math', chapter: 'Calculus I', content: 'Limits and continuity are fundamental concepts...', updatedAt: Date.now() },
  ]);

  const filteredNotes = notes.filter(n => n.subject === selectedSubject);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar - Subjects */}
      <div className="lg:w-64 space-y-2">
        <h3 className="text-xs font-bold text-brand-400 uppercase tracking-widest px-4 mb-4">Subjects</h3>
        {SUBJECTS.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
              selectedSubject === sub 
                ? 'bg-brand-700 text-white shadow-md' 
                : 'bg-white text-brand-600 hover:bg-brand-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Folder size={18} className={selectedSubject === sub ? 'text-brand-200' : 'text-brand-400'} />
              <span className="font-medium">{sub}</span>
            </div>
            <ChevronRight size={16} className={selectedSubject === sub ? 'opacity-100' : 'opacity-0'} />
          </button>
        ))}
      </div>

      {/* Main Content - Notes List */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
            <input
              type="text"
              placeholder={`Search ${selectedSubject} notes...`}
              className="w-full bg-white border border-brand-200 rounded-2xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <button className="btn-primary flex items-center justify-center space-x-2">
            <Plus size={18} />
            <span>New Note</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                whileHover={{ y: -4 }}
                className="glass-card p-6 cursor-pointer hover:border-brand-400 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-brand-100 rounded-xl text-brand-600 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  <span className="text-[10px] text-brand-400 font-medium">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-lg font-serif font-bold text-brand-800 mb-2">{note.chapter}</h4>
                <p className="text-sm text-brand-600 line-clamp-3 leading-relaxed">
                  {note.content}
                </p>
                <div className="mt-4 pt-4 border-t border-brand-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-tighter">View Full Note</span>
                  <ChevronRight size={14} className="text-brand-300" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-brand-400 space-y-4">
              <div className="p-6 bg-brand-100 rounded-full">
                <FileText size={48} className="opacity-20" />
              </div>
              <p className="font-medium">No notes found in {selectedSubject}</p>
              <button className="text-brand-700 font-bold text-sm hover:underline">Create your first note</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
