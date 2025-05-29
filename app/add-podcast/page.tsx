"use client";
import { useState } from "react";

export default function AddPodcastPage() {
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: handle podcast link submission (API call, etc)
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white text-center">Add Your Podcast Link</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">Paste your podcast RSS feed or episode link to get started.</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="url"
            required
            placeholder="https://your-podcast-link.com/feed"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={link}
            onChange={e => setLink(e.target.value)}
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all text-lg"
          >
            {submitted ? "Submitted!" : "Add Podcast"}
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-green-600 font-semibold">Podcast link submitted! (You can now continue onboarding...)</p>
        )}
      </div>
    </div>
  );
} 