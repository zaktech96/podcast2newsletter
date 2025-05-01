'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Upload Your Episode",
    description: "Simply upload your podcast episode or provide an RSS feed link. We support all major podcast formats.",
    icon: "📤",
    color: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our advanced AI analyzes your content, identifying key topics, quotes, and insights with high accuracy.",
    icon: "🤖",
    color: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    number: "03",
    title: "Generate Summary",
    description: "Get a well-structured summary with key takeaways, timestamps, and highlights in your preferred format.",
    icon: "📝",
    color: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400"
  },
  {
    number: "04",
    title: "Share & Engage",
    description: "Distribute your summary across platforms and watch your audience engagement grow.",
    icon: "🚀",
    color: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function HowItWorks() {
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Transform your podcast into engaging content in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <span className={`text-2xl ${step.iconColor}`}>{step.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-500">{step.number}</span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 