<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/site.js';
	import { loadEvents, splitEvents, type VeenaEvent } from '$lib/events.js';
	import Section from '$lib/components/section.svelte';
	import Hero from '$lib/components/hero.svelte';
	import EventList from '$lib/components/event-list.svelte';
	import YoutubeGrid from '$lib/components/youtube-grid.svelte';
	import ContactForm from '$lib/components/contact-form.svelte';
	import VeenaMark from '$lib/components/veena-mark.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';

	let events = $state<VeenaEvent[]>([]);
	let eventsLoading = $state(true);

	const split = $derived(splitEvents(events));

	// Portrait is optional: drop an image at src/lib/assets/portrait.(jpg|png|webp)
	// and it is picked up automatically. No file → a tasteful placeholder shows.
	const portraits = import.meta.glob('$lib/assets/portrait.{jpg,jpeg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const portraitSrc = Object.values(portraits)[0] as string | undefined;

	onMount(async () => {
		const { events: loaded } = await loadEvents();
		events = loaded;
		eventsLoading = false;
	});
</script>

<svelte:head>
	<title>{site.name} — {site.role}</title>
	<meta name="description" content={site.metaDescription} />
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${site.name} — ${site.role}`} />
	<meta property="og:description" content={site.metaDescription} />
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Hero />

<div class="mx-auto max-w-5xl px-5"><div class="rule-ornament"></div></div>

<!-- ABOUT -->
<Section id="about" eyebrow="About" title="A voice for the veena" icon="about">
	<div class="grid gap-10 md:grid-cols-[1fr_0.8fr] md:gap-14">
		<div class="space-y-4 text-pretty leading-relaxed text-muted-foreground">
			{#each site.bio as para (para)}
				<p>{para}</p>
			{/each}
		</div>

		<div class="relative">
			<div class="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-muted">
				{#if portraitSrc}
					<img
						src={portraitSrc}
						alt={`${site.name} playing the veena`}
						class="h-full w-full object-cover"
					/>
				{:else}
					<div
						class="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground"
					>
						<VeenaMark class="h-12 w-12 text-primary/60" />
						<span class="text-xs">Add <code>src/lib/assets/portrait.jpg</code></span>
					</div>
				{/if}
			</div>
			<div
				class="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-xl border border-primary/30"
			></div>
		</div>
	</div>
</Section>

<div class="mx-auto max-w-5xl px-5"><div class="rule-ornament"></div></div>

<!-- CONCERTS -->
<Section
	id="concerts"
	eyebrow="Upcoming"
	title="Concerts"
	lead="Where to hear the veena live. Dates are kept up to date from Ajitesh's own schedule."
	icon="concerts"
>
	<EventList upcoming={split.upcoming} past={split.past} loading={eventsLoading} />
</Section>

<div class="mx-auto max-w-5xl px-5"><div class="rule-ornament"></div></div>

<!-- MUSIC -->
<Section
	id="music"
	eyebrow="Music"
	title="From the recordings"
	lead="A few pieces from the YouTube channel — traditional kritis alongside arrangements for the veena."
	icon="music"
>
	<YoutubeGrid />
	<div class="mt-8">
		<Button href={site.youtube.channelUrl} target="_blank" rel="noopener" variant="outline">
			Visit the YouTube channel
			<ExternalLinkIcon class="size-3.5 opacity-60" />
		</Button>
	</div>
</Section>

<div class="mx-auto max-w-5xl px-5"><div class="rule-ornament"></div></div>

<!-- JOURNEY -->
{#if site.achievements.length}
	<Section id="journey" eyebrow="Journey" title="The journey so far" icon="journey">
		<ol class="relative space-y-8 border-l border-border pl-6">
			{#each site.achievements as item (item.title)}
				<li class="relative">
					<span
						class="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-background bg-primary"
					></span>
					{#if item.year}
						<p class="text-xs font-medium tracking-widest text-primary">{item.year}</p>
					{/if}
					<h3 class="mt-1 font-heading text-lg font-semibold text-balance">{item.title}</h3>
					<p class="mt-1.5 text-sm text-pretty text-muted-foreground">{item.description}</p>
					{#if item.source}
						<a
							href={item.source.href}
							target="_blank"
							rel="noopener"
							class="mt-2 inline-flex items-center gap-1 text-sm text-primary underline underline-offset-4"
						>
							{item.source.label} <ExternalLinkIcon class="size-3.5" />
						</a>
					{/if}
				</li>
			{/each}
		</ol>
	</Section>

	<div class="mx-auto max-w-5xl px-5"><div class="rule-ornament"></div></div>
{/if}

<!-- CONTACT -->
<Section
	id="contact"
	eyebrow="Contact"
	title="Get in touch"
	lead="For concert bookings, collaborations, lessons or press — send a note."
	icon="contact"
>
	<ContactForm />
</Section>
