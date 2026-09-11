/**
 * Single source of truth for editable site content.
 *
 * Ajitesh (or whoever maintains this) can edit everything below without touching
 * any components. Anything marked `TODO` should be confirmed / replaced.
 *
 * Integration keys (contact form + events sheet) are NOT here — they live in
 * environment variables so they can be changed on Vercel without a code change.
 * See `.env.example`.
 */

export const site = {
	// Formal name — used for the About bio, SEO/meta tags and JSON-LD.
	name: 'S Ajitesh',
	shortName: 'Ajitesh',
	stageName: 'Ajitesh Veena',
	// Stylised wordmark — used in the header/footer logo lockup and the
	// copyright line. Once a real logo image is dropped at
	// src/lib/assets/logo.(svg|png|webp) it replaces this text automatically
	// (see logo.svelte) — the name still appears as alt text/copyright.
	brand: 'AjiteshVeena',
	domain: 'ajiteshveena.in', // TODO: confirm once the domain is registered/live
	role: 'Carnatic Veena Artist',
	location: 'Chennai, India',

	// Used for <title>, meta description, Open Graph, JSON-LD.
	tagline: 'The Saraswati Veena — rooted in tradition, alive to the present.',
	metaDescription:
		'S Ajitesh is a Chennai-based Carnatic veena artist performing classical kritis and contemporary arrangements. Concerts, recordings and contact.',

	// Absolute site URL (no trailing slash).
	url: 'https://ajiteshveena.in', // TODO: confirm once the domain is live

	// Short bio — shown in the About section. Keep it to 2–3 paragraphs.
	bio: [
		'S Ajitesh is a Carnatic musician who plays the Saraswati veena. Based in Chennai, he performs a repertoire that runs from the classical varnams and kritis of the Trinity to his own arrangements of contemporary and film music for the instrument.',
		'He began learning the veena under Smt. Vilasini Venkatarama and continued his advanced training as a disciple of Smt. Kalyani Ganesan. His playing is noted for a clean gamaka-rich style and a strong sense of laya.', // TODO: confirm gurus / wording with Ajitesh
		'Alongside the concert stage he shares regular recordings on his YouTube channel, bringing the veena to listeners who may be meeting the instrument for the first time.'
	],

	// Shorter, press-kit style text for the Media section — alongside photos.
	mediaBio: [
		'S Ajitesh performs Carnatic music on the Saraswati veena, presenting the classical repertoire of the Trinity alongside his own arrangements for the instrument.',
		'For programme notes, an artist photograph or a formal bio for print, please use the contact form — high-resolution images are available on request.'
	],

	// Achievements / recognition, shown under the "Journey" section.
	// Add or remove freely — the list renders whatever is here.
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

	// YouTube — channel + a few videos to feature in the "Music" section.
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
	 * Social links shown in the header, hero and footer strips.
	 *
	 * The strip is data-driven: add, remove or reorder entries and the layout
	 * re-flows on its own — nothing else needs to change. `icon` must be one of
	 * the keys in `social-strip.svelte` (BRAND_ICONS); an unknown icon falls back
	 * to a generic link glyph, so a new platform never breaks the build.
	 */
	socials: [
		{ label: 'YouTube', href: 'https://www.youtube.com/@ajiteshveena7246', icon: 'youtube' },
		{
			label: 'Instagram',
			href: 'https://www.instagram.com/s__ajitesh?stkn=MTV3YTBsaTl0Njh1ZA==',
			icon: 'instagram'
		},
		{ label: 'Facebook', href: 'https://www.facebook.com/share/18EmgM3ApP/', icon: 'facebook' }
		// X/Twitter — add back once there's a real handle:
		// { label: 'X', href: 'https://x.com/…', icon: 'x' },
		// { label: 'Spotify', href: 'https://open.spotify.com/artist/…', icon: 'spotify' },
		// { label: 'Apple Music', href: 'https://music.apple.com/…', icon: 'apple' },
		// { label: 'Email', href: 'mailto:hello@example.com', icon: 'mail' },
	],

	// Fallback contact address, shown near the form and used if the form service
	// is not configured. TODO: set a real address.
	contactEmail: 'contact@example.com',

	// Small credit line in the footer. Set to `null` to remove it entirely.
	credit: { label: 'Saiprasath', href: 'https://github.com/saiprasath2304' } as {
		label: string;
		href: string;
	} | null,

	// Header / mobile-menu nav. `icon` keys are resolved in nav-icon.svelte —
	// add a case there before using a new key.
	nav: [
		{ label: 'About', href: '#about', icon: 'about' },
		{ label: 'Media', href: '#media', icon: 'media' },
		{ label: 'Concerts', href: '#concerts', icon: 'concerts' },
		{ label: 'Music', href: '#music', icon: 'music' },
		{ label: 'Journey', href: '#journey', icon: 'journey' },
		{ label: 'Contact', href: '#contact', icon: 'contact' }
	]
} as const;

export type Achievement = (typeof site.achievements)[number];
export type Social = (typeof site.socials)[number];
