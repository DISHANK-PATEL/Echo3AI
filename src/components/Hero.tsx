
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20 backdrop-blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Now Live on Internet Computer Protocol
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in delay-200 leading-tight">
          The Future of
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text block">
            Decentralized Podcasts
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in delay-400 leading-relaxed">
          AI-enhanced transcripts, chapter navigation, moderation, and tipping—without NFTs. 
          Built on IPFS and powered by cutting-edge AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-600">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            Connect Wallet
          </Button>
          <Button 
            variant="ghost" 
            size="lg"
            className="text-white hover:text-blue-300 hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            Learn How It Works
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center animate-fade-in delay-800">
          <div>
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-white/60">Episodes Processed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-white/60">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">5sec</div>
            <div className="text-white/60">Avg Load Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
