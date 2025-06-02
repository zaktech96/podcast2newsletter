'use client';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Custom Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join
          </h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Podcast2Newsletter
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Create your free account and start turning podcasts<br />
            into beautiful newsletters.
          </p>
        </div>

        {/* Clerk SignUp Component */}
        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                card: 'shadow-xl rounded-3xl border border-gray-200 bg-white',
                headerTitle: 'text-2xl font-bold text-gray-900',
                headerSubtitle: 'text-gray-500 text-sm',
                formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold h-12',
                socialButtonsBlockButton: 'border border-gray-300 rounded-lg h-12 hover:bg-gray-50',
                formFieldInput: 'border border-gray-300 rounded-lg h-12 focus:border-purple-500 focus:ring-purple-500',
                footer: 'pt-4 border-t border-gray-100',
                footerActionText: 'text-gray-600',
                footerActionLink: 'text-purple-600 hover:text-purple-700 font-semibold',
              },
              variables: {
                colorPrimary: '#9333ea',
                colorText: '#111827',
                fontFamily: 'inherit',
                borderRadius: '0.75rem',
              },
            }}
            afterSignUpUrl="/add-podcast"
            afterSignInUrl="/add-podcast"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
}
