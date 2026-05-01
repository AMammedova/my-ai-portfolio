'use client'

import { PortfolioChatProvider } from '@/contexts/portfolio-chat-context'
import { AIHeroLanding } from '@/components/portfolio/AIHeroLanding'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { ProjectsSection } from '@/components/portfolio/ProjectsSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { AISection } from '@/components/portfolio/AISection'
import { ContactSection } from '@/components/portfolio/ContactSection'
import { NavigationBar } from '@/components/portfolio/NavigationBar'
import { ExploreDock } from '@/components/portfolio/ExploreDock'

export default function Home() {
  return (
    <PortfolioChatProvider>
      <ExploreDock />
      <NavigationBar />

      <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
        <AIHeroLanding />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AISection />
        <ContactSection />
      </main>
    </PortfolioChatProvider>
  )
}
