# Portfolio Refonte — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Léonard Baraton's portfolio as a multi-page sci-fi dark SPA with canvas particle hero, glassmorphism cards, and Framer Motion page transitions — posture "freelance dev who ships" not "student seeking internship."

**Architecture:** React Router v7 `createBrowserRouter` with a shared `Layout` component (Navbar + AnimatePresence + Footer). Each page is a standalone component. Canvas particle animation lives in a custom hook (`useParticles`). UI primitives (`GlassCard`, `NeonBadge`) are shared across pages.

**Tech Stack:** React 19, TypeScript, Vite, TailwindCSS v4, react-router-dom v7, framer-motion, lucide-react, Canvas 2D (no WebGL), Google Fonts (Space Grotesk + JetBrains Mono)

## Global Constraints

- Fond: `#050510` (near-black violet)
- Accent primaire: `#818cf8` (indigo-400) — neon glows
- Accent secondaire: `#06b6d4` (cyan-400) — highlights
- Cards: `rgba(255,255,255,0.04)` bg + `backdrop-blur-md` + border `rgba(255,255,255,0.08)`
- Titres: Space Grotesk 900, gradient indigo→cyan
- Labels/meta: JetBrains Mono uppercase tracking-widest
- `prefers-reduced-motion`: disable all animations/particles
- Focus visible: `outline: 2px solid #818cf8` on every interactive element
- Responsive: works on mobile (min 320px)
- Never write "diplômé de Epitech" — always "formé à Epitech"
- Never mention stage/emploi/candidature
- No lorem ipsum anywhere
- Pages projet (SpotMe, Guestly, Cockpit): stub only — "Contenu à venir"

---

## File Map

**Create:**
- `src/Layout.tsx` — shared layout (Navbar + AnimatePresence + Footer)
- `src/components/layout/Navbar.tsx` — fixed nav, active links, mobile hamburger
- `src/components/layout/Footer.tsx` — links + copyright
- `src/components/ui/GlassCard.tsx` — glassmorphism card primitive
- `src/components/ui/NeonBadge.tsx` — tech stack badge
- `src/components/ui/ParticleField.tsx` — canvas 2D particle canvas
- `src/hooks/useParticles.ts` — particle animation loop
- `src/data/projects.ts` — project data
- `src/pages/Home.tsx` — `/`
- `src/pages/Projects.tsx` — `/projets`
- `src/pages/ProjectDetail.tsx` — template + 4 named exports for `/projets/*`
- `src/pages/About.tsx` — `/a-propos`
- `src/pages/Contact.tsx` — `/contact`

**Modify:**
- `index.html` — Google Fonts preload, title, lang="fr"
- `src/index.css` — design tokens, global styles, @theme fonts
- `src/main.tsx` — replace App with RouterProvider
- `src/App.tsx` — delete (replaced by Layout.tsx + router)

---

## Task 1: Install dependencies + fonts + design tokens

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `index.html`
- Modify: `src/index.css`
- Delete: `src/App.css`

**Interfaces:**
- Produces: `framer-motion`, `react-router-dom`, `lucide-react` available in project; CSS design tokens; `font-sans` = Space Grotesk, `font-mono` = JetBrains Mono

- [ ] **Step 1: Install dependencies**

```bash
npm install react-router-dom framer-motion lucide-react
```

Expected output: `added N packages`

- [ ] **Step 2: Update index.html**

Replace the full content of `index.html`:

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Léonard Baraton — Développeur Freelance</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Replace src/index.css**

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #050510;
  color: #f1f5f9;
  font-family: 'Space Grotesk', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

