
import React from 'react';
import { ArrowDown } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload to IPFS",
      description: "Pin your MP3 in seconds and send metadata on-chain. Decentralized storage ensures permanent availability.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      title: "AI Processing & Dashboard",
      description: "Transcribe, moderate, chapterize, tag—view results in your comprehensive dashboard with real-time updates.",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Listen & Interact", 
      description: "Stream, search, chat, and tip—all in one place. Your audience can engage like never before.",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Echo3AI Works
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From upload to engagement in three simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} text-transparent bg-clip-text mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowDown className="h-8 w-8 text-white/30 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
