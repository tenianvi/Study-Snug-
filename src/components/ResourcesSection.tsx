import React from 'react';
import { ExternalLink, Video, FileText, Book } from 'lucide-react';
import { motion } from 'motion/react';

export const ResourcesSection: React.FC = () => {
  const resources = [
    { id: '1', title: 'Khan Academy', type: 'link', url: 'https://khanacademy.org', category: 'General' },
    { id: '2', title: 'Physics Formulas PDF', type: 'pdf', url: '#', category: 'Physics' },
    { id: '3', title: 'Organic Chemistry Basics', type: 'video', url: '#', category: 'Chemistry' },
    { id: '4', title: 'Calculus Cheat Sheet', type: 'article', url: '#', category: 'Math' },
    { id: '5', title: 'Coursera Courses', type: 'link', url: 'https://coursera.org', category: 'General' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={18} />;
      case 'pdf': return <FileText size={18} />;
      case 'article': return <Book size={18} />;
      default: return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <motion.a
            key={res.id}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="glass-card p-5 flex items-center space-x-4 hover:border-brand-400 transition-all group"
          >
            <div className="p-3 bg-brand-100 rounded-2xl text-brand-600 group-hover:bg-brand-700 group-hover:text-white transition-colors">
              {getIcon(res.type)}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-0.5">{res.category}</p>
              <h4 className="font-serif font-bold text-brand-800">{res.title}</h4>
            </div>
            <ExternalLink size={14} className="text-brand-200 group-hover:text-brand-500 transition-colors" />
          </motion.a>
        ))}
      </div>

      <div className="glass-card p-8 bg-brand-100/50 border-dashed border-2">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-serif font-bold text-brand-800">Recommended for You</h3>
          <p className="text-brand-600">Based on your study patterns, we suggest looking into advanced calculus resources and biology research papers.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {['Research Gate', 'MIT OpenCourseWare', 'TED Ed', 'Wolfram Alpha'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-brand-700 shadow-sm border border-brand-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
