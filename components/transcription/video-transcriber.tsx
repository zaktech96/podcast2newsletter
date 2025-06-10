'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  ClipboardIcon, 
  ArrowDownTrayIcon, 
  CheckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { transcribeVideo, TranscriptionResult } from '@/utils/actions/transcription';

interface VideoTranscriberProps {
  className?: string;
}

export default function VideoTranscriber({ className = '' }: VideoTranscriberProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submitted with URL:', videoUrl);
    
    if (!videoUrl.trim()) {
      console.log('❌ Empty URL, returning early');
      return;
    }

    console.log('⏳ Setting loading state...');
    setIsLoading(true);
    setResult(null);

    try {
      console.log('📞 Calling transcribeVideo function...');
      const transcriptionResult = await transcribeVideo(videoUrl.trim());
      console.log('✅ Transcription result:', transcriptionResult);
      setResult(transcriptionResult);
    } catch (error) {
      console.error('💥 Error in handleSubmit:', error);
      setResult({
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result?.fullText) {
      try {
        await navigator.clipboard.writeText(result.fullText);
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  const downloadTranscript = () => {
    if (result?.fullText) {
      const blob = new Blob([result.fullText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcript-${result.videoId || 'video'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm mb-6 border border-purple-100 dark:border-purple-800">
          <PlayIcon className="w-6 h-6 text-purple-600" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg">
            YouTube Video Transcriber
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
          Extract Transcripts from{' '}
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            YouTube Videos
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert any YouTube video into text with timestamps. Perfect for creating newsletters, blog posts, or study materials.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube URL here (e.g., https://youtube.com/watch?v=...)"
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
              disabled={isLoading}
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={isLoading || !videoUrl.trim()}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Transcribing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                <span>Transcribe</span>
              </div>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {result.success ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Transcription Complete!
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {result.duration && formatDuration(result.duration)}
                          </span>
                          <span className="flex items-center gap-1">
                            <DocumentTextIcon className="w-4 h-4" />
                            {result.transcript?.length || 0} segments
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        onClick={copyToClipboard}
                        className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy to clipboard"
                      >
                        {copiedToClipboard ? (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <ClipboardIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                      </motion.button>
                      
                      <motion.button
                        onClick={downloadTranscript}
                        className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Download transcript"
                      >
                        <ArrowDownTrayIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Transcript Content */}
                <div className="p-6">
                  <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                      {result.fullText}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-red-200 dark:border-red-800 overflow-hidden">
                {/* Error Header */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <ExclamationTriangleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Transcription Failed
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {result.error}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features */}
      <motion.div 
        className="mt-16 grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {[
          {
            icon: ClockIcon,
            title: 'Timestamped Text',
            description: 'Get accurate timestamps for every segment of the transcript'
          },
          {
            icon: DocumentTextIcon,
            title: 'Clean Formatting',
            description: 'Properly formatted text ready for newsletters and blog posts'
          },
          {
            icon: ArrowDownTrayIcon,
            title: 'Easy Export',
            description: 'Copy to clipboard or download as a text file'
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 