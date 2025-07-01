'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

const faqs = [
  {
    question: "How accurate are the AI-generated summaries?",
    answer: "Our AI summaries maintain 98%+ accuracy through advanced natural language processing. Each summary goes through multiple quality checks to ensure key points, context, and nuance are preserved from your podcast episodes."
  },
  {
    question: "How long does it take to generate a newsletter?",
    answer: "Most newsletters are generated within 5 minutes of uploading your episode. The AI processes your content in real-time, allowing you to quickly review and publish the newsletter to your subscribers."
  },
  {
    question: "Can I customize the newsletter templates?",
    answer: "Yes! All plans include customizable templates. Professional and Enterprise plans offer advanced customization options including custom branding, layouts, and CSS styling to match your podcast's unique identity."
  },
  {
    question: "How do you handle multiple languages?",
    answer: "Our platform supports 30+ languages with native-quality translations. The AI maintains context and meaning across languages, helping you reach international audiences effectively."
  },
  {
    question: "What platforms do you integrate with?",
    answer: "We integrate with all major podcast platforms including Spotify, Apple Podcasts, Google Podcasts, and YouTube. We also support direct RSS feed connections and custom API integrations."
  },
  {
    question: "How does the monetization work?",
    answer: "You can monetize through premium newsletter subscriptions, sponsored content, and ad revenue sharing. We provide tools to manage subscriptions, track revenue, and optimize your monetization strategy."
  },
  {
    question: "Is there a limit to subscriber numbers?",
    answer: "Starter plans include up to 1,000 subscribers, Professional up to 10,000, and Enterprise has unlimited subscribers. You can upgrade your plan anytime as your audience grows."
  },
  {
    question: "What kind of support do you offer?",
    answer: "All plans include email support. Professional plans get priority support with 24-hour response times. Enterprise plans receive dedicated account management and technical support."
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-32 bg-gradient-to-b from-purple-50/50 via-white to-white dark:from-purple-900/10 dark:via-black dark:to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(120,40,200,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.04),transparent_30%)]" />
      
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div 
          className="text-center mb-20"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-md mb-8 shadow-lg border border-purple-200/50 dark:border-purple-800/50"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">❓</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">Common Questions</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-[0.9]">
            Frequently Asked
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Questions
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
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our AI-powered podcast to newsletter platform.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-6"
          variants={stagger}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8 }}
            >
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
              <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50">
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between gap-6 group"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-relaxed">
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md ${
                    openIndex === index ? 'rotate-180 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/50 dark:to-pink-800/50' : ''
                  }`}>
                    {openIndex === index ? (
                      <MinusIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <PlusIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          variants={fadeInUp}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Still have questions? We're here to help.
          </p>
          <motion.a 
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Contact Support</span>
            <motion.svg 
              className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
