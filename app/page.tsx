import HeroSection from '@/components/homepage/hero-section'
import { CTA } from '@/components/homepage/cta'
import { HowItWorks } from '@/components/homepage/how-it-works'

export default function Home() {
  return (
    <main className="bg-white dark:bg-black">
      <HeroSection />
      <HowItWorks />
      <CTA />
    </main>
  )
}