*:focus-visible {
  outline: 2px solid #818cf8;
  outline-offset: 2px;
  border-radius: 4px;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #050510;
}
::-webkit-scrollbar-thumb {
  background: rgba(129, 140, 248, 0.3);
  border-radius: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Delete src/App.css**

```bash
rm src/App.css
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server on http://localhost:5173, no TypeScript errors in console (existing App.tsx import of App.css will error — that's fine, we'll fix App.tsx in Task 6).

---

## Task 2: Core UI primitives — GlassCard + NeonBadge

**Files:**
- Create: `src/components/ui/GlassCard.tsx`
- Create: `src/components/ui/NeonBadge.tsx`

**Interfaces:**
- Produces:
  - `GlassCard({ children, className?, hover? })` — glassmorphism wrapper div with optional hover lift
  - `NeonBadge({ label, color? })` — inline badge, color: `'indigo' | 'cyan' | 'default'`

- [ ] **Step 1: Create src/components/ui/GlassCard.tsx**

```bash
mkdir -p src/components/ui
```

```tsx
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create src/components/ui/NeonBadge.tsx**

```tsx
interface NeonBadgeProps {
  label: string;
  color?: 'indigo' | 'cyan' | 'default';
}

const colorMap = {
  indigo: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
  cyan: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  default: 'text-slate-300 border-slate-500/30 bg-slate-500/10',
};

export function NeonBadge({ label, color = 'default' }: NeonBadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono border tracking-widest uppercase ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npm run build 2>&1 | head -30
```

Expected: errors only from App.tsx (App.css import) — GlassCard and NeonBadge should compile cleanly.

---

## Task 3: ParticleField — canvas hook + component

**Files:**
- Create: `src/hooks/useParticles.ts`
- Create: `src/components/ui/ParticleField.tsx`

**Interfaces:**
- Produces:
  - `useParticles(): React.RefObject<HTMLCanvasElement>` — attaches animation loop to canvas ref
  - `ParticleField` — `<canvas>` element, `absolute inset-0 w-full h-full pointer-events-none`

- [ ] **Step 1: Create src/hooks/useParticles.ts**

```bash
mkdir -p src/hooks
```

```ts
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const PARTICLE_COLORS = [
  'rgba(129, 140, 248, 0.7)',
  'rgba(6, 182, 212, 0.7)',
  'rgba(129, 140, 248, 0.3)',
  'rgba(6, 182, 212, 0.3)',
];
const COUNT = 140;
const CONNECTION_DIST = 120;
const MOUSE_RADIUS = 150;
const SPEED_CAP = 1.5;

export function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.18 * (1 - dist / CONNECTION_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        if (!reducedMotion) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < MOUSE_RADIUS && mdist > 0) {
            p.vx += (mdx / mdist) * 0.015;
            p.vy += (mdy / mdist) * 0.015;
          }

          const speed = Math.hypot(p.vx, p.vy);
          if (speed > SPEED_CAP) {
            p.vx = (p.vx / speed) * SPEED_CAP;
            p.vy = (p.vy / speed) * SPEED_CAP;
          }

          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onResize() {
      resize();
      init();
      if (!reducedMotion) draw();
    }

    resize();
    init();
    draw();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return canvasRef;
}
```

- [ ] **Step 2: Create src/components/ui/ParticleField.tsx**

```tsx
import { useParticles } from '../../hooks/useParticles';

export function ParticleField() {
  const canvasRef = useParticles();
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 3: Verify no TS errors**

```bash
npx tsc --noEmit 2>&1 | grep -v "App\."
```

Expected: no errors from useParticles.ts or ParticleField.tsx.

---

## Task 4: Layout components — Navbar + Footer + Layout

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/Layout.tsx`

**Interfaces:**
- Consumes: `react-router-dom` (NavLink, useLocation, Outlet), `framer-motion` (AnimatePresence, motion)
- Produces: `<Layout />` — root route element with Navbar, AnimatePresence-wrapped Outlet, Footer

- [ ] **Step 1: Create src/components/layout/Navbar.tsx**

```bash
mkdir -p src/components/layout
```

```tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { to: '/projets', label: 'Projets' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: 'rgba(5, 5, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="font-mono text-sm font-bold tracking-[0.3em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors"
        >
          LB
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-200 transition-colors p-1 rounded"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <ul className="px-6 py-5 flex flex-col gap-5">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-indigo-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Create src/components/layout/Footer.tsx**

```tsx
export function Footer() {
  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-slate-600 tracking-widest uppercase">
          LB Freelance — 2026
        </span>
        <div className="flex gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/Leonardbaraton' },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/léonard-baraton-5a91362b5/',
            },
            { label: 'Email', href: 'mailto:leonardbaraton@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="font-mono text-xs text-slate-600 hover:text-slate-300 transition-colors tracking-wide uppercase"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create src/Layout.tsx**

```tsx
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

export function Layout() {
  const location = useLocation();

  return (
    <div style={{ background: '#050510', color: '#f1f5f9', minHeight: '100vh' }}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Verify no TS errors in new files**

```bash
npx tsc --noEmit 2>&1 | grep -E "(Navbar|Footer|Layout)" | head -20
```

Expected: no errors.

---

## Task 5: Data layer

**Files:**
- Create: `src/data/projects.ts`

**Interfaces:**
- Produces:
  - `Project` interface: `{ slug, title, description, stack: string[], category: 'web' | 'automatisation' | 'mobile', link?: string, github?: string }`
  - `projects: Project[]` — array of 4 projects (SpotMe, Guestly, Cockpit stubs + AREA with real content)

- [ ] **Step 1: Create src/data/projects.ts**

```bash
mkdir -p src/data
```

```ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  category: 'web' | 'automatisation' | 'mobile';
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    slug: 'spotme',
    title: 'SpotMe',
    description: 'Contenu à venir.',
    stack: [],
    category: 'web',
  },
  {
    slug: 'guestly',
    title: 'Guestly',
    description: 'Contenu à venir.',
    stack: [],
    category: 'web',
  },
  {
    slug: 'cockpit',
    title: 'Cockpit',
    description: 'Contenu à venir.',
    stack: [],
    category: 'web',
  },
  {
    slug: 'area',
    title: 'AREA — Automatisation Web',
    description:
      "Application web type IFTTT connectant divers services (Discord, GitHub, etc.). Développement d'une feature OAuth et intégration d'APIs tierces. Mise en place de « background workers » et d'un système d'alertes via Docker et PostgreSQL.",
    stack: ['FastAPI', 'React', 'Docker', 'PostgreSQL'],
    category: 'automatisation',
  },
];
```

- [ ] **Step 2: Verify compile**

```bash
npx tsc --noEmit 2>&1 | grep "projects.ts"
```

Expected: no output (no errors).

---

## Task 6: Router setup — wire everything together

**Files:**
- Modify: `src/main.tsx`
- Delete: `src/App.tsx`
- Create: `src/pages/.gitkeep` (placeholder until pages are created in Tasks 7–11)

**Interfaces:**
- Consumes: `Layout` from `./Layout`, all page components (stubs — will be replaced in Tasks 7–11)
- Produces: RouterProvider with `createBrowserRouter`, 8 routes

- [ ] **Step 1: Create stub page files so the router compiles**

Create each file with a minimal placeholder component:

`src/pages/Home.tsx`:
```tsx
export function Home() {
  return <div className="pt-32 px-6 text-slate-100">Home — à venir</div>;
}
```

`src/pages/Projects.tsx`:
```tsx
export function Projects() {
  return <div className="pt-32 px-6 text-slate-100">Projets — à venir</div>;
}
```

`src/pages/ProjectDetail.tsx`:
```tsx
export function ProjectSpotme() {
  return <div className="pt-32 px-6 text-slate-100">SpotMe — à venir</div>;
}
export function ProjectGuestly() {
  return <div className="pt-32 px-6 text-slate-100">Guestly — à venir</div>;
}
export function ProjectCockpit() {
  return <div className="pt-32 px-6 text-slate-100">Cockpit — à venir</div>;
}
export function ProjectArea() {
  return <div className="pt-32 px-6 text-slate-100">AREA — à venir</div>;
}
```

`src/pages/About.tsx`:
```tsx
export function About() {
  return <div className="pt-32 px-6 text-slate-100">À propos — à venir</div>;
}
```

`src/pages/Contact.tsx`:
```tsx
export function Contact() {
  return <div className="pt-32 px-6 text-slate-100">Contact — à venir</div>;
}
```

- [ ] **Step 2: Replace src/main.tsx**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import {
  ProjectSpotme,
  ProjectGuestly,
  ProjectCockpit,
  ProjectArea,
} from './pages/ProjectDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projets', element: <Projects /> },
      { path: 'projets/spotme', element: <ProjectSpotme /> },
      { path: 'projets/guestly', element: <ProjectGuestly /> },
      { path: 'projets/cockpit', element: <ProjectCockpit /> },
      { path: 'projets/area', element: <ProjectArea /> },
      { path: 'a-propos', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

- [ ] **Step 3: Delete src/App.tsx**

```bash
rm src/App.tsx
```

- [ ] **Step 4: Verify dev server + all routes navigable**

```bash
npm run dev
```

Open http://localhost:5173 — expect: dark background `#050510`, Navbar visible with "LB" logo and links "Projets / À propos / Contact". Navigate to `/projets`, `/a-propos`, `/contact` — each shows placeholder text and page transitions (fade + slide). No console errors.

