'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@radix-ui/react-icons';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    billing: '/month',
    description: 'Perfect for podcasters just getting started with newsletters',
    features: [
      'Up to 5 episodes per month',
      '1,000 newsletter subscribers',
      'Basic AI summaries',
      'Email support',
      'Basic analytics',
      'Standard templates'
    ],
    cta: 'Start Free Trial',
    popular: false,
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    name: 'Professional',
    price: '$79',
    billing: '/month',
    description: 'For growing podcasts ready to monetize their content',
    features: [
      'Up to 20 episodes per month',
      '10,000 newsletter subscribers',
      'Advanced AI summaries',
      'Priority support',
      'Advanced analytics',
      'Custom templates',
      'Monetization tools',
      'Multi-language support'
    ],
    cta: 'Get Started',
    popular: true,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Enterprise',
    price: '$199',
    billing: '/month',
    description: 'For established podcasts and networks',
    features: [
      'Unlimited episodes',
      'Unlimited subscribers',
      'Premium AI features',
      'Dedicated support',
      'Custom analytics',
      'White-label solution',
      'API access',
      'Custom integrations',
      'Team collaboration'
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-pink-500 to-orange-500'
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

export default function Pricing() {
  return (
    <section className="w-full py-32 bg-gradient-to-b from-white to-purple-50 dark:from-black dark:to-purple-900/10 relative overflow-hidden">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">💎</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">Simple, Transparent Pricing</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">Perfect Plan</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Start growing your podcast audience and revenue with our powerful AI newsletter platform.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative group ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                    Most Popular
                    <span className="animate-pulse">✨</span>
                  </span>
                </div>
              )}

              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" style={{
                backgroundImage: `linear-gradient(to right, ${plan.gradient})`
              }} />
              
              <div className="relative h-full bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 mb-1">{plan.billing}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 min-h-[320px]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a 
                  href={plan.popular ? '/sign-up' : plan.name === 'Enterprise' ? '/contact' : '/pricing'}
                  className={`w-full py-4 px-8 rounded-xl font-medium transition-all duration-300 text-center ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          variants={fadeInUp}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 dark:text-gray-400">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-gray-600 dark:text-gray-400">Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <span className="text-gray-600 dark:text-gray-400">Cloud-based platform</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
