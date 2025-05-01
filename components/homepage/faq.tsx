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
    <section className="w-full py-32 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(120,40,200,0.08),transparent_25%)]" />
      
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm mb-8 shadow-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">❓</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">Common Questions</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about our AI-powered podcast to newsletter platform.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={stagger}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-sm" />
              <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    {openIndex === index ? (
                      <MinusIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <PlusIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
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
          className="mt-16 text-center"
          variants={fadeInUp}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Still have questions? We're here to help.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
