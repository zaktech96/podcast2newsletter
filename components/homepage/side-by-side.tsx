'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingCTA from './floating-cta';

const features = [
  {
    title: 'AI-Powered Development',
    description: 'Leverage cutting-edge AI tools to accelerate your development process and build smarter applications.',
    icon: '🤖',
  },
  {
    title: 'Modern Stack',
    description: 'Built with Next.js 15, TypeScript, and the latest technologies for optimal performance.',
    icon: '⚡',
  },
  {
    title: 'Production Ready',
    description: 'Fully configured with authentication, payments, database, and deployment ready out of the box.',
    icon: '🚀',
  },
];

export const SideBySide = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Titan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The most comprehensive Next.js boilerplate with everything you need to build and launch your SaaS product quickly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full relative overflow-hidden group">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <FloatingCTA />
    </section>
  );
};
