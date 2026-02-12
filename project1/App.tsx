import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, CheckCircle, Code, Users, Map, Briefcase, MessageSquare } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ATSChecker from './pages/ATSChecker';
import CodingPractice from './pages/CodingPractice';
import Mentoring from './pages/Mentoring';
import Roadmap from './pages/Roadmap';
import Jobs from './pages/Jobs';
import GroupDiscussion from './pages/GroupDiscussion';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }: any) => (
  <button
    onClick={() => onClick(path)}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = (path: string) => {
    window.location.hash = path;
    setIsSidebarOpen(false);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CheckCircle, label: 'ATS Checker', path: '/ats-checker' },
    { icon: Code, label: 'Coding Practice', path: '/coding' },
    { icon: Users, label: 'Mentoring', path: '/mentoring' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: MessageSquare, label: 'Group Discussion', path: '/gd' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center space-x-2 text-brand-600">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
            <span className="text-xl font-bold text-gray-900">VidyaMitra</span>
          </div>
          <button 
            className="ml-auto lg:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              active={location.pathname === item.path}
              onClick={navigate}
            />
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-2">
            <img 
              src="https://picsum.photos/40/40" 
              alt="User" 
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Alex Student</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="lg:hidden p-2 -ml-2 text-gray-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4">
            <h1 className="text-lg font-semibold text-gray-800">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 hover:text-brand-600 font-medium">Upgrade to Pro</button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/coding" element={<CodingPractice />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/gd" element={<GroupDiscussion />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;