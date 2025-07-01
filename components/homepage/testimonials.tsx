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
    <section className="w-full py-32 bg-gradient-to-b from-purple-50/50 via-white to-white dark:from-purple-900/10 dark:via-black dark:to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(120,40,200,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.04),transparent_30%)]" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">🌟</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">Trusted by Top Creators</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-[0.9]">
            Loved by Podcast Creators
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Worldwide
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
            Join thousands of successful podcast creators who have transformed their content into profitable newsletters.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={stagger}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative group"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
              <div className="relative bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-2xl object-cover shadow-lg"
                      priority={index === 0}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly Subscribers</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {testimonial.stats.subscribers}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl shadow-xl backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50"
          variants={fadeInUp}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.value} 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {metric.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 