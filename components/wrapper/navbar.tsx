'use client';

import Link from 'next/link';
import { UserProfile } from '@/components/user-profile';
import ModeToggle from '@/components/mode-toggle';

export default function Navbar() {
  return (
    <div className="flex items-center min-h-[60px] px-4 border-b">
      <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
        <Link 
          href="/"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Home
        </Link>
        <Link 
          href="/about"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          About
        </Link>
        <Link 
          href="/transcribe"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Transcribe
        </Link>
        <Link 
          href="/contact"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Contact
        </Link>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserProfile />
      </div>
    </div>
  );
}
