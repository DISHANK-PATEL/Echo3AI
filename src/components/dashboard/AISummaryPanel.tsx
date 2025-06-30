
import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Share2, X } from 'lucide-react';
import { toast } from 'sonner';

interface AISummaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  podcast: {
    id: number;
    title: string;
    creator: string;
    guest: string;
  };
}

const AISummaryPanel: React.FC<AISummaryPanelProps> = ({ isOpen, onClose, podcast }) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: 400, height: 500 });
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 });

  useEffect(() => {
    if (isOpen && !summary) {
      fetchSummary();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setPosition({ x: window.innerWidth - size.width - 20, y: 100 });
    }
  }, [isOpen, size.width]);

  const fetchSummary = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSummary(`This episode of "${podcast.title}" features an engaging conversation between ${podcast.creator} and ${podcast.guest}. 

Key highlights include:
• Discussion on emerging AI technologies and their impact on content creation
• Insights into decentralized podcast platforms and Web3 integration
• Practical applications of blockchain technology in media distribution
• Future trends in digital content monetization

The conversation provides valuable perspectives on how technology is reshaping the podcasting landscape, with specific focus on creator empowerment and audience engagement through innovative platforms.

This episode offers actionable insights for content creators, technology enthusiasts, and anyone interested in the intersection of AI, blockchain, and digital media.`);
      setLoading(false);
    }, 1500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success('Summary copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy summary');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AI Summary: ${podcast.title}`,
          text: summary,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <Rnd
        size={size}
        position={position}
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref) => {
          setSize({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
        }}
        minWidth={300}
        minHeight={200}
        maxWidth={window.innerWidth * 0.9}
        maxHeight={window.innerHeight * 0.9}
        bounds="window"
        className="bg-gray-900 border border-gray-700 text-white rounded-lg shadow-2xl"
        enableResizing={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        resizeHandleStyles={{
          top: { background: '#14b8a6', opacity: 0.3, height: '8px' },
          right: { background: '#14b8a6', opacity: 0.3, width: '8px' },
          bottom: { background: '#14b8a6', opacity: 0.3, height: '8px' },
          left: { background: '#14b8a6', opacity: 0.3, width: '8px' },
          topRight: { background: '#14b8a6', opacity: 0.3, width: '12px', height: '12px' },
          bottomRight: { background: '#14b8a6', opacity: 0.3, width: '12px', height: '12px' },
          bottomLeft: { background: '#14b8a6', opacity: 0.3, width: '12px', height: '12px' },
          topLeft: { background: '#14b8a6', opacity: 0.3, width: '12px', height: '12px' },
        }}
      >
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-teal-300">AI Summary</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">{podcast.title}</p>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-2/3 bg-gray-700" />
                <Skeleton className="h-20 w-full bg-gray-700" />
              </div>
            ) : (
              <>
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {summary}
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-gray-700 mt-4">
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={handleShare}
                    size="sm"
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default AISummaryPanel;
