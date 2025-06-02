'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render nothing on the server and until the theme is mounted
    return null;
  }

  return (
    <div>
      {theme === 'dark' ? (
        <button
          className="inline-flex items-center justify-center rounded-md h-10 w-10 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          onClick={() => setTheme('light')}
        >
          <Sun className="w-5 h-5" />
          <span className="sr-only">Toggle theme</span>
        </button>
      ) : (
        <button
          className="inline-flex items-center justify-center rounded-md h-10 w-10 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          onClick={() => setTheme('dark')}
        >
          <Moon className="w-5 h-5" />
          <span className="sr-only">Toggle theme</span>
        </button>
      )}
    </div>
  );
}
