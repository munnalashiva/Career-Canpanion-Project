import React from 'react';
import { Mentor } from '../types';
import { Star, MessageCircle, Calendar } from 'lucide-react';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
      <div className="relative">
        <img 
          src={mentor.avatar} 
          alt={mentor.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
        {mentor.available && (
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      
      <h3 className="mt-4 font-bold text-gray-900 text-lg">{mentor.name}</h3>
      <p className="text-brand-600 font-medium text-sm">{mentor.role}</p>
      <p className="text-gray-500 text-sm">{mentor.company}</p>
      
      <div className="mt-3 flex items-center justify-center space-x-1">
        <Star size={16} className="text-yellow-400 fill-current" />
        <span className="font-bold text-gray-900">{mentor.rating}</span>
        <span className="text-gray-400 text-sm">(120+ reviews)</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {mentor.expertise.map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex space-x-2 w-full">
        <button className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium">
          <MessageCircle size={16} />
          <span>Chat</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 text-sm font-medium">
          <Calendar size={16} />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};

export default MentorCard;