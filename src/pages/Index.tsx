
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import LiveDemo from '../components/LiveDemo';
import Security from '../components/Security';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      <Features />
      <HowItWorks />
      <LiveDemo />
      <Security />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
