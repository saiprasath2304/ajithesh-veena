// Fully static site — every route is prerendered to HTML at build time and
// served from the CDN. There is no server component.
//
// Environment variables (PUBLIC_WEB3FORMS_ACCESS_KEY, PUBLIC_EVENTS_SHEET_CSV_URL)
// are read from `$env/dynamic/public` and baked in at build time, so changing
// them on Vercel needs a redeploy. The concert list is still fetched live from
// the Google Sheet in the browser, so day-to-day event edits never need a deploy.
export const prerender = true;
export const trailingSlash = 'never';
