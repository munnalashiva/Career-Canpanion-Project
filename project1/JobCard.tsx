import React from 'react';
import { Job } from '../types';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <img 
            src={job.logo} 
            alt={job.company} 
            className="w-12 h-12 rounded-lg bg-gray-50 object-cover border border-gray-100"
          />
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {job.matchScore}% Match
          </span>
          <span className="text-xs text-gray-500 mt-1">{job.postedAt}</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign size={16} className="text-gray-400" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase size={16} className="text-gray-400" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-gray-400" />
          <span>Urgent Hire</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50 flex space-x-3">
        <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          Apply Now
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default JobCard;