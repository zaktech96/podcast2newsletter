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

export interface VideoMetadata {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  thumbnailUrl?: string;
  channelTitle?: string;
  publishedAt?: string;
} 