- [ ] **Step 5: Commit working router skeleton**

```bash
git add src/ index.html
git commit -m "feat: multi-page router skeleton with DA foundation"
```

---

## Task 7: Home page

**Files:**
- Modify: `src/pages/Home.tsx` (replace stub)

**Interfaces:**
- Consumes: `ParticleField`, `GlassCard`, `NeonBadge`, `projects` from `../data/projects`, `Link` from `react-router-dom`, `motion` from framer-motion
- Produces: `/` route — hero + project grid + about teaser

- [ ] **Step 1: Replace src/pages/Home.tsx**

```tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParticleField } from '../components/ui/ParticleField';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonBadge } from '../components/ui/NeonBadge';
import { projects } from '../data/projects';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        <ParticleField />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(129,140,248,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-block font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-8">
              Développeur Freelance · Nantes
            </span>

            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 leading-[0.9]"
              style={GRADIENT_TEXT}
            >
              Léonard<br />Baraton
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
              Je construis et je livre.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #06b6d4)',
                }}
              >
                Voir les projets <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-slate-300 transition-all hover:scale-105 hover:text-slate-100 active:scale-95"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                Me contacter
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs tracking-widest uppercase text-slate-600">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom, rgba(129,140,248,0.5), transparent)',
            }}
          />
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400">
            Projets
          </span>
          <h2
            className="text-3xl md:text-4xl font-black mt-2"
            style={GRADIENT_TEXT}
          >
            Ce que je construis
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/projets/${p.slug}`}
                className="block h-full rounded-2xl"
              >
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-slate-100 font-bold text-lg">{p.title}</h3>
                    <ArrowRight
                      size={16}
                      className="text-indigo-400 mt-1 flex-shrink-0"
                    />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {p.description}
                  </p>
                  {p.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((tech) => (
                        <NeonBadge key={tech} label={tech} color="indigo" />
                      ))}
                    </div>
                  )}
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors text-sm"
          >
            Tous les projets <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section
        className="px-6 py-16 max-w-6xl mx-auto"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400">
              À propos
            </span>
            <h2 className="text-2xl font-bold text-slate-100 mt-2 mb-3">
              Formé à Epitech. Livraison garantie.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Développeur freelance basé à Nantes. Je construis des applications web pour des
              clients qui veulent du concret — de la première ligne de code au déploiement.
            </p>
          </div>
          <Link
            to="/a-propos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-300 transition-all hover:scale-105 self-start md:self-center"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            En savoir plus <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify visually**

