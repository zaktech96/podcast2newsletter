'use client';
import config from '@/config';
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { dark } from '@clerk/themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Logo = () => (
  <div className="flex items-center justify-center mb-6">
    <Image
      src="/logo.png"
      alt="Logo"
      width={80}
      height={80}
      className="mx-auto mb-2"
      onError={(e) => {
        // fallback to SVG if logo.png is missing
        e.currentTarget.style.display = 'none';
        const svg = document.createElement('div');
        svg.innerHTML = `<svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='40' cy='40' r='40' fill='#10B981'/><text x='50%' y='54%' text-anchor='middle' fill='white' font-size='32' font-family='Arial' dy='.3em'>AI</text></svg>`;
        e.currentTarget.parentNode?.appendChild(svg);
      }}
    />
  </div>
);

export default function SignInPage() {
  const router = useRouter();

  // If auth is disabled, show a message rather than redirecting
  if (!config?.auth?.enabled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-2xl font-bold mb-4">Authentication Disabled</h2>
        <p className="text-center text-gray-500 mb-6">
          Authentication is currently disabled in this environment.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50/30 to-white dark:from-black dark:via-green-950/20 dark:to-black relative overflow-hidden">
      {/* Glassy Card */}
      <div className="relative z-10 w-full max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/30 dark:border-gray-800/60">
        <Logo />
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Sign in to continue your journey with our podcast-to-newsletter AI app.
        </p>
        <SignIn appearance={{ baseTheme: dark }} />
        <div className="mt-6 flex flex-col items-center w-full">
          <span className="text-xs text-gray-400 mb-2">Trusted by 1,000+ creators</span>
          <div className="flex gap-2">
            <img src="/companies/youtube.svg" alt="YouTube" className="h-6" />
            <img src="/companies/spotify.svg" alt="Spotify" className="h-6" />
            <img src="/companies/apple-podcasts.svg" alt="Apple Podcasts" className="h-6" />
          </div>
        </div>
      </div>
      {/* Decorative background dots or pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20%" cy="30%" r="80" fill="#10B981" />
          <circle cx="80%" cy="80%" r="60" fill="#6366F1" />
        </svg>
      </div>
    </div>
  );
}
