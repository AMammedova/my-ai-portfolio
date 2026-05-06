export const portfolioData = {
  fullName: 'Aisel Mamedova',
  name: 'Aisel',
  title: 'Frontend Engineer · AI Integration & Automation',
  heroShortTagline:
    'Frontend Engineer — React, Next.js, and data-driven UIs, with a growing focus on practical AI and Python/ML growth.',
  heroInputPlaceholder: 'Ask about my experience, projects, or AI journey…',
  heroTagline:
    'Ask about shipped work—from InLoya and Mastercard campaign tooling at Frazex, to tender digitization and customer-facing flows at Grandmart—or about Oyren.ai and how I ship AI-assisted UIs.',
  bio: 'Frontend Engineer with strong experience in scalable, high-performance web applications using React and Next.js — clean UI architectures, API integration, and growing focus on AI-powered product work.',

  location: 'Baku, Azerbaijan',
  siteUrl: 'https://www.aiselmamedova.dev',

  /**
   * Explicit facts so chat models do not skim `experience[]` wrongly (e.g. past vs current employer).
   * Keep in sync whenever roles change.
   */
  assistantGrounding: {
    currentPayrollEmployer: {
      company: 'Grand-Mart MMC',
      role: 'Frontend Developer (Product-focused)',
      period: 'Dec 2024 – Present',
      summary:
        'Product frontend: digitized tenders, tenders/users/operations admin, requests & offers workflows, communication and assessment tooling.',
    },
    concurrentPersonalProject: {
      name: 'Oyren.ai',
      role: 'AI Product Engineer',
      period: '2025 – Present',
      note: 'Personal project—not the same as payroll employer',
    },
    pastEmployers: [
      { company: 'Vitanur', role: 'Frontend Developer', ended: 'Dec 2024' },
      { company: 'Frazex LLC', role: 'Frontend Developer', ended: 'Jun 2024', note: 'Not current — do not introduce as ongoing job' },
    ],
  },

  /** Section copy (single source for headings and static blurbs) */
  ui: {
    navigation: [
      { label: 'About', id: 'about' },
      { label: 'Experience', id: 'experience' },
      { label: 'Projects', id: 'projects' },
      { label: 'Skills', id: 'skills' },
      { label: 'Blog', id: 'blog' },
      { label: 'AI', id: 'ai-assistant' },
      { label: 'Contact', id: 'contact' },
    ] as const,
    hero: {
      kicker: 'Portfolio',
      scrollCue: 'Scroll to explore',
    },
    history: {
      title: 'Chat History',
      description: 'Earlier questions and answers from this session.',
    },
    about: {
      kicker: 'About',
      heading: 'About me',
      educationTitle: 'Education',
    },
    experience: {
      kicker: 'Experience',
      heading: 'Experience & roles',
    },
    projects: {
      kicker: 'Projects',
      heading: 'Selected work',
      featuredBadge: 'Featured project',
    },
    skills: {
      kicker: 'Skills',
      heading: 'Stack & tools',
      blurb:
        'Programming, React/Next.js, state and data-fetching discipline, JWT/OAuth tooling, testing (including E2E with Playwright), plus LLM integrations and automation—matching the stack called out on my CV.',
      engineeringColumnTitle: 'Frontend engineering',
      appliedAiColumnTitle: 'AI & integration',
    },
    blog: {
      kicker: 'Blog',
      heading: 'Writing',
      blurb: 'Deep dives into browser internals, React architecture, and frontend performance — written for clarity and interview-readiness.',
      readMoreLabel: 'Read article',
      viewAllLabel: 'View all articles',
    },
    ai: {
      kicker: 'Applied AI',
      heading: 'Direction',
      focusLabel: 'Current focus',
      ctaBackToChat: 'Back to chat at the top',
    },
    contact: {
      kicker: 'Contact',
      heading: "Let's connect",
      blurb:
        'I am open to frontend engineer roles and teams where product UI meets practical AI (integrations, tooling, or AI-assisted workflows). The fastest way to reach me is email or LinkedIn — both are checked regularly.',
      emailButtonLabel: 'Send me an email',
      resumeLabel: 'Download resume (PDF)',
    },
    exploreDock: {
      menuTitle: 'On this page',
      resumeItemLabel: 'Resume (PDF)',
      recruiterToggleTitle:
        'Recruiter mode: biases the chat suggestion chips toward hiring and interview-style questions (e.g. why hire, proof points).',
      exploreButtonAriaLabel: 'Open section navigation',
    },
  },

  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Azerbaijan State Oil and Industry University',
      period: 'Sep 2019 – Jul 2023',
      note: 'GPA: 91',
    },
    {
      degree: 'AI Engineer (in progress)',
      school: 'AI Academy',
      period: '2025 – 2026',
    },
    {
      degree: 'Frontend Developer Bootcamp',
      school: 'Algoritmika Bootcamp',
      period: '2022 – 2023',
    },
  ],

  goals: [
    'Ship reliable React/Next.js product interfaces with measurable UX quality.',
    'Grow applied AI skills (LLM features, retrieval, evaluation) alongside frontend craft.',
    'Collaborate with design, backend, and stakeholders in clear, iterative delivery.',
  ],

  about: {
    summary:
      'Frontend Engineer with strong experience in building scalable and high-performance web applications using React and Next.js. Skilled in developing clean, maintainable UI architectures and data-driven interfaces.\n\nExperienced in API integration and modern frontend workflows, with a growing focus on AI-powered features and application enhancement.\n\nActively expanding expertise in Python and machine learning through hands-on projects and formal training, with a focus on practical AI implementation.',
    highlights: [
      'JavaScript (ES6+), TypeScript, React, Next.js, Tailwind CSS — Redux, Zustand, Context API where each fits best',
      'RESTful integrations with Axios / TanStack Query, React Hook Form, Yup/Zod; JWT / OAuth / NextAuth patterns',
      'Product-focused frontend at Grand-Mart: centralized tender workflows, tenders/users/operations admin, request–offer workflows, internal communications & assessment tooling',
      'Collaborative delivery with designers (Figma specs, Git/GitHub/GitLab) and repeatable testing (Jest, RTL, Playwright E2E where applicable)',
    ],
  },

  experience: [
    {
      role: 'Frontend Developer (Product-focused)',
      company: 'Grand-Mart MMC',
      period: 'Dec 2024 – Present',
      description:
        'Product-focused frontend for internal tenders and operational tooling shipped in React/Next.js stacks.',
      achievements: [
        'Digitized internal tender processes by building a centralized platform',
        'Developed admin panel for managing tenders, users, and operations',
        'Contributed to product logic covering requests, offers, and workflow management',
        'Worked on internal tools such as communication and employee assessment systems',
      ],
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'TanStack Query'],
    },
    {
      role: 'AI Product Engineer',
      company: 'Oyren.ai (Personal Project)',
      period: '2025 – Present',
      description:
        'Hands-on exploration of AI-native product workflows in a codebase I fully own—from architecture to iterative UX experiments.',
      achievements: [
        'Built an AI-powered platform for working with complex documents and structured learning workflows',
        'Delivered web and desktop-oriented builds for wider reach',
        'Integrated LLM features for contextual interaction and knowledge extraction',
        'Architected workflows aimed at pragmatic, real-world use cases',
      ],
      tech: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    },
 
    {
      role: 'Frontend Developer',
      company: 'Vitanur',
      period: 'Jun 2024 – Dec 2024',
      description:
        'Feature development on production web interfaces with REST-driven data and strengthening TypeScript quality.',
      achievements: [
        'Integrated frontend systems with RESTful APIs',
        'Improved application reliability using TypeScript',
        'Developed and maintained key features, contributing to overall performance',
      ],
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    },
    {
      role: 'Frontend Developer',
      company: 'Frazex LLC',
      period: 'Dec 2022 – Jun 2024',
      description:
        'Client delivery cycle for React/Next.js applications—features, regressions, and implementation from design specifications.',
      achievements: [
        'Developed and maintained React and Next.js applications',
        'Implemented new features and resolved defects',
        'Collaborated with designers on UI/UX specifications ahead of implementation',
      ],
      tech: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Figma'],
    }
  ],

  skillsPresent: {
    engineering: [
      { label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript'] },
      { label: 'UI stack', items: ['React.js', 'Next.js', 'Tailwind CSS'] },
      { label: 'State', items: ['Redux', 'Zustand', 'Context API'] },
      {
        label: 'Data, APIs & validation',
        items: ['TanStack Query', 'React Hook Form', 'RESTful APIs (Axios)', 'Yup / Zod'],
      },
      { label: 'Authentication', items: ['JWT', 'OAuth', 'NextAuth'] },
      {
        label: 'Testing',
        items: ['Jest', 'React Testing Library', 'Playwright (E2E — UI scenarios)'],
      },
      { label: 'Git & design', items: ['Git', 'GitHub', 'GitLab', 'Figma'] },
      {
        label: 'Platform & delivery',
        items: [
          'SignalR / real-time UI (campaign tooling deliveries)',
          'Google Maps Platform (frontend integration)',
          'next-intl / react-i18next',
          'Framer Motion',
          'Performance optimization (lazy loading, memoization)',
        ],
      },
    ],
    appliedAi: [
      {
        label: 'LLM & automation',
        items: ['LLM integrations (OpenAI API)', 'Prompt engineering', 'Workflow automation'],
      },
      {
        label: 'Learning & exploration',
        items: ['Python (coursework & hands-on projects)', 'RAG & embeddings (exploration in projects)'],
      },
      { label: 'AI coding assistants', items: ['Cursor', 'Claude', 'GitHub Copilot'] },
      { label: 'Product', items: ['Product thinking around AI-heavy flows'] },
    ],
  },

  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Context API'],
    backend: ['REST APIs', 'JSON'],
    ai_ml: ['OpenAI API', 'Prompt engineering', 'Workflow automation', 'Python (coursework)', 'Copilot tooling'],
    devops: ['Git', 'GitHub', 'GitLab'],
    other: ['Figma', 'Analytical thinking', 'Problem solving', 'Technical communication'],
  },

  projects: [
    {
      name: 'Oyren.ai — structured learning companion',
      summary:
        'Personal AI initiative (2025–present): structured learning workflows plus document-heavy experimentation with contextual LLMs.',
      description:
        'Mirrors CV scope—web/desktop surfaces, knowledge extraction cues, disciplined architecture drafts, and hands-on prompting so features map to pragmatic usage rather than one-off chats.',
      impact: 'Laboratory for AI product instincts while continuing disciplined React/Next.js engineering.',
      technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
      highlights: [
        'Document + learning flows guided by embeddings and iterative UX critiques',
        'Cross-platform experimentation (primarily Next.js)',
        'Architecture rehearsals for maintainable automation hooks',
      ],
      link: '#',
      featured: true,
    },
    {
      name: 'InLoya — website & admin panel',
      summary:
        'Regional loyalty platform: public marketing and product surfaces plus a business admin panel for rewards, campaigns, and customer engagement.',
      description:
        'Deep frontend contribution on a large product codebase—composable UI, disciplined data fetching patterns, and flows that satisfy both shoppers and merchants configuring programs.',
      impact: 'Production experiences on https://inloya.com/ for acquiring and serving business customers.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Responsive UI'],
      highlights: [
        'Customer-facing funnels and explanatory content stitched to live backend capabilities',
        'Admin experiences for configuring loyalty mechanics without overwhelming operators',
        'Component boundaries and integrations that survived ongoing product iteration',
      ],
      link: 'https://inloya.com/',
      featured: false,
    },
    {
      name: 'Grandmart — tenders, ops & customer engagement',
      summary:
        'Centralized tenders and administrative operations surfaced through React-heavy admin experiences—matching the digitization storyline on my résumé, with supplementary CX-facing modules where product scope demanded them.',
      description:
        'Frontend ownership over tender dashboards, tender/user orchestration flows, downstream request/offer states, auxiliary communication tooling and assessment modules, plus shareable branded identity surfaces (digital business cards) when marketing teams needed them.',
      impact: 'Replaced brittle paper-driven tender choreography with audited web tooling for Grand-Mart stakeholders.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'REST APIs', 'Dashboard UX'],
      highlights: [
        'Centralized tenders with permissions-aware admin patterns',
        'Transparent request → offer pipelines inside the SPA',
        'Operator-friendly communication widgets tied to workforce assessment programs',
        'Public-facing digital card preview link for stakeholder demos',
      ],
      link: 'https://vcard.grandmart.az:6003/az/profile/1018',
      featured: false,
    },
    {
      name: 'Vitanur — corporate site & admin',
      summary:
        'Public corporate presence with content-heavy storytelling paired to an authenticated admin layer for marketers.',
      description:
        'Built responsive layouts, integrated REST APIs for dynamic sections, and kept TypeScript-backed components stable as stakeholders iterated messaging.',
      impact: 'Maintainable bilingual-friendly marketing surface with guarded CMS-style workflows internally.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SCSS', 'REST APIs', 'SEO-minded layouts'],
      highlights: [
        'Marketing pages stressing clarity and readability on mobile-heavy traffic',
        'Admin flows for swapping assets and copy without engineering bottlenecks',
        'Collaboration-ready component library alignment with backend contracts',
      ],
      link: 'https://vitanur.com/',
      featured: false,
    },
    {
      name: 'Mastercard — promo code administration',
      summary:
        'Internal console for authoring, slicing, exporting, and governing promo inventories at campaign scale.',
      description:
        'Implemented advanced filtering grids, RBAC-affirmative patterns, CSV export affordances, and crisp empty/error states tailored to analysts running promotions.',
      impact: 'Reliable backstage control-plane for Mastercard-commissioned promos shipped via Frazex.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Zustand', 'CSV export', 'Admin tooling'],
      highlights: [
        'Operational search + batch actions that reduced manual auditing time',
        'Guardrails for accidental destructive edits through deliberate UI confirmations',
      ],
      link: '#',
      featured: false,
    },
    {
      name: 'Mastercard — courier & sticker logistics map',
      summary:
        'Admin tooling to onboard couriers, tag sticker drop locations, and visualize movement on embedded maps.',
      description:
        'Focused on actionable map overlays, repeatable courier profiles, and status cues so managers could supervise distribution geographically.',
      impact: 'Improved oversight of geographically distributed Mastercard branding logistics.',
      technologies: ['React', 'TypeScript', 'Google Maps API', 'Dashboard UX'],
      highlights: ['Geo visualization synchronized with authoritative backend payloads', 'Field-friendly workflows for rapid courier onboarding'],
      link: '#',
      featured: false,
    },
    {
      name: 'Mastercard — Telegram chatbot operations desk',
      summary:
        'Real-time console for reviewing and acting on Telegram conversations triggered by Mastercard promos.',
      description:
        'SignalR-backed UI for low-latency updates, concurrency-safe handling of agent assignments, and legible transcripts so moderators stayed ahead of bursts.',
      impact: 'Operational reliability during high-traffic chatbot bursts without losing customer context.',
      technologies: ['React', 'Next.js', 'SignalR', 'Real-time state management'],
      highlights: ['Live queue handling with graceful reconnect behavior', 'Operator-first layout prioritizing next-best-action'],
      link: '#',
      featured: false,
    },
    {
      name: 'Residential complexes — resident management startup',
      summary:
        'Full-stack-ish frontend for a fledgling proptech product: residents, amenities, bots, grievances, and announcements in one cohesive hub.',
      description:
        'Balanced pragmatic MVP scope with richer communication loops—chatbots, suggestion boxes, announcements—wired through SignalR for timely updates.',
      impact: 'Proof that complex community governance UX can remain approachable without hiding critical escalation paths.',
      technologies: ['React', 'Next.js', 'SignalR', 'Realtime UX', 'Form-heavy workflows'],
      highlights: [
        'Mixed-mode communication that respects both async chat and structured complaints',
        'Parking and tenancy modules emphasizing clarity for overstretched building admins',
      ],
      link: '#',
      featured: false,
    },
    // {
    //   name: 'aiselmamedova.dev — conversational portfolio',
    //   summary:
    //     'Public portfolio referenced on my CV—the JSON-first storytelling site with optional streamed assistant grounded in this same dataset.',
    //   description:
    //     'Uses narrative sections plus motion layering; optional LLM integrations respect factual guardrails sourced from consolidated portfolio facts so answers stay tethered to what is published here.',
    //   impact: 'Primary artifact hiring teams open after reading CV bullets—demonstrating applied AI restraint + frontend craft.',
    //   technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'SSE / streaming-ready UI'],
    //   highlights: ['Single structured JSON drives UI + assistants', 'Chat UX tuned for transparency and sourcing'],
    //   link: 'https://www.aiselmamedova.dev',
    //   featured: false,
    // },
  ],

  aiTransition: {
    journey:
      'From shipping production React/Next.js UIs to deliberately studying LLM systems, retrieval, and safe product patterns—grounded in real shipping discipline, not hype.',
    motivation:
      'I want interfaces where AI feels fast, trustworthy, and intentional—paired with strong frontend craft.',
    currentFocus: [
      'AI Engineer track at AI Academy (2025–2026): Python fundamentals + applied ML coursework',
      'Oyren.ai: LLM-assisted documents, workflows, and architecture experiments',
      'Grounded prompting, workflow automation (OpenAI + Copilot tooling), pragmatic evaluation mindset',
      'Production discipline from React/Next.js roles carried into trustworthy AI-assisted UX patterns',
    ],
    projects: [
      'Grandmart tender digitization, dashboards, CX tooling, and branded digital cards',
      'Oyren.ai — personal AI / structured learning sandbox',
      'aiselmamedova.dev — conversational portfolio wired to factual JSON context',
      'InLoya — flagship loyalty suite (customer + merchant admin)',
      'Mastercard promos/logistics/support consoles via Frazex',
      'Residential management startup — realtime community tooling',
    ],
  },

  contact: {
    email: 'ayselmemmedova1718@gmail.com',
    phone: '+994 50 636 17 21',
    location: 'Baku, Azerbaijan',
    linkedin: 'https://www.linkedin.com/in/aysel-mammedova/',
    cvUrl: '/Resume_Aisel.pdf',
    /** Listed on résumé as professional reference contact */
    referenceName: 'Vorashil Farzaliyev',
  },

  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aysel-mammedova/', icon: 'linkedin' as const },
    { label: 'Email', url: 'mailto:ayselmemmedova1718@gmail.com', icon: 'mail' as const },
  ],
}

export type ProjectEntry = (typeof portfolioData.projects)[number]

export type SkillGroup = (typeof portfolioData.skillsPresent.engineering)[number]

/** Flat list for chat/templates — preserves every skill item from grouped rows */
export function flattenSkillGroups(groups: SkillGroup[]): string[] {
  return groups.flatMap((g) => g.items)
}
