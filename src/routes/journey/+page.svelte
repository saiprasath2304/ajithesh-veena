<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/site.js';
	import { loadJourney, type JourneyEntry } from '$lib/journey.js';
	import Section from '$lib/components/section.svelte';
	import VeenaMark from '$lib/components/veena-mark.svelte';

	let entries = $state<JourneyEntry[]>([]);
	let loading = $state(true);

	onMount(async () => {
		const { entries: loaded } = await loadJourney();
		entries = loaded;
		loading = false;
	});

	// Curated photos for the timeline — drop files in src/lib/assets/journey/
	// (any filenames, sorted alphabetically). One is woven in every couple of
	// entries, alternating left/right, in the spirit of ranjanigayatri.com/about.
	const journeyImages = import.meta.glob('$lib/assets/journey/*.{jpg,jpeg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const journeyPhotos = Object.keys(journeyImages)
		.sort((a, b) => a.localeCompare(b))
		.map((k) => journeyImages[k] as string);

	const GROUP_SIZE = 2;
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
>
	{#if loading}
		<div class="space-y-8">
			{#each { length: 3 } as _, i (i)}
				<div class="h-20 animate-pulse rounded-xl bg-muted/60"></div>
			{/each}
		</div>
	{:else if entries.length === 0}
		<p class="text-muted-foreground">Nothing to show here yet — check back soon.</p>
	{:else}
		<ol class="relative max-w-3xl space-y-8 border-l border-border pl-6">
			{#each entries as item, i (item.title)}
				<li class="relative">
					<span
						class="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-background bg-primary"
					></span>
					{#if item.year}
						<p class="text-xs font-medium tracking-widest text-primary">{item.year}</p>
					{/if}
					<h3 class="mt-1 font-heading text-lg font-semibold text-balance">{item.title}</h3>
					<p class="mt-1.5 text-sm text-pretty text-muted-foreground">{item.description}</p>
				</li>

				{#if (i + 1) % GROUP_SIZE === 0}
					{@const photoIndex = Math.floor(i / GROUP_SIZE)}
					{#if journeyPhotos[photoIndex]}
						<li class="relative list-none py-2">
							<div class={photoIndex % 2 === 0 ? 'ml-auto w-4/5 sm:w-3/5' : 'mr-auto w-4/5 sm:w-3/5'}>
								<img
									src={journeyPhotos[photoIndex]}
									alt=""
									loading="lazy"
									class="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
								/>
							</div>
						</li>
					{/if}
				{/if}
			{/each}
		</ol>

		{#if journeyPhotos.length === 0}
			<div
				class="mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground"
			>
				<VeenaMark class="h-7 w-7 text-primary/50" />
				<p class="text-sm">
					Add photos to <code>src/lib/assets/journey/</code> to weave them into the timeline.
				</p>
			</div>
		{/if}
	{/if}
</Section>
