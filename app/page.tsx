import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
      <div className="container mx-auto p-4">
        <SignedIn>
          <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <h1 className="text-2xl font-bold mb-4">Please sign in.</h1>
        </SignedOut>
      </div>
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
