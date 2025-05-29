'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function CTA() {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10">
      <motion.div 
        className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight"
          variants={fadeInUp}
        >
          Ready to <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Transform Your Podcast Content?</span>
        </motion.h2>
        <motion.p
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Join thousands of podcast creators saving time and growing their audience with <span className="font-semibold text-purple-600">AI-powered summaries</span>.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
          variants={fadeInUp}
        >
          <Link href="/sign-up" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg flex items-center justify-center">
              Get Started Now <span className="ml-2">→</span>
            </button>
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-bold rounded-xl shadow-lg transition-all text-lg flex items-center justify-center">
            Schedule a Demo
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
} 