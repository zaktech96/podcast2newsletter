import VideoTranscriber from '@/components/transcription/video-transcriber';

export default function TranscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-black dark:to-purple-950/30">
      <div className="container mx-auto px-6 py-16">
        <VideoTranscriber />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Video Transcriber | Podcast2Newsletter',
  description: 'Extract transcripts from YouTube videos with timestamps. Perfect for creating newsletters and blog posts.',
}; 