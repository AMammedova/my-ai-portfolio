import 'server-only'

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

export type BlogMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
}

export type BlogPost = BlogMeta & {
  content: string
  html: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

const sortByDateDesc = (posts: BlogMeta[]) =>
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export async function getAllPosts(): Promise<BlogMeta[]> {
  const files = await fs.readdir(BLOG_DIR)

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx?$/, '')
        const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8')
        const { data } = matter(raw)

        return {
          slug,
          title: data.title ?? slug,
          date: data.date ?? '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          summary: data.summary ?? '',
        } satisfies BlogMeta
      }),
  )

  return sortByDateDesc(posts)
}

export async function getLatestPosts(limit = 3): Promise<BlogMeta[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPathMd = path.join(BLOG_DIR, `${slug}.md`)
  const fullPathMdx = path.join(BLOG_DIR, `${slug}.mdx`)
  const filePath = (await fileExists(fullPathMd)) ? fullPathMd : (await fileExists(fullPathMdx) ? fullPathMdx : null)

  if (!filePath) return null

  const raw = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const processed = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content)
  const htmlContent = processed.toString()

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary: data.summary ?? '',
    content,
    html: htmlContent,
  }
}

async function fileExists(target: string): Promise<boolean> {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}
