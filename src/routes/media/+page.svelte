<script lang="ts">
	import { site } from '$lib/site.js';
	import Section from '$lib/components/section.svelte';
	import MediaGallery from '$lib/components/media-gallery.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import DownloadIcon from '@lucide/svelte/icons/download';
</script>

<svelte:head>
	<title>Media — {site.name}</title>
	<meta
		name="description"
		content="Press bio, downloadable press kit and photos of Carnatic veena artist {site.name}."
	/>
	<link rel="canonical" href={`${site.url}/media`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`Media — ${site.name}`} />
	<meta property="og:url" content={`${site.url}/media`} />
</svelte:head>

<Section
	id="media"
	eyebrow="Media"
	title="Photos & press"
	lead="A short bio for programme notes and press, alongside a few photos from performances."
	icon="media"
	class="pt-32 md:pt-40"
>
	<div class="max-w-2xl space-y-4 text-pretty leading-relaxed text-muted-foreground">
		{#each site.mediaBio as para (para)}
			<p>{para}</p>
		{/each}
	</div>

	<div class="mt-6">
		<Button href={site.pressKitUrl} target="_blank" rel="noopener" variant="outline">
			<DownloadIcon class="size-4" /> Download press kit (PDF)
		</Button>
	</div>

	<div class="mt-16">
		<p class="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-primary">On the wall</p>
		<MediaGallery />
	</div>
</Section>
