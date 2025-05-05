'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials: any[] = [
  // All testimonials referencing sarah.jpg, michael.jpg, and emily.jpg have been removed as requested.
];

const metrics = [
  { value: '500K+', label: 'Active Subscribers' },
  { value: '$2.8M+', label: 'Creator Revenue' },
  { value: '45%', label: 'Avg. Open Rate' },
  { value: '12K+', label: 'Podcasts Using Platform' }
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

export default function Testimonials() {
  return (
    <section className="w-full py-32 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(120,40,200,0.08),transparent_25%)]" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">🌟</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">Trusted by Top Creators</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Loved by Podcast Creators
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">Worldwide</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of successful podcast creators who have transformed their content into profitable newsletters.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={stagger}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative group"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
              <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                      priority={index === 0}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Subscribers</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {testimonial.stats.subscribers}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {testimonial.stats.revenue}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm"
          variants={fadeInUp}
        >
          {metrics.map((metric) => (
            <div key={metric.value} className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {metric.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 