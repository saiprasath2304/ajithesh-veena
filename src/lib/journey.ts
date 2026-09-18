/**
 * Journey / achievements timeline.
 *
 * Same live-sheet pattern as events.ts: Ajitesh keeps a "Journey" tab in the
 * same Google Sheet as the concerts, publishes that tab to the web as CSV,
 * and this page fetches it on every load — no redeploy needed to add a new
 * entry.
 *
 * Columns: year (optional), title, description, source_label (optional),
 * source_url (optional). See .env.example for the publish steps.
 *
 * If the env var is missing or the fetch fails, we fall back to the bundled
 * `data/journey.json` so the section always renders something sensible.
 */

import fallback from './data/journey.json';
import { parseCsv } from './events.js';
import { env } from '$env/dynamic/public';

export type JourneyEntry = {
	/** optional — omit if the date isn't confirmed; the timeline skips the badge */
	year?: string;
	title: string;
	description: string;
	sourceLabel?: string;
	sourceUrl?: string;
};

const HEADER_ALIASES: Record<string, keyof JourneyEntry> = {
	year: 'year',
	date: 'year',
	title: 'title',
	description: 'description',
	source_label: 'sourceLabel',
	sourcelabel: 'sourceLabel',
	'source label': 'sourceLabel',
	source: 'sourceLabel',
	source_url: 'sourceUrl',
	sourceurl: 'sourceUrl',
	'source url': 'sourceUrl',
	link: 'sourceUrl'
};

export function rowsToJourney(rows: string[][]): JourneyEntry[] {
	if (rows.length < 2) return [];
	const header = rows[0].map((h) => h.trim().toLowerCase());
	const entries: JourneyEntry[] = [];

	for (const cells of rows.slice(1)) {
		const record: Partial<JourneyEntry> = {};
		header.forEach((h, idx) => {
			const key = HEADER_ALIASES[h];
			const value = (cells[idx] ?? '').trim();
			if (key && value) record[key] = value as never;
		});
		if (record.title && record.description) entries.push(record as JourneyEntry);
	}
	return entries;
}

/** Fetch + parse the live sheet, falling back to the bundled JSON. */
export async function loadJourney(fetchFn: typeof fetch = fetch): Promise<{
	entries: JourneyEntry[];
	source: 'sheet' | 'fallback';
}> {
	const url = env.PUBLIC_JOURNEY_SHEET_CSV_URL;
	if (url) {
		try {
			const res = await fetchFn(url, { headers: { accept: 'text/csv,*/*' } });
			if (res.ok) {
				const text = await res.text();
				const entries = rowsToJourney(parseCsv(text));
				if (entries.length) return { entries, source: 'sheet' };
			}
		} catch {
			// swallow — fall through to fallback
		}
	}
	return { entries: fallback as JourneyEntry[], source: 'fallback' };
}
