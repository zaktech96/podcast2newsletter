'use server';

import { YoutubeTranscript } from 'youtube-transcript-plus';
import { Innertube } from 'youtubei.js';
// @ts-ignore - youtube-captions-scraper may not have types
import { getSubtitles } from 'youtube-captions-scraper';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export interface TranscriptSegment {
  text: string;
  offset: number;
  duration: number;
}

export interface VideoMetadata {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  thumbnailUrl?: string;
  channelTitle?: string;
  publishedAt?: string;
}

export interface VideoSummary {
  title: string;
  keyPoints: string[];
  summary: string;
  actionItems?: string[];
  categories: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedReadTime: string;
}

export interface TranscriptionResult {
  success: boolean;
  transcript?: TranscriptSegment[];
  fullText?: string;
  error?: string;
  videoId?: string;
  title?: string;
  duration?: number;
  metadata?: VideoMetadata;
  method?: 'youtube-transcript-plus' | 'youtubei.js' | 'youtube-captions-scraper' | 'unknown';
  summary?: VideoSummary;
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

// Method 1: Using youtube-transcript-plus (Primary)
async function transcribeWithYoutubeTranscriptPlus(videoId: string): Promise<{
  success: boolean;
  transcript?: TranscriptSegment[];
  error?: string;
}> {
  console.log('🚨 Trying youtube-transcript-plus method...');
  
  try {
    // Try without language first
    let transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    if (!transcript || transcript.length === 0) {
      // Try with English language
      console.log('🚨 Trying with English language...');
      transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
    }

    if (!transcript || transcript.length === 0) {
      return {
        success: false,
        error: 'No transcript found with youtube-transcript-plus'
      };
    }

    const formattedTranscript = transcript.map(item => ({
      text: item.text?.replace(/\n/g, ' ').trim() || '',
      offset: item.offset || 0,
      duration: item.duration || 0
    }));

    console.log('✅ youtube-transcript-plus succeeded with', formattedTranscript.length, 'segments');
    return {
      success: true,
      transcript: formattedTranscript
    };

  } catch (error) {
    console.log('❌ youtube-transcript-plus failed:', String(error));
    return {
      success: false,
      error: `youtube-transcript-plus failed: ${String(error)}`
    };
  }
}

// Method 2: Using youtubei.js (Fallback)
async function transcribeWithYoutubeiJs(videoId: string): Promise<{
  success: boolean;
  transcript?: TranscriptSegment[];
  metadata?: VideoMetadata;
  error?: string;
}> {
  console.log('🚨 Trying youtubei.js method...');
  
  try {
    const youtube = await Innertube.create({ generate_session_locally: true });
    const info = await youtube.getInfo(videoId);
    
    // Extract metadata
    const metadata: VideoMetadata = {
      id: videoId,
      title: info.basic_info.title,
      duration: info.basic_info.duration?.seconds_total ? info.basic_info.duration.seconds_total * 1000 : undefined,
      channelTitle: info.basic_info.channel?.name,
      thumbnailUrl: info.basic_info.thumbnail?.[0]?.url
    };

    console.log('🚨 Got video info, now fetching transcript...');

    try {
      // Get transcript using the correct API method
      const transcriptInfo = await info.getTranscript();
      
      if (!transcriptInfo?.transcript?.content?.body?.initial_segments || 
          transcriptInfo.transcript.content.body.initial_segments.length === 0) {
        return {
          success: false,
          metadata,
          error: 'No transcript segments found'
        };
      }

      const segments = transcriptInfo.transcript.content.body.initial_segments;
      const formattedTranscript = segments.map((segment: any) => ({
        text: segment.snippet?.text?.replace(/\n/g, ' ').trim() || '',
        offset: parseInt(segment.snippet?.start_ms) || 0,
        duration: parseInt(segment.snippet?.duration_ms) || 0
      }));

      console.log('✅ youtubei.js succeeded with', formattedTranscript.length, 'segments');
      console.log('📝 Language:', transcriptInfo.selectedLanguage || 'unknown');
      
      return {
        success: true,
        transcript: formattedTranscript,
        metadata
      };

    } catch (transcriptError) {
      console.log('❌ Transcript fetch failed:', String(transcriptError));
      return {
        success: false,
        metadata,
        error: `No transcript available: ${String(transcriptError)}`
      };
    }

  } catch (error) {
    console.log('❌ youtubei.js failed:', String(error));
    return {
      success: false,
      error: `youtubei.js failed: ${String(error)}`
    };
  }
}

// Method 3: Using youtube-captions-scraper (Third fallback)
async function transcribeWithCaptionsScraper(videoId: string): Promise<{
  success: boolean;
  transcript?: TranscriptSegment[];
  error?: string;
}> {
  console.log('🚨 Trying youtube-captions-scraper method...');
  
  try {
    const captions = await getSubtitles({
      videoID: videoId,
      lang: 'en' // Default to English
    });
    
    if (!captions || captions.length === 0) {
      // Try without language specification
      const captionsAuto = await getSubtitles({
        videoID: videoId
      });
      
      if (!captionsAuto || captionsAuto.length === 0) {
        return {
          success: false,
          error: 'No captions found with youtube-captions-scraper'
        };
      }
      
      const formattedTranscript = captionsAuto.map((caption: any) => ({
        text: caption.text?.replace(/\n/g, ' ').trim() || '',
        offset: Math.round((caption.start || 0) * 1000), // Convert to milliseconds
        duration: Math.round((caption.dur || 0) * 1000) // Convert to milliseconds
      }));

      console.log('✅ youtube-captions-scraper succeeded with', formattedTranscript.length, 'segments (auto)');
      return {
        success: true,
        transcript: formattedTranscript
      };
    }

    const formattedTranscript = captions.map((caption: any) => ({
      text: caption.text?.replace(/\n/g, ' ').trim() || '',
      offset: Math.round((caption.start || 0) * 1000), // Convert to milliseconds
      duration: Math.round((caption.dur || 0) * 1000) // Convert to milliseconds
    }));

    console.log('✅ youtube-captions-scraper succeeded with', formattedTranscript.length, 'segments');
    return {
      success: true,
      transcript: formattedTranscript
    };

  } catch (error) {
    console.log('❌ youtube-captions-scraper failed:', String(error));
    return {
      success: false,
      error: `youtube-captions-scraper failed: ${String(error)}`
    };
  }
}

// Enhanced error message generator
function generateUserFriendlyError(errors: string[], videoId: string): string {
  const errorText = errors.join('; ');
  
  if (errorText.toLowerCase().includes('not available') || 
      errorText.toLowerCase().includes('no transcript') ||
      errorText.toLowerCase().includes('no segments')) {
    return `No transcript is available for this video. This could be because:

• The video doesn't have captions enabled
• Captions are disabled by the creator
• The video is too new and captions haven't been generated yet

Try a different video that has captions enabled (look for the [CC] button on YouTube).`;
  }
  
  if (errorText.toLowerCase().includes('private') || 
      errorText.toLowerCase().includes('unavailable')) {
    return 'This video is private, unavailable, or restricted.';
  }
  
  if (errorText.toLowerCase().includes('rate limit') || 
      errorText.toLowerCase().includes('too many requests')) {
    return 'Rate limit exceeded. Please wait a moment and try again.';
  }
  
  return `Unable to fetch transcript for this video. Multiple methods failed:

${errors.map((error, index) => `${index + 1}. ${error}`).join('\n')}

Please try:
• A different video with captions enabled
• Waiting a few minutes if rate limited
• Checking that the video is public and accessible`;
}

// AI Summary Generation
const summarySchema = z.object({
  title: z.string().describe('A clear, engaging title for the video content'),
  keyPoints: z.array(z.string()).min(3).max(8).describe('3-8 key takeaways or main points from the video'),
  summary: z.string().min(100).max(800).describe('A concise 2-3 paragraph summary of the video content (max 800 characters)'),
  actionItems: z.array(z.string()).optional().describe('Practical action items or next steps mentioned in the video'),
  categories: z.array(z.string()).min(1).max(5).describe('1-5 relevant categories/topics (e.g., Technology, Education, Business)'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('Content difficulty level'),
  estimatedReadTime: z.string().describe('Estimated time to read the summary (e.g., "3 min read")')
});

async function generateVideoSummary(
  transcriptText: string, 
  metadata?: VideoMetadata
): Promise<VideoSummary | null> {
  console.log('🤖 Generating AI summary...');
  
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('❌ OpenAI API key not found, skipping summary generation');
      return null;
    }

    // Prepare the content for summarization
    const videoTitle = metadata?.title || 'Unknown Video';
    const channelName = metadata?.channelTitle || 'Unknown Channel';
    const videoDuration = metadata?.duration ? Math.round(metadata.duration / 60000) : null;
    
    // Truncate transcript if too long (keep first ~4000 chars for context)
    const truncatedTranscript = transcriptText.length > 4000 
      ? transcriptText.substring(0, 4000) + '...[content truncated]'
      : transcriptText;

    const prompt = `Analyze this YouTube video transcript and create a practical, useful summary.

Video Details:
- Title: ${videoTitle}
- Channel: ${channelName}
${videoDuration ? `- Duration: ${videoDuration} minutes` : ''}

Transcript:
${truncatedTranscript}

Create a summary that would be valuable for someone deciding whether to watch the full video or looking for key insights. Focus on:
- Main concepts and key takeaways
- Practical advice or actionable insights
- Important facts or data mentioned
- Skills or knowledge gained
- Any tools, resources, or recommendations mentioned

Make it concise but comprehensive enough to be genuinely useful.

IMPORTANT: Keep the summary under 800 characters while maintaining its usefulness and readability.`;

    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: summarySchema,
      prompt: prompt,
      temperature: 0.3, // Lower temperature for more consistent, factual summaries
    });

    console.log('✅ AI summary generated successfully');
    return result.object;

  } catch (error) {
    console.error('❌ Error generating summary:', error);
    return null;
  }
}

