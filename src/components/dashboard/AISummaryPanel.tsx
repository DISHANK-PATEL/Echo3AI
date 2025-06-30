
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Share2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Rnd } from 'react-rnd';

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
  const [panelSize, setPanelSize] = useState({ width: 400, height: 500 });
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen && !summary) {
      fetchSummary();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Position panel on the right side of viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setPanelPosition({
        x: viewportWidth - panelSize.width - 20,
        y: Math.max(20, (viewportHeight - panelSize.height) / 2)
      });
    }
  }, [isOpen, panelSize]);

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

  const handleDoubleClick = () => {
    setPanelSize({ width: 400, height: 500 });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Resizable Panel */}
      <Rnd
        size={panelSize}
        position={panelPosition}
        onDragStop={(e, d) => setPanelPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, position) => {
          setPanelSize({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
          setPanelPosition(position);
        }}
        minWidth={300}
        minHeight={200}
        maxWidth="90vw"
        maxHeight="90vh"
        dragHandleClassName="drag-handle"
        resizeGrid={[20, 20]}
        className="z-50"
        style={{
          border: '1px solid #0ea5e9',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          background: '#111827',
          transition: 'box-shadow 0.2s ease-out',
        }}
        resizeHandleStyles={{
          topRight: {
            width: '8px',
            height: '8px',
            background: 'rgba(20, 184, 166, 0.3)',
            border: '1px solid rgba(20, 184, 166, 0.6)',
            borderRadius: '2px',
            cursor: 'ne-resize',
            transition: 'all 0.2s ease',
          },
          topLeft: {
            width: '8px',
            height: '8px',
            background: 'rgba(20, 184, 166, 0.3)',
            border: '1px solid rgba(20, 184, 166, 0.6)',
            borderRadius: '2px',
            cursor: 'nw-resize',
            transition: 'all 0.2s ease',
          },
          bottomRight: {
            width: '8px',
            height: '8px',
            background: 'rgba(20, 184, 166, 0.3)',
            border: '1px solid rgba(20, 184, 166, 0.6)',
            borderRadius: '2px',
            cursor: 'se-resize',
            transition: 'all 0.2s ease',
          },
          bottomLeft: {
            width: '8px',
            height: '8px',
            background: 'rgba(20, 184, 166, 0.3)',
            border: '1px solid rgba(20, 184, 166, 0.6)',
            borderRadius: '2px',
            cursor: 'sw-resize',
            transition: 'all 0.2s ease',
          },
          top: {
            height: '8px',
            background: 'rgba(20, 184, 166, 0.2)',
            cursor: 'n-resize',
            transition: 'all 0.2s ease',
          },
          right: {
            width: '8px',
            background: 'rgba(20, 184, 166, 0.2)',
            cursor: 'e-resize',
            transition: 'all 0.2s ease',
          },
          bottom: {
            height: '8px',
            background: 'rgba(20, 184, 166, 0.2)',
            cursor: 's-resize',
            transition: 'all 0.2s ease',
          },
          left: {
            width: '8px',
            background: 'rgba(20, 184, 166, 0.2)',
            cursor: 'w-resize',
            transition: 'all 0.2s ease',
          },
        }}
        onDoubleClick={handleDoubleClick}
      >
        <div className="h-full flex flex-col text-white">
          {/* Header */}
          <div className="drag-handle border-b border-gray-700 p-4 cursor-move">
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
          
          {/* Content */}
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
                <div className="prose prose-invert prose-sm max-w-none mb-4">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {summary}
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-gray-700">
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
    </>
  );
};

export default AISummaryPanel;