```bash
npm run dev
```

Open http://localhost:5173. Verify:
- Dark background `#050510`
- Particle canvas visible (140 dots + connecting lines, mouse-reactive)
- "Léonard Baraton" in gradient indigo→cyan, large
- "Développeur Freelance · Nantes" in mono above
- "Je construis et je livre." tagline
- Two CTA buttons (gradient "Voir les projets", glass "Me contacter")
- Scroll indicator with animated line
- 4 project cards below, hover lifts each card
- About teaser section at bottom
- No `pointer-events-none` conflict: clicking cards/buttons works

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx src/components/ui/ src/hooks/
git commit -m "feat: home page with particle hero and project grid"
```

---

## Task 8: Projects list page

**Files:**
- Modify: `src/pages/Projects.tsx` (replace stub)

**Interfaces:**
- Consumes: `GlassCard`, `NeonBadge`, `projects`, `Link`, `motion`
- Produces: `/projets` — header + filter buttons + project grid

- [ ] **Step 1: Replace src/pages/Projects.tsx**

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonBadge } from '../components/ui/NeonBadge';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

type Filter = 'tous' | Project['category'];

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'Tous', value: 'tous' },
  { label: 'Web', value: 'web' },
  { label: 'Automatisation', value: 'automatisation' },
];

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export function Projects() {
  const [filter, setFilter] = useState<Filter>('tous');

  const visible =
    filter === 'tous' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="px-6 py-32 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400">
          Projets
        </span>
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight mt-2 mb-8"
          style={GRADIENT_TEXT}
        >
          Ce que je livre
        </h1>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 rounded-full text-sm font-mono tracking-wide border transition-all ${
                filter === value
                  ? 'text-indigo-300 border-indigo-500/40 bg-indigo-500/12'
                  : 'text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {visible.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`/projets/${p.slug}`} className="block h-full rounded-2xl">
              <GlassCard className="h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs tracking-widest uppercase text-slate-500 block mb-1">
                      {p.category}
                    </span>
                    <h2 className="text-slate-100 font-bold text-lg">{p.title}</h2>
                  </div>
                  <ArrowRight size={16} className="text-indigo-400 mt-1 flex-shrink-0" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {p.description}
                </p>
                {p.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((tech) => (
                      <NeonBadge key={tech} label={tech} color="indigo" />
                    ))}
                  </div>
                )}
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify visually**

Open http://localhost:5173/projets. Verify:
- Page title "Ce que je livre" in gradient
- 3 filter buttons visible
- Clicking "Automatisation" shows only AREA card
- Clicking "Tous" shows all 4 cards
- Cards have hover lift effect
- AREA card shows stack badges (FastAPI, React, Docker, PostgreSQL)

---

## Task 9: Project detail pages (stubs)

**Files:**
- Modify: `src/pages/ProjectDetail.tsx` (replace stubs with real template)

**Interfaces:**
- Consumes: `projects` (finds by slug), `NeonBadge`, `Link` (ArrowLeft back button), `motion`
- Produces: 4 named exports `ProjectSpotme`, `ProjectGuestly`, `ProjectCockpit`, `ProjectArea` — each renders the template with their slug's data

- [ ] **Step 1: Replace src/pages/ProjectDetail.tsx**

```tsx
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeonBadge } from '../components/ui/NeonBadge';
import { projects } from '../data/projects';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <div className="px-6 py-32 max-w-4xl mx-auto text-slate-400">
        Projet introuvable.
      </div>
    );
  }

  return (
    <div className="px-6 py-32 max-w-4xl mx-auto">
      <Link
        to="/projets"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-12 font-mono text-sm tracking-wide rounded"
      >
        <ArrowLeft size={16} /> Projets
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
          {project.category}
        </span>

        <h1
          className="text-4xl md:text-6xl font-black tracking-tight mb-8"
          style={GRADIENT_TEXT}
        >
          {project.title}
        </h1>

        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map((tech) => (
              <NeonBadge key={tech} label={tech} color="indigo" />
            ))}
          </div>
        )}

        <p className="text-slate-300 text-lg leading-relaxed mb-16">
          {project.description}
        </p>

        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'rgba(129, 140, 248, 0.04)',
            border: '1px solid rgba(129, 140, 248, 0.12)',
          }}
        >
          <span className="font-mono text-sm text-slate-500 tracking-wide">
            Contenu détaillé en cours de rédaction
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectSpotme() { return <ProjectDetail slug="spotme" />; }
export function ProjectGuestly() { return <ProjectDetail slug="guestly" />; }
export function ProjectCockpit() { return <ProjectDetail slug="cockpit" />; }
export function ProjectArea() { return <ProjectDetail slug="area" />; }
```

- [ ] **Step 2: Verify visually**

Navigate to http://localhost:5173/projets/area. Verify:
- "← Projets" back link works
- Title "AREA — Automatisation Web" in gradient
- Stack badges: FastAPI, React, Docker, PostgreSQL
- Full description text
- "Contenu détaillé en cours de rédaction" stub block
- Navigate to `/projets/spotme` — shows "SpotMe" title + stub block, no stack badges

---

## Task 10: About page

**Files:**
- Modify: `src/pages/About.tsx` (replace stub)

**Interfaces:**
- Consumes: `GlassCard`, `NeonBadge`, `Link`, `motion`
- Produces: `/a-propos` — bio + timeline (ONITI + Epitech) + skills grid + languages + CTA

- [ ] **Step 1: Replace src/pages/About.tsx**

```tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonBadge } from '../components/ui/NeonBadge';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const SKILLS = {
  Langages: { items: ['C / C++20', 'JavaScript', 'TypeScript', 'Python', 'HTML / CSS'], color: 'indigo' as const },
  Frameworks: { items: ['React', 'FastAPI', 'Node.js'], color: 'cyan' as const },
  Outils: {
    items: ['Git / GitHub', 'Docker', 'PostgreSQL', 'CI/CD GitHub Actions', 'Linux'],
    color: 'default' as const,
  },
};

