
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Mic } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Show widget after 5 seconds or immediately on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Reduced to 1s for demo purposes

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      // Here you would integrate with your AI chat service
      setMessage('');
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Widget Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-black border-2 border-teal-400 rounded-full 
                     shadow-lg shadow-teal-400/30 hover:shadow-teal-400/60 
                     transition-all duration-300 hover:scale-110 hover:rotate-3
                     animate-pulse-glow focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Ask me anything about any podcast"
        >
          {/* Microphone Icon with Chat Bubble */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Mic className="w-6 h-6 text-teal-400 group-hover:text-white transition-colors duration-300" />
              <MessageCircle className="w-4 h-4 text-blue-400 absolute -top-1 -right-1" />
            </div>
          </div>

          {/* Waveform Animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-2 bg-teal-400 animate-bounce delay-0"></div>
              <div className="w-0.5 h-3 bg-teal-400 animate-bounce delay-100"></div>
              <div className="w-0.5 h-2 bg-teal-400 animate-bounce delay-200"></div>
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 pointer-events-none">
            <div className="bg-black/90 text-white text-sm px-3 py-2 rounded-lg 
                            backdrop-blur-sm border border-teal-400/30 whitespace-nowrap
                            shadow-lg shadow-teal-400/20">
              Ask me anything about any podcast
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 
                              border-transparent border-t-black/90"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-80 h-96 bg-black/95 backdrop-blur-md
                   border border-teal-400/50 rounded-2xl shadow-2xl shadow-teal-400/20
                   transition-all duration-500 transform origin-bottom-right
                   ${isOpen 
                     ? 'scale-100 opacity-100 translate-y-0' 
                     : 'scale-0 opacity-0 translate-y-4 pointer-events-none'
                   }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-teal-400/30">
          <div className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-teal-400" />
            <h3 className="text-white font-semibold">Ask Echo3AI</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200
                       hover:bg-white/10 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64">
          {/* Welcome Message */}
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full 
                            flex items-center justify-center flex-shrink-0">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-800/60 text-white text-sm p-3 rounded-2xl rounded-tl-md max-w-xs">
              Hi! I'm Echo3AI. Ask me anything about podcasts - summaries, recommendations, 
              or insights from any episode!
            </div>
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-teal-400/30">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-gray-800/60 text-white placeholder-gray-400 
                         border border-gray-600 rounded-full px-4 py-2 text-sm
                         focus:outline-none focus:border-teal-400 transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-10 h-10 bg-teal-400 hover:bg-teal-300 disabled:bg-gray-600
                         rounded-full flex items-center justify-center transition-colors duration-200
                         disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ChatWidget;
