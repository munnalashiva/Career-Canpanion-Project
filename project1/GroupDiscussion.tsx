import React, { useState, useEffect, useRef } from 'react';
import { Users, Mic, MicOff, MessageSquare, Video, PhoneOff, Send, Sparkles, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isAi?: boolean;
}

interface AiFeedback {
  id: string;
  message: string;
  type: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
}

const GroupDiscussion = () => {
  const [isInRoom, setIsInRoom] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [feedbacks, setFeedbacks] = useState<AiFeedback[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInRoom && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isInRoom, timeLeft]);

  // Simulate AI Feedback appearing over time
  useEffect(() => {
    if (!isInRoom) return;
    
    const feedbackInterval = setInterval(() => {
      const mockFeedbacks = [
        { message: "Good articulation on the point about automation.", type: 'positive' },
        { message: "Try to maintain eye contact with the camera.", type: 'neutral' },
        { message: "You interrupted Peer 2 slightly, wait for a pause.", type: 'negative' },
        { message: "Excellent confidence score detected: 88%.", type: 'positive' }
      ];
      const randomFeedback = mockFeedbacks[Math.floor(Math.random() * mockFeedbacks.length)];
      
      setFeedbacks(prev => [
        { id: Date.now().toString(), message: randomFeedback.message, type: randomFeedback.type as any, timestamp: new Date() },
        ...prev.slice(0, 4) // Keep last 5
      ]);
    }, 8000); // Every 8 seconds

    return () => clearInterval(feedbackInterval);
  }, [isInRoom]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setIsInRoom(true);
      // Initial welcome message
      setMessages([
        { id: '1', user: 'System', text: 'Welcome to the room! Topic: Impact of AI.', timestamp: new Date(), isAi: true }
      ]);
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      user: 'You',
      text: inputText,
      timestamp: new Date()
    }]);
    setInputText('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isInRoom) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users size={40} className="text-brand-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GD Practice Lobby</h1>
          <p className="text-gray-500 mb-8">
            Join a random group of 4-6 peers to discuss trending topics. Our AI will analyze your speech for clarity and confidence.
          </p>

          <div className="space-y-4">
             <div className="p-4 bg-gray-50 rounded-lg text-left border-l-4 border-brand-500">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Today's Topic</p>
                <p className="text-gray-900 font-medium">"Impact of AI on Creative Jobs: Tool or Threat?"</p>
             </div>
             
             <button
              onClick={handleJoin}
              disabled={isMatching}
              className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isMatching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Matching Peers...
                </>
              ) : 'Find a Room'}
            </button>
          </div>
          
          <p className="mt-4 text-xs text-gray-400">Avg wait time: 15s</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div>
            <h2 className="font-bold text-white text-sm">Room #8291 • Live Session</h2>
            <p className="text-xs text-gray-400">Topic: AI Impact on Jobs</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 text-white px-3 py-1 rounded-full font-mono font-medium text-sm">
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setIsInRoom(false)}
            className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
            title="Leave Room"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Grid */}
        <div className="flex-1 p-4 flex flex-col relative">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* User Self */}
            <div className="relative bg-gray-800 rounded-xl overflow-hidden border-2 border-brand-500 shadow-lg group">
              <img src="https://picsum.photos/600/400?random=1" className="w-full h-full object-cover opacity-90" alt="Self" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                <div className="text-white font-medium text-sm flex items-center space-x-2">
                  <span>You</span>
                  <Mic size={14} className="text-green-400" />
                </div>
                <div className="bg-brand-600/90 px-2 py-0.5 rounded text-[10px] text-white font-bold">
                  Speaking
                </div>
              </div>
            </div>

            {[2, 3, 4].map((i) => (
              <div key={i} className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <img src={`https://picsum.photos/600/400?random=${i}`} className="w-full h-full object-cover opacity-70" alt={`Peer ${i}`} />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-medium text-sm flex items-center space-x-2">
                    <span>Peer {i}</span>
                    {i % 2 === 0 ? <MicOff size={14} className="text-red-400" /> : <Mic size={14} className="text-green-400" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center space-x-6 shadow-xl z-20">
            <button className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors">
              <Mic size={20} />
            </button>
            <button className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors">
              <Video size={20} />
            </button>
            <div className="h-8 w-px bg-gray-600"></div>
            <button className="p-3 bg-brand-600 rounded-full text-white hover:bg-brand-700 transition-colors shadow-lg shadow-brand-900/50">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
           {/* AI Feedback Stream */}
           <div className="h-1/3 border-b border-gray-700 p-4 bg-gray-800/50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                 <Sparkles size={12} className="mr-2 text-yellow-400" />
                 AI Real-time Feedback
              </h3>
              <div className="space-y-3 overflow-y-auto max-h-full pr-1">
                 {feedbacks.map(fb => (
                    <div key={fb.id} className={`p-3 rounded-lg border text-xs animate-fade-in
                       ${fb.type === 'positive' ? 'bg-green-500/10 border-green-500/20 text-green-200' : 
                         fb.type === 'negative' ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-blue-500/10 border-blue-500/20 text-blue-200'}
                    `}>
                       <div className="flex items-start">
                          <AlertCircle size={12} className="mt-0.5 mr-2 shrink-0 opacity-70" />
                          <span>{fb.message}</span>
                       </div>
                    </div>
                 ))}
                 {feedbacks.length === 0 && <p className="text-gray-600 text-xs italic text-center mt-4">Listening for feedback...</p>}
              </div>
           </div>

           {/* Chat */}
           <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 border-b border-gray-700 bg-gray-800">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Group Chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                 {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                       <span className="text-[10px] text-gray-500 mb-1">{msg.user}</span>
                       <div className={`px-3 py-2 rounded-lg max-w-[90%] text-sm ${
                          msg.isAi ? 'bg-yellow-500/10 text-yellow-200 border border-yellow-500/20' :
                          msg.user === 'You' ? 'bg-brand-600 text-white' : 'bg-gray-700 text-gray-200'
                       }`}>
                          {msg.text}
                       </div>
                    </div>
                 ))}
                 <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700 bg-gray-800">
                 <div className="relative">
                    <input 
                       type="text" 
                       value={inputText}
                       onChange={(e) => setInputText(e.target.value)}
                       placeholder="Type a message..."
                       className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-brand-500 placeholder-gray-500"
                    />
                    <button type="submit" className="absolute right-2 top-1.5 text-gray-400 hover:text-white">
                       <Send size={16} />
                    </button>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDiscussion;