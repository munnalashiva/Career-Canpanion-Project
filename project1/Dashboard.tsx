import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, Award, Calendar } from 'lucide-react';
import { MOCK_BADGES, MOCK_LEADERBOARD } from '../constants';
import { LevelProgress, BadgeGrid, LeaderboardWidget } from '../components/Gamification';

const data = [
  { name: 'Mon', problems: 4, applications: 2 },
  { name: 'Tue', problems: 3, applications: 5 },
  { name: 'Wed', problems: 7, applications: 3 },
  { name: 'Thu', problems: 5, applications: 8 },
  { name: 'Fri', problems: 6, applications: 4 },
  { name: 'Sat', problems: 8, applications: 1 },
  { name: 'Sun', problems: 2, applications: 0 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex! 👋</h1>
          <p className="text-gray-500">Here's what's happening with your career journey today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm">
            Daily Check-in
          </button>
        </div>
      </div>

      {/* Gamification Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <LevelProgress level={8} currentPoints={1890} nextLevelPoints={2500} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Streak</p>
                    <h3 className="text-2xl font-bold text-gray-900">12 Days</h3>
                  </div>
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <span>Keep it up! 🔥</span>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Problems Solved</p>
                    <h3 className="text-2xl font-bold text-gray-900">148</h3>
                  </div>
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Target size={24} />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Top 15% of users
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ATS Score</p>
                    <h3 className="text-2xl font-bold text-gray-900">85/100</h3>
                  </div>
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <Award size={24} />
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  +5 points this week
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Interviews</p>
                    <h3 className="text-2xl font-bold text-gray-900">2</h3>
                  </div>
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                    <Calendar size={24} />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Tomorrow 2pm
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Activity Overview</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <Tooltip 
                      cursor={{fill: '#f9fafb'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Bar dataKey="problems" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Problems" />
                    <Bar dataKey="applications" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Applications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
        </div>

        <div className="space-y-6">
          <LeaderboardWidget entries={MOCK_LEADERBOARD} currentUserId="curr" />
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Your Badges</h3>
            <BadgeGrid badges={MOCK_BADGES} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
                <div className="flex justify-between items-start">
                   <h4 className="font-medium text-brand-800 text-sm">Coding Challenge</h4>
                   <span className="text-xs font-bold bg-brand-200 text-brand-800 px-2 py-0.5 rounded-full">+100 XP</span>
                </div>
                <p className="text-xs text-brand-700 mt-1">Complete "Dynamic Programming Basics" to unlock the next roadmap badge.</p>
                <button className="mt-3 text-xs font-medium text-brand-800 hover:text-brand-900 underline">Start Challenge</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;