import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Aisel Mamedova`,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All articles
        </Link>

        {/* Header */}
        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <time className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground/65">
              {formatDate(post.date)}
            </time>
            <span className="text-muted-foreground/30">·</span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/[0.06] bg-black/[0.02] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-foreground/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-light leading-tight tracking-tight text-foreground md:text-[2.5rem]">
            {post.title}
          </h1>

          <p className="mt-4 text-[16px] leading-relaxed text-foreground/65 border-l-2 border-black/[0.08] pl-4">
            {post.summary}
          </p>
        </header>

        {/* Divider */}
        <div className="mt-10 border-t border-black/[0.05]" />

        {/* Article content */}
        <section className="mt-10">
          <div className="blog-content max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>

        {/* Footer nav */}
        <div className="mt-16 border-t border-black/[0.05] pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-5 py-2.5 text-[13px] font-medium text-foreground/75 transition-all hover:bg-white hover:text-foreground"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </main>
  )
}
