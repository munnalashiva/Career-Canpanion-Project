import React, { useState } from 'react';
import { Search, Filter, Sparkles, Briefcase, Clock, Award, Loader } from 'lucide-react';
import { MOCK_TEMPLATES } from '../constants';
import ResumeCard from '../components/ResumeCard';
import { Template } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

// Determine API URL based on environment or default to localhost
const API_BASE_URL = 'http://localhost:5000';

const ResumeHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeSource, setActiveSource] = useState('All');
  
  // AI Recommendation State
  const [userProfile, setUserProfile] = useState({ role: '', experience: '', skills: '' });
  const [recommendations, setRecommendations] = useState<{templateId: string, reason: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const sources = ['All', 'Overleaf', 'Canva', 'Zety', 'Google Docs', 'Microsoft'];

  const filteredTemplates = MOCK_TEMPLATES.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSource = activeSource === 'All' || t.source === activeSource;
    return matchesSearch && matchesSource;
  });

  const handleAiRecommendation = async () => {
    if (!userProfile.role || !userProfile.skills) {
      setAiError("Please fill in Role and Skills to get recommendations.");
      return;
    }
    setAiError('');
    setIsAiLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not configured");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        User Profile:
        Role: ${userProfile.role}
        Experience: ${userProfile.experience} years
        Skills: ${userProfile.skills}

        Available Templates (JSON):
        ${JSON.stringify(MOCK_TEMPLATES.map(t => ({ id: t.id, name: t.name, tags: t.tags })))}

        Task:
        Analyze the user profile and rank the top 2 resume templates from the list provided.
        Consider standard industry expectations for the role (e.g., creative vs corporate).
        Return a JSON object with a list of recommendations, including the templateId and a persuasive reason.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    templateId: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error("AI Error:", err);
      setAiError("Could not generate recommendations. Ensure API Key is valid.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCreateResume = async (template: Template) => {
    let saved = false;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/resume/select`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 'curr_user_1', // Mock user ID
                templateId: template.id,
                userProfile
            })
        });

        if (response.ok) {
          saved = true;
        } else {
          console.warn("Server responded with error:", response.status);
        }
    } catch (e) {
        console.warn("Backend unavailable, saving locally only.");
    }

    alert(`Draft created with ${template.name}!\n${saved ? 'Preference saved to database.' : '(Offline mode)'}`);
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Template Hub</h1>
          <p className="text-gray-500 mt-1">Curated templates from Overleaf, Canva, Zety, and more.</p>
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Source Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {sources.map(source => (
          <button 
            key={source}
            onClick={() => setActiveSource(source)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeSource === source 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {source}
          </button>
        ))}
      </div>

      {/* AI Recommendation Engine UI */}
      <div className="bg-white border border-brand-100 p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
           <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
             <Sparkles size={20} />
           </div>
           <div>
             <h2 className="text-lg font-bold text-gray-900">AI Recommendation Engine</h2>
             <p className="text-xs text-gray-500">Find the perfect template based on your career profile</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Target Role</label>
              <div className="relative">
                  <Briefcase size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input 
                      type="text" 
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="e.g. Product Manager"
                      value={userProfile.role}
                      onChange={e => setUserProfile({...userProfile, role: e.target.value})}
                  />
              </div>
          </div>
          <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Experience Level</label>
               <div className="relative">
                  <Clock size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <select 
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white appearance-none"
                      value={userProfile.experience}
                      onChange={e => setUserProfile({...userProfile, experience: e.target.value})}
                  >
                      <option value="">Select Level</option>
                      <option value="0-2">Entry Level (0-2 yrs)</option>
                      <option value="3-5">Mid Level (3-5 yrs)</option>
                      <option value="5+">Senior (5+ yrs)</option>
                      <option value="10+">Executive (10+ yrs)</option>
                  </select>
              </div>
          </div>
          <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Key Skills</label>
               <div className="relative">
                  <Award size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input 
                      type="text" 
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="e.g. Python, Leadership"
                      value={userProfile.skills}
                      onChange={e => setUserProfile({...userProfile, skills: e.target.value})}
                  />
              </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-red-500 font-medium h-4">{aiError}</p>
          <button 
              onClick={handleAiRecommendation}
              disabled={isAiLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-70 transition-colors text-sm font-medium shadow-md"
          >
              {isAiLoading ? (
                  <><Loader size={16} className="animate-spin" /><span>Analyzing...</span></>
              ) : (
                  <><Sparkles size={16} /><span>Get Recommendations</span></>
              )}
          </button>
        </div>

        {recommendations.length > 0 && (
            <div className="mt-6 pt-4 border-t border-brand-100 animate-fade-in">
                <h3 className="text-sm font-bold text-brand-800 mb-3 flex items-center">
                    <Sparkles size={14} className="mr-2" />
                    Top Matches for You
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map(rec => {
                        const tmpl = MOCK_TEMPLATES.find(t => t.id === rec.templateId);
                        if (!tmpl) return null;
                        return (
                            <div 
                                key={rec.templateId} 
                                className="flex items-start space-x-3 p-3 bg-brand-50 rounded-xl border border-brand-200 cursor-pointer hover:bg-brand-100 transition-all hover:shadow-sm group" 
                                onClick={() => setSelectedTemplate(tmpl)}
                            >
                                <img src={tmpl.thumbnail} className="w-14 h-20 object-cover rounded-lg border border-brand-100 bg-gray-200" alt={tmpl.name} />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <p className="font-bold text-brand-900 text-sm">{tmpl.name}</p>
                                        <span className="bg-brand-200 text-brand-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">98% Match</span>
                                    </div>
                                    <p className="text-xs text-brand-700 mt-1 leading-relaxed line-clamp-2">{rec.reason}</p>
                                    <p className="text-xs text-brand-500 mt-2 font-medium group-hover:underline">Click to use template</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTemplates.map(template => (
          <ResumeCard 
            key={template.id} 
            template={template} 
            onSelect={setSelectedTemplate} 
          />
        ))}
      </div>

      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Use {selectedTemplate.name}?</h2>
            <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
               <span className="font-semibold text-brand-600">{selectedTemplate.source}</span>
               <span>•</span>
               <span>{selectedTemplate.tags.join(', ')}</span>
            </div>
            <p className="text-gray-500 mb-6">This will create a new resume draft using the selected template structure. Your existing data will be automatically mapped.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleCreateResume(selectedTemplate)}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeHub;