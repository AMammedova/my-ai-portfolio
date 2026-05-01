'use client'

import { motion } from 'framer-motion'
import { portfolioData } from '@/lib/portfolio-data'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'

export function ExperienceSection() {
  return (
    <section id="experience" className="relative border-t border-black/[0.04] bg-background px-4 py-24 md:py-36">
      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={blurReveal} className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {portfolioData.ui.experience.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-[2.5rem]">
            {portfolioData.ui.experience.heading}
          </motion.h2>
        </motion.div>

        <div className="relative mt-16 md:pl-6">
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-black/[0.15] via-black/[0.05] to-transparent hidden md:block" />

          <div className="space-y-16">
            {portfolioData.experience.map((exp, idx) => (
              <motion.article
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative md:pl-10"
              >
                <span className="absolute -left-[5px] top-6 size-3 rounded-full border-2 border-background bg-foreground shadow-sm hidden md:block" />
                <div className="group">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-4">
                    <h3 className="text-[1.35rem] font-medium tracking-tight text-foreground">{exp.role}</h3>
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground/70">{exp.period}</p>
                  </div>
                  <p className="text-[15px] font-medium text-foreground/60 mb-5">{exp.company}</p>
                  
                  <p className="text-[15px] leading-relaxed text-foreground/80 mb-6">{exp.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {exp.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-[14px] leading-relaxed text-muted-foreground">
                        <span className="text-foreground/30 mt-1">—</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/[0.04] bg-black/[0.02] px-3 py-1 text-[11px] font-medium tracking-wide text-foreground/60 transition-colors group-hover:bg-black/[0.04]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
