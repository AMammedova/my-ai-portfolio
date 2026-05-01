# Quick Start Guide

## What You Have

A fully-functional AI-powered portfolio with:
- ✅ Intent-based AI assistant (no hallucinations)
- ✅ Smooth typing animations with natural delays
- ✅ Premium dark theme with blue accent
- ✅ Fully responsive design
- ✅ 7 portfolio sections (Hero, About, Experience, Projects, Skills, AI, Contact)
- ✅ Floating navigation and sticky AI button
- ✅ Beautiful animations and transitions

## Immediate Customization (10 minutes)

### 1. Update Portfolio Data
Edit `/lib/portfolio-data.ts`:
```typescript
export const portfolioData = {
  name: 'YOUR NAME',  // Change this
  title: 'YOUR TITLE',  // Change this
  bio: 'YOUR BIO',  // And this
  // ... rest of the data
}
```

### 2. Update Social Links
In the same file, update:
```typescript
contact: {
  email: 'your@email.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourprofile',
  twitter: 'https://twitter.com/yourprofile'
}
```

### 3. Customize Experience, Projects, Skills
Update the arrays in `lib/portfolio-data.ts` with your actual data.

## Running Locally

```bash
# Start the dev server
pnpm dev

# Open http://localhost:3000 in your browser
```

## How the AI Assistant Works

The AI uses **keyword-based intent detection**:

### If user types anything with "experience" or "work":
→ Returns information about your experience from `portfolio-data.ts`

### If user types anything with "project" or "portfolio":
→ Returns information about your projects

### If user types anything with "skill" or "tech":
→ Returns information about your skills

### If user types anything with "AI" or "machine learning":
→ Returns information about your AI transition

### Otherwise:
→ Gracefully declines and suggests available topics

## Typing Animation Details

- **First message**: 1-1.5 second delay before typing starts (feels natural)
- **Character reveal**: 30ms between each character
- **Subsequent messages**: 100ms stagger between responses
- **Visual feedback**: Blinking cursor, typing indicator dots
- **Fully responsive**: Animations work smoothly on mobile and desktop

## Sections Overview

| Section | What's Here | Auto-Updates From |
|---------|-----------|------------------|
| Hero | Name, title, bio, CTA | `portfolioData.name/title/bio` |
| About | Professional summary | `portfolioData.about` |
| Experience | Your work history | `portfolioData.experience[]` |
| Projects | Portfolio of work | `portfolioData.projects[]` |
| Skills | Technologies & expertise | `portfolioData.skills` |
| AI | Your AI journey | `portfolioData.aiTransition` |
| Contact | Contact form + social | `portfolioData.contact` |

## Changing Colors

Edit `/app/globals.css` and modify the dark mode section:
```css
.dark {
  --accent: oklch(0.65 0.2 264);  /* Change this to your brand color */
}
```

Common colors:
- Blue (default): `oklch(0.65 0.2 264)`
- Purple: `oklch(0.65 0.2 300)`
- Green: `oklch(0.65 0.2 150)`
- Red: `oklch(0.65 0.2 25)`

## Deploying to Production

### Option 1: Deploy to Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click!

### Option 2: Build and Deploy Anywhere
```bash
pnpm build
# Deploy the .next folder
```

## What Each File Does

- **`lib/portfolio-data.ts`**: Your content (edit this!)
- **`lib/ai-responses.ts`**: AI intent logic (rarely needs changes)
- **`lib/typing-utils.ts`**: Animation timing (leave this alone)
- **`app/globals.css`**: Theme & animations (customize colors here)
- **`components/portfolio/*.tsx`**: Section components (visual adjustments)

## Common Customizations

### Change accent color (blue to green)
1. Open `/app/globals.css`
2. Find `--accent: oklch(0.65 0.2 264);`
3. Change to `--accent: oklch(0.65 0.2 150);`

### Add more projects
1. Open `/lib/portfolio-data.ts`
2. Add object to `projects[]` array
3. It automatically appears in the Projects section

### Update AI responses
1. Open `/lib/ai-responses.ts`
2. Modify `responseTemplates` object
3. Responses are now dynamic from your portfolio data

### Hide the navigation (for mobile-focused design)
1. Open `/components/portfolio/NavigationBar.tsx`
2. Change `hidden lg:flex` to just `hidden`

### Make the portfolio lighter
1. Open `/app/globals.css`
2. In `.dark` section, change `--background: oklch(0.08 0 0);` to `oklch(0.15 0 0);`

## Troubleshooting

**Build errors?**
- Make sure you didn't change TypeScript types in `portfolio-data.ts`
- Check the structure matches the interface

**AI not responding?**
- Chat component will auto-start with greeting
- Make sure `lib/ai-responses.ts` is syntactically correct
- Try typing a keyword like "experience" or "projects"

**Animations not smooth?**
- Check browser console for errors
- Framer Motion is already installed (don't reinstall)
- Clear browser cache and refresh

## Next Steps

1. **Customize data**: Edit `lib/portfolio-data.ts` with your info
2. **Test locally**: Run `pnpm dev` and interact with the AI
3. **Adjust theme**: Change colors in `app/globals.css`
4. **Deploy**: Push to GitHub and deploy to Vercel

---

You're all set! Your AI-powered portfolio is ready to impress. 🎉
