
import React, { useState } from 'react';
import { MOCK_PROBLEMS, CODING_PLATFORMS, MOCK_QUIZZES } from '../constants';
import { Play, CheckCircle, Clock, ChevronRight, Zap, Award, ExternalLink, BookOpen, Brain, Terminal, LayoutGrid } from 'lucide-react';
import { QuizQuestion } from '../types';

const CodingPractice = () => {
  const [activeTab, setActiveTab] = useState<'practice' | 'quiz' | 'resources'>('practice');

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coding Arena</h1>
          <p className="text-gray-500">Sharpen your skills with problems, quizzes, and top-tier resources.</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex space-x-1">
          <button 
            onClick={() => setActiveTab('practice')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'practice' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Terminal size={18} />
            <span>Problem Solving</span>
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'quiz' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Brain size={18} />
            <span>Skill Quizzes</span>
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'resources' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid size={18} />
            <span>Resources</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {activeTab === 'practice' && <PracticeView />}
        {activeTab === 'quiz' && <QuizView />}
        {activeTab === 'resources' && <ResourcesView />}
      </div>
    </div>
  );
};

// ==========================================
// 1. PRACTICE VIEW (Original Editor Logic)
// ==========================================
const PracticeView = () => {
  const [activeProblem, setActiveProblem] = useState(MOCK_PROBLEMS[0]);
  const [code, setCode] = useState('// Write your solution here\nfunction solution(nums, target) {\n  \n}');
  const [output, setOutput] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  const runCode = () => {
    setOutput('Running...');
    setShowReward(false);
    setTimeout(() => {
      setOutput('Test Case 1: Passed\nTest Case 2: Passed\nTest Case 3: Passed');
      setShowReward(true);
      setTimeout(() => setShowReward(false), 5000);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col lg:flex-row gap-6 relative">
      {showReward && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-yellow-400 text-yellow-900 px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center border-4 border-white">
            <Award size={64} className="mb-2 text-white drop-shadow-md" />
            <h2 className="text-2xl font-black uppercase">Problem Solved!</h2>
            <p className="text-lg font-bold mt-1">+{activeProblem.points} XP Earned</p>
          </div>
        </div>
      )}

      {/* Problem List */}
      <div className="w-full lg:w-1/3 flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Problem Set</h2>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">Total XP: 500</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_PROBLEMS.map((problem) => (
            <button
              key={problem.id}
              onClick={() => { setActiveProblem(problem); setShowReward(false); }}
              className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between group ${
                activeProblem.id === problem.id ? 'bg-brand-50 border-l-4 border-l-brand-600' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div>
                <h3 className={`font-medium ${activeProblem.id === problem.id ? 'text-brand-900' : 'text-gray-900'}`}>
                  {problem.id}. {problem.title}
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Zap size={10} className="mr-1 text-yellow-500" />
                    {problem.points} XP
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className={`text-gray-400 group-hover:text-gray-600 ${activeProblem.id === problem.id ? 'text-brand-500' : ''}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">{activeProblem.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center text-brand-600 font-semibold bg-brand-50 px-2 py-1 rounded">
                <Zap size={14} className="mr-1 fill-current" /> Win {activeProblem.points} XP
              </span>
              <span className="flex items-center"><CheckCircle size={14} className="mr-1" /> Acceptance: {activeProblem.acceptance}</span>
              <span className="flex items-center"><Clock size={14} className="mr-1" /> Time Limit: 1s</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.
          </p>
        </div>

        <div className="flex-1 flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="text-gray-300 text-sm">JavaScript</span>
            <button 
              onClick={runCode}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              <Play size={14} />
              <span>Run Code</span>
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
          {output && (
            <div className="bg-gray-800 p-4 border-t border-gray-700 max-h-40 overflow-y-auto">
              <h4 className="text-gray-400 text-xs font-bold uppercase mb-2">Console Output</h4>
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. QUIZ VIEW (New Feature)
// ==========================================
const QuizView = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const topics = Array.from(new Set(MOCK_QUIZZES.map(q => q.topic)));
  const filteredQuestions = selectedTopic ? MOCK_QUIZZES.filter(q => q.topic === selectedTopic) : [];

  const handleStartQuiz = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  const handleAnswerClick = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(index);
    setIsAnswerChecked(true);
    if (index === filteredQuestions[currentQuestionIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < filteredQuestions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center animate-fade-in">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
           <Award size={80} className="mx-auto text-yellow-500 mb-6" />
           <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
           <p className="text-gray-500 mb-6">You tested your knowledge in <span className="font-bold text-gray-800">{selectedTopic}</span></p>
           
           <div className="text-5xl font-black text-brand-600 mb-2">{score} / {filteredQuestions.length}</div>
           <p className="text-sm font-medium text-gray-400 mb-8 uppercase tracking-wide">Final Score</p>
           
           <div className="flex space-x-4 justify-center">
             <button 
               onClick={() => setSelectedTopic(null)}
               className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
             >
               Choose Topic
             </button>
             <button 
               onClick={() => handleStartQuiz(selectedTopic!)}
               className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors"
             >
               Retry Quiz
             </button>
           </div>
        </div>
      </div>
    );
  }

  if (selectedTopic) {
    const question = filteredQuestions[currentQuestionIdx];
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-6">
           <button onClick={() => setSelectedTopic(null)} className="text-sm text-gray-500 hover:text-gray-900 font-medium">
             ← Back to Topics
           </button>
           <span className="text-sm font-bold bg-brand-50 text-brand-700 px-3 py-1 rounded-full">
              Question {currentQuestionIdx + 1} / {filteredQuestions.length}
           </span>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let btnClass = "border-gray-200 hover:bg-gray-50 hover:border-gray-300";
              if (isAnswerChecked) {
                 if (idx === question.correctAnswer) btnClass = "bg-green-100 border-green-500 text-green-800";
                 else if (idx === selectedAnswer) btnClass = "bg-red-50 border-red-500 text-red-800";
                 else btnClass = "border-gray-200 opacity-50";
              } else if (selectedAnswer === idx) {
                 btnClass = "border-brand-500 bg-brand-50 text-brand-700";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerClick(idx)}
                  disabled={isAnswerChecked}
                  className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${btnClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswerChecked && (
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleNextQuestion}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                <span>{currentQuestionIdx + 1 === filteredQuestions.length ? 'Finish Quiz' : 'Next Question'}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Select a Topic</h2>
        <p className="text-gray-500 mt-2">Choose a category to start your quiz challenge.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map(topic => (
          <div 
            key={topic}
            onClick={() => handleStartQuiz(topic)}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-brand-300 transition-all cursor-pointer flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <Brain size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{topic}</h3>
            <p className="text-sm text-gray-500 mt-2">{MOCK_QUIZZES.filter(q => q.topic === topic).length} Questions</p>
            <span className="mt-4 text-xs font-bold text-brand-600 uppercase tracking-wider group-hover:underline">Start Quiz</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. RESOURCES VIEW (New Feature)
// ==========================================
const ResourcesView = () => {
  const categories = Array.from(new Set(CODING_PLATFORMS.map(p => p.category)));

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
             <BookOpen size={20} className="mr-2 text-brand-600" />
             {category === 'Core' ? 'Core Coding Platforms' : 
              category === 'Assessment' ? 'Skill Assessment & Hiring' :
              category === 'Beginner' ? 'Beginner & Mobile Learning' : 'Gamified Learning'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CODING_PLATFORMS.filter(p => p.category === category).map(platform => (
              <a 
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-400 hover:shadow-sm transition-all group"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 group-hover:text-brand-700 flex items-center">
                    {platform.name}
                    <ExternalLink size={12} className="ml-2 opacity-50 group-hover:opacity-100" />
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{platform.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodingPractice;
