import Features from '@/components/homepage/features'
import { HowItWorks } from '@/components/homepage/how-it-works'
import { PowerfulFeatures } from '@/components/homepage/powerful-features'
import Testimonials from '@/components/homepage/testimonials'
import Pricing from '@/components/homepage/pricing'
import FAQ from '@/components/homepage/faq'
import { CTA } from '@/components/homepage/cta'

export default function Home() {
  return (
    <main className="bg-white dark:bg-black">
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
