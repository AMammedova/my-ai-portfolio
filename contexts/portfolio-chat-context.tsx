'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { detectIntent, generateResponse, type Intent } from '@/lib/ai-responses'
import { simulateTyping, formatResponseChunks, getMessageDelay, TYPING_CONFIG } from '@/lib/typing-utils'
import { buildOpenAIMessagesFromChat } from '@/lib/chat-history'
import { consumeOpenAIChatStream } from '@/lib/openai-portfolio-stream'
import type { ChatMessage } from '@/lib/chat-types'

export type { ChatMessage }

function newId(prefix: string) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

interface PortfolioChatContextValue {
  messages: ChatMessage[]
  displayedText: Record<string, string>
  isTyping: boolean
  greetingDone: boolean
  input: string
  setInput: (v: string) => void
  sendFromInput: () => Promise<void>
  sendQuickMessage: (text: string) => Promise<void>
  recruiterMode: boolean
  setRecruiterMode: (v: boolean) => void
  suggestionIntent: Intent
  showInitialChips: boolean
  streamingMessageId: string | null
}

const PortfolioChatContext = createContext<PortfolioChatContextValue | null>(null)

/** When true, user replies use OpenAI with `portfolio-data` as system context (see `/api/portfolio-chat`). */
const useLiveOpenAI = process.env.NEXT_PUBLIC_PORTFOLIO_AI === 'true'

export function PortfolioChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [displayedText, setDisplayedText] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [greetingDone, setGreetingDone] = useState(false)
  const [input, setInput] = useState('')
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [lastUserText, setLastUserText] = useState('')
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const greetedRef = useRef(false)

  const suggestionIntent = useMemo(() => {
    if (!lastUserText) return 'greeting' as Intent
    return detectIntent(lastUserText)
  }, [lastUserText])

  const showInitialChips = greetingDone && !isTyping && !messages.some((m) => m.sender === 'user')

  const appendAiChunks = useCallback(async (intent: Intent, opts?: { quick?: boolean }) => {
    const response = generateResponse(intent)
    const chunks = formatResponseChunks(response.intro, response.content, response.suggestion)
    const quick = opts?.quick === true

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const delay =
        i === 0 ? (quick ? 120 : getMessageDelay(0)) : quick ? i * TYPING_CONFIG.MESSAGE_STAGGER : getMessageDelay(i)
      await new Promise((r) => setTimeout(r, delay))

      const messageId = newId('ai')
      setMessages((prev) => [...prev, { id: messageId, text: '', sender: 'ai', timestamp: new Date() }])

      setStreamingMessageId(messageId)
      let fullText = ''
      await simulateTyping(chunk.text, (char) => {
        fullText += char
        setDisplayedText((prev) => ({ ...prev, [messageId]: fullText }))
      })
      setStreamingMessageId(null)
    }
  }, [])

  const sendGreeting = useCallback(async () => {
    setIsTyping(true)
    await appendAiChunks('greeting')
    setIsTyping(false)
    setGreetingDone(true)
  }, [appendAiChunks])

  useEffect(() => {
    if (greetedRef.current) return
    greetedRef.current = true
    void sendGreeting()
  }, [sendGreeting])

  const processUserMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      setLastUserText(trimmed)
      const userMessage: ChatMessage = {
        id: newId('user'),
        text: trimmed,
        sender: 'user',
        timestamp: new Date(),
      }
      const conversationSnapshot = [...messages, userMessage]
      setMessages(conversationSnapshot)
      setInput('')
      setIsTyping(true)

      const intent = detectIntent(trimmed)

      if (useLiveOpenAI) {
        const openAiMessages = buildOpenAIMessagesFromChat(conversationSnapshot, displayedText)
        try {
          const res = await fetch('/api/portfolio-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: openAiMessages }),
          })

          if (!res.ok || !res.body) {
            const err = (await res.json().catch(() => null)) as {
              message?: string
              detail?: string
            } | null
            if (err?.message) {
              console.warn('portfolio-chat API:', err.message, err.detail ? `\n${err.detail}` : '')
            }
            await appendAiChunks(intent, { quick: true })
          } else {
            const messageId = newId('ai')
            setMessages((prev) => [...prev, { id: messageId, text: '', sender: 'ai', timestamp: new Date() }])
            setStreamingMessageId(messageId)
            let full = ''
            await consumeOpenAIChatStream(res.body.getReader(), (delta) => {
              full += delta
              setDisplayedText((prev) => ({ ...prev, [messageId]: full }))
            })
            setStreamingMessageId(null)

            if (!full.trim()) {
              setMessages((prev) => prev.filter((m) => m.id !== messageId))
              setDisplayedText((prev) => {
                const next = { ...prev }
                delete next[messageId]
                return next
              })
              await appendAiChunks(intent, { quick: true })
            } else {
              setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, text: full } : m)))
            }
          }
        } catch (e) {
          console.warn('portfolio-chat fetch failed', e)
          await appendAiChunks(intent, { quick: true })
        }
      } else {
        await appendAiChunks(intent, { quick: true })
      }

      setIsTyping(false)
    },
    [appendAiChunks, messages, displayedText],
  )

  const sendFromInput = useCallback(async () => {
    if (!input.trim() || isTyping) return
    await processUserMessage(input)
  }, [input, isTyping, processUserMessage])

  const sendQuickMessage = useCallback(
    async (text: string) => {
      if (isTyping) return
      await processUserMessage(text)
    },
    [isTyping, processUserMessage],
  )

  const value = useMemo<PortfolioChatContextValue>(
    () => ({
      messages,
      displayedText,
      isTyping,
      greetingDone,
      input,
      setInput,
      sendFromInput,
      sendQuickMessage,
      recruiterMode,
      setRecruiterMode,
      suggestionIntent,
      showInitialChips,
      streamingMessageId,
    }),
    [
      messages,
      displayedText,
      isTyping,
      greetingDone,
      input,
      sendFromInput,
      sendQuickMessage,
      recruiterMode,
      suggestionIntent,
      showInitialChips,
      streamingMessageId,
    ],
  )

  return <PortfolioChatContext.Provider value={value}>{children}</PortfolioChatContext.Provider>
}

export function usePortfolioChat() {
  const ctx = useContext(PortfolioChatContext)
  if (!ctx) throw new Error('usePortfolioChat must be used within PortfolioChatProvider')
  return ctx
}