export async function transcribeVideo(videoUrl: string): Promise<TranscriptionResult> {
  console.log('🚨 SERVER ACTION CALLED - transcribeVideo (Enhanced)');
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

    const errors: string[] = [];
    let finalMetadata: VideoMetadata | undefined;

    // Method 1: Try youtube-transcript-plus
    const method1Result = await transcribeWithYoutubeTranscriptPlus(videoId);
    if (method1Result.success && method1Result.transcript) {
      // Success with method 1
      const fullText = method1Result.transcript.map(item => item.text).join(' ');
      const fullTextWithTimestamps = formatTranscriptWithTimestamps(method1Result.transcript);
      
      const totalDuration = method1Result.transcript.length > 0 
        ? method1Result.transcript[method1Result.transcript.length - 1].offset + 
          method1Result.transcript[method1Result.transcript.length - 1].duration
        : 0;

      // 🚨 Block if under 30 minutes
      if (totalDuration < 1800000) {
        return {
          success: false,
          error: 'Podcast/video must be at least 30 minutes long to be processed.'
        };
      }

      console.log('✅ Successfully processed transcript with youtube-transcript-plus');

      // Generate AI summary
      const summary = await generateVideoSummary(fullText, undefined);

      return {
        success: true,
        transcript: method1Result.transcript,
        fullText: fullTextWithTimestamps,
        videoId,
        duration: totalDuration,
        method: 'youtube-transcript-plus',
        summary: summary || undefined
      };
    } else {
      errors.push(method1Result.error || 'youtube-transcript-plus failed');
    }

    // Method 2: Try youtubei.js
    const method2Result = await transcribeWithYoutubeiJs(videoId);
    if (method2Result.success && method2Result.transcript) {
      // Success with method 2
      finalMetadata = method2Result.metadata;
      const fullText = method2Result.transcript.map(item => item.text).join(' ');
      const fullTextWithTimestamps = formatTranscriptWithTimestamps(method2Result.transcript);
      
      const totalDuration = method2Result.transcript.length > 0 
        ? method2Result.transcript[method2Result.transcript.length - 1].offset + 
          method2Result.transcript[method2Result.transcript.length - 1].duration
        : 0;

      // 🚨 Block if under 30 minutes
      if (totalDuration < 1800000) {
        return {
          success: false,
          error: 'Podcast/video must be at least 30 minutes long to be processed.'
        };
      }

      console.log('✅ Successfully processed transcript with youtubei.js');

      // Generate AI summary
      const summary = await generateVideoSummary(fullText, finalMetadata);

      return {
        success: true,
        transcript: method2Result.transcript,
        fullText: fullTextWithTimestamps,
        videoId,
        title: finalMetadata?.title,
        duration: totalDuration,
        metadata: finalMetadata,
        method: 'youtubei.js',
        summary: summary || undefined
      };
    } else {
      errors.push(method2Result.error || 'youtubei.js failed');
      if (method2Result.metadata) {
        finalMetadata = method2Result.metadata;
      }
    }

    // Method 3: Try youtube-captions-scraper
    const method3Result = await transcribeWithCaptionsScraper(videoId);
    if (method3Result.success && method3Result.transcript) {
      // Success with method 3
      const fullText = method3Result.transcript.map(item => item.text).join(' ');
      const fullTextWithTimestamps = formatTranscriptWithTimestamps(method3Result.transcript);
      
      const totalDuration = method3Result.transcript.length > 0 
        ? method3Result.transcript[method3Result.transcript.length - 1].offset + 
          method3Result.transcript[method3Result.transcript.length - 1].duration
        : 0;

      // 🚨 Block if under 30 minutes
      if (totalDuration < 1800000) {
        return {
          success: false,
          error: 'Podcast/video must be at least 30 minutes long to be processed.'
        };
      }

      console.log('✅ Successfully processed transcript with youtube-captions-scraper');

      // Generate AI summary
      const summary = await generateVideoSummary(fullText, finalMetadata);

      return {
        success: true,
        transcript: method3Result.transcript,
        fullText: fullTextWithTimestamps,
        videoId,
        duration: totalDuration,
        metadata: finalMetadata,
        method: 'youtube-captions-scraper' as const,
        summary: summary || undefined
      };
    } else {
      errors.push(method3Result.error || 'youtube-captions-scraper failed');
    }

    // All methods failed
    console.log('❌ All transcription methods failed');
    
    return {
      success: false,
      error: generateUserFriendlyError(errors, videoId),
      videoId,
      metadata: finalMetadata
    };

  } catch (error) {
    console.error('❌ TRANSCRIPTION ERROR:', error);
    
    let errorMessage = 'Failed to transcribe video. ';
    
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
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
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
} 