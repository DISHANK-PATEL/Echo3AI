
import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [size, setSize] = useState({ width: 500, height: 400 });
  const [position, setPosition] = useState({ 
    x: (window.innerWidth - 500) / 2, 
    y: (window.innerHeight - 400) / 2 
  });

  useEffect(() => {
    if (isOpen && report.length === 0) {
      fetchLanguageReport();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setPosition({ 
        x: (window.innerWidth - size.width) / 2, 
        y: (window.innerHeight - size.height) / 2 
      });
    }
  }, [isOpen, size]);

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
    </div>
  );
};

export default LanguageReportModal;
