'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, Download, Mail } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'

export function ContactSection() {
  const phone = portfolioData.contact.phone
  const [phoneCopied, setPhoneCopied] = useState(false)

  const copyPhone = useCallback(async () => {
    if (!phone) return
    const text = phone.replace(/\s+/g, ' ').trim()
    try {
      await navigator.clipboard.writeText(text)
      setPhoneCopied(true)
      window.setTimeout(() => setPhoneCopied(false), 2000)
    } catch {
      /* clipboard blocked or unavailable */
    }
  }, [phone])

  const telHref = phone ? `tel:${phone.replace(/\s/g, '')}` : ''
  const email = portfolioData.contact.email
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent('Hello — from your portfolio')}`

  return (
    <section id="contact" className="relative border-t border-black/[0.04] bg-background px-4 py-24 md:py-36 pb-32 md:pb-48">
      <div className="mx-auto max-w-xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={blurReveal} className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {portfolioData.ui.contact.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-[2.5rem]">
            {portfolioData.ui.contact.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-[15px] leading-relaxed text-foreground/70">
            {portfolioData.ui.contact.blurb}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[14px] text-muted-foreground/80"
          >
            <span>{portfolioData.contact.location}</span>
            {phone && (
              <>
                <span className="text-muted-foreground/35" aria-hidden>
                  ·
                </span>
                <a
                  href={telHref}
                  className="text-foreground/75 underline-offset-2 transition-colors hover:text-foreground hover:underline"
                >
                  {phone}
                </a>
                <button
                  type="button"
                  onClick={() => void copyPhone()}
                  aria-label={phoneCopied ? 'Number copied' : 'Copy phone number'}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 text-foreground/55 transition-colors hover:bg-white hover:text-foreground"
                >
                  {phoneCopied ? <Check className="size-3.5 text-emerald-600" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                </button>
                {phoneCopied && (
                  <span className="text-[12px] font-medium text-emerald-600" role="status">
                    Copied
                  </span>
                )}
              </>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col items-center gap-10"
        >
          {/* <div className="flex w-full max-w-md flex-col items-center gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-6 py-3 text-[15px] font-medium text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            >
              <Mail className="size-4 opacity-70" aria-hidden />
              {portfolioData.ui.contact.emailButtonLabel}
            </a>
      
          </div> */}

          <div className="flex items-center justify-center gap-6">
            {portfolioData.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="group flex size-14 items-center justify-center rounded-full border border-black/5 bg-white/50 text-foreground/60 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-foreground hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)]"
              >
                <svg className="size-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  {link.icon === 'linkedin' && (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  )}
                  {link.icon === 'mail' && (
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M4 6l8 5 8-5" />
                  )}
                </svg>
              </a>
            ))}
          </div>

          {portfolioData.contact.cvUrl && portfolioData.contact.cvUrl !== '#' ? (
            <a
              href={portfolioData.contact.cvUrl}
              download="Resume_Aisel.pdf"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-[13px] font-medium text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            >
              <Download className="size-4 opacity-70" aria-hidden />
              {portfolioData.ui.contact.resumeLabel}
            </a>
          ) : (
            <span className="mt-6 text-[12px] font-medium uppercase tracking-[0.1em] text-foreground/35">
              {portfolioData.ui.contact.resumeLabel}
            </span>
          )}
        </motion.div>
      </div>
    </section>
  )
}
