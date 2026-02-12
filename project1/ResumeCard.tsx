import React from 'react';
import { Template } from '../types';
import { Download, Eye } from 'lucide-react';

interface ResumeCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ template, onSelect }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
        <img 
          src={template.thumbnail} 
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
          <button className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100">
            <Eye size={20} />
          </button>
          <button 
            onClick={() => onSelect(template)}
            className="p-2 bg-brand-600 rounded-full text-white hover:bg-brand-700"
          >
            <Download size={20} />
          </button>
        </div>
        <span className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-md">
          {template.source}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {template.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{template.popularity}% Match</span>
          <span>Free</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;