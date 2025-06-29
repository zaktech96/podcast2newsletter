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
import { testServerAction } from '@/utils/actions/test';
import { YouTubeIcon } from '@/components/icons/youtube';

interface VideoTranscriberProps {
  className?: string;
}

export default function VideoTranscriber({ className = '' }: VideoTranscriberProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleTestServerAction = async () => {
    console.log('🔵 Testing server action...');
    try {
      const result = await testServerAction();
      console.log('🔵 Test result:', result);
      alert('Server action test: ' + result.message);
    } catch (error) {
      console.error('🔴 Test failed:', error);
      alert('Server action test failed: ' + String(error));
    }
  };

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
    <div className={`max-w-4xl mx-auto ${className} relative`}>
      {/* Bold radial gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_10%,rgba(255,0,80,0.12)_0%,rgba(120,40,200,0.10)_40%,transparent_80%)]" />
      {/* Hero Section with Integrated YouTube Icon and Illustration */}
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-between text-center md:text-left mb-10 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm mb-4 border border-purple-100 dark:border-purple-800 text-sm font-semibold text-purple-700 dark:text-purple-200">
            <PlayIcon className="w-5 h-5 text-purple-600" />
            YouTube Video Transcriber
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
            Extract Transcripts from
            <span className="inline-flex items-center">
              Y
              <span className="inline-block align-middle mx-0.5">
                <YouTubeIcon className="w-8 h-8 text-[#FF0000] drop-shadow-lg" />
              </span>
              uTube
            </span>
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent ml-2">Videos</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Convert any YouTube video into text with timestamps. Perfect for newsletters, blog posts, or study materials.
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <VideoToTextIllustration />
        </div>
      </motion.div>

      {/* Spotlight Input/CTA Card */}
      <motion.form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 px-6 py-8 mb-6 flex flex-col items-center transition-transform duration-200 hover:scale-[1.025] focus-within:ring-4 focus-within:ring-pink-200 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute -inset-1 rounded-3xl pointer-events-none bg-gradient-to-br from-pink-200/40 via-purple-200/40 to-transparent blur-lg opacity-60" />
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center z-10">
          <div className="flex-1 relative w-full">
            <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube URL here (e.g., https://youtube.com/watch?v=...)"
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/95 dark:bg-gray-800/95 text-gray-900 dark:text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800 transition-all duration-300"
              disabled={isLoading}
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading || !videoUrl.trim()}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 animate-pulse"
            whileHover={{ scale: 1.08, rotate: -2 }}
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
        <div className="w-full text-left mt-2 z-10">
          <button
            type="button"
            className="text-xs text-purple-700 dark:text-purple-300 hover:underline mt-1 flex items-center gap-1"
            onClick={() => setVideoUrl('https://www.youtube.com/watch?v=G7KNmW9a75Y')}
            tabIndex={-1}
          >
            <PlayIcon className="w-4 h-4" /> Try an example video
          </button>
        </div>
      </motion.form>

      {/* Animated Sample Output Preview (if no result) */}
      {!result && !isLoading && (
        <motion.div
          className="mx-auto max-w-2xl mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800 shadow relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-gray-500">Sample Output</span>
          </div>
          <TypewriterText text={`[00:00] Welcome to the future of podcasting!\n[00:12] In this episode, we explore how AI is changing the world.\n[01:05] Stay tuned for more insights and tips.`} />
        </motion.div>
      )}

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

      {/* Features Section */}
      <motion.div
        className="mt-10 mb-2 px-2 py-10 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800 shadow flex flex-col md:flex-row gap-8 justify-center items-stretch relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-2xl opacity-30" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-2xl opacity-30" />
        <div className="flex-1 flex flex-col items-center text-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-full p-4 mb-3 shadow-lg border-2 border-purple-200 dark:border-purple-800">
            <ClockIcon className="w-7 h-7 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-1 text-purple-700 dark:text-purple-300">Timestamped Text</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Get accurate timestamps for every segment of the transcript</p>
        </div>
        <div className="flex-1 flex flex-col items-center text-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-full p-4 mb-3 shadow-lg border-2 border-pink-200 dark:border-pink-800">
            <DocumentTextIcon className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="font-semibold text-lg mb-1 text-pink-700 dark:text-pink-300">Clean Formatting</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Properly formatted text ready for newsletters and blog posts</p>
        </div>
        <div className="flex-1 flex flex-col items-center text-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-full p-4 mb-3 shadow-lg border-2 border-purple-200 dark:border-purple-800">
            <ArrowDownTrayIcon className="w-7 h-7 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-1 text-purple-700 dark:text-purple-300">Easy Export</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Copy to clipboard or download as a text file</p>
        </div>
      </motion.div>
    </div>
  );
}

// TypewriterText component for animated sample output
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  useState(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  });
  return <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">{displayed}</pre>;
}

function VideoToTextIllustration() {
  // Simple SVG: video play button with text lines coming out
  return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
      <rect x="10" y="20" width="80" height="60" rx="12" fill="#fff" stroke="#E5E7EB" strokeWidth="2" />
      <polygon points="38,40 62,55 38,70" fill="#FF0000" />
      <rect x="100" y="30" width="30" height="8" rx="4" fill="#E5E7EB" />
      <rect x="100" y="46" width="24" height="8" rx="4" fill="#E5E7EB" />
      <rect x="100" y="62" width="18" height="8" rx="4" fill="#E5E7EB" />
      <rect x="100" y="78" width="12" height="8" rx="4" fill="#E5E7EB" />
    </svg>
  );
} 