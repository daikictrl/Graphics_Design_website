# Concerns & Risks

## Unused Dependencies

| Package | Risk |
|---------|------|
| `express` ^4.21.2 | Installed but no server files exist. Pure static SPA doesn't need it. Adds 1.2MB to node_modules. |
| `@google/genai` ^1.29.0 | Installed but never imported. Intended for Google Gemini AI functionality that hasn't been built yet. |
| `dotenv` ^17.2.3 | Vite's built-in `loadEnv` handles env loading — dotenv is redundant. |

**Recommendation:** Remove unused deps to reduce install time and dependency surface.

## Security

### Hardcoded WhatsApp Number
The phone number `237696277335` is hardcoded in both `Booking.tsx:42` and `Contact.tsx:109`. Should be configurable via env var.

### Hardcoded Contact Details
Email addresses (`hello@impactgraphics.com`, `support@impactgraphics.com`) and address hardcoded in `Contact.tsx`.

### API Key Exposure
`GEMINI_API_KEY` is inlined into the client bundle via Vite's `define`. This makes it visible in browser devtools. If the key is meant to be public (e.g., for a client-side Gemini call), verify it's properly restricted. If it should be secret, a backend proxy is required.

### No Input Sanitization
Booking form data is directly interpolated into a URL-encoded WhatsApp message with no sanitization or validation beyond HTML5 `required` attributes. Malicious input could manipulate the message format.

## Performance

### Image Optimization
- Portfolio images are large JPEG/PNG files with no responsive variants
- No `loading="lazy"` or `fetchpriority` attributes on `<img>` tags
- No WebP/AVIF format alternatives
- No image dimension attributes (can cause layout shift)

### External Resource
- `picsum.photos` in Hero section — external CDN with no fallback if unavailable
- No placeholder or skeleton loading state for images

## SEO & Accessibility

### Missing Meta Tags
- No `<meta name="description">`
- No Open Graph / Twitter Card meta tags
- No structured data (JSON-LD)
- No canonical URL

### Accessibility Concerns
- No `aria-current` for active nav links
- No keyboard trap handling in mobile menu
- No focus management when mobile menu opens/closes
- No skip-to-content link
- Portfolio hover overlays rely on CSS only (no keyboard activation)
- Color contrast of small text (`text-[10px] text-muted-foreground`) should be verified against WCAG

## Code Quality

### No Error Handling
- `Booking.tsx`: No try/catch if `window.open` is blocked by popup blocker
- No form submission feedback (loading state, success/error message)
- No offline detection

### No Testing
Zero test coverage. See `TESTING.md`.

### No Linting
No ESLint config. Only `tsc --noEmit` for validation. Inconsistent code patterns may exist undetected.

### Scroll-Based Active Section
`Navbar`'s active section detection uses `getBoundingClientRect` with `window.innerHeight / 2` threshold. This may not work correctly during rapid scrolling or with dynamic content height changes.

## Maintainability

### No CSS Organization
All CSS in a single `index.css` file. Component-specific styles would need new patterns (CSS modules, etc.).

### No Hooks Directory
All logic lives inside components. No custom hooks extracted for reusable logic (scroll detection, theme, etc.).

### `package.json` Name
Package name is `"react-example"` rather than the actual project name "Impact Graphics".

### `useLayoutEffect` in Navbar
`useLayoutEffect` with scroll listener runs on every scroll event. Consider throttling/debouncing.

## Browser Compatibility

- Uses `window.scrollTo({ behavior: 'smooth' })` — no polyfill for older browsers
- Relies on CSS `scroll-behavior: smooth` — same concern
- ES2022 target + bundler module resolution — ensure target browser support

## SSR Compatibility
Patterns like direct `window`/`document` access would break in server-side rendering. Currently acceptable for a pure SPA.
