/**
 * Single source of truth for editable site content.
 *
 * Ajitesh (or whoever maintains this) can edit everything below without touching
 * any components. Anything marked `TODO` should be confirmed / replaced.
 *
 * Integration keys (contact form + events/journey sheets) are NOT here — they
 * live in environment variables so they can be changed on Vercel without a
 * code change. See `.env.example`.
 */

export const site = {
	// Formal name — used for the About bio, SEO/meta tags and JSON-LD.
	name: 'S Ajitesh',
	shortName: 'Ajitesh',
	stageName: 'Ajitesh Veena',
	// Stylised wordmark — used in the header/footer logo lockup and the
	// copyright line. Once a real logo image is dropped at
	// src/lib/assets/logo.(svg|png|jpg|webp) it replaces this text automatically
	// (see logo.svelte) — the name still appears as alt text/copyright.
	brand: 'AjiteshVeena',
	domain: 'ajiteshveena.in', // TODO: confirm once the domain is registered/live

	// Kept for <title> tags / JSON-LD only — not shown as visible page copy
	// (the hero/footer used to show "role · location"; removed since the
	// location read as limiting rather than descriptive).
	role: 'Carnatic Veena Artist',
	location: 'Chennai, India',

	// The three words shown large over the home screen photo.
	heroWords: ['Music', 'Magic', 'Miracle'],

	metaDescription:
		'S Ajitesh is a Carnatic veena artist performing classical kritis and contemporary arrangements. Concerts, recordings and contact.',

	// Absolute site URL (no trailing slash).
	url: 'https://ajiteshveena.in', // TODO: confirm once the domain is live

	// Short bio — shown in the About section. Sourced from the press-kit PDF.
	// Keep it to 2–3 paragraphs.
	bio: [
		'Ajitesh is a young Carnatic musician and veena artiste who has performed extensively across concerts, music festivals and light-music shows. With a strong foundation in Carnatic music, he brings the same musicality and versatility to both classical and contemporary performances.',
		'He began his musical journey under the guidance of Smt. Kalyani Ganesan mami, and has continued to develop his craft through years of training and performance — including several appearances at Prashanthi Nilayam, Puttaparthi, alongside numerous concerts and light-music programmes.',
		'As a young artiste he continues to explore the space between traditional Carnatic music and the wider world of contemporary and light music, and shares recordings on his YouTube channel for listeners meeting the veena for the first time.'
	],

	// Shorter, press-kit style text for the Media page — alongside photos.
	mediaBio: [
		'Ajitesh is a young Carnatic musician and veena artiste who has performed extensively across concerts, music festivals and light-music shows — bringing the same musicality and versatility to both classical and contemporary performances.',
		'He has performed at numerous prestigious events and venues, including in the presence of the Hon’ble Vice-President of India, the Hon’ble Governor of Tamil Nadu and other distinguished dignitaries, as well as multiple performances at Prashanthi Nilayam, Puttaparthi.',
		'For programme notes, an artist photograph or a formal bio for print, a downloadable press kit is available below — high-resolution images are also available on request.'
	],

	// Downloadable one-page bio/press kit (PDF), linked from the Media page.
	pressKitUrl: '/ajiteshveena-press-kit.pdf',

	// YouTube — channel + a few videos to feature in the "Music" section.
	youtube: {
		channelUrl: 'https://www.youtube.com/@ajiteshveena7246',
		channelId: 'UCIP7jI-2R-aNO16Qs1mfNZA',
		// Just the video IDs. Reorder / swap anytime — leave the array shorter
		// than 4 and the grid just shows fewer tiles.
		featured: [
			{ id: 'm815UPVOxms', title: 'Thaye Thripura Sundari · Suddha Saveri · Periyasaami Tooran' },
			{ id: 'EshK--ZY3Vc', title: 'Indha Maan · Karakattakaran · Ilaiyaraaja' }
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

	// Contact address, shown near the form and used if the form service isn't
	// configured yet.
	contactEmail: 'veenaajitesh@gmail.com',

	// Header / mobile-menu nav. `icon` keys are resolved in nav-icon.svelte —
	// add a case there before using a new key. Media and Journey are real pages;
	// everything else is an anchor on the home page.
	nav: [
		{ label: 'About', href: '/#about', icon: 'about' },
		{ label: 'Media', href: '/media', icon: 'media' },
		{ label: 'Concerts', href: '/#concerts', icon: 'concerts' },
		{ label: 'Music', href: '/#music', icon: 'music' },
		{ label: 'Journey', href: '/journey', icon: 'journey' },
		{ label: 'Contact', href: '/#contact', icon: 'contact' }
	]
} as const;

export type Social = (typeof site.socials)[number];
