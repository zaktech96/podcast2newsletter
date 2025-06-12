import Features from '@/components/homepage/features'
import { HowItWorks } from '@/components/homepage/how-it-works'
import { PowerfulFeatures } from '@/components/homepage/powerful-features'
import Testimonials from '@/components/homepage/testimonials'
import Pricing from '@/components/homepage/pricing'
import FAQ from '@/components/homepage/faq'
import { CTA } from '@/components/homepage/cta'
import HeroSection from '@/components/homepage/hero-section'

export default function Home() {
  return (
    <main className="bg-white dark:bg-black">
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PowerfulFeatures />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  )
}
