# Portfolio Léonard Baraton — Refonte 2026

**Date :** 2026-07-15  
**Statut :** Approuvé

---

## Contexte

Refonte complète du portfolio one-page en site multi-pages. Changement de posture : développeur freelance (LB Freelance, micro-entreprise) qui livre des produits réels — pas étudiant cherchant un stage. Cible : TPE, associations, startups.

---

## Direction artistique

**Ambiance :** Sci-fi cinématique, holographique, immersif. Gaming/movie intro vibe.

**Palette :**
- Fond : `#050510` (near-black violet)
- Accent primaire : `#818cf8` (indigo-400) — neon glows
- Accent secondaire : `#06b6d4` (cyan-400) — highlights
- Cards : `rgba(255,255,255,0.04)` + `backdrop-blur-md` + border `rgba(255,255,255,0.08)`

**Typographie :**
- Titres : Space Grotesk 900, gradient text indigo→cyan
- Labels/meta : JetBrains Mono uppercase tracking-widest
- Corps : Space Grotesk 400

**Particules hero :** Canvas 2D, ~150 points, lignes de connexion < 120px, mouse-aware. `prefers-reduced-motion` → particules statiques.

**Transitions de page :** Framer Motion AnimatePresence, fade + translateY(20px)→0, 0.4s ease-out.

**Glassmorphism cards :** `GlassCard` composant réutilisable.

---

## Stack technique

| Besoin | Solution |
|---|---|
| Routing | react-router-dom v7 (`createBrowserRouter`) |
| Animations/transitions | framer-motion (AnimatePresence) |
| Particules | Canvas 2D custom hook `useParticles` |
| Glassmorphism | TailwindCSS v4 backdrop-blur |
| Fonts | Space Grotesk + JetBrains Mono (Google Fonts) |
| Icons | lucide-react |
| Base | React 19 + TypeScript + Vite + TailwindCSS v4 |

---

## Architecture fichiers

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   ├── ParticleField.tsx
│   │   ├── NeonBadge.tsx
│   │   └── PageTransition.tsx
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx    # template commun pour les 4 projets
│   ├── About.tsx
│   └── Contact.tsx
├── data/
│   └── projects.ts
└── hooks/
    └── useParticles.ts
```

---

## Pages

### `/` — Home
- Hero fullscreen : ParticleField bg, h1 "Léonard Baraton" gradient, tagline freelance, 2 CTA
- **Tagline (3 options à choisir) :**
  1. "Je construis et je livre."
  2. "Développeur freelance — du code au produit."
  3. "Je transforme vos idées en produits."
- Grid 4 GlassCard projets (aperçu minimal) → liens /projets/*
- Section "À propos en 3 lignes" + lien /a-propos

### `/projets` — Liste projets
- Filtres légers : Tous / Web / Automatisation
- Grid 4 GlassCard : nom + stack + description courte + lien page dédiée

### `/projets/spotme` `/projets/guestly` `/projets/cockpit` `/projets/area`
- Stub minimal : nom projet + stack badges + "Contenu à venir"
- AREA : contenu réel depuis profile.ts
- Pages personnalisées entièrement plus tard par le client

### `/a-propos`
- Expérience : ONITI stagiaire développeur, juin–déc 2024, Nantes
- Formation : "Formé à Epitech Nantes" (jamais "diplômé"), 2022–présent
- Stack : grille de badges groupés (Langages / Frameworks / Outils)
- Langues : FR natif, EN C1, DE scolaire

### `/contact`
- Titre : "Travaillons ensemble"
- Email + LinkedIn + GitHub (liens directs)
- Formulaire simple : nom / email / message → `mailto:` fallback
- Ton : prise de contact pro, zéro mention stage/emploi

---

## Accessibilité

- Focus visible sur tous les éléments interactifs
- `prefers-reduced-motion` : désactive particules animées, transitions simplifiées
- Responsive jusqu'au mobile (breakpoints Tailwind)
- Contraste texte sur fond dark : vérifier ratio > 4.5:1

---

## À retirer de l'ancien site

- Projets académiques : R-TYPE, CHISEL, EPITRELLO
- Badge/titre "Étudiant Développeur Full-Stack"
- Toute mention "disponible pour un stage" / "ouvert aux opportunités"
- Site one-page → multi-pages avec router

---

## Hors scope

- Backend formulaire contact (mailto fallback suffit)
- Analytics
- CMS
- Contenu détaillé pages SpotMe / Guestly / Cockpit (personnalisé plus tard)
