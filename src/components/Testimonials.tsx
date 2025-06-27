
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Echo3AI transformed how I distribute my podcast. The AI transcription is incredibly accurate, and knowing my content is censorship-resistant gives me peace of mind.",
      author: "Sarah Chen",
      title: "Tech Entrepreneur & Podcast Host",
      avatar: "SC"
    },
    {
      quote: "The search functionality is game-changing. I can find any discussion about blockchain from months ago in seconds. The tipping feature helps me support my favorite creators directly.",
      author: "Marcus Rodriguez", 
      title: "Crypto Enthusiast & Listener",
      avatar: "MR"
    },
    {
      quote: "As a non-English speaker, the real-time translation feature opened up a whole world of podcasts I couldn't access before. This is the future of inclusive media.",
      author: "Yuki Tanaka",
      title: "International Listener",
      avatar: "YT"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Early Adopters
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join podcasters and listeners who are already experiencing the future of decentralized media
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-4xl text-blue-400 mb-4">"</div>
                  <p className="text-white/80 leading-relaxed italic">
                    {testimonial.quote}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.author}
                    </div>
                    <div className="text-white/60 text-sm">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
