/**
 * Single source of truth for editable site content.
 *
 * Ajithesh (or whoever maintains this) can edit everything below without touching
 * any components. Anything marked `TODO` should be confirmed / replaced.
 *
 * Integration keys (contact form + events sheet) are NOT here — they live in
 * environment variables so they can be changed on Vercel without a code change.
 * See `.env.example`.
 */

export const site = {
	name: 'S Ajithesh',
	shortName: 'Ajithesh',
	stageName: 'Ajitesh Veena',
	role: 'Carnatic Veena Artist',
	location: 'Chennai, India',

	// Used for <title>, meta description, Open Graph, JSON-LD.
	tagline: 'The Saraswati Veena — rooted in tradition, alive to the present.',
	metaDescription:
		'S Ajithesh is a Chennai-based Carnatic veena artist performing classical kritis and contemporary arrangements. Concerts, recordings and contact.',

	// Absolute site URL (no trailing slash). Set once the Vercel domain is known.
	url: 'https://ajithesh-veena.vercel.app', // TODO: replace with final domain

	// Short bio — shown in the About section. Keep it to 2–3 paragraphs.
	bio: [
		'S Ajithesh is a Carnatic musician who plays the Saraswati veena. Based in Chennai, he performs a repertoire that runs from the classical varnams and kritis of the Trinity to his own arrangements of contemporary and film music for the instrument.',
		'He began learning the veena under Smt. Vilasini Venkatarama and continued his advanced training as a disciple of Smt. Kalyani Ganesan. His playing is noted for a clean gamaka-rich style and a strong sense of laya.', // TODO: confirm gurus / wording with Ajithesh
		'Alongside the concert stage he shares regular recordings on his YouTube channel, bringing the veena to listeners who may be meeting the instrument for the first time.'
	],

	// Achievements / recognition. Add or remove freely — the list renders whatever is here.
	achievements: [
		{
			year: '2025', // TODO: confirm year from the article
			title: 'Winner — The Hindu Margazhi Music Competition (Veena)',
			description:
				'Selected among the winners of The Hindu Margazhi competition, earning the opportunity to perform before the Vice-President of India and the Governor of Tamil Nadu.',
			source: {
				label: 'The Hindu',
				href: 'https://www.thehindu.com/news/cities/chennai/winners-of-the-hindu-margazhi-competition-get-to-perform-before-vice-president-governor/article71390288.ece'
			}
		}
		// {
		//   year: '2024',
		//   title: 'Another award / title',
		//   description: '…',
		//   source: { label: 'Source name', href: 'https://…' } // source is optional
		// }
	],

	// YouTube — channel + a few videos to feature in the "Listen" section.
	youtube: {
		channelUrl: 'https://www.youtube.com/@ajiteshveena7246',
		channelId: 'UCIP7jI-2R-aNO16Qs1mfNZA',
		// Just the video IDs. Reorder / swap anytime.
		featured: [
			{ id: 'xz6UzsZo9tc', title: 'Varnam — Sami Ninne · Sankarabharanam' },
			{ id: 'LGZhLfdN6hA', title: 'Gopika Manoharam · Mohanam · Dikshitar' },
			{ id: '8Iw0ojeu7HM', title: 'Brochevarevare · Sriranjani · Tyagaraja' },
			{ id: 'h6J84jcTLmw', title: 'Megham Karukatha · Tiruchitrambalam' }
		]
	},

	/**
	 * Social / streaming links shown in the footer strip.
	 *
	 * The strip is data-driven: add, remove or reorder entries and the layout
	 * re-flows on its own — nothing else needs to change. `icon` must be one of
	 * the keys in `social-strip.svelte` (BRAND_ICONS); an unknown icon falls back
	 * to a generic link glyph, so a new platform never breaks the build.
	 */
	socials: [
		{ label: 'YouTube', href: 'https://www.youtube.com/@ajiteshveena7246', icon: 'youtube' },
		{ label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' }, // TODO: real handle
		{ label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' }, // TODO
		{ label: 'X', href: 'https://x.com/', icon: 'x' } // TODO
		// { label: 'Spotify', href: 'https://open.spotify.com/artist/…', icon: 'spotify' },
		// { label: 'Apple Music', href: 'https://music.apple.com/…', icon: 'apple' },
		// { label: 'Email', href: 'mailto:hello@example.com', icon: 'mail' },
	],

	// Fallback contact address, shown near the form and used if the form service
	// is not configured. TODO: set a real address.
	contactEmail: 'contact@example.com',

	nav: [
		{ label: 'About', href: '#about' },
		{ label: 'Concerts', href: '#concerts' },
		{ label: 'Listen', href: '#listen' },
		{ label: 'Recognition', href: '#recognition' },
		{ label: 'Contact', href: '#contact' }
	]
} as const;

export type Achievement = (typeof site.achievements)[number];
export type Social = (typeof site.socials)[number];
