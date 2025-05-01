'use client';

import { motion } from 'framer-motion';

const platforms = [
  {
    name: "Spotify",
    icon: "🎵",
    color: "text-[#1DB954]"
  },
  {
    name: "Apple Podcasts",
    icon: "🎧",
    color: "text-[#872EC4]"
  },
  {
    name: "YouTube",
    icon: "📺",
    color: "text-[#FF0000]"
  },
  {
    name: "Google Podcasts",
    icon: "🎙️",
    color: "text-[#4285F4]"
  },
  {
    name: "RSS",
    icon: "📡",
    color: "text-[#FFA500]"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Platforms() {
  return (
    <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8">
      <motion.h3 
        className="text-xl font-semibold text-gray-900 dark:text-white mb-8"
        variants={fadeInUp}
      >
        Works with all major platforms
      </motion.h3>
      <motion.div 
        className="flex flex-wrap gap-8 items-center justify-start"
        variants={fadeInUp}
      >
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            className="flex flex-col items-center gap-2"
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <span className={`text-3xl ${platform.color}`}>{platform.icon}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{platform.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 