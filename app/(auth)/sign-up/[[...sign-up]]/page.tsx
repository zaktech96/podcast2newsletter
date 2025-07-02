'use client';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-black dark:via-purple-900/30 dark:to-black p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Project Branding */}
        <div className="text-center space-y-2">
          <img
            src="/logo.png"
            alt="Podcast2Newsletter Logo"
            className="mx-auto mb-2 h-16 w-16 rounded-full shadow-lg bg-white dark:bg-gray-900"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Podcast2Newsletter
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            Turn your podcasts into beautiful, monetizable newsletters.
          </p>
        </div>
        {/* Clerk SignUp Component */}
        <div className="flex justify-center">
          <SignUp
            afterSignUpUrl="/dashboard"
            afterSignInUrl="/dashboard"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                card: 'shadow-xl rounded-3xl border border-gray-200 bg-white dark:bg-gray-900',
                headerTitle: 'text-2xl font-bold text-gray-900 dark:text-white',
                headerSubtitle: 'text-gray-500 dark:text-gray-400 text-sm',
                formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold h-12',
                socialButtonsBlockButton: 'border border-gray-300 rounded-lg h-12 hover:bg-gray-50',
                formFieldInput: 'border border-gray-300 rounded-lg h-12 focus:border-purple-500 focus:ring-purple-500',
                footer: 'pt-4 border-t border-gray-100 dark:border-gray-800',
                footerActionText: 'text-gray-600 dark:text-gray-400',
                footerActionLink: 'text-purple-600 hover:text-purple-700 font-semibold',
              },
              variables: {
                colorPrimary: '#9333ea',
                colorText: '#111827',
                fontFamily: 'inherit',
                borderRadius: '0.75rem',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
