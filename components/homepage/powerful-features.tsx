'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const features = [
  {
    icon: "⚡",
    title: "AI-Powered Transcription",
    description: "95% accurate transcription with speaker diarization, handling multiple accents and languages with ease.",
    color: "bg-gradient-to-br from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    hoverColor: "hover:from-purple-100 hover:to-purple-200",
    stats: { value: 95, suffix: "%" },
    delay: 0
  },
  {
    icon: "⏱️",
    title: "Time-Saving Summaries",
    description: "Reduce 1-hour episodes to 5-minute reads while preserving key insights and memorable quotes.",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    hoverColor: "hover:from-blue-100 hover:to-blue-200",
    stats: { value: 5, suffix: " min" },
    delay: 0.1
  },
  {
    icon: "🔄",
    title: "Multi-Format Export",
    description: "Generate newsletters, social posts, and blog articles automatically from your podcast content.",
    color: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    hoverColor: "hover:from-emerald-100 hover:to-emerald-200",
    stats: { value: 10, suffix: "+ formats" },
    delay: 0.2
  },
  {
    icon: "📊",
    title: "Engagement Analytics",
    description: "Track content performance with detailed metrics on reader engagement and social sharing.",
    color: "bg-gradient-to-br from-rose-50 to-rose-100",
    iconColor: "text-rose-600",
    borderColor: "border-rose-200",
    hoverColor: "hover:from-rose-100 hover:to-rose-200",
    stats: { value: 300, suffix: "% growth" },
    delay: 0.3
  },
  {
    icon: "✨",
    title: "Smart Highlights",
    description: "AI identifies key moments, quotable segments, and trending topics from your episodes.",
    color: "bg-gradient-to-br from-amber-50 to-amber-100",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200",
    hoverColor: "hover:from-amber-100 hover:to-amber-200",
    stats: { value: 50, suffix: "+ highlights" },
    delay: 0.4
  },
  {
    icon: "📨",
    title: "Newsletter Integration",
    description: "Direct integration with popular email platforms for automated content distribution.",
    color: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    hoverColor: "hover:from-indigo-100 hover:to-indigo-200",
    stats: { value: 25, suffix: "+ platforms" },
    delay: 0.5
  }
];

function CountUp({ end, suffix, duration = 2 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const startValue = 0;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutCubic * (end - startValue) + startValue));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-2xl">
      {count}{suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2, 
    rotate: [0, -10, 10, 0],
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

const cardVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export function PowerfulFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(120,40,200,0.08),transparent_25%)]" />
      
      <motion.div 
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm mb-8 shadow-sm border border-purple-100 dark:border-purple-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="text-purple-600"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              ⚡
            </motion.span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">
              Supercharge Your Content
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for{' '}
            <br className="hidden sm:block" />
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Podcast Creators
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to transform your podcast content into engaging written material that reaches a wider audience.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="relative group"
            >
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className={`relative p-8 rounded-3xl border ${feature.borderColor} ${feature.color} ${feature.hoverColor} hover:border-opacity-50 transition-all duration-500 h-full cursor-pointer overflow-hidden`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-current to-transparent"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 ${feature.iconColor} rounded-full opacity-20`}
                      animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                        opacity: [0, 0.4, 0]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span className={`text-3xl ${feature.iconColor}`}>
                      {feature.icon}
                    </span>
                  </motion.div>

                  {/* Stats */}
                  <div className={`${feature.iconColor} mb-4`}>
                    <CountUp 
                      end={feature.stats.value} 
                      suffix={feature.stats.suffix}
                      duration={2 + index * 0.2}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-6 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${feature.iconColor.replace('text-', 'from-')} to-purple-500 rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(index + 1) * 15}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Creating Today</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 