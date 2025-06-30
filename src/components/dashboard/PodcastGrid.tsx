
import React, { useState, useEffect, useCallback } from 'react';
import PodcastTile from './PodcastTile';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for podcasts
const generateMockPodcast = (id: number) => ({
  id,
  title: `Tech Talk Episode ${id}`,
  creator: `Creator ${id}`,
  guest: `Guest Speaker ${id}`,
  genre: ['Technology', 'AI', 'Blockchain', 'Web3', 'Crypto'][Math.floor(Math.random() * 5)],
  description: 'Exploring the future of decentralized technology and its impact on society.',
  thumbnail: `https://images.unsplash.com/photo-${1488590528505 + id}-98d2b5aba04b?w=400&h=300&fit=crop`,
  isLive: Math.random() > 0.8,
  isNew: Math.random() > 0.7,
  duration: `${Math.floor(Math.random() * 60) + 20}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  listeners: Math.floor(Math.random() * 10000) + 100,
});

const PodcastGrid = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
  useEffect(() => {
    const initialPodcasts = Array.from({ length: 12 }, (_, i) => generateMockPodcast(i + 1));
    setPodcasts(initialPodcasts);
  }, []);

  // Load more podcasts
  const loadMorePodcasts = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPodcasts = Array.from({ length: 8 }, (_, i) => 
        generateMockPodcast(podcasts.length + i + 1)
      );
      
      setPodcasts(prev => [...prev, ...newPodcasts]);
      setLoading(false);
      
      // Simulate end of data after 100 items
      if (podcasts.length > 100) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, hasMore, podcasts.length]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMorePodcasts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePodcasts]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
        {podcasts.map((podcast, index) => (
          <PodcastTile 
            key={podcast.id} 
            podcast={podcast} 
            index={index}
          />
        ))}
        
        {/* Loading Skeletons */}
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="animate-fade-in">
            <Skeleton className="w-full h-64 rounded-2xl bg-gray-800/50" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-6 w-3/4 bg-gray-800/50 rounded-lg" />
              <Skeleton className="h-4 w-1/2 bg-gray-800/50 rounded-lg" />
              <Skeleton className="h-4 w-2/3 bg-gray-800/50 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* End of content indicator */}
      {!hasMore && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg font-medium">
            You've reached the end of the universe! 🚀
          </div>
          <div className="text-gray-500 text-sm mt-2">
            But don't worry, new podcasts are being uploaded every minute.
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastGrid;
