'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FaPodcast, FaRegNewspaper, FaPlusCircle, FaChartBar } from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 dark:from-black dark:via-purple-900/30 dark:to-black p-2 sm:p-4 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Welcome Card */}
        <div className="rounded-3xl shadow-2xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 p-4 sm:p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome{user?.firstName ? `, ${user.firstName}` : ''}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-base sm:text-lg">
            Manage your podcasts and newsletters with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center mt-4">
            <Link href="/add-podcast" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto">
              <FaPlusCircle /> Add Podcast
            </Link>
            <Link href="/dashboard/newsletters" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-700 shadow hover:scale-105 transition-transform w-full sm:w-auto">
              <FaRegNewspaper /> View Newsletters
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-2 sm:mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 p-4 sm:p-6 flex flex-col items-center shadow min-w-0">
            <FaPodcast className="text-2xl sm:text-3xl text-purple-600 dark:text-purple-300 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-200">3</div>
            <div className="text-xs sm:text-sm text-purple-700 dark:text-purple-200">Podcasts</div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 p-4 sm:p-6 flex flex-col items-center shadow min-w-0">
            <FaRegNewspaper className="text-2xl sm:text-3xl text-pink-600 dark:text-pink-300 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-pink-700 dark:text-pink-200">12</div>
            <div className="text-xs sm:text-sm text-pink-700 dark:text-pink-200">Newsletters</div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-4 sm:p-6 flex flex-col items-center shadow min-w-0">
            <FaChartBar className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-300 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-200">1.2k</div>
            <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-200">Subscribers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
