<script lang="ts">
	import { site } from '$lib/site.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SocialStrip from './social-strip.svelte';
	import Logo from './logo.svelte';
	import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';

	// Drop the main performance photo at src/lib/assets/hero.(jpg|jpeg|png|webp)
	// and it becomes the home screen background automatically. Until then, a
	// plain red-tinted gradient is shown instead.
	const heroImages = import.meta.glob('$lib/assets/hero.{jpg,jpeg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const heroSrc = Object.values(heroImages)[0] as string | undefined;
</script>

<section
	class="relative isolate flex min-h-[36rem] items-center justify-center overflow-hidden pt-16 pb-14 md:min-h-[40rem]"
>
	{#if heroSrc}
		<!-- object-position is tuned to keep the face in frame for the current
		     portrait-shaped hero photo; re-tune the vertical % if that photo changes -->
		<img
			src={heroSrc}
			alt=""
			class="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_38%]"
		/>
		<div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/25"
		></div>
		<div class="absolute inset-0 -z-10 bg-primary/25 mix-blend-multiply"></div>
	{:else}
		<div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/85 via-primary to-primary/90"
		></div>
	{/if}

	<div class="relative mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
		<Logo markClass="h-14 w-auto text-white" textClass="text-white" class="mb-8" />

		<h1 class="font-heading text-5xl leading-[0.95] font-bold text-balance text-white sm:text-6xl md:text-7xl">
			{#each site.heroWords as word (word)}
				<span class="block uppercase">{word}</span>
			{/each}
		</h1>

		<div class="mt-10 flex flex-wrap items-center justify-center gap-3">
			<Button href="#concerts" size="lg">Upcoming concerts</Button>
			<Button href="#music" size="lg" variant="secondary">Music</Button>
		</div>

		<div class="mt-10">
			<SocialStrip variant="inverted" class="justify-center" />
		</div>
	</div>

	<a
		href="#about"
		class="absolute inset-x-0 bottom-5 mx-auto flex w-fit items-center gap-2 text-xs text-white/70 transition-colors hover:text-white"
	>
		<ArrowDownIcon class="size-4 animate-bounce" /> Scroll
	</a>
</section>
