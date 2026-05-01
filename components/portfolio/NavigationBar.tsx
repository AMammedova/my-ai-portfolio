'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const navItems = portfolioData.ui.navigation

export function NavigationBar() {
  const [activeId, setActiveId] = useState<string>(navItems[0]?.id ?? 'about')

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight * 0.35
      let current = navItems[0].id
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= mid && rect.bottom >= mid * 0.2) {
          current = item.id
          break
        }
        if (rect.top < mid) current = item.id
      }
      setActiveId(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="pointer-events-auto fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      aria-label="Section navigation"
    >
      {navItems.map((item) => (
        <div key={item.id} className="group relative flex items-center">
          <button
            type="button"
            onClick={() => handleClick(item.id)}
            className="flex size-2.5 items-center justify-center rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-current={activeId === item.id ? 'true' : undefined}
            aria-label={item.label}
          >
            <span
              className={cn(
                'block size-2 rounded-full transition-all duration-300',
                activeId === item.id
                  ? 'scale-110 bg-accent shadow-[0_0_12px_oklch(0.72_0.11_230_/_0.5)]'
                  : 'bg-muted-foreground/35 group-hover:bg-muted-foreground/55',
              )}
            />
          </button>
          <span className="pointer-events-none absolute left-5 whitespace-nowrap rounded-md border border-white/[0.06] bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        </div>
      ))}
    </motion.nav>
  )
}
