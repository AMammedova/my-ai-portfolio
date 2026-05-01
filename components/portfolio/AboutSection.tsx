'use client'

import { motion } from 'framer-motion'
import { portfolioData } from '@/lib/portfolio-data'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-black/[0.04] bg-background px-4 py-24 md:py-36">
      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={blurReveal} className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {portfolioData.ui.about.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-[2.5rem]">
            {portfolioData.ui.about.heading}
          </motion.h2>
          
          <motion.div variants={fadeUp} className="mt-12 rounded-[2rem] bg-white/60 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/[0.03]">
            <p className="text-[15px] md:text-[17px] leading-[1.8] text-foreground/85 font-normal whitespace-pre-line">
              {portfolioData.about.summary}
            </p>
            {/* <ul className="mt-10 space-y-4">
              {portfolioData.about.highlights.map((h) => (
                <li key={h} className="flex items-baseline gap-4 text-[14px] md:text-[15px] text-foreground/75">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/30" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul> */}

            <div className="mt-14 border-t border-black/[0.04] pt-12">
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80 mb-6">
                {portfolioData.ui.about.educationTitle}
              </p>
              <ul className="space-y-5">
                {portfolioData.education.map((ed) => (
                  <li key={`${ed.school}-${ed.period}`} className="text-[14px] md:text-[15px] text-foreground/80">
                    <p className="font-medium text-foreground/90">{ed.degree}</p>
                    <p className="mt-1 text-muted-foreground/90">{ed.school}</p>
                    <p className="mt-0.5 text-[12px] uppercase tracking-wider text-muted-foreground/70">{ed.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
