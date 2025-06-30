
import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import PodcastGrid from '../components/dashboard/PodcastGrid';
import DashboardCursor from '../components/dashboard/DashboardCursor';
import DashboardBackground from '../components/dashboard/DashboardBackground';
import ChatWidget from '../components/dashboard/ChatWidget';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <DashboardBackground />
      <DashboardCursor />
      <div className="relative z-10">
        <DashboardHeader />
        <PodcastGrid />
      </div>
      <ChatWidget />
    </div>
  );
};

export default Dashboard;
