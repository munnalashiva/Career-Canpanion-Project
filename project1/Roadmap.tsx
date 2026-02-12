import React, { useState } from 'react';
import { MOCK_ROADMAP } from '../constants';
import { CheckCircle, Lock, Loader, ArrowRight, Zap, ExternalLink, Map as MapIcon, ChevronRight } from 'lucide-react';
import { RoadmapStep } from '../types';

const Roadmap = () => {
  const [selectedRole, setSelectedRole] = useState<'frontend' | 'backend' | 'devops' | 'ai'>('frontend');
  const roadmapData = MOCK_ROADMAP[selectedRole] || [];

  const roles = [
    { id: 'frontend', label: 'Frontend', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'backend', label: 'Backend', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'devops', label: 'DevOps', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { id: 'ai', label: 'AI & Data', color: 'bg-purple-100 text-purple-700 border-purple-200' }
  ];

  const calculateProgress = (steps: RoadmapStep[]) => {
    const completed = steps.filter(s => s.status === 'completed').length;
    return Math.round((completed / steps.length) * 100);
  };

  const progress = calculateProgress(roadmapData);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Career Roadmap</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Personalized learning paths integrated with <span className="font-bold text-gray-800">roadmap.sh</span> content structure.
        </p>

        {/* Role Selectors */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id as any)}
              className={`px-6 py-2 rounded-full border font-medium transition-all ${
                selectedRole === role.id 
                  ? `${role.color} shadow-sm ring-2 ring-offset-1 ring-gray-200` 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
        
        {/* Progress Stats */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 inline-flex items-center space-x-8">
          <div className="text-center">
            <span className="block text-3xl font-bold text-gray-900">{progress}%</span>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Completed</span>
          </div>
          <div className="h-10 w-px bg-gray-200"></div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-gray-900">{roadmapData.length}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Modules</span>
          </div>
          <div className="h-10 w-px bg-gray-200"></div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-gray-900">
               {roadmapData.reduce((acc, curr) => acc + curr.points, 0)}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total XP</span>
          </div>
        </div>
      </div>

      {/* Roadmap.sh Integration Banner */}
      <div className="bg-[#1b1b1b] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between shadow-lg text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <MapIcon size={120} />
         </div>
         <div className="flex items-center space-x-4 z-10">
            <div className="bg-yellow-400 p-3 rounded-lg text-black font-bold">
               sh
            </div>
            <div>
               <h3 className="font-bold text-lg">Powered by roadmap.sh</h3>
               <p className="text-gray-400 text-sm">View the full interactive {selectedRole} guide.</p>
            </div>
         </div>
         <a 
            href={`https://roadmap.sh/${selectedRole}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 px-5 py-2.5 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors flex items-center z-10"
         >
            <span>View Interactive Map</span>
            <ExternalLink size={16} className="ml-2" />
         </a>
      </div>

      {/* Timeline View */}
      <div className="relative pt-4">
        {/* Central Line */}
        <div className="absolute left-8 md:left-1/2 top-4 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-12">
          {roadmapData.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Connector Line & Dot for Mobile */}
                <div className="md:hidden absolute left-[26px] top-6 w-5 h-5 rounded-full border-4 z-10 bg-white
                   border-gray-300">
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                   <div className={`p-6 bg-white rounded-xl border transition-all hover:shadow-md relative group
                      ${step.status === 'in-progress' ? 'border-brand-500 ring-4 ring-brand-50' : 'border-gray-200'}
                   `}>
                      {/* Desktop Connector Dot */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 z-10 bg-white
                         ${step.status === 'completed' ? 'border-green-500 bg-green-500' : 
                           step.status === 'in-progress' ? 'border-brand-500 bg-brand-500' : 'border-gray-300'}
                         ${isLeft ? '-right-[54px]' : '-left-[54px]'}
                      `}></div>
                      
                      {/* Connector Line Horizontal */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 w-12
                         ${isLeft ? '-right-12' : '-left-12'}
                      `}></div>

                      <div className="flex justify-between items-start mb-2">
                         <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider
                            ${step.status === 'completed' ? 'bg-green-100 text-green-700' : 
                              step.status === 'in-progress' ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-500'}
                         `}>
                            {step.status}
                         </span>
                         <span className="flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                            <Zap size={10} className="mr-1 fill-current" />
                            {step.points} XP
                         </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{step.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        {step.status === 'completed' ? (
                           <span className="flex items-center text-sm font-medium text-green-600">
                              <CheckCircle size={16} className="mr-2" /> Completed
                           </span>
                        ) : step.status === 'in-progress' ? (
                           <span className="flex items-center text-sm font-medium text-brand-600">
                              <Loader size={16} className="mr-2 animate-spin" /> In Progress
                           </span>
                        ) : (
                           <span className="flex items-center text-sm font-medium text-gray-400">
                              <Lock size={16} className="mr-2" /> Locked
                           </span>
                        )}
                        
                        {step.status !== 'locked' && (
                           <button className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center group-hover:underline">
                              Start Learning <ChevronRight size={16} />
                           </button>
                        )}
                      </div>
                   </div>
                </div>
                
                {/* Spacer for center line */}
                <div className="w-2/12 hidden md:block"></div>
                
                {/* Empty side for balance */}
                <div className="w-5/12 hidden md:block"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;