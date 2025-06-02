'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TITLE_TAILWIND_CLASS } from '@/utils/constants';

export const Footer = () => {
  const navigationItems = [
    {
      title: 'Product',
      items: [
        {
          title: 'Features',
          href: '#',
        },
        {
          title: 'Documentation',
          href: '#',
        },
        {
          title: 'Pricing',
          href: '#',
        },
        {
          title: 'Roadmap',
          href: '#',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          title: 'About',
          href: '#',
        },
        {
          title: 'Blog',
          href: '#',
        },
        {
          title: 'GitHub',
          href: 'https://github.com',
        },
        {
          title: 'Contact',
          href: '#',
        },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <p className="text-sm text-muted-foreground">
            © 2024 Titan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
