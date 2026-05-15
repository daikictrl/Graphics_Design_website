# Technology Stack

**Analysis Date:** 2026-05-15

## Languages

**Primary:**
- TypeScript 5.8.2 - Used throughout the application (both client and TypeScript type definitions)
- JavaScript (ES2022+) - Transpiled output target via tsconfig

**Secondary:**
- HTML5 - Single entry point at `index.html`
- CSS (Tailwind v4) - All styling via utility classes in `src/index.css`

## Runtime

**Environment:**
- Node.js (via Vite dev server) - Development and build tooling
- Browser (ES Module) - Runtime environment for the production SPA

**Package Manager:**
- npm (lockfile: `package-lock.json`)

## Frameworks

**Core:**
- React 19.0.0 - UI component library (single-page application)
- React DOM 19.0.0 - DOM rendering

**Build:**
- Vite 6.2.0 - Build tool and dev server
- @vitejs/plugin-react 5.0.4 - Vite plugin for React Fast Refresh and JSX transform
- @tailwindcss/vite 4.1.14 - Vite plugin for Tailwind CSS v4 integration

**Styling:**
- Tailwind CSS 4.1.14 - Utility-first CSS framework
- Custom CSS custom properties (light/dark theme) defined in `src/index.css`
- No CSS preprocessor (Sass/Less) detected

**Animation:**
- motion 12.23.24 - Animation library (successor to Framer Motion), used in all components for scroll/reveal/enter animations

**Icons:**
- lucide-react 0.546.0 - Icon component library (ArrowRight, Send, Phone, Mail, MapPin, MessageCircle, Instagram, Twitter, Linkedin, Facebook)

**Testing:**
- Not detected (no test framework or test files found)

## Key Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM rendering for React |
| motion | ^12.23.24 | Declarative UI animations (AnimatePresence, motion components) |
| lucide-react | ^0.546.0 | SVG icon components |
| @google/genai | ^1.29.0 | Google Gemini AI SDK (installed but not actively imported/used) |
| express | ^4.21.2 | Web server framework (installed but not actively used — no server files found) |
| dotenv | ^17.2.3 | Environment variable loading (available but not actively configured) |

## Configuration

**Environment:**
- `.env.example` documents required vars (GEMINI_API_KEY, APP_URL)
- Environment loaded via `loadEnv` in `vite.config.ts`
- `GEMINI_API_KEY` defined as `process.env.GEMINI_API_KEY` and inlined at build time via `define`

**Build Configuration:**
- `vite.config.ts` - Vite configuration with React + Tailwind plugins, path alias `@` -> root, and HMR toggle via `DISABLE_HMR`
- `tsconfig.json` - TypeScript configuration (target ES2022, module ESNext, moduleResolution bundler, JSX react-jsx, path alias `@/*` -> `./*`)
- No ESLint, Prettier, or Biome configuration detected

## Scripts (package.json)

```bash
npm run dev          # Vite dev server on port 3000, host 0.0.0.0
npm run build        # Production build via Vite
npm run preview      # Preview production build
npm run clean        # Remove dist/ directory
npm run lint         # TypeScript type-check (tsc --noEmit)
```

## Platform Requirements

**Development:**
- Node.js (determined by your package manager)
- npm (lockfile provided)
- Environment file with GEMINI_API_KEY and APP_URL

**Production:**
- Static file hosting (Vite build produces `dist/` directory)
- Designed for AI Studio deployment (Cloud Run service URL auto-injected)
- No Node.js server runtime needed in production (pure static SPA)

---

*Stack analysis: 2026-05-15*
