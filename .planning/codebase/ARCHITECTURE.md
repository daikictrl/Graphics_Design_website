# Architecture

## Overall Pattern

**Single-Page Application (SPA)** built with React 19. No client-side router — uses hash/anchor links (`#home`, `#about`, etc.) and scroll behavior for navigation.

## Component Hierarchy

```
main.tsx
└── <StrictMode>
    └── App.tsx
        ├── Navbar          — Fixed top nav, scroll-aware, theme toggle, mobile menu
        ├── <main>
        │   ├── Hero        — Full-screen landing, CTA buttons
        │   ├── About       — Image + content, animated counters
        │   ├── Services    — 8 service cards grid
        │   ├── Portfolio   — Filterable project grid
        │   ├── Booking     — WhatsApp booking form
        │   └── Contact     — Contact info cards + WhatsApp CTA
        ├── Footer          — Links, copyright, services
        └── ScrollToTop     — Floating scroll-to-top button
```

## Data Flow

**No global state management library.** All state is local `useState` / `useEffect` within components.

| State | Component | Mechanism |
|-------|-----------|-----------|
| Theme | `ThemeToggle` | `useState<boolean>` + `localStorage` + `.dark` class on `<html>` |
| Active nav section | `Navbar` | `useState` updated by scroll event listener |
| Mobile menu open | `Navbar` | `useState<boolean>` toggled by hamburger |
| Booking form data | `Booking` | `useState<object>` with centralized `handleChange` |
| Portfolio filter | `Portfolio` | `useState<string>` for active category |
| Scroll-to-top visibility | `ScrollToTop` | `useState<boolean>` based on `scrollY > 500` |
| CountUp animation | `About > CountUp` | `useState<number>` with `setInterval` triggered by `useInView` |

## Data Sharing Between Components

- `Services.tsx` exports `servicesData` array → imported by `Booking.tsx` for the service dropdown
- No context providers, no prop drilling beyond direct parent-child

## Navigation / Routing

- **No React Router** — uses `<a href="#section">` anchor links
- `Navbar` detects active section via `getBoundingClientRect` on scroll
- Sections use `id` attributes (`#home`, `#about`, `#services`, `#portfolio`, `#booking`, `#contact`)

## Theme System

1. CSS custom properties defined in `:root` (light) and `.dark` (dark)
2. `ThemeToggle.tsx` manages a `dark` class on `<html>`
3. Preference persisted to `localStorage('theme')`
4. All components use Tailwind classes referencing theme variables (`bg-background`, `text-foreground`, `border-border`)

## Form Flow

1. User fills Booking form → `handleChange` updates `formData` state
2. Submit → constructs plain-text message → `encodeURIComponent` → `window.open('https://wa.me/...')`
3. No backend API calls, no form data persistence

## Scroll Behavior

- `html { scroll-behavior: smooth }` in `src/index.css:63`
- `Navbar` uses `useLayoutEffect` with scroll listener for scroll state + active section
- `ScrollToTop` uses `useEffect` with scroll listener for visibility
- `Portfolio` uses `AnimatePresence` with `popLayout` for filter transitions

## Animation Pattern

All components use the `motion` library (Framer Motion v12):
- **Entrance:** `initial` / `whileInView` / `viewport={{ once: true }}` with fade + translate
- **Hover:** CSS transitions via Tailwind `group-hover:` classes
- **Exit:** `AnimatePresence` for mobile menu and portfolio items

## Build & Deployment

- `vite build` produces `dist/` with static files
- Designed for AI Studio deployment (Cloud Run auto-injects APP_URL)
- No server runtime needed in production
