"use client";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { SignUp } from '@clerk/nextjs';

export default function AddPodcastPage() {
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setProgress(0);
    // Simulate loading
    let pct = 0;
    const interval = setInterval(() => {
      pct += 10;
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 80);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/10">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
        <div className="mb-10 mt-16 w-full">
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Join Podcast2Newsletter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 text-center">
            Create your free account and start turning podcasts into beautiful newsletters.
          </p>
        </div>
        <div className="w-full">
          <SignUp
            appearance={{
              elements: {
                card: 'shadow-xl rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white',
                headerTitle: 'text-2xl font-bold text-center',
                headerSubtitle: 'text-center text-gray-500 dark:text-gray-400',
                formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold',
                socialButtonsBlockButton: 'rounded-lg',
                formFieldInput: 'rounded-lg',
              },
              variables: {
                colorPrimary: '#9333ea',
                colorText: '#111',
                fontFamily: 'inherit',
                borderRadius: '1rem',
              },
            }}
            afterSignUpUrl="/add-podcast"
            afterSignInUrl="/add-podcast"
            signInUrl="/sign-in"
          />
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
} 