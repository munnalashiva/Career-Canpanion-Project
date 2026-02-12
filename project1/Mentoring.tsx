import React, { useState } from 'react';
import { MOCK_MENTORS } from '../constants';
import MentorCard from '../components/MentorCard';
import { Bot, Send } from 'lucide-react';

const Mentoring = () => {
  const [activeTab, setActiveTab] = useState<'human' | 'ai'>('human');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI Career Coach. How can I help you today? I can review your resume, run mock interviews, or suggest career paths.' }
  ]);

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    setAiMessages(prev => [...prev, { role: 'user', text: aiInput }]);
    const userInput = aiInput;
    setAiInput('');

    setTimeout(() => {
      setAiMessages(prev => [...prev, { 
        role: 'ai', 
        text: `That's a great question about "${userInput}". Based on market trends, I suggest focusing on core fundamentals before moving to frameworks.` 
      }]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dual Mentoring System</h1>
          <p className="text-gray-500 mt-1">Connect with industry experts or get instant feedback from our AI Coach.</p>
        </div>
        <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('human')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'human' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Industry Mentors
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ai' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            AI Coach
          </button>
        </div>
      </div>

      {activeTab === 'human' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MENTORS.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-brand-600 p-4 flex items-center space-x-3 shadow-md">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">VidyaMitra AI Coach</h3>
              <p className="text-brand-100 text-xs">Always online • Instant replies</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAiSend} className="p-4 bg-white border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask for resume feedback or interview tips..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button 
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white p-2 rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Mentoring;