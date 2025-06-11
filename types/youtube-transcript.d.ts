declare module 'youtube-transcript' {
  interface TranscriptItem {
    text: string;
    offset: number;
    duration: number;
  }

  interface FetchTranscriptOptions {
    lang?: string;
  }

  export const YoutubeTranscript: {
    fetchTranscript(
      videoId: string,
      options?: FetchTranscriptOptions
    ): Promise<TranscriptItem[]>;
  };
} 