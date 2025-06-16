'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';
import { 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UserProfile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  if (!user) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
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
        
        <div className="flex-1 text-left hidden md:block">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {user.fullName || 'User'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user.emailAddresses[0]?.emailAddress}
          </div>
        </div>
        
        <ChevronDownIcon 
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || 'User'}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <span className="text-lg font-medium">
                    {user.fullName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0) || '?'}
                  </span>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {user.fullName || 'User'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user.emailAddresses[0]?.emailAddress}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/user-profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="h-4 w-4" />
              Manage Account
            </Link>
            
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Cog6ToothIcon className="h-4 w-4" />
              Settings
            </Link>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
