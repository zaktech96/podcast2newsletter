import Provider from '@/app/provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import AuthWrapper from '@/components/wrapper/auth-wrapper';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';
import { validateConfig } from '@/lib/config-validator';
import { initializeHeaders } from '@/lib/next-headers-safe';

// Initialize headers and validate config
export async function generateMetadata(): Promise<Metadata> {
  await initializeHeaders();
validateConfig();

  return {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Podcast2newsletter',
    template: `%s | Podcast2newsletter`,
  },
  description: 'ai app to summarise podcast to newsletter',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/favicon.png', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/favicon.png' },
  ],
  openGraph: {
    description: 'ai app to summarise podcast to newsletter',
    images: [''],
    url: '',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcast2newsletter',
    description: 'ai app to summarise podcast to newsletter',
    siteId: '',
    creator: '',
    creatorId: '',
    images: [''],
  },
};
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await initializeHeaders();
  validateConfig();

  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </head>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}