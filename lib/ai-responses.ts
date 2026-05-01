import { portfolioData, flattenSkillGroups } from './portfolio-data'

export type Intent =
  | 'hireFit'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'ai'
  | 'about'
  | 'greeting'
  | 'unknown'

const intentKeywords: Record<Exclude<Intent, 'unknown'>, string[]> = {
  hireFit: ['why hire', 'hire her', 'strong fit', 'recruiter', 'why should', 'good candidate', 'fit for'],
  greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'salam'],
  about: [
    'about',
    'who',
    'background',
    'biography',
    'introduce',
    'tell me about',
    'yourself',
    'who is aisel',
    'who is she',
    'kimdir',
    'kim dir',
    'haqqında',
    'haqqinda',
    'tell me who',
    'кто ',
    'кто такой',
    'кто такая',
  ],
  ai: [
    'ai projects',
    'ai project',
    'machine learning',
    'artificial intelligence',
    'llm',
    'deep learning',
    'neural',
    'gpt',
    'transition into ai',
    'applied ai',
    'rag',
    'embedding',
  ],
  projects: [
    'portfolio',
    'showcase',
    'case study',
    'application',
    'product',
    'built',
    'created',
    'what has she built',
    'best projects',
    'best project',
    'top projects',
    'inloya',
    'oyren',
    'grandmart',
    'grand-mart',
    'mastercard',
    'vitanur',
    'frazex',
    'mti kompleks',
    'residential complex',
  ],
  experience: ['experience', 'career', 'worked', 'employment', 'job', 'professional', 'role', 'responsibilities', 'work history', 'iş təcrübəsi', 'is tecrubesi'],
  skills: ['skills', 'abilities', 'expertise', 'technology', 'tech stack', 'languages', 'frameworks', 'tools', 'proficient'],
}

/** Order matters: more specific intents first (avoid "tell me about InLoya" matching generic `about`). */
const intentPriority: Exclude<Intent, 'unknown'>[] = [
  'hireFit',
  'projects',
  'experience',
  'ai',
  'about',
  'skills',
  'greeting',
]

export const heroSuggestionChips = [
  'Who is Aisel?',
  'Show experience',
  'Best projects',
  'Why hire her?',
] as const

export function detectIntent(userMessage: string): Intent {
  const message = userMessage.toLowerCase().trim()

  for (const intent of intentPriority) {
    const keywords = intentKeywords[intent]
    if (keywords.some((keyword) => message.includes(keyword))) {
      return intent
    }
  }

  return 'unknown'
}

interface ResponseTemplate {
  intro: string | (() => string)
  content: string | (() => string)
  suggestion?: string
}

