<script lang="ts">
	import { site } from '$lib/site.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SocialStrip from './social-strip.svelte';
	import VeenaMark from './veena-mark.svelte';
	import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
</script>

<section class="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
	<!-- soft radial glow -->
	<div
		class="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
		style="background: radial-gradient(circle, var(--accent), transparent 70%)"
	></div>

	<!-- oversized decorative veena mark, desktop only -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center overflow-hidden text-primary opacity-[0.06] lg:flex"
	>
		<VeenaMark class="size-[26rem] shrink-0" />
	</div>

	<div class="relative mx-auto max-w-5xl px-5">
		<p class="text-xs font-medium uppercase tracking-[0.25em] text-primary">
			{site.role} · {site.location}
		</p>
		<h1 class="mt-5 font-heading text-5xl font-semibold text-balance sm:text-6xl md:text-7xl">
			{site.name}
		</h1>
		<p class="mt-6 max-w-xl text-lg text-muted-foreground text-pretty md:text-xl">
			{site.tagline}
		</p>

		<div class="mt-9 flex flex-wrap items-center gap-3">
			<Button href="#concerts" size="lg">Upcoming concerts</Button>
			<Button href="#listen" size="lg" variant="outline">Listen</Button>
		</div>

		<div class="mt-12">
			<SocialStrip />
		</div>
	</div>

	<a
		href="#about"
		class="mx-auto mt-16 flex w-fit items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
	>
		<ArrowDownIcon class="size-4 animate-bounce" /> Scroll
	</a>
</section>
