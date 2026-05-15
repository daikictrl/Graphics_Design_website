# Code Conventions

## Component Structure
- **Default exports** for all components
- **Named functions** (`export default function ComponentName()`), no `React.FC` or arrow functions
- PascalCase component names
- One component per file
- No separate type/interface files — props defined inline or inferred

## Import Order
1. React hooks (`useState`, `useEffect`, etc.)
2. Third-party libraries (lucide-react, motion)
3. Local components (relative paths, no index files)
4. CSS imports (only `src/main.tsx` imports `index.css`)

## Styling
- **Tailwind CSS utility classes only** — no CSS modules, styled-components, or inline styles
- Custom CSS variables defined in `@theme` directive (`src/index.css`)
- Consistent spacing utility usage (`px-4 sm:px-6 lg:px-8` pattern for container padding)
- Responsive patterns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Typography: small caps (`text-[10px] uppercase tracking-[2px]`), specific font sizes with `[]` arbitrary values

## Animation Patterns
- `motion` library for all animations
- **Entrance pattern:** `initial={{ opacity: 0, y: 20 }}` + `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`
- **Staggered delays:** `transition={{ delay: index * 0.1 }}`
- **Exit animations:** `AnimatePresence` wrapper + `exit` prop
- **Layout animations:** `AnimatePresence mode="popLayout"` for filter transitions

## State Management
- `useState` for local component state
- `useEffect` for side effects (scroll listeners, localStorage)
- `useLayoutEffect` in `Navbar` for scroll-dependent layout before paint
- `useInView` in `About` for triggering count-up animation
- No Context API, no Redux, no Zustand

## Form Handling (Booking)
- Centralized `handleChange` with spread: `setFormData({ ...formData, [e.target.name]: e.target.value })`
- HTML5 validation (`required` attribute)
- Form data submitted via `window.open` (WhatsApp deep link)

## Theme Toggle
- Class-based: `.dark` class on `<html>` element
- Persistence: `localStorage.getItem/setItem('theme', 'dark'|'light')`
- No flash prevention (theme not read before render)

## Naming
- Files: PascalCase for components (`Navbar.tsx`), kebab-case for config (`vite.config.ts`)
- Functions: camelCase
- CSS classes: Tailwind utility classes only
- Segment/section IDs: lowercase (`#home`, `#about`, `#services`)

## Linting/Formatting
- No ESLint or Prettier configuration found
- Only validation: `tsc --noEmit` (type checking)
- No commit hooks detected

## Comments
- Minimal inline comments
- SPDX license header in `App.tsx`
