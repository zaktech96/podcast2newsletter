declare module 'youtube-transcript-plus' {
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

declare module 'youtubei.js' {
  export class Innertube {
    static create(options?: { generate_session_locally?: boolean }): Promise<Innertube>;
    
    getBasicInfo(videoId: string): Promise<{
      basic_info: {
        title: string;
        duration: {
          seconds_total: number;
        };
        channel: {
          name: string;
        };
        thumbnail: Array<{
          url: string;
          width: number;
          height: number;
        }>;
      };
    }>;

    getInfo(videoId: string): Promise<{
      basic_info: {
        title: string;
        duration: {
          seconds_total: number;
        };
        channel: {
          name: string;
        };
        thumbnail: Array<{
          url: string;
          width: number;
          height: number;
        }>;
      };
      getTranscript(): Promise<{
        selectedLanguage: string;
        transcript: {
          content: {
            body: {
              initial_segments: Array<{
                snippet: {
                  text: string;
                  start_ms: string;
                  duration_ms: string;
                };
              }>;
            };
          };
        };
      }>;
    }>;
  }
} 