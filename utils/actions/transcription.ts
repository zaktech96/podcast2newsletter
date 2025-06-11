'use server';

// @ts-ignore - Type definitions for youtube-transcript are not available
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
  console.log('🚨 SERVER ACTION CALLED - transcribeVideo');
  console.log('🚨 URL:', videoUrl);
  
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    console.log('🚨 Video ID:', videoId);
    
    if (!videoId) {
      return {
        success: false,
        error: 'Invalid YouTube URL. Please provide a valid YouTube video URL or video ID.'
      };
    }

    // Try primary method first
    console.log('🚨 Trying primary method (YoutubeTranscript)...');
    let transcript;
    
    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId);
      console.log('✅ Primary method worked, segments:', transcript?.length || 0);
    } catch (primaryError) {
      console.log('❌ Primary method failed:', String(primaryError));
      
      // Try with English language
      try {
        console.log('🚨 Trying with English language...');
        transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
        console.log('✅ English method worked, segments:', transcript?.length || 0);
      } catch (englishError) {
        console.log('❌ English method failed:', String(englishError));
        
        // For now, let's provide a more helpful error message
        return {
          success: false,
          error: `Unable to fetch transcript for this video. This could be because:
          
• The video doesn't have captions enabled
• The video is private or restricted
• YouTube has blocked transcript access
• The video is too new and captions haven't been generated yet

Try a different video that you know has captions (check by clicking CC on YouTube).`,
          videoId
        };
      }
    }

    if (!transcript || !Array.isArray(transcript) || transcript.length === 0) {
      console.log('❌ Transcript is empty');
      return {
        success: false,
        error: 'No transcript available for this video. The video may not have captions enabled.',
        videoId
      };
    }

    // Format transcript
    console.log('✅ Processing transcript with', transcript.length, 'segments');
    const formattedTranscript = transcript.map(item => ({
      text: item.text?.replace(/\n/g, ' ').trim() || '',
      offset: item.offset || 0,
      duration: item.duration || 0
    }));

    // Create full text version
    const fullText = formattedTranscript.map(item => item.text).join(' ');
    const fullTextWithTimestamps = formatTranscriptWithTimestamps(formattedTranscript);

    // Calculate total duration
    const totalDuration = formattedTranscript.length > 0 
      ? formattedTranscript[formattedTranscript.length - 1].offset + formattedTranscript[formattedTranscript.length - 1].duration
      : 0;

    console.log('✅ Successfully processed transcript');

    return {
      success: true,
      transcript: formattedTranscript,
      fullText: fullTextWithTimestamps,
      videoId,
      duration: totalDuration
    };

  } catch (error) {
    console.error('❌ TRANSCRIPTION ERROR:', error);
    
    let errorMessage = 'Failed to transcribe video. ';
    
    if (error instanceof Error) {
      const errorStr = error.message.toLowerCase();
      if (errorStr.includes('not available') || errorStr.includes('no transcript')) {
        errorMessage += 'No transcript is available for this video.';
      } else if (errorStr.includes('private') || errorStr.includes('unavailable')) {
        errorMessage += 'This video is private or unavailable.';
      } else if (errorStr.includes('disabled')) {
        errorMessage += 'Transcripts are disabled for this video.';
      } else {
        errorMessage += `Error: ${error.message}`;
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