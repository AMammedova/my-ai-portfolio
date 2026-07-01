import { NextResponse } from 'next/server'
import { z } from 'zod'
import { portfolioData } from '@/lib/portfolio-data'
import { getPortfolioKnowledgeBase } from '@/lib/portfolio-knowledge'

const BodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(24_000),
      }),
    )
    .max(40),
})

export const runtime = 'nodejs'

function parseOpenAIErrorBody(body: string): string {
  const raw = body.slice(0, 1200)
  try {
    const j = JSON.parse(body) as {
      error?: { message?: string; code?: string; type?: string }
    }
    const e = j.error
    if (e?.message) {
      return [e.message, e.code && `code: ${e.code}`, e.type && `type: ${e.type}`].filter(Boolean).join(' — ')
    }
  } catch {
    /* not JSON */
  }
  return raw
}

function chatCompletionsUrl(baseUrl: string): string {
  const b = baseUrl.replace(/\/+$/, '')
  return `${b}/chat/completions`
}

export async function POST(req: Request) {
  /** Never use NEXT_PUBLIC_* for secrets. Prefer PORTFOLIO_LLM_API_KEY; OPENAI_API_KEY kept for compatibility. */
  const apiKey =
    process.env.PORTFOLIO_LLM_API_KEY?.trim() ||
    process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          'Server misconfiguration: set PORTFOLIO_LLM_API_KEY or OPENAI_API_KEY (server-only, not NEXT_PUBLIC).',
      },
      { status: 503 },
    )
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const { messages } = parsed.data
  if (messages.length === 0) {
    return NextResponse.json({ message: 'messages must not be empty.' }, { status: 400 })
  }

  const baseUrl =
    process.env.PORTFOLIO_LLM_BASE_URL?.trim() || 'https://api.openai.com/v1'
  const model =
    process.env.PORTFOLIO_LLM_MODEL?.trim() ||
    process.env.OPENAI_MODEL?.trim() ||
    'gpt-4o-mini'
  const knowledge = getPortfolioKnowledgeBase()
  const grounding = JSON.stringify(portfolioData.assistantGrounding, null, 2)

  const system = `You are the voice of ${portfolioData.fullName} on her personal portfolio website — a frontend engineer who is genuinely curious about the world.

PERSONALITY & VOICE:
Aisel is not a typical "corporate bio" person. She is someone who:
- Finds psychology and philosophy genuinely fascinating — she thinks about why people behave the way they do, what drives motivation, how identity shapes decisions.
- Loves cooking and experimenting with food — trying new cuisines, understanding flavor combinations, discovering local food culture when traveling.
- Is deeply interested in AI trends — not just as a job skill but as something that genuinely excites her about where the world is going.
- Loves to travel and explore new places, cultures, and ways of thinking. Discovery — whether intellectual or geographical — is what energizes her.
- Approaches problems with curiosity first, structure second.

When answering, write in Aisel's voice — direct, warm, a little personal. Not dry, not corporate. If a question touches on topics she cares about (AI trends, psychology, travel, food, learning something new), let that genuine interest come through naturally — but without forcing it.

STRICT RULES:
- Answer ONLY using the knowledge base JSON below for facts about work, projects, companies, timelines, and skills. Do not invent any employer, date, metric, link, or project.
- If something is not in the knowledge base, say the portfolio does not list that detail and suggest what you can discuss.
- Always respond in the same language the user writes in — Azerbaijani, English, or Russian.
- When responding in Azerbaijani: write naturally as a native speaker would speak — fluid, conversational, idiomatic. Do NOT translate word-for-word from English patterns. Use proper Azerbaijani sentence structure and word order. Avoid calques like "bu barədə daha çox məlumat ala bilərsiniz" — write how an educated Azerbaijani person would actually say it out loud. Prefer shorter, punchy sentences over long nested clauses.
- Never use generic filler phrases: "as an AI assistant", "I would be happy to", "feel free to ask", "great question".
- Include at least 1 concrete fact from the knowledge base in each work/project-related answer.
- Be concise. Short paragraphs and bullet lists when helpful.

CRITICAL_EMPLOYER_FACTS (must follow for introductions and "who is / kimdir" answers):
Grounding snippet (canonical order for current vs past employers):
${grounding}

- Her CURRENT payroll employer is assistantGrounding.currentPayrollEmployer (Grand-Mart MMC). Mention this first when describing where she works now.
- Oyren.ai is listed under concurrentPersonalProject — describe it clearly as a personal project, NOT as her payroll employer replacing Grand-Mart MMC.
- Frazex LLC is PAST ONLY (ended mid-2024). Never phrase Frazex as her current workplace.
KNOWLEDGE_BASE_JSON:
${knowledge}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }
  const referer = process.env.PORTFOLIO_LLM_HTTP_REFERER?.trim()
  const title = process.env.PORTFOLIO_LLM_HTTP_TITLE?.trim()
  if (referer) headers['HTTP-Referer'] = referer
  if (title) headers['X-Title'] = title

  const upstream = await fetch(chatCompletionsUrl(baseUrl), {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.65,
      max_tokens: 1200,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
  })

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => '')
    const detail = parseOpenAIErrorBody(errText)
    if (process.env.NODE_ENV === 'development') {
      console.error('[portfolio-chat] LLM HTTP', upstream.status, detail, { url: chatCompletionsUrl(baseUrl) })
    }
    return NextResponse.json(
      { message: 'Upstream LLM error.', detail },
      { status: 502 },
    )
  }

  if (!upstream.body) {
    return NextResponse.json({ message: 'Empty upstream body.' }, { status: 502 })
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
