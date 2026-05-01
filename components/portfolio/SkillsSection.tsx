'use client'

import { motion } from 'framer-motion'
import { portfolioData } from '@/lib/portfolio-data'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'

function SkillList({ title, groups }: { title: string; groups: { label: string; items: string[] }[] }) {
  return (
    <motion.div variants={fadeUp} className="flex-1 min-w-0">
      <h3 className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80 mb-8 border-b border-black/[0.04] pb-4">{title}</h3>
      <ul className="space-y-5">
        {groups.map((group, i) => (
          <motion.li
            key={group.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pb-5 border-b border-black/[0.03] last:border-0 last:pb-0"
          >
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-x-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/90 shrink-0 sm:w-[11rem]">
                {group.label}
              </span>
              <p className="text-[15px] font-medium leading-relaxed text-foreground/85 flex-1 min-w-0">
                {group.items.join(' · ')}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function SkillsSection() {
  const { engineering, appliedAi } = portfolioData.skillsPresent

  return (
    <section id="skills" className="relative border-t border-black/[0.04] bg-background px-4 py-24 md:py-36">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={blurReveal} className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {portfolioData.ui.skills.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-[2.5rem]">
            {portfolioData.ui.skills.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/70">
            {portfolioData.ui.skills.blurb}
          </motion.p>
        </motion.div>

        <div className="mt-20 flex flex-col md:flex-row md:items-start gap-16 md:gap-24">
          <SkillList title={portfolioData.ui.skills.engineeringColumnTitle} groups={engineering} />
          <SkillList title={portfolioData.ui.skills.appliedAiColumnTitle} groups={appliedAi} />
        </div>
      </div>
    </section>
  )
}
