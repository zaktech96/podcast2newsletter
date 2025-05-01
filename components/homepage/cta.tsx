'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function CTA() {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Podcast Content?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of podcast creators who are saving time and growing their audience with AI-powered summaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                Get Started Now →
              </button>
              <button className="px-8 py-4 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-medium rounded-lg transition-colors">
                Schedule a Demo
              </button>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-purple-600">✨</span>
                <h3 className="font-medium text-gray-900 dark:text-white">Free Trial Available</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Try our service with 2 free episode summaries
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-purple-600">💳</span>
                <h3 className="font-medium text-gray-900 dark:text-white">No Credit Card Required</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Start your trial without any commitment
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-purple-600">🔄</span>
                <h3 className="font-medium text-gray-900 dark:text-white">Cancel Anytime</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Flexible monthly plans with no long-term contracts
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 