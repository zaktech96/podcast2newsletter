'use client';
import { useClerk } from '@clerk/nextjs';

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded mt-2"
      onClick={() => signOut({ redirectUrl: '/' })}
    >
      Sign out
    </button>
  );
}; 