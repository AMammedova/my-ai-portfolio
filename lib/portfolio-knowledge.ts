import { portfolioData } from '@/lib/portfolio-data'

/**
 * Serialized portfolio for LLM system context. Update `portfolio-data.ts` —
 * no separate "training" step: this stays in sync with the site.
 */
export function getPortfolioKnowledgeBase(): string {
  return JSON.stringify(portfolioData, null, 2)
}
