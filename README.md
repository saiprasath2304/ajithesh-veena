# AjiteshVeena — Veena portfolio

Portfolio site for Carnatic veena artist **S Ajitesh**: biography, media/press,
upcoming concerts, recordings, a journey/recognition timeline and a contact form.

- **SvelteKit** (Svelte 5) + **Tailwind CSS v4** + **shadcn-svelte** (`sera` preset)
- Fully **prerendered / static** — no backend, no database. Deploys as flat files.
- Contact form via **Web3Forms** (free, client-side).
- Concerts and the Journey timeline are both read live from **published Google
  Sheet tabs** (CSV) — no redeploy to update either one.
- Single **red** brand theme (no light/dark toggle) — header and footer render as
  a solid red strip, with a quiet kolam-style dot pattern behind every page.

---

## Quick start

```bash
npm install
cp .env.example .env      # then fill in the keys (see below)
npm run dev
```

- `npm run build` – production build into `build/`
- `npm run preview` – serve the built site locally
- `npm run check` – type + Svelte checks

---

## What Ajitesh can edit (no coding)

| Content | Where |
| --- | --- |
| Name, tagline, bio, gurus | `src/lib/site.ts` → `bio` |
| Media/press bio | `src/lib/site.ts` → `mediaBio` |
| The three hero words ("Music / Magic / Miracle") | `src/lib/site.ts` → `heroWords` |
| Featured YouTube videos | `src/lib/site.ts` → `youtube.featured` (just the video IDs) |
| Social links | `src/lib/site.ts` → `socials` |
| Journey / recognition timeline | the Google Sheet (see below) |
| Home screen background photo | drop a file at `src/lib/assets/hero.jpg` (or `.png` / `.webp`) |
| About portrait photo | drop a file at `src/lib/assets/portrait.jpg` (or `.png` / `.webp`) |
| Media page photo wall | drop files in `src/lib/assets/gallery/` (any filenames, sorted alphabetically — prefix with `01-`, `02-`, … to control order) |
| Journey page photos | drop files in `src/lib/assets/journey/` — woven into the timeline automatically, alternating sides |
| Real logo, once designed | drop it at `src/lib/assets/logo.svg` (or `.png` / `.jpg` / `.webp`) — it replaces the "AjiteshVeena" wordmark in the header automatically, everywhere, no code change |
| Concerts | the Google Sheet (see below) |

Everything in `site.ts` marked `TODO` should be checked and replaced.

### Social strip

The hero and footer social rows are generated from the `socials` array in
`site.ts`. Add, remove or reorder entries freely — the layout re-flows and
nothing else needs to change. Known `icon` values: `youtube`, `instagram`,
`facebook`, `x`, `spotify`, `apple`, `soundcloud`, `mail`. Any other value
still works — it just shows a generic link glyph, so a new platform can never
break the build. To add a real brand glyph, drop its SVG path into
`BRAND_ICONS` in `src/lib/components/social-strip.svelte`.

---

## Contact form (Web3Forms)

1. Go to <https://web3forms.com>, enter the email address that should **receive**
   enquiries, and copy the Access Key they send you.
2. Set it as an environment variable:
   - locally: `PUBLIC_WEB3FORMS_ACCESS_KEY=...` in `.env`
   - on Vercel: Project ▸ Settings ▸ Environment Variables

The key is safe to expose publicly (hence the `PUBLIC_` prefix). Until it is set,
the form shows a fallback "email me directly" message.

---

## Concerts and Journey (Google Sheet)

Both lists are fetched from published Google Sheet **tabs** every time their
page loads, so day-to-day edits appear within a few minutes with **no deploy**.

1. Keep one spreadsheet with (at least) two tabs — e.g. "Events" and "Journey".
   - Events columns: see [`static/events-template.csv`](static/events-template.csv)
     (`date, time, title, venue, city, country, presenter, tickets_url, map_url, notes`
     — only `date` and `title` are required; `date` is `YYYY-MM-DD` or `DD/MM/YYYY`).
   - Journey columns: `year` (optional), `title`, `description`. Row order is
     display order.
2. For each tab: **File ▸ Share ▸ Publish to web** → pick that sheet → **Comma-separated
   values (.csv)** → Publish. Each tab gets its own CSV URL.
3. Paste the two URLs into `PUBLIC_EVENTS_SHEET_CSV_URL` and
   `PUBLIC_JOURNEY_SHEET_CSV_URL` (in `.env` and on Vercel), then redeploy once.

Concerts: future-dated rows show under **Concerts**; past rows collapse into
"Past concerts". Journey: entries render as a timeline, oldest-looking-first
being whatever order the sheet rows are in; a `year` is optional and simply
omits the date badge when blank. If a variable is unset or the fetch fails,
the sample data in `src/lib/data/events.json` / `src/lib/data/journey.json` is
shown instead.

Journey **does not** show any links from the sheet (even if you keep old
source columns around, they're ignored) — the timeline is illustrated with the
photos in `src/lib/assets/journey/` instead.

---

## Deploying to Vercel

The repo has a `vercel.json` that builds to the static `build/` directory.

1. Import the GitHub repo at <https://vercel.com/new>.
2. Framework preset: **Other** (already pinned in `vercel.json`).
3. Add the environment variables:
   - `PUBLIC_WEB3FORMS_ACCESS_KEY`
   - `PUBLIC_EVENTS_SHEET_CSV_URL`
   - `PUBLIC_JOURNEY_SHEET_CSV_URL`
4. Deploy. Once `ajiteshveena.in` (or whichever domain) is attached, update
   `site.url` / `site.domain` in `src/lib/site.ts` for correct canonical / Open
   Graph tags and the footer copyright line.

---

## Project layout

```
src/
  lib/
    site.ts                  editable content + config (no achievements/credit here anymore)
    events.ts                CSV parsing + live sheet loader (concerts)
    journey.ts                CSV parsing + live sheet loader (journey timeline)
    data/events.json         fallback concerts
    data/journey.json        fallback journey entries
    assets/
      hero.*                 (optional) home screen background photo
      portrait.*             (optional) About section photo
      logo.*                 (optional) real logo — replaces the text wordmark
      gallery/*              (optional) Media page photo wall
      journey/*              (optional) Journey page photos, interspersed alternating sides
    components/
      site-header.svelte     red nav strip, icon + label nav, mobile sheet
      site-footer.svelte     red strip: copyright + social icons
      hero.svelte            home screen (background photo or gradient fallback)
      logo.svelte            wordmark, auto-swaps to a real logo image if present
      nav-icon.svelte        icon registry used by nav + Section badges
      media-gallery.svelte   auto-loads src/lib/assets/gallery/*, lightbox + download
      section.svelte         section heading + optional large icon badge
      event-list.svelte, contact-form.svelte, youtube-grid.svelte, …
    components/ui/           shadcn-svelte primitives
  routes/
    +layout.svelte           header + footer + toaster + JSON-LD
    +layout.ts               prerender = true
    +page.svelte             home page (Hero, About, Concerts, Music, Contact)
    media/+page.svelte       Media page (press bio + photo wall)
    journey/+page.svelte     Journey page (timeline + interspersed photos)
    layout.css               Tailwind + theme tokens (single red "Veena Red" palette)
static/
  events-template.csv        column template for the Google Sheet
```
