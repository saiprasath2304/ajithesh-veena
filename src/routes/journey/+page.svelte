<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/site.js';
	import { loadJourney, type JourneyEntry } from '$lib/journey.js';
	import Section from '$lib/components/section.svelte';
	import JourneyGallery from '$lib/components/journey-gallery.svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';

	let entries = $state<JourneyEntry[]>([]);
	let loading = $state(true);

	onMount(async () => {
		const { entries: loaded } = await loadJourney();
		entries = loaded;
		loading = false;
	});
</script>

<svelte:head>
	<title>Journey — {site.name}</title>
	<meta
		name="description"
		content="Notable performances and recognition for Carnatic veena artist {site.name}."
	/>
	<link rel="canonical" href={`${site.url}/journey`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`Journey — ${site.name}`} />
	<meta property="og:url" content={`${site.url}/journey`} />
</svelte:head>

<Section
	id="journey"
	eyebrow="Journey"
	title="The journey so far"
	lead="Notable performances and recognition, updated as they happen."
	icon="journey"
	class="pt-32 md:pt-40"
>
	<div class="grid gap-14 md:grid-cols-[1.3fr_1fr]">
		{#if loading}
			<div class="space-y-8">
				{#each { length: 3 } as _, i (i)}
					<div class="h-20 animate-pulse rounded-xl bg-muted/60"></div>
				{/each}
			</div>
		{:else if entries.length === 0}
			<p class="text-muted-foreground">Nothing to show here yet — check back soon.</p>
		{:else}
			<ol class="relative space-y-8 border-l border-border pl-6">
				{#each entries as item (item.title)}
					<li class="relative">
						<span
							class="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-background bg-primary"
						></span>
						{#if item.year}
							<p class="text-xs font-medium tracking-widest text-primary">{item.year}</p>
						{/if}
						<h3 class="mt-1 font-heading text-lg font-semibold text-balance">{item.title}</h3>
						<p class="mt-1.5 text-sm text-pretty text-muted-foreground">{item.description}</p>
						{#if item.sourceUrl}
							<a
								href={item.sourceUrl}
								target="_blank"
								rel="noopener"
								class="mt-2 inline-flex items-center gap-1 text-sm text-primary underline underline-offset-4"
							>
								{item.sourceLabel ?? 'Source'} <ExternalLinkIcon class="size-3.5" />
							</a>
						{/if}
					</li>
				{/each}
			</ol>
		{/if}

		<JourneyGallery />
	</div>
</Section>
