"use client";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AddPodcastPage() {
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: handle podcast link submission (API call, etc)
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/10 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-10 flex flex-col items-center animate-fade-in">
          {!submitted ? (
            <>
              <div className="mb-4">
                <svg width={48} height={48} fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#a78bfa" />
                  <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white text-center">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Add Your Podcast Link</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
                Paste your podcast RSS feed or episode link to get started.
              </p>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <input
                  type="url"
                  required
                  placeholder="https://your-podcast-link.com/feed"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                />
                <span className="text-xs text-gray-400 text-left pl-1">
                  Example: https://feeds.simplecast.com/54nAGcIl
                </span>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg transition-all text-lg"
                >
                  Add Podcast
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center animate-fade-in">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Podcast Added!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">
                Your podcast link was submitted successfully.
              </p>
            </div>
          )}
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