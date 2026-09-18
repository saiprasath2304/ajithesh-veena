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
 * Source columns are read leniently: either column can hold one or several
 * links (comma-separated), a "-" placeholder, or plain text — every real
 * http(s) link found across both columns is pulled out, de-duplicated and
 * auto-labelled from its domain (thehindu.com -> "The Hindu",
 * drive.google.com -> "Certificate"), so messy data entry never produces a
 * raw URL or a dead "-" link on the page.
 *
 * If the env var is missing or the fetch fails, we fall back to the bundled
 * `data/journey.json` so the section always renders something sensible.
 */

import fallback from './data/journey.json';
import { parseCsv } from './events.js';
import { env } from '$env/dynamic/public';

export type JourneySource = { label: string; url: string };

export type JourneyEntry = {
	/** optional — omit if the date isn't confirmed; the timeline skips the badge */
	year?: string;
	title: string;
	description: string;
	sources: JourneySource[];
};

type RawRow = { year?: string; title?: string; description?: string; col1?: string; col2?: string };

const HEADER_ALIASES: Record<string, keyof RawRow> = {
	year: 'year',
	date: 'year',
	title: 'title',
	description: 'description',
	source_label: 'col1',
	sourcelabel: 'col1',
	'source label': 'col1',
	source: 'col1',
	source_url: 'col2',
	sourceurl: 'col2',
	'source url': 'col2',
	link: 'col2'
};

const DOMAIN_LABELS: [pattern: RegExp, label: string][] = [
	[/thehindu\.com/i, 'The Hindu'],
	[/drive\.google\.com/i, 'Certificate'],
	[/youtube\.com|youtu\.be/i, 'Video'],
	[/instagram\.com/i, 'Instagram'],
	[/facebook\.com/i, 'Facebook']
];

function labelForUrl(url: string): string {
	for (const [pattern, label] of DOMAIN_LABELS) {
		if (pattern.test(url)) return label;
	}
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return 'Source';
	}
}

/** Pull every http(s) link out of one or more messy cells (comma-separated,
 *  "-" placeholders, stray text) and auto-label + de-duplicate them. */
export function extractSources(...cells: (string | undefined)[]): JourneySource[] {
	const urls: string[] = [];
	for (const cell of cells) {
		if (!cell) continue;
		for (const piece of cell.split(',')) {
			const trimmed = piece.trim();
			if (/^https?:\/\//i.test(trimmed)) urls.push(trimmed);
		}
	}

	const seen = new Set<string>();
	const counts: Record<string, number> = {};
	for (const url of urls) {
		if (seen.has(url)) continue;
		seen.add(url);
		const label = labelForUrl(url);
		counts[label] = (counts[label] ?? 0) + 1;
	}

	seen.clear();
	const running: Record<string, number> = {};
	const sources: JourneySource[] = [];
	for (const url of urls) {
		if (seen.has(url)) continue;
		seen.add(url);
		const base = labelForUrl(url);
		let label = base;
		if (counts[base] > 1) {
			running[base] = (running[base] ?? 0) + 1;
			label = `${base} ${running[base]}`;
		}
		sources.push({ label, url });
	}
	return sources;
}

export function rowsToJourney(rows: string[][]): JourneyEntry[] {
	if (rows.length < 2) return [];
	const header = rows[0].map((h) => h.trim().toLowerCase());
	const entries: JourneyEntry[] = [];

	for (const cells of rows.slice(1)) {
		const record: RawRow = {};
		header.forEach((h, idx) => {
			const key = HEADER_ALIASES[h];
			const value = (cells[idx] ?? '').trim();
			if (key && value) record[key] = value;
		});
		if (record.title && record.description) {
			entries.push({
				year: record.year,
				title: record.title,
				description: record.description,
				sources: extractSources(record.col1, record.col2)
			});
		}
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