const LANGUAGES = [
  { lang: 'Français', level: 'Natif' },
  { lang: 'Anglais', level: 'C1' },
  { lang: 'Allemand', level: 'Scolaire' },
];

export function About() {
  return (
    <div className="px-6 py-32 max-w-4xl mx-auto">
      <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
        À propos
      </span>
      <h1
        className="text-4xl md:text-6xl font-black tracking-tight mb-12"
        style={GRADIENT_TEXT}
      >
        Qui je suis
      </h1>

      {/* Bio */}
      <div className="mb-16 space-y-4">
        <p className="text-slate-300 text-lg leading-relaxed">
          Développeur freelance basé à Nantes, je construis des applications web pour des
          clients qui veulent du concret — de la première ligne de code au déploiement en
          production.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Formé à Epitech Nantes, j'ai renforcé mes compétences par un stage de 6 mois chez
          ONITI, où j'ai livré des sites clients et développé des outils internes.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-slate-100 mb-8">Parcours</h2>
        <div className="space-y-5">
          {[
            {
              period: 'Juin 2024 – Décembre 2024',
              periodColor: 'text-indigo-400',
              title: 'Stagiaire Développeur — ONITI, Nantes',
              items: [
                "Création de sites internet pour les clients de l'entreprise",
                'Application de gestion du temps pour prises de paroles',
                'Présentation de projets, formation des collaborateurs',
              ],
            },
            {
              period: '2022 – Présent',
              periodColor: 'text-cyan-400',
              title: 'Formé à Epitech Nantes',
              items: [
                "Programme Grande École (Expert en Technologies de l'Information) — en cours",
              ],
            },
          ].map((entry, i) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard hover={false}>
                <span className={`font-mono text-xs tracking-widest uppercase ${entry.periodColor}`}>
                  {entry.period}
                </span>
                <h3 className="text-slate-100 font-bold mt-1 mb-3">{entry.title}</h3>
                <ul className="text-slate-400 text-sm leading-relaxed space-y-1">
                  {entry.items.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-slate-100 mb-8">Compétences</h2>
        <div className="space-y-6">
          {Object.entries(SKILLS).map(([group, { items, color }]) => (
            <div key={group}>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-slate-500 mb-3 block">
                {group}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <NeonBadge key={s} label={s} color={color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-slate-100 mb-6">Langues</h2>
        <div className="flex gap-8 flex-wrap">
          {LANGUAGES.map(({ lang, level }) => (
            <div key={lang} className="flex flex-col">
              <span className="text-slate-200 font-medium">{lang}</span>
              <span className="font-mono text-xs text-slate-500 tracking-wide uppercase mt-0.5">
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #818cf8, #06b6d4)' }}
      >
        Démarrons un projet <ArrowRight size={16} />
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Verify visually**

Open http://localhost:5173/a-propos. Verify:
- Bio text renders correctly (no "diplômé", no "stage", uses "formé à Epitech")
- Two timeline cards (ONITI + Epitech)
- Skills grouped under Langages / Frameworks / Outils with correct badge colors
- Languages row: Français Natif / Anglais C1 / Allemand Scolaire
- "Démarrons un projet" CTA links to /contact

---

## Task 11: Contact page

**Files:**
- Modify: `src/pages/Contact.tsx` (replace stub)

**Interfaces:**
- Consumes: `motion`, `Github`, `Linkedin`, `Mail` from lucide-react
- Produces: `/contact` — title + form (mailto fallback) + 3 social links

- [ ] **Step 1: Replace src/pages/Contact.tsx**

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const INPUT_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
};

const CONTACT_LINKS = [
  {
    icon: <Mail size={18} />,
    label: 'leonardbaraton@gmail.com',
    href: 'mailto:leonardbaraton@gmail.com',
  },
  {
    icon: <Github size={18} />,
    label: 'github.com/Leonardbaraton',
    href: 'https://github.com/Leonardbaraton',
  },
  {
    icon: <Linkedin size={18} />,
    label: 'linkedin — Léonard Baraton',
    href: 'https://www.linkedin.com/in/léonard-baraton-5a91362b5/',
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact — ${form.name}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\nEmail : ${form.email}\n\nMessage :\n${form.message}`,
    );
    window.location.href = `mailto:leonardbaraton@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="px-6 py-32 max-w-5xl mx-auto">
      <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
        Contact
      </span>
      <h1
        className="text-4xl md:text-6xl font-black tracking-tight mb-4"
        style={GRADIENT_TEXT}
      >
        Travaillons ensemble
      </h1>
      <p className="text-slate-400 text-lg mb-16 max-w-xl">
        Vous avez un projet à concrétiser ? Parlons-en.
      </p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom', value: form.name, onChange: (v: string) => setForm((f) => ({ ...f, name: v })) },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com', value: form.email, onChange: (v: string) => setForm((f) => ({ ...f, email: v })) },
          ].map(({ id, label, type, placeholder, value, onChange }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block font-mono text-xs tracking-widest uppercase text-slate-400 mb-2"
              >
                {label}
              </label>
              <input
                id={id}
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg px-4 py-3 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all placeholder:text-slate-600"
                style={INPUT_STYLE}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="block font-mono text-xs tracking-widest uppercase text-slate-400 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Décrivez votre projet..."
              className="w-full rounded-lg px-4 py-3 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none placeholder:text-slate-600"
              style={INPUT_STYLE}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #818cf8, #06b6d4)' }}
          >
            Envoyer
          </button>
        </form>

        {/* Links */}
        <div>
          <h2 className="text-lg font-bold text-slate-100 mb-6">Retrouvez-moi</h2>
          <div className="space-y-3">
            {CONTACT_LINKS.map(({ icon, label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] group"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className="text-indigo-400 group-hover:text-cyan-400 transition-colors flex-shrink-0">
                  {icon}
                </span>
                <span className="text-slate-300 text-sm font-mono break-all">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify visually**

Open http://localhost:5173/contact. Verify:
- Title "Travaillons ensemble" in gradient
- Form: Nom / Email / Message fields, all dark glass style
- Submit button gradient; clicking opens default mail client with pre-filled subject + body
- 3 social links (Email / GitHub / LinkedIn) with icon color shift on hover
- No mention of stage or emploi anywhere

---

## Task 12: Final visual + responsive + a11y pass

**Files:** No new files. Fixes as needed.

- [ ] **Step 1: Test all routes in sequence**

Navigate through: `/` → `/projets` → `/projets/area` → `/projets/spotme` → `/a-propos` → `/contact`

Verify at each:
- Page transition animation (fade + translate) fires on navigation
- Navbar "LB" logo links home, active page link highlighted in indigo
- Footer visible with working links

- [ ] **Step 2: Mobile responsive check**

In browser DevTools, set viewport to 375×812 (iPhone). Verify:
- Hero text doesn't overflow (font-size scales with `sm:` breakpoints)
- Navbar hamburger visible, desktop links hidden
- Tapping hamburger opens mobile drawer, links work and close drawer
- Project cards stack to 1 column
- Contact form full-width

- [ ] **Step 3: Verify prefers-reduced-motion**

In DevTools → Rendering → Emulate CSS media: `prefers-reduced-motion: reduce`. Reload home page. Verify:
- Particle canvas draws static dots (no animation loop)
- Scroll indicator line doesn't animate
- Page transition is near-instant (0.01ms)

- [ ] **Step 4: Verify keyboard navigation**

Tab through home page. Verify:
- Focus ring `2px solid #818cf8` visible on all links and buttons
- Hamburger button has visible focus
- Form inputs show focus ring on /contact

- [ ] **Step 5: Final build**

```bash
npm run build
```

Expected: TypeScript compiles cleanly, no errors, dist/ produced.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio refonte — multi-page sci-fi dark DA"
```
