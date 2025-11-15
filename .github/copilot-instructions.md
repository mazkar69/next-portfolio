# Portfolio Codebase - AI Agent Instructions

## Architecture Overview

This is a **Next.js 15** portfolio website using the **App Router** architecture with TypeScript, featuring a single-page scrollable layout with multiple sections (Hero, Skills, Projects, Experience, etc.).

**Key Stack:**
- Next.js 15.2.4 (App Router) with React 19
- TypeScript with strict mode enabled
- Tailwind CSS with custom design tokens
- shadcn/ui component library (Radix UI primitives)
- Framer Motion for animations
- next-themes for dark mode
- pnpm as package manager

## Project Structure

```
app/                    # Next.js App Router - routes and layouts
  layout.tsx           # Root layout with ThemeProvider, Navbar, Footer
  page.tsx             # Homepage - assembles all section components
  api/contact/         # API route for contact form (nodemailer)
  blog/                # Blog pages (currently placeholder data)
  globals.css          # Tailwind base + CSS variables for themes

components/            # Feature components (hero.tsx, projects.tsx, etc.)
  ui/                  # shadcn/ui components (DO NOT EDIT manually)
  theme-provider.tsx   # next-themes wrapper
  
lib/utils.ts          # cn() utility for className merging
public/               # Static assets (images/, projects/, certificates/)
```

## Critical Development Patterns

### 1. Component Creation
- All feature components use `"use client"` directive when using hooks, events, or Framer Motion
- Use motion components from `framer-motion` for animations with consistent patterns:
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
  ```

### 2. Styling System
- **Always use the `cn()` utility** from `@/lib/utils` for className merging
- Use CSS variables defined in `globals.css` for colors: `bg-primary`, `text-muted-foreground`, etc.
- Custom color scales in `tailwind.config.ts` (primary, secondary, accent with 50-900 shades)
- Gradient effects: `.gradient-text` and `.gradient-border` classes (check globals.css)
- Dark mode: Classes automatically swap via CSS variables in `.dark` selector

### 3. shadcn/ui Components
- Managed via `components.json` configuration
- Install new components: `pnpm dlx shadcn@latest add <component>`
- **Never manually edit files in `components/ui/`** - they're auto-generated
- All use Radix UI primitives with custom styling via CVA (class-variance-authority)

### 4. Path Aliases
Import using `@/` prefix as configured in `tsconfig.json` and `components.json`:
```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Hero from "@/components/hero"
```

### 5. Image Handling
- Use Next.js `Image` component with `fill` prop for responsive images
- Images are unoptimized (`next.config.mjs`): `images: { unoptimized: true }`
- Store assets in `public/` directories: `images/`, `projects/`, `certificates/`

## Build Configuration

**Build Commands:**
```bash
pnpm dev          # Development server (Next.js 15)
pnpm build        # Production build
pnpm start        # Serve production build
pnpm lint         # ESLint (currently ignored during builds)
```

**Important Config Notes:**
- ESLint and TypeScript errors ignored during builds (`next.config.mjs`)
- Strict TypeScript enabled but pragmatic with `any` types where needed
- No explicit error boundaries configured

## API Routes

**Contact Form:** `app/api/contact/route.ts`
- POST endpoint using nodemailer
- **Credentials are placeholders** - update SMTP config before deployment
- Sends two emails: one to owner (`mohdazkar@yahoo.com`) and confirmation to user
- Returns 400/500 error responses with JSON messages

## Data Management

**No Database/CMS Currently Connected:**
- Blog posts: Hardcoded array in `app/blog/page.tsx` (placeholder)
- Projects: Static array in `components/projects.tsx`
- All content is component-level data - no external fetching

## Common Tasks

**Adding a New Section:**
1. Create component in `components/<section-name>.tsx` with `"use client"` if interactive
2. Import and add to `app/page.tsx` in the desired order
3. Add section ID for scroll navigation: `<section id="section-name">`

**Adding shadcn Component:**
```bash
pnpm dlx shadcn@latest add <component-name>
```
This auto-updates `components/ui/` and dependencies.

**Theme Customization:**
- Modify CSS variables in `app/globals.css` under `:root` and `.dark`
- Extend Tailwind config in `tailwind.config.ts` for new utilities

## Conventions & Quirks

- **No form validation library** in contact form despite react-hook-form being installed
- **Motion viewport once:** Animations trigger only first time in view
- **Scroll-based navigation:** Uses `document.getElementById()` with smooth scroll
- **Type safety:** Strict TypeScript but some `type` imports to avoid circular dependencies
- **Blog is dormant:** Page exists but not linked in main page (commented out in `page.tsx`)

## External Dependencies

- **Framer Motion:** Used extensively for scroll-triggered animations
- **Lucide React:** Icon library (not Heroicons or Font Awesome)
- **next-themes:** Handles theme switching with system preference support
- **nodemailer:** Email sending (requires SMTP configuration)
- **Radix UI:** Base components for all UI elements via shadcn

## Debugging Tips

- Check terminal for Next.js build warnings/errors (TypeScript issues may be suppressed)
- Verify image paths exist in `public/` if images don't load
- Contact form will fail without valid SMTP credentials
- Dark mode issues: Check CSS variable definitions in `globals.css`
