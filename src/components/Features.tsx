
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileAudio, Search, CircleCheck, MessageSquare, BookAudio } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: FileAudio,
      title: "Censorship-Resistant Storage",
      description: "IPFS-pinned audio & transcripts ensure your content stays accessible forever, no matter what.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "AI Transcription & Moderation", 
      description: "Whisper + Gemini/OpenAI pipelines provide accurate transcripts with smart content moderation.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageSquare,
      title: "Semantic & Conversational Search",
      description: "Find episodes by topic or ask in natural language. Our AI understands context and meaning.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: CircleCheck,
      title: "Instant Tipping",
      description: "NEAR-based token payments let listeners support creators directly, no NFTs required.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: BookAudio,
      title: "Multilingual Support",
      description: "Real-time translations and transcripts make podcasts accessible to global audiences.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powered by Next-Gen Technology
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the perfect blend of AI intelligence and decentralized infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
