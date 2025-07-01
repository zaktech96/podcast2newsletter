'use client';

import { motion } from 'framer-motion';
import { Platforms } from './platforms';

const benefits = [
  {
    icon: "⚡️",
    title: "Save 4+ Hours Per Episode",
    description: "Turn hour-long episodes into 5-minute summaries automatically",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    icon: "💸",
    title: "Monetize Your Content",
    description: "Generate revenue through newsletter subscriptions and ad sharing",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: "🎯",
    title: "Grow Your Audience",
    description: "Reach busy professionals who prefer reading to listening",
    gradient: "from-pink-500 to-orange-500"
  }
];

const fadeInUp = {
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

export default function Features() {
  return (
    <section className="w-full py-32 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-black dark:via-purple-900/10 dark:to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,40,200,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.04),transparent_30%)]" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-md mb-8 shadow-lg border border-purple-200/50 dark:border-purple-800/50"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">✨</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">Transform Your Content</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-[0.9]">
              Unlock the Power of
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  AI-Driven Content
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-[0.15em] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl leading-relaxed">
              Let AI transform your episodes into engaging newsletters. Save time, grow your audience, and create a new revenue stream - all automatically.
            </p>

            <div className="space-y-6 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={benefit.title}
                  className="group relative"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" style={{
                    backgroundImage: `linear-gradient(to right, ${benefit.gradient})`
                  }} />
                  <div className="relative flex items-center gap-6 bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-3xl text-white">{benefit.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <a 
                href="/sign-up" 
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 relative overflow-hidden"
              >
                <span className="relative z-10">Start Free Trial</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a 
                href="/sign-in"
                className="group px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold rounded-2xl transition-all duration-300 flex items-center gap-3 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <span>Learn More</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 blur-3xl opacity-40 rounded-full transform -rotate-6" />
            <motion.div 
              className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md relative border border-gray-200/50 dark:border-gray-800/50"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">📈</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Performance Metrics</h4>
                  <p className="text-gray-500 dark:text-gray-400">Last 30 days</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {[
                  { label: 'Episodes Processed', value: '156', growth: '+12%' },
                  { label: 'Newsletter Subscribers', value: '2.4k', growth: '+28%' },
                  { label: 'Avg. Read Time', value: '4.2m', growth: '+8%' }
                ].map((metric, index) => (
                  <motion.div 
                    key={metric.label} 
                    className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {metric.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="font-medium">{metric.growth}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Platforms />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 