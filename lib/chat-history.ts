import type { ChatMessage } from '@/lib/chat-types'

export type OpenAIChatMessage = { role: 'user' | 'assistant'; content: string }

/**
 * Converts on-screen chat (including rule-based greeting AI bubbles) into
 * OpenAI message pairs. Skips leading assistant-only greeting blocks.
 */
export function buildOpenAIMessagesFromChat(
  messages: ChatMessage[],
  displayedText: Record<string, string>,
): OpenAIChatMessage[] {
  let i = 0
  while (i < messages.length && messages[i].sender === 'ai') i++

  const out: OpenAIChatMessage[] = []
  while (i < messages.length) {
    const m = messages[i]
    if (m.sender !== 'user') {
      i++
      continue
    }
    out.push({ role: 'user', content: m.text })
    i++
    const parts: string[] = []
    while (i < messages.length && messages[i].sender === 'ai') {
      const am = messages[i]
      parts.push(displayedText[am.id] ?? am.text)
      i++
    }
    if (parts.length > 0) {
      out.push({ role: 'assistant', content: parts.join('\n\n') })
    }
  }
  return out
}
