
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, X, Upload, Music, Video, Mic, Check, AlertTriangle, Shield, RefreshCw } from 'lucide-react';

interface FactCheckResult {
  id: string;
  statement: string;
  status: 'verified' | 'unverified' | 'flagged';
  details: string;
}

const AddPodcastModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [factCheckResults, setFactCheckResults] = useState<FactCheckResult[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const mockFactCheckResults: FactCheckResult[] = [
    {
      id: '1',
      statement: 'The moon landing was faked',
      status: 'flagged',
      details: 'Multiple scientific sources contradict this claim'
    },
    {
      id: '2',
      statement: 'OpenAI released ChatGPT in 2022',
      status: 'verified',
      details: 'Cross-checked with official announcement dates'
    },
    {
      id: '3',
      statement: 'Climate change affects global temperatures',
      status: 'verified',
      details: 'Supported by NASA and IPCC reports'
    },
    {
      id: '4',
      statement: 'Cryptocurrency will replace all currencies by 2025',
      status: 'unverified',
      details: 'No definitive evidence to support this timeline'
    }
  ];

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          startFactCheck();
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const startFactCheck = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setFactCheckResults(mockFactCheckResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'flagged':
        return <X className="w-5 h-5 text-red-400" />;
      case 'unverified':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'flagged':
        return 'Flagged';
      case 'unverified':
        return 'Unverified';
      default:
        return '';
    }
  };

  const resetModal = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsAnalyzing(false);
    setFactCheckResults([]);
    setIsDragOver(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetModal, 300); // Reset after modal closes
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:scale-105 transform-gpu hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Podcast
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-2 border-teal-400/30 shadow-2xl shadow-teal-400/20 backdrop-blur-md">
        {/* Progress Bar */}
        {isUploading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 overflow-hidden rounded-t-lg">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text flex items-center">
            <Mic className="w-6 h-6 text-teal-400 mr-2" />
            Add New Podcast
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Upload Section */}
          {!uploadedFile && (
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                isDragOver 
                  ? 'border-teal-400 bg-teal-400/10 shadow-2xl shadow-teal-400/20 scale-[1.02]' 
                  : 'border-gray-700 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-800/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-xl shadow-teal-400/30">
                  <Upload className="w-8 h-8 text-black" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isDragOver ? 'Drop your file here' : 'Drop audio/video here or click to upload'}
                </h3>
                
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Music className="w-4 h-4 mr-1" />
                    <span className="text-sm">MP3</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Music className="w-4 h-4 mr-1" />
                    <span className="text-sm">WAV</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Video className="w-4 h-4 mr-1" />
                    <span className="text-sm">MP4</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Video className="w-4 h-4 mr-1" />
                    <span className="text-sm">MOV</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  className="border-teal-400/50 text-teal-400 hover:bg-teal-400/10 hover:border-teal-400"
                >
                  Select File
                </Button>
              </div>

              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-4 left-4 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-6 left-12 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && uploadedFile && (
            <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center space-x-3 mb-4">
                <Music className="w-6 h-6 text-teal-400" />
                <div>
                  <p className="text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm">Uploading...</p>
                </div>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* AI Fact-Check Section */}
          {uploadedFile && !isUploading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Shield className="w-5 h-5 text-teal-400 mr-2" />
                  AI Fact-Check Report
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startFactCheck}
                  disabled={isAnalyzing}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  Re-run Analysis
                </Button>
              </div>

              {isAnalyzing ? (
                <div className="bg-gray-900/80 rounded-xl p-8 border border-gray-700/50 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-300">Analyzing content...</p>
                </div>
              ) : factCheckResults.length > 0 ? (
                <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/50 text-sm font-medium text-gray-300 border-b border-gray-700/50">
                    <div className="col-span-6">Statement / Question</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-4">Details</div>
                  </div>
                  
                  {factCheckResults.map((result, index) => (
                    <div 
                      key={result.id}
                      className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-700/30 last:border-b-0 hover:bg-gray-800/30 transition-colors animate-fade-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="col-span-6 text-white">{result.statement}</div>
                      <div className="col-span-2 flex items-center space-x-2">
                        {getStatusIcon(result.status)}
                        <span className={`text-sm font-medium ${
                          result.status === 'verified' ? 'text-green-400' :
                          result.status === 'flagged' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {getStatusText(result.status)}
                        </span>
                      </div>
                      <div className="col-span-4 text-gray-400 text-sm">{result.details}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Action Buttons */}
              {factCheckResults.length > 0 && (
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  >
                    Publish Podcast
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPodcastModal;
