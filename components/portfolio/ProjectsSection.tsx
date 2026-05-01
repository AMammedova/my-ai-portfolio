'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioData, type ProjectEntry } from '@/lib/portfolio-data'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export function ProjectsSection() {
  const [selected, setSelected] = useState<ProjectEntry | null>(null)
  const featured = portfolioData.projects.find((p) => p.featured)
  const others = portfolioData.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative border-t border-black/[0.04] bg-background px-4 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={blurReveal} className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {portfolioData.ui.projects.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-[2.5rem]">
            {portfolioData.ui.projects.heading}
          </motion.h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {featured && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(featured)}
              className={cn(
                'group relative overflow-hidden rounded-[2rem] border border-black/[0.05] bg-white/60 p-8 text-left md:col-span-2 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)]',
                'transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgb(0,0,0,0.08)] hover:bg-white/80',
              )}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="max-w-3xl">
                  <span className="inline-flex rounded-full border border-black/[0.06] bg-black/[0.02] px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-foreground/70">
                    {portfolioData.ui.projects.featuredBadge}
                  </span>
                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-foreground md:text-[2rem]">{featured.name}</h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-foreground/75 md:text-[17px]">{featured.summary}</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {featured.technologies.map((t) => (
                  <span key={t} className="rounded-full border border-black/[0.04] bg-white/80 px-3 py-1 text-[11px] font-medium tracking-wide text-foreground/60 transition-colors group-hover:bg-white">
                    {t}
                  </span>
                ))}
              </div>
            </motion.button>
          )}

          {others.map((project, idx) => (
            <motion.button
              key={project.name}
              type="button"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * (idx + 1), ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(project)}
              className="group rounded-3xl border border-black/[0.04] bg-white/40 p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_20px_40px_-15px_rgb(0,0,0,0.05)]"
            >
              <h3 className="text-[1.35rem] font-medium tracking-tight text-foreground">{project.name}</h3>
              <p className="mt-3 line-clamp-3 text-[14px] leading-[1.7] text-foreground/70">{project.summary}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-black/[0.03] px-2.5 py-1 text-[10px] font-medium tracking-wide text-foreground/50 transition-colors group-hover:bg-black/[0.05]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-black/[0.06] bg-background/95 sm:max-w-3xl rounded-3xl p-8">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-light tracking-tight">{selected.name}</DialogTitle>
                <DialogDescription className="text-[15px] leading-relaxed text-foreground/70 mt-4">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-8 mt-8 text-sm">
                <div>
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80">Impact</p>
                  <p className="text-[15px] text-foreground/85">{selected.impact}</p>
                </div>
                <div>
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80">Highlights</p>
                  <ul className="space-y-3 text-[14px] leading-relaxed text-foreground/80">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="text-foreground/30 mt-1">—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-black/[0.04]">
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((t) => (
                      <span key={t} className="rounded-full border border-black/[0.06] bg-black/[0.02] px-3 py-1.5 text-[12px] text-foreground/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
