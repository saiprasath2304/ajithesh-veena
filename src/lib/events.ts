/**
 * Events / concerts.
 *
 * How it works (no backend, no rebuilds):
 *   1. Ajitesh keeps a Google Sheet of concerts (template: /events-template.csv).
 *   2. File ▸ Share ▸ Publish to web ▸ (the sheet) ▸ Comma-separated values (.csv).
 *   3. Paste that URL into the PUBLIC_EVENTS_SHEET_CSV_URL environment variable
 *      on Vercel.
 *   4. This page fetches the CSV every time it loads, so edits to the sheet show
 *      up within minutes — no deploy needed.
 *
 * If the env var is missing or the fetch fails, we fall back to the bundled
 * `data/events.json` so the section always renders something sensible.
 */

import fallback from './data/events.json';
import { env } from '$env/dynamic/public';

export type VeenaEvent = {
	/** ISO date, YYYY-MM-DD */
	date: string;
	/** free text, e.g. "6:30 PM" — optional */
	time?: string;
	title: string;
	venue?: string;
	city?: string;
	country?: string;
	/** presenting sabha / organisation — optional */
	presenter?: string;
	/** ticket / registration link — optional */
	ticketsUrl?: string;
	/** google maps or venue link — optional */
	mapUrl?: string;
	notes?: string;
};

/** Minimal CSV parser: handles quoted fields, embedded commas, escaped quotes, CRLF. */
export function parseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let field = '';
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (inQuotes) {
			if (c === '"') {
				if (text[i + 1] === '"') {
					field += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				field += c;
			}
		} else if (c === '"') {
			inQuotes = true;
		} else if (c === ',') {
			row.push(field);
			field = '';
		} else if (c === '\n' || c === '\r') {
			if (c === '\r' && text[i + 1] === '\n') i++;
			row.push(field);
			field = '';
			if (row.some((v) => v.trim() !== '')) rows.push(row);
			row = [];
		} else {
			field += c;
		}
	}
	if (field !== '' || row.length) {
		row.push(field);
		if (row.some((v) => v.trim() !== '')) rows.push(row);
	}
	return rows;
}

const HEADER_ALIASES: Record<string, keyof VeenaEvent> = {
	date: 'date',
	time: 'time',
	title: 'title',
	event: 'title',
	programme: 'title',
	venue: 'venue',
	city: 'city',
	country: 'country',
	presenter: 'presenter',
	organiser: 'presenter',
	organizer: 'presenter',
	sabha: 'presenter',
	tickets: 'ticketsUrl',
	tickets_url: 'ticketsUrl',
	ticketsurl: 'ticketsUrl',
	'ticket link': 'ticketsUrl',
	map: 'mapUrl',
	map_url: 'mapUrl',
	mapurl: 'mapUrl',
	location: 'mapUrl',
	notes: 'notes'
};

export function rowsToEvents(rows: string[][]): VeenaEvent[] {
	if (rows.length < 2) return [];
	const header = rows[0].map((h) => h.trim().toLowerCase());
	const events: VeenaEvent[] = [];

	for (const cells of rows.slice(1)) {
		const record: Partial<VeenaEvent> = {};
		header.forEach((h, idx) => {
			const key = HEADER_ALIASES[h];
			const value = (cells[idx] ?? '').trim();
			if (key && value) record[key] = value as never;
		});
		if (record.date && record.title) events.push(normalize(record as VeenaEvent));
	}
	return events;
}

function normalize(e: VeenaEvent): VeenaEvent {
	// Accept a few common date spellings and coerce to ISO.
	const raw = e.date.trim();
	let iso = raw;
	const dmy = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
	if (dmy) {
		const [, d, m, y] = dmy;
		const year = y.length === 2 ? `20${y}` : y;
		iso = `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
	} else {
		const parsed = new Date(raw);
		if (!Number.isNaN(parsed.getTime()) && !/^\d{4}-\d{2}-\d{2}/.test(raw)) {
			iso = parsed.toISOString().slice(0, 10);
		}
	}
	return { ...e, date: iso };
}

export function splitEvents(events: VeenaEvent[]) {
	const startOfToday = new Date();
	startOfToday.setHours(0, 0, 0, 0);

	const withDate = events
		.map((e) => ({ e, t: new Date(e.date).getTime() }))
		.filter(({ t }) => !Number.isNaN(t));

	const upcoming = withDate
		.filter(({ t }) => t >= startOfToday.getTime())
		.sort((a, b) => a.t - b.t)
		.map(({ e }) => e);

	const past = withDate
		.filter(({ t }) => t < startOfToday.getTime())
		.sort((a, b) => b.t - a.t)
		.map(({ e }) => e);

	return { upcoming, past };
}

/** Fetch + parse the live sheet, falling back to the bundled JSON. */
export async function loadEvents(fetchFn: typeof fetch = fetch): Promise<{
	events: VeenaEvent[];
	source: 'sheet' | 'fallback';
}> {
	const url = env.PUBLIC_EVENTS_SHEET_CSV_URL;
	if (url) {
		try {
			const res = await fetchFn(url, { headers: { accept: 'text/csv,*/*' } });
			if (res.ok) {
				const text = await res.text();
				const events = rowsToEvents(parseCsv(text));
				if (events.length) return { events, source: 'sheet' };
			}
		} catch {
			// swallow — fall through to fallback
		}
	}
	return { events: (fallback as VeenaEvent[]).map(normalize), source: 'fallback' };
}
