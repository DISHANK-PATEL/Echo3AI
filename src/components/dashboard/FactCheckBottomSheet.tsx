
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Rnd } from 'react-rnd';

interface FactCheckBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  podcast: {
    id: number;
    title: string;
  };
}

interface FactCheckItem {
  id: number;
  claim: string;
  timestamp: string;
  status: 'verified' | 'disputed' | 'unverified';
  details: string;
  sources: string[];
}

const FactCheckBottomSheet: React.FC<FactCheckBottomSheetProps> = ({ isOpen, onClose, podcast }) => {
  const [factChecks, setFactChecks] = useState<FactCheckItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [sheetSize, setSheetSize] = useState({ width: 0, height: 300 });
  const [sheetPosition, setSheetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen && factChecks.length === 0) {
      fetchFactChecks();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Position sheet at bottom of viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setSheetSize(prev => ({ ...prev, width: viewportWidth - 40 }));
      setSheetPosition({
        x: 20,
        y: viewportHeight - sheetSize.height - 20
      });
    }
  }, [isOpen, sheetSize.height]);

  const fetchFactChecks = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFactChecks([
        {
          id: 1,
          claim: "AI will replace 40% of jobs by 2030",
          timestamp: "15:22",
          status: 'disputed',
          details: "While AI will impact many jobs, the 40% figure is disputed by multiple economic studies. Most experts predict 10-25% job displacement with new job creation.",
          sources: ["MIT Technology Review", "Oxford Economics", "World Economic Forum"]
        },
        {
          id: 2,
          claim: "Blockchain technology was invented in 2008",
          timestamp: "22:45",
          status: 'verified',
          details: "The blockchain technology underlying Bitcoin was indeed described in Satoshi Nakamoto's whitepaper published in 2008.",
          sources: ["Bitcoin Whitepaper", "IEEE Computer Society"]
        },
        {
          id: 3,
          claim: "Web3 has over 1 billion active users",
          timestamp: "28:10",
          status: 'unverified',
          details: "Current Web3 user numbers are difficult to verify accurately. Most estimates suggest significantly lower active user counts.",
          sources: ["DappRadar", "Chainalysis"]
        }
      ]);
      setLoading(false);
    }, 1200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disputed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'unverified':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'border-green-500/30 bg-green-500/10';
      case 'disputed':
        return 'border-red-500/30 bg-red-500/10';
      case 'unverified':
        return 'border-yellow-500/30 bg-yellow-500/10';
      default:
        return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleDoubleClick = () => {
    setSheetSize(prev => ({ ...prev, height: 300 }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Resizable Bottom Sheet */}
      <Rnd
        size={sheetSize}
        position={sheetPosition}
        onDragStop={(e, d) => setSheetPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSheetSize({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
          setSheetPosition(position);
        }}
        minWidth={300}
        minHeight={200}
        maxWidth="95vw"
        maxHeight="90vh"
        dragHandleClassName="drag-handle"
        resizeGrid={[20, 20]}
        enableResizing={{
          top: true,
          right: true,
          left: true,
          topRight: true,
          topLeft: true,
          bottom: false, // Disable bottom resize for bottom sheet
          bottomRight: false,
          bottomLeft: false,
        }}
        className="z-50"
        style={{
          border: '1px solid #0ea5e9',
          borderRadius: '12px 12px 0 0',
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
              <h2 className="text-xl font-bold text-teal-300">AI Fact Check</h2>
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
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-3 border border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Skeleton className="w-4 h-4 bg-gray-700" />
                      <Skeleton className="h-4 flex-1 bg-gray-700" />
                      <Skeleton className="w-12 h-6 bg-gray-700" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {factChecks.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-lg transition-all duration-200 ${getStatusColor(item.status)}`}
                  >
                    <div className="p-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(item.status)}
                        <p className="flex-1 text-sm font-medium text-white">{item.claim}</p>
                        <div className="text-xs font-mono text-teal-300 bg-gray-800 px-2 py-1 rounded">
                          {item.timestamp}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(item.id)}
                          className="text-gray-400 hover:text-white p-1"
                        >
                          {expandedItems.has(item.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      {expandedItems.has(item.id) && (
                        <div className="mt-3 pt-3 border-t border-gray-600/50">
                          <p className="text-sm text-gray-300 mb-3">{item.details}</p>
                          <div className="text-xs text-gray-400">
                            <span className="font-medium">Sources: </span>
                            {item.sources.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!loading && factChecks.length > 0 && (
            <div className="px-4 pb-4 text-sm text-gray-400 border-t border-gray-700 pt-2">
              {factChecks.length} fact-check{factChecks.length !== 1 ? 's' : ''} available for this episode
            </div>
          )}
        </div>
      </Rnd>
    </>
  );
};

export default FactCheckBottomSheet;
