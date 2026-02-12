
import React, { useState } from 'react';
import { MOCK_JOBS, JOB_PLATFORMS, MOCK_JOB_ALERTS } from '../constants';
import JobCard from '../components/JobCard';
import { Bell, Settings, ExternalLink, Briefcase, Eye, Calendar, Sparkles } from 'lucide-react';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('recommended');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Board & Internships</h1>
          <p className="text-gray-500 mt-1">Discover opportunities across top platforms and track your applications.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">
          <Settings size={18} />
          <span className="text-sm font-medium">Preferences</span>
        </button>
      </div>

      {/* External Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {JOB_PLATFORMS.map(platform => (
          <a 
            key={platform.id} 
            href={platform.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-10 ${platform.color}`}></div>
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${platform.color} bg-opacity-10 text-brand-900`}>
                 <Briefcase size={24} className={platform.color.replace('bg-', 'text-')} />
              </div>
              <ExternalLink size={18} className="text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{platform.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{platform.description}</p>
          </a>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Job List */}
        <div className="flex-1 space-y-6">
           {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['Recommended', 'Saved', 'Applied'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab} Matches
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MOCK_JOBS.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Sidebar: Alerts & Stats */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Alerts Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
                <h3 className="font-bold flex items-center">
                   <Bell size={16} className="mr-2 text-yellow-400" />
                   Application Alerts
                </h3>
                <span className="bg-red-500 text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
             </div>
             <div className="divide-y divide-gray-100">
                {MOCK_JOB_ALERTS.map(alert => (
                   <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                         <div className={`mt-1 p-1.5 rounded-full shrink-0 ${
                            alert.type === 'viewed' ? 'bg-blue-100 text-blue-600' :
                            alert.type === 'match' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                         }`}>
                            {alert.type === 'viewed' && <Eye size={14} />}
                            {alert.type === 'match' && <Sparkles size={14} />}
                            {alert.type === 'interview' && <Calendar size={14} />}
                         </div>
                         <div>
                            <h4 className="text-sm font-semibold text-gray-900">{alert.title}</h4>
                            <p className="text-xs text-gray-600 mt-0.5 leading-snug">{alert.message}</p>
                            <span className="text-[10px] text-gray-400 mt-2 block">{alert.time}</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
             <button className="w-full py-3 text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-t border-gray-100 transition-colors">
                View All Notifications
             </button>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-xl p-5 text-white shadow-lg">
             <h3 className="font-bold text-lg mb-4">Weekly Progress</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-brand-100 text-sm">Applications Sent</span>
                   <span className="font-bold text-xl">12</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-brand-100 text-sm">Profile Views</span>
                   <span className="font-bold text-xl">48</span>
                </div>
                <div className="h-1 bg-brand-500 rounded-full mt-2">
                   <div className="h-1 bg-white w-3/4 rounded-full"></div>
                </div>
                <p className="text-xs text-brand-200 mt-2">You're more active than 80% of candidates!</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
