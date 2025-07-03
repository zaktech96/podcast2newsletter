'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const steps = [
  {
    number: "01",
    title: "Upload Your Episode",
    description: "Simply upload your podcast episode or provide an RSS feed link. We support all major podcast formats.",
    icon: "📤",
    color: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    details: [
      "Drag & drop audio files",
      "Paste YouTube URLs",
      "Connect RSS feeds",
      "Auto-sync new episodes"
    ]
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our advanced AI analyzes your content, identifying key topics, quotes, and insights with high accuracy.",
    icon: "🤖",
    color: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-pink-500",
    details: [
      "Speech-to-text conversion",
      "Key point extraction",
      "Topic identification",
      "Quote highlighting"
    ]
  },
  {
    number: "03",
    title: "Generate Summary",
    description: "Get a well-structured summary with key takeaways, timestamps, and highlights in your preferred format.",
    icon: "📝",
    color: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-red-500",
    details: [
      "Professional formatting",
      "Custom templates",
      "SEO optimization",
      "Brand consistency"
    ]
  },
  {
    number: "04",
    title: "Share & Engage",
    description: "Distribute your summary across platforms and watch your audience engagement grow.",
    icon: "🚀",
    color: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    gradient: "from-green-500 to-emerald-500",
    details: [
      "Email automation",
      "Social media posts",
      "Analytics tracking",
      "Audience growth"
    ]
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
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-black dark:via-gray-900/20 dark:to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,40,200,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.04),transparent_30%)]" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
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
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ⚡
            </motion.span>
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

        {/* Enhanced Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Steps */}
          <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActiveStep(index)}
            >
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" style={{
                backgroundImage: `linear-gradient(to right, ${step.gradient})`
              }} />
                <div className={`relative bg-white/90 dark:bg-gray-900/90 rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-md border-2 ${
                  activeStep === index 
                    ? 'border-purple-500/50 shadow-purple-500/20' 
                    : 'border-gray-200/50 dark:border-gray-800/50'
                }`}>
                <div className="flex items-start gap-6">
                    <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden`}>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          backgroundImage: `linear-gradient(to bottom right, ${step.gradient})`
                        }}
                      />
                      <span className={`text-3xl ${step.iconColor} relative z-10 group-hover:text-white transition-colors duration-300`}>{step.icon}</span>
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
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>
                      
                      {/* Expandable details */}
                      <motion.div
                        initial={false}
                        animate={{ height: activeStep === index ? 'auto' : 0, opacity: activeStep === index ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                          {step.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detail}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.1 }}
                              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                              {detail}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Interactive Preview */}
          <motion.div 
            variants={fadeInUp}
            className="relative lg:sticky lg:top-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 blur-3xl opacity-40 rounded-full transform -rotate-6" />
            <motion.div 
              className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md relative border border-gray-200/50 dark:border-gray-800/50"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">{steps[activeStep]?.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Step {steps[activeStep]?.number}</h4>
                  <p className="text-gray-500 dark:text-gray-400">{steps[activeStep]?.title}</p>
                </div>
              </div>

              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="p-6 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">What happens:</h5>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {steps[activeStep]?.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {steps[activeStep]?.details.map((detail, index) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{detail}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Time to complete</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activeStep === 0 ? '30 seconds' : 
                         activeStep === 1 ? '2-3 minutes' : 
                         activeStep === 2 ? '1-2 minutes' : 'Instant'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 