# External Integrations

## WhatsApp API (Booking & Contact)

**Purpose:** Lead generation via WhatsApp chat.

**Endpoints used:**
- `https://wa.me/237696277335` — WhatsApp deep link

**Location:**
- `src/components/Booking.tsx:44` — Form submission opens WhatsApp with pre-filled message
- `src/components/Contact.tsx:109` — "Chat on WhatsApp" button

**Flow:**
1. User fills out booking form (name, phone, email, service, description, budget, deadline)
2. On submit, a plain-text message is constructed from form fields
3. Message is URL-encoded and opened via `window.open()` to `wa.me/<number>?text=<encoded>`
4. WhatsApp handles the rest (desktop app or web client)

**Concerns:**
- No server-side processing or CRM logging
- WhatsApp number is hardcoded (`237696277335`)
- No error handling if `window.open` is blocked
- No form data validation beyond HTML5 `required` attributes

## Google Gemini AI

**Package:** `@google/genai` ^1.29.0

**Status:** Installed but not actively imported or used in any source file.

**Config:**
- `GEMINI_API_KEY` defined in `.env.example`
- Inlined at build time via `vite.config.ts` `define` block
- Available as `process.env.GEMINI_API_KEY` in client bundle

**Concerns:** API key is bundled into the client-side JavaScript at build time. If this key is meant to be public, this is acceptable. If it should be secret, a backend proxy is needed.

## Environment Variables

| Variable | Purpose | Used In |
|----------|---------|---------|
| `GEMINI_API_KEY` | API key for Google Gemini AI | `vite.config.ts` (defined in `define` block) |
| `APP_URL` | Host URL for self-referential links | Documented in `.env.example`, not actively used |
| `DISABLE_HMR` | Disables Vite HMR (for AI Studio) | `vite.config.ts:21` |

## External Assets

### Image CDN
- `https://picsum.photos/seed/design/1920/1080` — Used in `Hero.tsx:9` as background texture (grayscale overlay)

### Local Assets (public/)
| File | Used In | Purpose |
|------|---------|---------|
| `/favicon.png` | `index.html:7` | Browser tab icon |
| `/about-image.jpg` | `About.tsx:55` | About section image |
| `/Branding1.jpg` | `Portfolio.tsx:7` | Portfolio item |
| `/Branding2.jpg` | `Portfolio.tsx:12` | Portfolio item |
| `/Print1.jpg` | `Portfolio.tsx:8` | Portfolio item |
| `/Print2.png` | `Portfolio.tsx:11` | Portfolio item |
| `/Digital.jpg` | `Portfolio.tsx:9` | Portfolio item |
| `/Photography.jpg` | `Portfolio.tsx:10` | Portfolio item |

## Contact Info (Hardcoded)

| Channel | Value | Location |
|---------|-------|----------|
| Phone | +237 6 96 27 73 35 | `Contact.tsx:54` |
| Email 1 | hello@impactgraphics.com | `Contact.tsx:72` |
| Email 2 | support@impactgraphics.com | `Contact.tsx:75` |
| Location | Akwa, Douala, Cameroon | `Contact.tsx:92-93` |
| WhatsApp | +237 696 277 335 | `Contact.tsx:109`, `Booking.tsx:42` |

## Dependencies Not Actively Used

| Package | Reason |
|---------|--------|
| `express` | No server-side code found; this is a pure static SPA |
| `@google/genai` | Gemini SDK installed but not imported in any source |
| `dotenv` | Vite's `loadEnv` handles env loading; dotenv not explicitly called |
