import { getPortfolioItems } from '@/lib/sheets'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ToolsMarquee from '@/components/ToolsMarquee'
import Showreel from '@/components/Showreel'
import Works from '@/components/Works'
import Services from '@/components/Services'
import WhyMe from '@/components/WhyMe'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

// Revalidate every 5 minutes (matches Google Sheets fetch)
export const revalidate = 300

export default async function Home() {
  const portfolioItems = await getPortfolioItems()

  return (
    <main>
      <Navbar />
      <Hero />
      <ToolsMarquee />
      <Showreel />
      <Works items={portfolioItems} />
      <Services />
      <WhyMe />
      <Testimonials />
      <Contact />
    </main>
  )
}
