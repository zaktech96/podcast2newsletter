'use client';

import { motion, useInView } from 'framer-motion';
import { CheckIcon, StarIcon, ArrowRightIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useRef, useState } from 'react';

const plans = [
  {
    name: 'Free Trial',
    price: '$0',
    originalPrice: null,
    billing: '/14 days',
    description: 'Perfect for trying out our AI-powered newsletter creation',
    features: [
      '2 episodes per month',
      '500 newsletter subscribers',
      'Basic AI summaries',
      'Email support',
      'Standard templates',
      '14-day free trial'
    ],
    limitations: [
      'Limited to 2 episodes',
      'Basic features only',
      'Standard support'
    ],
    cta: 'Start Free Trial',
    popular: false,
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50/50 to-teal-50/50',
    borderGradient: 'from-emerald-200 to-teal-200',
    iconColor: 'text-emerald-600',
    savings: null,
    badge: 'FREE',
    badgeColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    highlight: false
  },
  {
    name: 'Starter',
    price: '$29',
    originalPrice: '$39',
    billing: '/month',
    description: 'Great for podcasters ready to grow their newsletter audience',
    features: [
      '10 episodes per month',
      '2,500 newsletter subscribers',
      'Advanced AI summaries',
      'Priority email support',
      'Custom templates',
      'Basic analytics',
      'Social media integration',
      'Export to multiple formats'
    ],
    limitations: [],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-blue-500 to-indigo-500',
    bgGradient: 'from-blue-50/50 to-indigo-50/50',
    borderGradient: 'from-blue-200 to-indigo-200',
    iconColor: 'text-blue-600',
    savings: '25%',
    badge: 'SAVE 25%',
    badgeColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    highlight: false
  },
  {
    name: 'Professional',
    price: '$79',
    originalPrice: '$99',
    billing: '/month',
    description: 'For growing podcasts ready to monetize their content',
    features: [
      'Unlimited episodes',
      '10,000 newsletter subscribers',
      'Premium AI summaries',
      '24/7 priority support',
      'Advanced analytics',
      'Custom branding',
      'Monetization tools',
      'Multi-language support',
      'A/B testing',
      'Advanced integrations'
    ],
    limitations: [],
    cta: 'Go Professional',
    popular: true,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50/80 to-pink-50/80',
    borderGradient: 'from-purple-300 to-pink-300',
    iconColor: 'text-purple-600',
    savings: '40%',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    originalPrice: '$299',
    billing: '/month',
    description: 'For established podcasts and networks at scale',
    features: [
      'Unlimited everything',
      'Unlimited subscribers',
      'White-label solution',
      'Dedicated success manager',
      'Custom analytics dashboard',
      'API access',
      'Custom integrations',
      'Team collaboration',
      'Advanced security',
      'SLA guarantee',
      'Custom training',
      'Priority feature requests'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50/50 to-red-50/50',
    borderGradient: 'from-orange-200 to-red-200',
    iconColor: 'text-orange-600',
    savings: '50%',
    badge: 'ENTERPRISE',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    highlight: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 1
    }
  }
};

const badgeVariants = {
  initial: { scale: 0, rotate: -15 },
  animate: { 
    scale: 1, 
    rotate: -12,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 25,
      delay: 0.3
    }
  }
};

const priceVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.4
    }
  }
};

function AnimatedPrice({ price, originalPrice, delay = 0 }: { price: string; originalPrice: string | null; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-end gap-3 mb-3">
      <motion.span 
        className="text-6xl font-black bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
        variants={priceVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {price}
      </motion.span>
      {originalPrice && (
        <motion.span 
          className="text-2xl text-gray-400 line-through mb-3 font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: delay / 1000 + 0.5, duration: 0.4 }}
        >
          {originalPrice}
        </motion.span>
      )}
    </div>
  );
}

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="w-full py-40 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-black dark:to-purple-950/30 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] dark:opacity-[0.02]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,40,200,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,20,147,0.06),transparent_40%)]" />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              x: [0, 60, 0],
              y: [0, -80, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 3) * 20}%`
            }}
          >
            <div className={`w-4 h-4 ${i % 2 === 0 ? 'bg-purple-400' : 'bg-pink-400'} rounded-full blur-sm`} />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        ref={ref}
        className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          variants={cardVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-xl mb-10 shadow-lg border border-purple-100/50 dark:border-purple-800/50"
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span 
              className="text-purple-600 text-2xl"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4
              }}
            >
              💎
            </motion.span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg">
              Simple, Transparent Pricing
            </span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tight">
            Start <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Free</span>,
            <br />
            Scale As You <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">Grow</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Begin your podcast-to-newsletter journey with our free trial, then upgrade as your audience grows.
          </p>

          {/* Trust indicators */}
          <motion.div 
            className="flex flex-wrap gap-8 justify-center items-center mt-8 opacity-60"
            variants={cardVariants}
          >
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">14-Day Money Back</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative group ${plan.popular ? 'xl:-mt-8 xl:mb-8 scale-105' : ''}`}
              variants={cardVariants}
              onHoverStart={() => setHoveredPlan(plan.name)}
              onHoverEnd={() => setHoveredPlan(null)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glowing border effect */}
              <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
              
              {/* Badge */}
              {plan.badge && (
                <motion.div 
                  className="absolute -top-4 left-6 right-6 flex justify-center z-10"
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                >
                  <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${plan.badgeColor} ${plan.popular ? 'animate-pulse' : ''}`}>
                    {plan.badge}
                    {plan.popular && <StarIcon className="w-4 h-4 animate-spin" />}
                  </span>
                </motion.div>
              )}

              {/* Card */}
              <motion.div 
                className={`relative h-full bg-gradient-to-br ${plan.bgGradient} dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden`}
                whileHover={{ scale: plan.popular ? 1.02 : 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient}`}
                    animate={{
                      scale: hoveredPlan === plan.name ? [1, 1.1, 1] : 1,
                      rotate: hoveredPlan === plan.name ? [0, 2, 0] : 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredPlan === plan.name ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8">
                    <AnimatedPrice 
                      price={plan.price} 
                      originalPrice={plan.originalPrice}
                      delay={index * 100}
                    />
                    <span className="text-gray-500 dark:text-gray-400">{plan.billing}</span>
                    {plan.savings && (
                      <motion.div 
                        className="mt-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          Save {plan.savings}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 min-h-[280px]">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      >
                        <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                          <CheckIcon className="w-3 h-3 text-white" />
                        </span>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <motion.li 
                        key={limitation} 
                        className="flex items-start gap-3 text-gray-400 dark:text-gray-500"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + (plan.features.length + limitIndex) * 0.05 }}
                      >
                        <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-2 h-2 bg-gray-400 rounded-full" />
                        </span>
                        <span className="text-sm leading-relaxed">{limitation}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.a 
                    href={plan.name === 'Free Trial' ? '/sign-up' : plan.name === 'Enterprise' ? '/contact' : '/pricing'}
                    className={`group w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 text-center relative overflow-hidden ${
                      plan.popular || plan.name === 'Free Trial'
                        ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl`
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {plan.cta}
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    {/* Button shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