const responseTemplates: Record<Intent, ResponseTemplate> = {
  greeting: {
    intro: () =>
      `Hi — I'm Aisel's portfolio assistant. Ask me about her experience, projects, or transition into applied AI.`,
    content: () =>
      `You can ask who she is, what she's shipped on the frontend, or why she's a strong fit for AI-focused product teams.`,
    suggestion: 'Try one of the suggested questions below.',
  },

  about: {
    intro: () => `${portfolioData.fullName} — ${portfolioData.title}.`,
    content: () => {
      const g = portfolioData.assistantGrounding
      const highlights = portfolioData.about.highlights.map((h) => `• ${h}`).join('\n')
      const current = `${g.currentPayrollEmployer.role} (${g.currentPayrollEmployer.company}, ${g.currentPayrollEmployer.period})`
      const persona = `${g.concurrentPersonalProject.role}, ${g.concurrentPersonalProject.name} (${g.concurrentPersonalProject.period}) — concurrent personal project`
      return `${current}\n${persona}\n\n${portfolioData.about.summary}\n\nHighlights:\n${highlights}`
    },
    suggestion: 'Want the short version of her work history or projects next?',
  },

  experience: {
    intro: () => `Here's a concise view of her experience.`,
    content: () => {
      const roles = portfolioData.experience
        .slice(0, 6)
        .map((exp) => `**${exp.role}** at ${exp.company} (${exp.period})\n${exp.description}`)
        .join('\n\n')
      return roles
    },
    suggestion: 'I can go deeper on a specific role or connect it to her AI direction.',
  },

  projects: {
    intro: () =>
      `Selected work spans production loyalty (InLoya), tender + CX modernization (Grandmart), Mastercard campaign tooling, Vitanur, a residential-mgmt startup prototype, Oyren.ai, and this site.`,
    content: () => {
      const list = portfolioData.projects
        .map((proj) => `**${proj.name}**${proj.featured ? ' _(featured)_' : ''}\n${proj.summary}`)
        .join('\n\n')
      return list
    },
    suggestion: 'Dig into InLoya, Grandmart digitization, the Mastercard consoles, Oyren.ai, or this AI-grounded portfolio.',
  },

  skills: {
    intro: () => `Two tracks: engineering craft and applied AI depth.`,
    content: () => {
      const eng = flattenSkillGroups(portfolioData.skillsPresent.engineering).slice(0, 12).join(', ')
      const ai = flattenSkillGroups(portfolioData.skillsPresent.appliedAi).slice(0, 10).join(', ')
      return `**Frontend engineering**: ${eng}, and more.\n\n**Applied AI journey**: ${ai}, and growing.`
    },
    suggestion: 'Curious how this maps to a specific role? Ask in hiring context.',
  },

  ai: {
    intro: () => `Applied AI is where she's steering next — grounded in shipping real UI.`,
    content: () => {
      const journey = portfolioData.aiTransition.journey
      const focus = portfolioData.aiTransition.currentFocus.map((f) => `• ${f}`).join('\n')
      return `${journey}\n\nCurrent focus:\n${focus}`
    },
    suggestion: 'I can summarize featured AI work or how she collaborates with backend and data.',
  },

  hireFit: {
    intro: () => `Why she's a strong hire for frontend-heavy AI product teams`,
    content: () => {
      const goals = portfolioData.goals.map((g) => `• ${g}`).join('\n')
      return `She brings disciplined UI engineering, systems thinking, and a deliberate path into LLMs and RAG — not hype, shipped learning curves.\n\nGoals:\n${goals}`
    },
    suggestion: 'Ask for project specifics or how she works with design and stakeholders.',
  },

  unknown: {
    intro: () => `I only answer from Aisel's structured portfolio — no generic web answers.`,
    content: () =>
      `Try: who she is, her timeline, projects (InLoya, Grandmart, Mastercard tooling, Oyren.ai), skills, or why she's a fit for frontend / applied-AI product teams.`,
    suggestion: 'Pick a suggestion chip or rephrase around experience, projects, skills, or AI.',
  },
}

export function generateResponse(intent: Intent): { intro: string; content: string; suggestion?: string } {
  const template = responseTemplates[intent]

  return {
    intro: typeof template.intro === 'function' ? template.intro() : template.intro,
    content: typeof template.content === 'function' ? template.content() : template.content,
    suggestion: template.suggestion,
  }
}

export function getAISuggestions(intent: Intent): string[] {
  const suggestions: Record<Intent, string[]> = {
    greeting: ['Who is Aisel?', 'Show experience', 'Best projects', 'Why hire her?'],
    about: ['Her experience timeline', 'Featured projects', 'Skills overview', 'AI direction'],
    experience: ['More on current role', 'Technologies used', 'How this connects to AI', 'Achievements'],
    projects: ['Tell me about InLoya', 'Tell me about Oyren.ai', 'Tech stacks', 'Impact'],
    skills: ['Frontend engineering depth', 'Applied AI tools', 'How skills show in products', 'Collaboration style'],
    ai: ['LLM and RAG focus', 'Featured AI project', 'What she wants next', 'How she learns'],
    hireFit: ['Project proof points', 'Collaboration', 'Frontend + AI combo', 'Contact paths'],
    unknown: ['Who is Aisel?', 'Show her experience', 'AI projects', 'Why hire her?'],
  }

  return suggestions[intent] || suggestions.greeting
}

export function getDetailedExperience() {
  return portfolioData.experience
    .map(
      (exp) =>
        `**${exp.role}** at ${exp.company} (${exp.period})\n${exp.description}\n${exp.achievements.map((a) => `• ${a}`).join('\n')}`,
    )
    .join('\n\n')
}

export function getDetailedProjects() {
  return portfolioData.projects
    .map(
      (proj) =>
        `**${proj.name}**\n${proj.description}\n**Impact**: ${proj.impact}\n**Tech**: ${proj.technologies.join(', ')}`,
    )
    .join('\n\n')
}

export function getDetailedSkills() {
  const { engineering, appliedAi } = portfolioData.skillsPresent
  const engFlat = flattenSkillGroups(engineering).join(', ')
  const aiFlat = flattenSkillGroups(appliedAi).join(', ')
  return `**Frontend engineering**: ${engFlat}\n\n**Applied AI journey**: ${aiFlat}`
}
