'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: "⚡",
    title: "AI-Powered Transcription",
    description: "95% accurate transcription with speaker diarization, handling multiple accents and languages with ease.",
    color: "bg-[#F2E6FF]",
    iconColor: "text-[#9333EA]",
    borderColor: "border-purple-100"
  },
  {
    icon: "⏱️",
    title: "Time-Saving Summaries",
    description: "Reduce 1-hour episodes to 5-minute reads while preserving key insights and memorable quotes.",
    color: "bg-[#E6F0FF]",
    iconColor: "text-[#3B82F6]",
    borderColor: "border-blue-100"
  },
  {
    icon: "🔄",
    title: "Multi-Format Export",
    description: "Generate newsletters, social posts, and blog articles automatically from your podcast content.",
    color: "bg-[#E6FFF2]",
    iconColor: "text-[#10B981]",
    borderColor: "border-green-100"
  },
  {
    icon: "📊",
    title: "Engagement Analytics",
    description: "Track content performance with detailed metrics on reader engagement and social sharing.",
    color: "bg-[#FFE6E6]",
    iconColor: "text-[#EF4444]",
    borderColor: "border-red-100"
  },
  {
    icon: "✨",
    title: "Smart Highlights",
    description: "AI identifies key moments, quotable segments, and trending topics from your episodes.",
    color: "bg-[#F2E6FF]",
    iconColor: "text-[#8B5CF6]",
    borderColor: "border-purple-100"
  },
  {
    icon: "📨",
    title: "Newsletter Integration",
    description: "Direct integration with popular email platforms for automated content distribution.",
    color: "bg-[#FFF2E6]",
    iconColor: "text-[#F59E0B]",
    borderColor: "border-orange-100"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function PowerfulFeatures() {
  return (
    <section className="w-full py-24 bg-white dark:bg-black">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Podcast Creators
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to transform your podcast content into engaging written material that reaches a wider audience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`p-6 rounded-2xl border ${feature.borderColor} bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 h-full`}>
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`text-2xl ${feature.iconColor}`}>{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 