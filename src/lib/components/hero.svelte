<script lang="ts">
	import { site } from '$lib/site.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SocialStrip from './social-strip.svelte';
	import VeenaMark from './veena-mark.svelte';
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
	class="relative isolate flex min-h-[36rem] items-end overflow-hidden pt-24 pb-16 md:min-h-[44rem] md:pb-24"
>
	{#if heroSrc}
		<img src={heroSrc} alt="" class="absolute inset-0 -z-20 h-full w-full object-cover" />
		<div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10"
		></div>
		<div class="absolute inset-0 -z-10 bg-primary/30 mix-blend-multiply"></div>
	{:else}
		<div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/12 via-background to-background"
		></div>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center overflow-hidden text-primary opacity-[0.06] lg:flex"
		>
			<VeenaMark class="size-[26rem] shrink-0" />
		</div>
	{/if}

	<div class="relative mx-auto w-full max-w-5xl px-5">
		<p
			class={[
				'text-xs font-medium uppercase tracking-[0.25em]',
				heroSrc ? 'text-white/85' : 'text-primary'
			]}
		>
			{site.role} · {site.location}
		</p>
		<h1
			class={[
				'mt-5 font-heading text-5xl font-semibold text-balance sm:text-6xl md:text-7xl',
				heroSrc ? 'text-white' : 'text-foreground'
			]}
		>
			{site.name}
		</h1>
		<p
			class={[
				'mt-6 max-w-xl text-lg text-pretty md:text-xl',
				heroSrc ? 'text-white/85' : 'text-muted-foreground'
			]}
		>
			{site.tagline}
		</p>

		<div class="mt-9 flex flex-wrap items-center gap-3">
			<Button href="#concerts" size="lg">Upcoming concerts</Button>
			<Button href="#music" size="lg" variant={heroSrc ? 'secondary' : 'outline'}>Music</Button>
		</div>

		<div class="mt-12">
			<SocialStrip variant={heroSrc ? 'inverted' : 'default'} />
		</div>
	</div>

	<a
		href="#about"
		class={[
			'absolute inset-x-0 bottom-5 mx-auto flex w-fit items-center gap-2 text-xs transition-colors',
			heroSrc ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'
		]}
	>
		<ArrowDownIcon class="size-4 animate-bounce" /> Scroll
	</a>
</section>
