import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to portfolio
        </Link>

        <header className="mt-10 border-b border-black/[0.05] pb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">Blog</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">Writing</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/65">
            Deep dives into browser internals, React architecture, and frontend performance.
          </p>
        </header>

        <div className="mt-8 divide-y divide-black/[0.04]">
          {posts.map((post) => (
            <article key={post.slug} className="group py-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                <p className="shrink-0 text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground/55 sm:pt-1.5 sm:w-28">
                  {formatDate(post.date)}
                </p>
                <div className="flex-1">
                  <h2 className="text-[1.25rem] font-medium leading-snug tracking-tight text-foreground transition-opacity group-hover:opacity-75">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground/65">{post.summary}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/[0.03] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-foreground/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
