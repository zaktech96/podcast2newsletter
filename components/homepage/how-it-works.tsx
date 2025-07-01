'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Upload Your Episode",
    description: "Simply upload your podcast episode or provide an RSS feed link. We support all major podcast formats.",
    icon: "📤",
    color: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our advanced AI analyzes your content, identifying key topics, quotes, and insights with high accuracy.",
    icon: "🤖",
    color: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "Generate Summary",
    description: "Get a well-structured summary with key takeaways, timestamps, and highlights in your preferred format.",
    icon: "📝",
    color: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-red-500"
  },
  {
    number: "04",
    title: "Share & Engage",
    description: "Distribute your summary across platforms and watch your audience engagement grow.",
    icon: "🚀",
    color: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    gradient: "from-green-500 to-emerald-500"
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

export function HowItWorks() {
  return (
    <section className="w-full py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-black dark:via-gray-900/20 dark:to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,40,200,0.06),transparent_30%)]" />
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">⚡</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">Simple Process</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-[0.9]">
            How It{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Works
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
            Transform your podcast into engaging content in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="relative group"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" style={{
                backgroundImage: `linear-gradient(to right, ${step.gradient})`
              }} />
              <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-gray-200/50 dark:border-gray-700/50`}>
                    <span className={`text-3xl ${step.iconColor}`}>{step.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 