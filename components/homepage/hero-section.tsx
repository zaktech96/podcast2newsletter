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

const platformIcons = [
  { Icon: SpotifyIcon, color: '#1DB954', name: 'Spotify' },
  { Icon: ApplePodcastsIcon, color: '#872EC4', name: 'Apple Podcasts' },
  { Icon: YouTubeIcon, color: '#FF0000', name: 'YouTube' },
  { Icon: GooglePodcastsIcon, color: '#0066D9', name: 'Google Podcasts' },
  { Icon: RSSIcon, color: '#FFA500', name: 'RSS' }
];

export default function HeroSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FAFAFA] via-white to-purple-50/30 dark:from-black dark:via-gray-900 dark:to-purple-900/20 relative overflow-hidden">
      {/* Simple background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,40,200,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.05),transparent_40%)]" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 pt-32 pb-20 sm:px-6 lg:px-8"
        initial="initial"
        animate="animate"
      >
        {/* Badge */}
        <motion.div 
          variants={fadeIn}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-md mb-8 shadow-lg border border-purple-200/50 dark:border-purple-800/50"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">✨</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">AI-Powered Podcast to Newsletter</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeIn} className="relative z-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-[0.9]">
              Turn Podcasts Into
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Premium Newsletters
              </span>
            </h1>

            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl leading-relaxed"
              variants={fadeIn}
            >
              Automatically transform podcast episodes into engaging newsletters. Grow your subscriber base and unlock new revenue streams with AI-powered content creation.
            </motion.p>

            {/* Simplified features */}
            <div className="space-y-4 mb-12">
              {[
                {
                  icon: "⚡️",
                  title: "AI-Powered in Minutes",
                  description: "From audio to newsletter in under 5 minutes"
                },
                {
                  icon: "💰",
                  title: "Monetize Your Content",
                  description: "Generate revenue through newsletter subscriptions"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  className="flex items-center gap-4"
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center shadow-lg border border-purple-200/50 dark:border-purple-800/50">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Platform icons */}
            <motion.div variants={fadeIn}>
              <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">Works with all major platforms</p>
              <div className="flex flex-wrap gap-4 items-center mb-12">
                {platformIcons.map(({ Icon, color, name }, index) => (
                  <motion.div 
                    key={name}
                    className="p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className={`h-6 w-6 text-[${color}]`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeIn}
            >
              <Link 
                href="/add-podcast"
                className="group inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 items-center gap-3"
              >
                <span>Start Free Trial</span>
                <span>→</span>
              </Link>
              <Link 
                href="/transcribe"
                className="group inline-flex px-8 py-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 text-purple-600 dark:text-purple-400 font-semibold hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 items-center gap-3 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50"
              >
                <span>Try Demo</span>
                <span>↗</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 blur-3xl opacity-40 rounded-full" />
            <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md relative border border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">📈</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Sample Results</h4>
                  <p className="text-gray-500 dark:text-gray-400">From real podcasters</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Time Saved', value: '4+ hours', description: 'per episode' },
                  { label: 'Subscriber Growth', value: '+28%', description: 'monthly average' },
                  { label: 'Revenue Generated', value: '$2.4k', description: 'per month' }
                ].map((metric, index) => (
                  <div 
                    key={metric.label} 
                    className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {metric.value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{metric.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
