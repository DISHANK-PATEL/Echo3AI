
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CirclePlay, MessageSquare } from 'lucide-react';

const LiveDemo = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience Echo3AI
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Preview the intuitive interface that makes decentralized podcasting simple
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white/60 text-sm ml-4">Echo3AI Dashboard</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CirclePlay className="h-8 w-8 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Tech Talk #42</div>
                        <div className="text-white/60 text-sm">The Future of AI</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-medium">Live</div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="text-white/80 text-sm mb-2">Chapter 3: Machine Learning Basics</div>
                    <div className="bg-blue-500/20 h-2 rounded-full mb-2">
                      <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <div className="text-white/60 text-xs">12:34 / 45:22</div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquare className="h-4 w-4 text-teal-400" />
                      <span className="text-white/80 text-sm">Transcript</span>
                    </div>
                    <div className="text-white/60 text-sm leading-relaxed">
                      "So when we talk about neural networks, we're essentially creating a system that can learn patterns..."
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Interactive Features
              </h3>
              <ul className="space-y-4">
                {[
                  "Click a chapter to jump in the audio instantly",
                  "Real-time transcript with speaker identification", 
                  "Smart search across all episodes",
                  "One-click tipping with crypto wallets",
                  "Multilingual subtitle generation"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-white/80">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Try Live Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
