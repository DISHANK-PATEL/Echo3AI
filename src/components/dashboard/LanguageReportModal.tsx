
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Rnd } from 'react-rnd';

interface LanguageReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  podcast: {
    id: number;
    title: string;
  };
}

interface LanguageIssue {
  id: number;
  phrase: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
}

const LanguageReportModal: React.FC<LanguageReportModalProps> = ({ isOpen, onClose, podcast }) => {
  const [report, setReport] = useState<LanguageIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalSize, setModalSize] = useState({ width: 500, height: 400 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen && report.length === 0) {
      fetchLanguageReport();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Center modal in viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setModalPosition({
        x: (viewportWidth - modalSize.width) / 2,
        y: (viewportHeight - modalSize.height) / 2
      });
    }
  }, [isOpen, modalSize]);

  const fetchLanguageReport = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReport([
        {
          id: 1,
          phrase: "Strong language detected",
          timestamp: "12:34",
          severity: 'medium',
          category: 'Profanity'
        },
        {
          id: 2,
          phrase: "Mild inappropriate content",
          timestamp: "25:18",
          severity: 'low',
          category: 'Content Advisory'
        },
        {
          id: 3,
          phrase: "Potentially offensive term",
          timestamp: "31:42",
          severity: 'high',
          category: 'Language'
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <Shield className="w-4 h-4 text-green-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500/30 bg-red-500/10';
      case 'medium':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'low':
        return 'border-green-500/30 bg-green-500/10';
      default:
        return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const handleDoubleClick = () => {
    setModalSize({ width: 500, height: 400 });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Resizable Modal */}
      <Rnd
        size={modalSize}
        position={modalPosition}
        onDragStop={(e, d) => setModalPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, position) => {
          setModalSize({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
          setModalPosition(position);
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
              <h2 className="text-xl font-bold text-teal-300">Language Safety Report</h2>
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
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg">
                    <Skeleton className="w-4 h-4 bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4 bg-gray-700" />
                      <Skeleton className="h-3 w-1/2 bg-gray-700" />
                    </div>
                    <Skeleton className="w-12 h-6 bg-gray-700" />
                  </div>
                ))}
              </div>
            ) : report.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-400 mb-2">All Clear!</h3>
                <p className="text-gray-400">No language safety issues detected in this episode.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {report.map((issue) => (
                  <div
                    key={issue.id}
                    className={`flex items-center space-x-3 p-3 border rounded-lg ${getSeverityColor(issue.severity)}`}
                  >
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <p className="font-medium text-white">{issue.phrase}</p>
                      <p className="text-sm text-gray-400">{issue.category}</p>
                    </div>
                    <div className="text-sm font-mono text-teal-300 bg-gray-800 px-2 py-1 rounded">
                      {issue.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!loading && report.length > 0 && (
            <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
              Found {report.length} potential language safety issue{report.length !== 1 ? 's' : ''} in this episode.
            </div>
          )}
        </div>
      </Rnd>
    </>
  );
};

export default LanguageReportModal;
