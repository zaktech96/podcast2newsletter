'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SpotifyIcon } from '../icons/spotify';
import { ApplePodcastsIcon } from '../icons/apple-podcasts';
import { YouTubeIcon } from '../icons/youtube';
import { GooglePodcastsIcon } from '../icons/google-podcasts';
import { RSSIcon } from '../icons/rss';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const platformIcons = [
  { Icon: SpotifyIcon, color: '#1DB954', name: 'Spotify' },
  { Icon: ApplePodcastsIcon, color: '#872EC4', name: 'Apple Podcasts' },
  { Icon: YouTubeIcon, color: '#FF0000', name: 'YouTube' },
  { Icon: GooglePodcastsIcon, color: '#0066D9', name: 'Google Podcasts' },
  { Icon: RSSIcon, color: '#FFA500', name: 'RSS' }
];

export default function HeroSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white dark:from-black dark:to-gray-900 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,40,200,0.08),transparent_25%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,40,200,0.08),transparent_25%)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 pt-32 pb-20 sm:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {/* Badge */}
        <motion.div 
          variants={fadeIn}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm mb-8 shadow-sm"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">✨</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">Turn Podcasts into Revenue</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeIn} className="relative z-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
              Convert Your{" "}
              <br className="hidden sm:block" />
              Podcast Into{" "}
              <br className="hidden sm:block" />
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Premium Newsletters
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-[0.2em] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </h1>

            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl"
              variants={fadeIn}
            >
              Automatically transform podcast episodes into engaging newsletters. Grow your subscriber base and unlock new revenue streams.
            </motion.p>

            <div className="space-y-8 mb-12">
              {[
                {
                  icon: "📈",
                  title: "Grow Your Email List 10x Faster",
                  description: "Convert listeners into subscribers automatically"
                },
                {
                  icon: "⚡️",
                  title: "AI-Powered in Minutes",
                  description: "From audio to newsletter in under 5 minutes"
                },
                {
                  icon: "💰",
                  title: "$49/mo Revenue Per Sub",
                  description: "Premium newsletter monetization"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  className="flex items-center gap-6 group"
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeIn}>
              <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">Works with all major platforms</p>
              <div className="flex flex-wrap gap-6 items-center mb-12">
                {platformIcons.map(({ Icon, color, name }) => (
                  <motion.div 
                    key={name}
                    whileHover={{ scale: 1.1, y: -2 }} 
                    className={`transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 rounded-full p-2`}
                  >
                    <Icon className={`h-8 w-8 text-[${color}]`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeIn}
            >
              <Link 
                href="/get-started"
                className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 items-center gap-2"
              >
                Start Growing Revenue
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
              <Link 
                href="/demo"
                className="inline-flex px-8 py-4 rounded-full bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 font-medium hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 items-center gap-2"
              >
                View Demo
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 blur-3xl opacity-30 rounded-full transform -rotate-6" />
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 backdrop-blur-sm relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Newsletter Preview</h4>
                    <p className="text-gray-500 dark:text-gray-400">Episode #123</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/10 px-4 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                  <span className="text-green-600 dark:text-green-400 font-medium">Live</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Future of AI in Business</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    45 min episode
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    3 min read
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full animate-pulse"/>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-5/6 animate-pulse"/>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-4/5 animate-pulse"/>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { value: '2.4k', label: 'Subscribers', trend: '+12%' },
                    { value: '68%', label: 'Open Rate', trend: '+5%' },
                    { value: '$3.2k', label: 'MRR', trend: '+24%' }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                      <div className="text-xs text-green-500 font-medium mt-1">{stat.trend}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Monthly Growth</span>
                  <span className="text-green-500 font-medium">+24%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
