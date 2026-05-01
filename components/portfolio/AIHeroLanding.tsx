'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, History } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'
import { fadeUp, staggerContainer, blurReveal } from '@/lib/motion'
import { usePortfolioChat, type ChatMessage } from '@/contexts/portfolio-chat-context'
import { getAISuggestions, heroSuggestionChips } from '@/lib/ai-responses'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

function FormattedText({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []

  let currentList: React.ReactNode[] = []

  const renderLine = (line: string, key: number) => {
    const parts = line.split(/(\*\*.*?\*\*)/g)
    return (
      <span key={key}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-semibold text-foreground/90">
                {part.slice(2, -2)}
              </strong>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </span>
    )
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      const isLast = isStreaming && i === lines.length - 1
      currentList.push(
        <li key={i} className="flex gap-4 items-baseline">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-black/20" />
          <span className="leading-[1.8]">
            {renderLine(line.replace(/^[•-]/, '').trim(), i)}
            {isLast && <span className="typing-cursor" aria-hidden />}
          </span>
        </li>
      )
    } else {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${i}`} className="space-y-3 mb-6 mt-2">
            {currentList}
          </ul>,
        )
        currentList = []
      }
      if (line.trim() === '') continue
      const isLast = isStreaming && i === lines.length - 1
      elements.push(
        <p key={i} className="mb-4 leading-[1.8] last:mb-0">
          {renderLine(line, i)}
          {isLast && <span className="typing-cursor" aria-hidden />}
        </p>,
      )
    }
  }

  if (currentList.length > 0) {
    elements.push(
      <ul key="list-end" className="space-y-3 mb-6 mt-2 last:mb-0">
        {currentList}
      </ul>,
    )
  }

  return <>{elements}</>
}

type ChatTurn = {
  id: string
  userMessage: ChatMessage | null
  aiMessages: ChatMessage[]
}

function groupMessagesIntoTurns(messages: ChatMessage[]): ChatTurn[] {
  const turns: ChatTurn[] = []
  let currentTurn: ChatTurn | null = null

  for (const m of messages) {
    if (m.sender === 'user') {
      if (currentTurn) turns.push(currentTurn)
      currentTurn = { id: m.id, userMessage: m, aiMessages: [] }
    } else {
      if (!currentTurn) {
        currentTurn = { id: m.id, userMessage: null, aiMessages: [] }
      }
      currentTurn.aiMessages.push(m)
    }
  }
  if (currentTurn) turns.push(currentTurn)

  return turns
}

function TurnContent({
  turn,
  displayedText,
  streamingMessageId,
  isTyping,
  isLatest,
  className,
}: {
  turn: ChatTurn
  displayedText: Record<string, string>
  streamingMessageId: string | null
  isTyping: boolean
  isLatest: boolean
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {turn.userMessage && (
        <motion.div
          initial={isLatest ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'flex items-start gap-4 border-b border-black/[0.04]',
            isLatest ? 'pb-6 sm:items-center sm:gap-6' : 'pb-8 sm:gap-5',
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-[10px] font-medium uppercase tracking-widest text-foreground/50">
            You
          </div>
          <p className="min-w-0 flex-1 pt-0.5 text-[15px] font-medium leading-snug text-foreground/80 sm:text-[16px]">
            {turn.userMessage.text}
          </p>
        </motion.div>
      )}

      <div className={cn('flex items-start', isLatest ? 'gap-4 sm:gap-6' : 'gap-4 sm:gap-4')}>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm mt-1">
          <Sparkles className="size-3.5" />
        </div>
        <div className="min-w-0 flex-1 text-[15px] sm:text-[16px] text-foreground/85">
          {turn.aiMessages.map((m, i) => {
            const text = displayedText[m.id] ?? m.text
            const isStreaming = streamingMessageId === m.id
            return (
              <motion.div
                key={m.id}
                initial={isLatest ? { opacity: 0, y: 8, filter: 'blur(4px)' } : false}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn('w-full', isLatest ? 'max-w-[95%]' : 'max-w-full', i > 0 && 'mt-1')}
              >
                <FormattedText text={text} isStreaming={isStreaming} />
              </motion.div>
            )
          })}

          {isLatest && isTyping && !streamingMessageId && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl border border-black/[0.04] bg-white/50 px-5 py-3 shadow-sm backdrop-blur-md">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export function AIHeroLanding() {
  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  const {
    messages,
    displayedText,
    isTyping,
    input,
    setInput,
    sendFromInput,
    sendQuickMessage,
    recruiterMode,
    suggestionIntent,
    showInitialChips,
    streamingMessageId,
  } = usePortfolioChat()

  const [hoveredChip, setHoveredChip] = useState<string | null>(null)

  const quickChips = useMemo(() => {
    if (showInitialChips) return [...heroSuggestionChips]
    const base = getAISuggestions(suggestionIntent).slice(0, 4)
    if (recruiterMode && !base.some((c) => c.toLowerCase().includes('hire'))) {
      return ['Why hire her?', ...base].slice(0, 4)
    }
    return base
  }, [recruiterMode, showInitialChips, suggestionIntent])

  const turns = useMemo(() => groupMessagesIntoTurns(messages), [messages])
  const oldTurns = turns.slice(0, -1)
  const latestTurn = turns[turns.length - 1]

  return (
    <section id="hero" className="relative min-h-[100dvh] w-full overflow-hidden bg-background">
      <div className="hero-mesh opacity-90" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center px-5 pb-20 pt-20 sm:px-8 sm:pt-24 md:pt-18">
        <motion.div
          className="flex w-full flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={blurReveal}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80"
          >
            {portfolioData.ui.hero.kicker}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]"
          >
            {portfolioData.fullName}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-lg text-[15px] font-medium leading-snug text-foreground/75 sm:text-[16px]"
          >
            {portfolioData.title}
          </motion.p>
          {/* <motion.p
            variants={fadeUp}
            className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground/90 sm:text-[15px]"
          >
            {portfolioData.heroShortTagline}
          </motion.p> */}
        </motion.div>

        {/* Clean pill input */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 w-full max-w-3xl"
        >
          <div className="relative flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 py-2.5 pl-6 pr-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all focus-within:border-black/[0.15] focus-within:bg-white/90 focus-within:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void sendFromInput()
                }
              }}
              placeholder={portfolioData.heroInputPlaceholder}
              disabled={isTyping}
              className="min-h-[44px] flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60"
            />
            <span
              className="hidden shrink-0 select-none font-sans text-lg font-light text-black/[0.08] sm:inline"
              aria-hidden
            >
              |
            </span>
            <button
              type="button"
              onClick={() => void sendFromInput()}
              disabled={!input.trim() || isTyping}
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-black/[0.04] hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
              aria-label="Send message"
            >
              <span className="font-mono text-xl leading-none">↵</span>
            </button>
          </div>
        </motion.div>

        {/* Minimal Chips and History Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 flex w-full max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-start"
        >
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {quickChips.map((label, index) => {
              const featured = (showInitialChips && index === 0 && !hoveredChip) || hoveredChip === label
              return (
                <button
                  key={label}
                  type="button"
                  onMouseEnter={() => setHoveredChip(label)}
                  onMouseLeave={() => setHoveredChip(null)}
                  onClick={() => void sendQuickMessage(label)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300',
                    featured
                      ? 'border-black/10 bg-black/5 text-foreground shadow-sm'
                      : 'border-transparent bg-black/[0.02] text-muted-foreground hover:bg-black/[0.04] hover:text-foreground/90',
                  )}
                >
                  {featured && <span className="size-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />}
                  {label}
                </button>
              )
            })}
          </div>

          {oldTurns.length > 0 && (
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/50 px-4 py-2 text-[13px] font-medium text-muted-foreground transition-all hover:bg-black/5 hover:text-foreground shadow-sm backdrop-blur-sm shrink-0">
                  <History className="size-3.5" />
                  History
                </button>
              </SheetTrigger>
              <SheetContent className="flex h-full min-h-0 w-full flex-col gap-0 border-l border-black/[0.06] bg-background p-0 shadow-2xl sm:max-w-md">
                <SheetHeader className="shrink-0 space-y-1 border-b border-black/[0.06] px-7 pb-5 pt-8 pr-16 text-left">
                  <SheetTitle className="flex items-center gap-2.5 text-lg font-normal tracking-tight">
                    <History className="size-4 shrink-0 text-foreground/70" />
                    {portfolioData.ui.history.title}
                  </SheetTitle>
                  <p className="text-[13px] font-normal leading-relaxed text-muted-foreground">
                    {portfolioData.ui.history.description}
                  </p>
                </SheetHeader>
                <div className="history-sheet-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 py-2">
                  <div className="flex flex-col gap-6 pb-4">
                    {oldTurns.map((turn) => (
                      <div
                        key={turn.id}
                        className="rounded-2xl border border-black/[0.05] bg-black/[0.015] p-2 sm:p-4"
                      >
                        <TurnContent
                          turn={turn}
                          displayedText={displayedText}
                          streamingMessageId={null}
                          isTyping={false}
                          isLatest={false}
                          className="gap-7"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </motion.div>

        {/* Inline Editorial Response Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-16 w-full max-w-3xl pb-16 text-left"
        >
          {/* Latest turn rendered openly */}
          {latestTurn && (
            <TurnContent
              turn={latestTurn}
              displayedText={displayedText}
              streamingMessageId={streamingMessageId}
              isTyping={isTyping}
              isLatest={true}
            />
          )}
        </motion.div>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          onClick={scrollToAbout}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors hover:text-foreground/80"
        >
          {portfolioData.ui.hero.scrollCue}
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="size-4 opacity-50" aria-hidden />
          </motion.span>
        </motion.button>
      </div>
    </section>
  )
}
