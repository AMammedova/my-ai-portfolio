'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { portfolioData } from '@/lib/portfolio-data'
import { blogPreviewPosts } from '@/lib/blog-static'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

const HOME_BLOG_PREVIEW_COUNT = 3

export function BlogSection() {
  const previewPosts = [...blogPreviewPosts]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, HOME_BLOG_PREVIEW_COUNT)
  return (
    <section id="blog" className="relative border-t border-black/[0.04] bg-background px-4 py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_35%_at_18%_12%,oklch(0.97_0.012_248_/_0.5),transparent_72%),radial-gradient(ellipse_46%_30%_at_88%_84%,oklch(0.97_0.008_200_/_0.45),transparent_75%)]"
      />
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          <motion.p variants={blurReveal} className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            {portfolioData.ui.blog.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-[2.35rem]">
            {portfolioData.ui.blog.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-[15px] leading-relaxed text-foreground/66">
            {portfolioData.ui.blog.blurb}
          </motion.p>
        </motion.div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/55 bg-white/52 p-7 shadow-[0_10px_36px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/66 hover:shadow-[0_20px_56px_-18px_rgb(0,0,0,0.14)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent opacity-50"
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/58">
                {formatDate(post.date)}
              </p>
              <h3 className="mt-3 text-[1.16rem] font-medium leading-snug tracking-tight text-foreground/95">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-[13px] leading-[1.78] text-foreground/64">{post.summary}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/[0.04] bg-white/70 px-2.5 py-1 text-[10px] font-medium tracking-wide text-foreground/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground/58 transition-colors group-hover:text-foreground"
              >
                {portfolioData.ui.blog.readMoreLabel}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/62 px-5 py-2.5 text-[13px] font-medium text-foreground/76 shadow-[0_8px_24px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all hover:bg-white hover:text-foreground hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)]"
          >
            {portfolioData.ui.blog.viewAllLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
