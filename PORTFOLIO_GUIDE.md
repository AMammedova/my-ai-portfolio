# Aisel's AI-Powered Portfolio

A beautiful, interactive portfolio featuring an intelligent AI assistant powered by keyword-based intent detection and dynamic response generation.

## Key Features

### AI Assistant
- **Intelligent Intent Detection**: Keyword-based system that understands user queries (experience, projects, skills, AI, etc.)
- **Dynamic Responses**: Generates conversational, recruiter-focused answers from structured portfolio data
- **Natural Typing Animation**: Character-by-character reveal with 1-1.5s delay on first message for authentic feel
- **Visual Feedback**: Typing indicator, blinking cursor, subtle glow effects
- **Smart Suggestions**: Context-aware quick questions based on previous interactions
- **No Hallucinations**: Gracefully declines off-topic questions

### Design
- **Premium Dark Theme**: Deep blacks with vibrant blue accent (oklch 0.65 0.2 264)
- **Glassmorphic Cards**: Subtle borders and soft glows for depth
- **Smooth Animations**: Framer Motion transitions and scroll-triggered reveals
- **Fully Responsive**: Mobile-first design with proper scaling on all devices
- **Accessibility**: Semantic HTML, ARIA labels, and screen-reader friendly

### Sections
1. **Hero** - Engaging intro with AI chat and CTA buttons
2. **About** - Professional summary with key highlights and stats
3. **Experience** - Timeline view with roles, achievements, and tech stacks
4. **Projects** - Grid layout showcasing featured work with impact metrics
5. **Skills** - Organized by category (Frontend, Backend, AI/ML, DevOps) with progress bars
6. **AI Journey** - Deep dive into AI transition and current focus areas
7. **Contact** - Contact form + social links

## Technical Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion
- **Data Management**: Structured portfolio data with AI response engine
- **State Management**: React hooks + motion state

## File Structure

```
lib/
  ├── portfolio-data.ts      # Structured portfolio content
  ├── ai-responses.ts        # Intent detection & response generation
  └── typing-utils.ts        # Typing animation utilities

components/portfolio/
  ├── HeroSection.tsx        # Hero with chat modal
  ├── AboutSection.tsx       # About with stats
  ├── ExperienceSection.tsx  # Timeline experience
  ├── ProjectsSection.tsx    # Projects grid
  ├── SkillsSection.tsx      # Skills with progress
  ├── AISection.tsx          # AI journey details
  ├── ContactSection.tsx     # Contact form
  ├── AIChat.tsx            # Main AI chat component
  ├── NavigationBar.tsx      # Floating nav (desktop only)
  └── StickyAIButton.tsx     # Sticky AI button (after scroll)

app/
  ├── page.tsx              # Main page composition
  ├── layout.tsx            # Root layout with metadata
  └── globals.css           # Theme, animations, global styles
```

## Customization

### Update Portfolio Data
Edit `lib/portfolio-data.ts` to customize:
- Name, title, bio
- Work experience and achievements
- Projects and technologies
- Skills (frontend, backend, AI/ML, DevOps)
- Social media links
- Contact information

### Modify AI Responses
Edit `lib/ai-responses.ts` to:
- Change intent keywords
- Update response templates
- Add new intent types
- Customize suggestions

### Theme Colors
Modify `/app/globals.css` to change:
- Primary accent color (currently blue)
- Dark mode backgrounds
- Glow effects and gradients

## Features Breakdown

### AI Intent Detection
The AI system identifies user intent from keywords:
- `experience, work, career, background` → Experience responses
- `projects, portfolio, built, created` → Projects responses
- `skills, abilities, expertise, tech` → Skills responses
- `ai, machine learning, llm, deep learning` → AI responses
- `about, who, introduce` → About responses
- `hello, hi, hey` → Greeting

### Typing Animation
- First message: 1-1.5 second delay before typing starts
- Character-by-character reveal: ~30ms per character
- Multi-message responses: Staggered timing for natural flow
- Blinking cursor during typing
- Typing indicator dots for visual feedback

### Navigation
- **Desktop**: Fixed right sidebar with scroll-synced active indicator
- **Mobile**: Navigation hidden (focus on content)
- Smooth scroll-to-section behavior
- Active state indicates current section

### Responsive Breakpoints
- **Mobile**: Full-width with optimized spacing
- **Tablet (640px+)**: Two-column layouts where appropriate
- **Desktop (1024px+)**: Three-column grids, floating navigation

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**: http://localhost:3000

4. **Customize**: Update `lib/portfolio-data.ts` with your information

## Production Deployment

1. **Build**:
   ```bash
   pnpm build
   ```

2. **Deploy to Vercel**:
   - Push to GitHub
   - Connect to Vercel
   - Deploy automatically

## Performance Tips

- Images are optimized with next/image
- CSS animations use GPU acceleration
- Lazy-loaded sections with scroll triggers
- Framer Motion handles efficient re-renders
- No external fonts blocking render

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Add email integration for contact form
- Store chat history (localStorage or database)
- Add dark/light theme toggle
- Integrate with CMS for dynamic content
- Add search functionality for portfolio items
- Analytics tracking (PostHog integration)

---

Built with passion for Aisel. Ready to impress recruiters and visitors! 🚀
