'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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

export function CTA() {
  return (
    <section className="w-full py-32 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/50 dark:from-purple-900/20 dark:via-black dark:to-pink-900/10 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,40,200,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.06),transparent_40%)]" />
      
      <motion.div 
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-md mb-8 shadow-lg border border-purple-200/50 dark:border-purple-800/50"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">🚀</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">Start Your Journey Today</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-[0.9]">
            Ready to{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Transform Your Podcast
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-[0.15em] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
            {" "}Content?
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of podcast creators saving time and growing their audience with{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-powered summaries
            </span>
            .
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center"
            variants={fadeInUp}
          >
            <Link href="/sign-up" className="w-full sm:w-auto">
              <motion.button 
                className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 text-lg flex items-center justify-center gap-3 relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started Now</span>
                <motion.span 
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
            
            <motion.button 
              className="group w-full sm:w-auto px-10 py-5 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 text-lg flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Schedule a Demo</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 