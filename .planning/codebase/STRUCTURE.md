# Project Structure

```
├── index.html                  # Entry point HTML, mounts #root
├── package.json                # Dependencies, scripts, metadata
├── package-lock.json           # Dependency lock file
├── vite.config.ts              # Vite build config (React + Tailwind plugins)
├── tsconfig.json               # TypeScript config
├── .gitignore                  # Git ignore rules
├── .env.example                # Environment variable documentation
├── README.md                   # Setup instructions (npm install, npm run dev)
├── metadata.json               # AI Studio deployment metadata
│
├── public/                     # Static assets (copied as-is to dist)
│   ├── favicon.png
│   ├── about-image.jpg
│   ├── Branding1.jpg
│   ├── Branding2.jpg
│   ├── Print1.jpg
│   ├── Print2.png
│   ├── Digital.jpg
│   └── Photography.jpg
│
└── src/                        # Application source code
    ├── main.tsx                # React entry point (createRoot + StrictMode)
    ├── App.tsx                 # Root component, composes all sections
    ├── index.css               # Tailwind imports, theme CSS variables, base styles
    │
    └── components/             # UI components
        ├── Navbar.tsx          # Navigation bar (scroll-aware, mobile menu, theme toggle)
        ├── Hero.tsx            # Landing section (full-screen, CTA buttons)
        ├── About.tsx           # About section (image, content, animated stats counters)
        ├── Services.tsx        # Services section (8 service cards grid, exports servicesData)
        ├── Portfolio.tsx       # Portfolio section (filterable project grid)
        ├── Booking.tsx         # Booking form (WhatsApp-based lead capture)
        ├── Contact.tsx         # Contact section (info cards, WhatsApp CTA)
        ├── Footer.tsx          # Footer (links, copyright with dynamic year)
        ├── ThemeToggle.tsx     # Dark/light theme toggle (localStorage persistence)
        └── ScrollToTop.tsx     # Scroll-to-top floating button
```

## Directory / File Roles

### Root Config Files
| File | Purpose |
|------|---------|
| `index.html` | Single HTML entry with `<div id="root">` and module script tag |
| `package.json` | Dependency manifest, scripts (`dev`, `build`, `lint`) |
| `vite.config.ts` | Vite config: React plugin, Tailwind plugin, env var injection, path aliases |
| `tsconfig.json` | TypeScript strict-lite config (ES2022, bundler module resolution) |
| `.env.example` | Documents required env vars (GEMINI_API_KEY, APP_URL) |

### `public/`
Static files served from the root path. Contains portfolio images and site icon. No subdirectories.

### `src/`
All application source code. Flat structure with one `components/` subdirectory.

### `src/components/`
10 React components, one per file. Each uses default export. No component subdirectories.

## Key Observations
- No `pages/`, `hooks/`, `utils/`, `types/`, or `api/` directories
- No context providers or state management beyond local `useState`
- No separate CSS modules or styled-components — all styles via Tailwind utility classes
- Components are Section-level (each fills a full page section)
