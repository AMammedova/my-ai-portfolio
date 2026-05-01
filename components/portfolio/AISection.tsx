'use client'

import { portfolioData } from '@/lib/portfolio-data'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'

export function AISection() {
  const scrollToHero = () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="ai-assistant"
      className="relative border-t border-black/[0.04] bg-background px-4 py-24 md:py-36"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={blurReveal} className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {portfolioData.ui.ai.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-[2.5rem]">
            {portfolioData.ui.ai.heading}
          </motion.h2>
          
          <motion.div variants={fadeUp} className="mt-12 text-left bg-white/60 p-8 md:p-12 rounded-[2rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <p className="text-[15px] leading-[1.8] text-foreground/80 md:text-[16px]">
              {portfolioData.aiTransition.journey}
            </p>
            <p className="mt-6 text-[15px] leading-[1.8] text-foreground/70 italic">
              "{portfolioData.aiTransition.motivation}"
            </p>
            
            <div className="mt-10 pt-8 border-t border-black/[0.04]">
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80 mb-6">
                {portfolioData.ui.ai.focusLabel}
              </p>
              <ul className="space-y-4">
                {portfolioData.aiTransition.currentFocus.map((item) => (
                  <li key={item} className="flex gap-4 text-[14px] md:text-[15px] text-foreground/75 items-center">
                    <span className="h-px w-4 bg-black/10 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.button
            variants={fadeUp}
            type="button"
            onClick={scrollToHero}
            className="mt-16 rounded-full border border-black/10 bg-white/50 px-6 py-3 text-[13px] font-medium text-foreground/80 transition-all hover:bg-white hover:shadow-sm"
          >
            {portfolioData.ui.ai.ctaBackToChat}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
