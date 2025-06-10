'use server';

import { YoutubeTranscript } from 'youtube-transcript';

export interface TranscriptSegment {
  text: string;
  offset: number;
  duration: number;
}

export interface TranscriptionResult {
  success: boolean;
  transcript?: TranscriptSegment[];
  fullText?: string;
  error?: string;
  videoId?: string;
  title?: string;
  duration?: number;
}

// Extract video ID from various YouTube URL formats
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Format transcript segments into readable text with timestamps
function formatTranscriptWithTimestamps(transcript: TranscriptSegment[]): string {
  return transcript
    .map(segment => {
      const minutes = Math.floor(segment.offset / 60000);
      const seconds = Math.floor((segment.offset % 60000) / 1000);
      const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      return `[${timestamp}] ${segment.text}`;
    })
    .join('\n');
}

export async function transcribeVideo(videoUrl: string): Promise<TranscriptionResult> {
  try {
    console.log('🎬 Starting transcription for:', videoUrl);
    
    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    console.log('📹 Extracted video ID:', videoId);
    
    if (!videoId) {
      return {
        success: false,
        error: 'Invalid YouTube URL. Please provide a valid YouTube video URL or video ID.'
      };
    }

    // Fetch transcript using youtube-transcript
    console.log('🔍 Attempting to fetch transcript...');
    
    // Try multiple approaches to get transcript
    let transcript;
    
    try {
      // First try: English with no language specified (auto-detect)
      console.log('🔍 Trying auto-detect language...');
      transcript = await YoutubeTranscript.fetchTranscript(videoId);
    } catch (error) {
      console.log('⚠️ Auto-detect failed, trying English:', error);
      try {
        // Second try: Explicitly English
        transcript = await YoutubeTranscript.fetchTranscript(videoId, {
          lang: 'en'
        });
      } catch (error2) {
        console.log('⚠️ English failed, trying without options:', error2);
        try {
          // Third try: Just the video ID, no options
          transcript = await YoutubeTranscript.fetchTranscript(videoId, {});
        } catch (error3) {
          console.log('💥 All transcript attempts failed:', error3);
          throw error3;
        }
      }
    }
    
    console.log('📝 Transcript result:', transcript ? `${transcript.length} segments` : 'null');

    if (!transcript || transcript.length === 0) {
      return {
        success: false,
        error: 'No transcript available for this video. The video may not have captions enabled.'
      };
    }

    // Format transcript
    const formattedTranscript = transcript.map(item => ({
      text: item.text.replace(/\n/g, ' ').trim(),
      offset: item.offset,
      duration: item.duration
    }));

    // Create full text version
    const fullText = formattedTranscript.map(item => item.text).join(' ');
    const fullTextWithTimestamps = formatTranscriptWithTimestamps(formattedTranscript);

    // Calculate total duration
    const totalDuration = formattedTranscript.length > 0 
      ? formattedTranscript[formattedTranscript.length - 1].offset + formattedTranscript[formattedTranscript.length - 1].duration
      : 0;

    return {
      success: true,
      transcript: formattedTranscript,
      fullText: fullTextWithTimestamps,
      videoId,
      duration: totalDuration
    };

  } catch (error) {
    console.error('Transcription error:', error);
    
    let errorMessage = 'Failed to transcribe video. ';
    
    if (error instanceof Error) {
      if (error.message.includes('not available')) {
        errorMessage += 'No transcript is available for this video.';
      } else if (error.message.includes('private')) {
        errorMessage += 'This video is private or unavailable.';
      } else if (error.message.includes('disabled')) {
        errorMessage += 'Transcripts are disabled for this video.';
      } else {
        errorMessage += error.message;
      }
    } else {
      errorMessage += 'Please check the video URL and try again.';
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function transcribeMultipleVideos(videoUrls: string[]): Promise<TranscriptionResult[]> {
  const results: TranscriptionResult[] = [];
  
  for (const url of videoUrls) {
    const result = await transcribeVideo(url);
    results.push(result);
    
    // Add a small delay between requests to be respectful to YouTube's servers
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
} 