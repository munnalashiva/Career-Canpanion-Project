import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ATSChecker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showBadge, setShowBadge] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setShowBadge(false);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      const mockResult = {
        score: 92, // High score to trigger badge
        keywordsFound: ['React', 'TypeScript', 'Node.js', 'Team Leadership'],
        keywordsMissing: ['AWS', 'Docker'],
        formatting: 'Excellent',
        issues: [
          'Consider adding more quantitative metrics to project descriptions'
        ]
      };
      setResult(mockResult);
      if (mockResult.score >= 90) {
        setShowBadge(true);
      }
    }, 2000);
  };

  const scoreData = [
    { name: 'Score', value: result ? result.score : 0 },
    { name: 'Remaining', value: result ? 100 - result.score : 100 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
       {/* Badge Unlock Notification */}
       {showBadge && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between animate-fade-in mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">New Badge Unlocked: ATS Master!</h3>
              <p className="text-white/90 text-sm">You achieved a score over 90. +200 XP added to your profile.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowBadge(false)}
            className="px-4 py-2 bg-white text-orange-600 rounded-lg font-bold text-sm hover:bg-gray-50"
          >
            Claim
          </button>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">ATS Resume Checker</h1>
        <p className="text-gray-500 mt-2">Upload your resume to get an instant AI-scored analysis and improvement tips.</p>
      </div>

      {!result && !isAnalyzing && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-brand-400 transition-colors">
          <div className="p-4 bg-brand-50 text-brand-600 rounded-full mb-4">
            <UploadCloud size={40} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Drag & Drop or Browse</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">Support for PDF and DOCX files (Max 5MB)</p>
          <input 
            type="file" 
            id="resume-upload" 
            className="hidden" 
            accept=".pdf,.docx"
            onChange={handleFileUpload}
          />
          <label 
            htmlFor="resume-upload"
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 cursor-pointer font-medium"
          >
            Select Resume
          </label>
          {file && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
              <FileText size={16} />
              <span>{file.name}</span>
            </div>
          )}
          {file && (
            <button 
              onClick={handleAnalyze}
              className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-bold shadow-lg"
            >
              Analyze with AI
            </button>
          )}
        </div>
      )}

      {isAnalyzing && (
        <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100">
          <RefreshCw size={48} className="text-brand-600 animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Analyzing Resume...</h3>
          <p className="text-gray-500 mt-2">Our AI is parsing structure, keywords, and formatting.</p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">ATS Compatibility</h3>
              <div className="w-40 h-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell key="score" fill={result.score > 70 ? '#10b981' : '#f59e0b'} />
                      <Cell key="bg" fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-gray-900">{result.score}</span>
                  <span className="text-xs text-gray-500">/ 100</span>
                </div>
              </div>
              <p className="text-sm text-center mt-4 text-gray-600">
                {result.score > 70 ? 'Great job! Your resume is well-optimized.' : 'Needs improvement to pass ATS filters.'}
              </p>
            </div>

            {/* Keywords */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Keyword Analysis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                    <CheckCircle size={16} className="mr-1" /> Found Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywordsFound.map((k: string) => (
                      <span key={k} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md border border-green-100">{k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                    <XCircle size={16} className="mr-1" /> Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywordsMissing.map((k: string) => (
                      <span key={k} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md border border-red-100">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Critical Issues to Fix</h3>
            <ul className="space-y-3">
              {result.issues.map((issue: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <AlertCircle size={20} className="text-orange-600 shrink-0 mt-0.5" />
                  <span className="text-orange-900 text-sm">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end">
             <button 
                onClick={() => { setFile(null); setResult(null); }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Upload New Resume
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;