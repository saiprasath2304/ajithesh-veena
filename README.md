# S Ajitesh — Veena portfolio

Portfolio site for Carnatic veena artist **S Ajitesh**: biography, upcoming
concerts, recordings, recognition and a contact form.

- **SvelteKit** (Svelte 5) + **Tailwind CSS v4** + **shadcn-svelte** (`sera` preset)
- Fully **prerendered / static** — no backend, no database. Deploys as flat files.
- Contact form via **Web3Forms** (free, client-side).
- Concert list read live from a **published Google Sheet** (CSV) — no redeploy to update.
- Warm "veena" theme (sandalwood / rosewood / brass), light + dark.

---

## Quick start

```bash
npm install
cp .env.example .env      # then fill in the two keys (see below)
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
| Awards & highlights | `src/lib/site.ts` → `achievements` |
| Featured YouTube videos | `src/lib/site.ts` → `youtube.featured` (just the video IDs) |
| Social / streaming links | `src/lib/site.ts` → `socials` |
| Portrait photo | drop a file at `src/lib/assets/portrait.jpg` (or `.png` / `.webp`) |
| Concerts | the Google Sheet (see below) |

Everything in `site.ts` marked `TODO` should be checked and replaced.

### Social strip

The footer / hero social row is generated from the `socials` array. Add, remove
or reorder entries freely — the layout re-flows and nothing else needs to change.
Known `icon` values: `youtube`, `instagram`, `facebook`, `x`, `spotify`, `apple`,
`soundcloud`, `mail`. Any other value still works — it just shows a generic link
glyph, so a new platform can never break the build. To add a real brand glyph,
drop its SVG path into `BRAND_ICONS` in
`src/lib/components/social-strip.svelte`.

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

## Concerts (Google Sheet)

The concert list is fetched from a published Google Sheet every time the page
loads, so day-to-day edits appear within a few minutes with **no deploy**.

1. Make a Google Sheet with the columns in [`static/events-template.csv`](static/events-template.csv):
   `date, time, title, venue, city, country, presenter, tickets_url, map_url, notes`
   (only `date` and `title` are required; `date` is `YYYY-MM-DD` or `DD/MM/YYYY`).
2. **File ▸ Share ▸ Publish to web** → pick the sheet → **Comma-separated values (.csv)** → Publish.
3. Copy that URL into `PUBLIC_EVENTS_SHEET_CSV_URL` (in `.env` and on Vercel), then redeploy once.

Future-dated rows show under **Concerts**; past rows collapse into "Past concerts".
If the variable is unset or the fetch fails, the sample data in
`src/lib/data/events.json` is shown instead.

---

## Deploying to Vercel

The repo has a `vercel.json` that builds to the static `build/` directory.

1. Import the GitHub repo at <https://vercel.com/new>.
2. Framework preset: **Other** (already pinned in `vercel.json`).
3. Add the environment variables:
   - `PUBLIC_WEB3FORMS_ACCESS_KEY`
   - `PUBLIC_EVENTS_SHEET_CSV_URL`
4. Deploy. Add the custom domain when ready, then update `site.url` in
   `src/lib/site.ts` for correct canonical / Open Graph tags.

---

## Project layout

```
src/
  lib/
    site.ts                 all editable content + config
    events.ts               CSV parsing + live sheet loader
    data/events.json        fallback concerts
    components/             hero, header, footer, event list, contact form, …
    components/ui/           shadcn-svelte primitives
  routes/
    +layout.svelte          header + footer + theme + toaster + JSON-LD
    +layout.ts              prerender = true
    +page.svelte            the single-page site
    layout.css              Tailwind + theme tokens ("Veena" palette)
static/
  events-template.csv       column template for the Google Sheet
```
