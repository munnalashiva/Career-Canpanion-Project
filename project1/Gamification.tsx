import React from 'react';
import { Badge, LeaderboardEntry } from '../types';
import { Trophy, Lock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LevelProgressProps {
  level: number;
  currentPoints: number;
  nextLevelPoints: number;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ level, currentPoints, nextLevelPoints }) => {
  const progress = (currentPoints / nextLevelPoints) * 100;
  
  return (
    <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
        <Trophy size={100} />
      </div>
      
      <div className="relative z-10 flex items-center space-x-4">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex flex-col items-center justify-center border-2 border-white/30 shadow-inner">
          <span className="text-xs font-medium text-brand-100 uppercase">Level</span>
          <span className="text-2xl font-bold">{level}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Progress to Level {level + 1}</span>
            <span>{currentPoints} / {nextLevelPoints} XP</span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm">
            <div 
              className="bg-yellow-400 h-3 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BadgeGridProps {
  badges: Badge[];
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {badges.map(badge => (
        <div 
          key={badge.id}
          className={`p-3 rounded-lg border flex flex-col items-center text-center transition-all ${
            badge.unlocked 
              ? 'bg-white border-brand-100 shadow-sm hover:shadow-md hover:border-brand-300' 
              : 'bg-gray-50 border-gray-200 opacity-60 grayscale'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2 ${
            badge.unlocked ? 'bg-brand-50' : 'bg-gray-200'
          }`}>
            {badge.unlocked ? badge.icon : <Lock size={16} className="text-gray-400" />}
          </div>
          <h4 className="text-sm font-bold text-gray-900 leading-tight">{badge.name}</h4>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};

interface LeaderboardWidgetProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ entries, currentUserId }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-gray-900 flex items-center">
          <Trophy className="text-yellow-500 mr-2" size={18} />
          Top Performers
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {entries.map((entry) => (
          <div 
            key={entry.id} 
            className={`flex items-center p-4 ${entry.id === currentUserId ? 'bg-brand-50' : 'hover:bg-gray-50'}`}
          >
            <div className="w-8 font-bold text-gray-500 text-center">{entry.rank}</div>
            <img 
              src={entry.avatar} 
              alt={entry.name} 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm mx-3"
            />
            <div className="flex-1">
              <h4 className={`text-sm font-semibold ${entry.id === currentUserId ? 'text-brand-900' : 'text-gray-900'}`}>
                {entry.name} {entry.id === currentUserId && '(You)'}
              </h4>
              <p className="text-xs text-gray-500">Lvl {entry.level} • {entry.points} XP</p>
            </div>
            <div className="ml-2">
              {entry.trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
              {entry.trend === 'down' && <TrendingDown size={16} className="text-red-500" />}
              {entry.trend === 'same' && <Minus size={16} className="text-gray-400" />}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 text-center border-t border-gray-100">
        <button className="text-sm font-medium text-brand-600 hover:text-brand-700">View Full Leaderboard</button>
      </div>
    </div>
  );
};
