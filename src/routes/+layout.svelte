<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { site } from '$lib/site.js';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';

	let { children } = $props();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		alternateName: site.stageName,
		jobTitle: site.role,
		description: site.metaDescription,
		url: site.url,
		address: { '@type': 'PostalAddress', addressLocality: site.location },
		sameAs: site.socials.map((s) => s.href)
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
</svelte:head>

<Toaster position="bottom-right" />

<div id="top" class="flex min-h-dvh flex-col">
	<SiteHeader />
	<main class="flex-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>
