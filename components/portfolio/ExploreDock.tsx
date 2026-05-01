'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Briefcase, FileDown } from 'lucide-react'
import { usePortfolioChat } from '@/contexts/portfolio-chat-context'
import { portfolioData } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const links = portfolioData.ui.navigation.map(({ id, label }) => ({ id, label }))
const resumeUrl = portfolioData.contact.cvUrl
const hasResume = Boolean(resumeUrl && resumeUrl !== '#')

export function ExploreDock() {
  const [open, setOpen] = useState(false)
  const { recruiterMode, setRecruiterMode } = usePortfolioChat()
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col items-end gap-2 sm:right-6 sm:top-6">
      {/* <motion.button
        type="button"
        onClick={() => setRecruiterMode(!recruiterMode)}
        className={cn(
          'flex max-w-[14rem] items-center gap-2 rounded-full border px-3 py-1.5 text-left text-[10px] font-semibold uppercase leading-snug tracking-widest transition-all duration-300',
          recruiterMode
            ? 'border-black/10 bg-foreground text-background shadow-sm'
            : 'border-transparent bg-black/5 text-foreground/50 hover:bg-black/10 hover:text-foreground',
        )}
        whileTap={{ scale: 0.98 }}
        title={portfolioData.ui.exploreDock.recruiterToggleTitle}
      >
        <Briefcase className="size-3 shrink-0" aria-hidden />
        <span className="truncate">Recruiter</span>
      </motion.button> */}

      <div className="relative" ref={wrapRef}>
        <motion.button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={portfolioData.ui.exploreDock.exploreButtonAriaLabel}
          className="flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-[13px] font-medium text-foreground shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-md"
          whileTap={{ scale: 0.98 }}
        >
          <Compass className="size-4 opacity-70" aria-hidden />
          Explore
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -6, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              aria-label={portfolioData.ui.exploreDock.menuTitle}
              className="absolute right-0 top-12 min-w-[12.5rem] overflow-hidden rounded-2xl border border-black/5 bg-white/90 py-3 shadow-lg backdrop-blur-2xl"
            >
              <p className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                {portfolioData.ui.exploreDock.menuTitle}
              </p>
              <div className="border-b border-black/[0.04] pb-2">
                {links.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => go(l.id)}
                    className="block w-full px-5 py-2 text-left text-[13px] font-medium text-foreground/75 transition-colors hover:bg-black/5 hover:text-foreground"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              {hasResume && (
                <div className="pt-2">
                  <a
                    href={resumeUrl}
                    download="Resume_Aisel.pdf"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-2 px-5 py-2 text-left text-[13px] font-medium text-foreground/75 transition-colors hover:bg-black/5 hover:text-foreground"
                  >
                    <FileDown className="size-4 shrink-0 opacity-60" aria-hidden />
                    {portfolioData.ui.exploreDock.resumeItemLabel}
                  </a>
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
