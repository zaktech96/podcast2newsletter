'use client';

import { useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { user } = useUser();
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground">
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || 'User'}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <span className="text-sm font-medium">
            {user.fullName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0) || '?'}
          </span>
        )}
      </div>
    </div>
  );
}
