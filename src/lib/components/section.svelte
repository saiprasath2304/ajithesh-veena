<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import NavIcon from './nav-icon.svelte';

	let {
		id,
		eyebrow,
		title,
		lead,
		icon,
		class: className = '',
		children
	}: {
		id: string;
		eyebrow?: string;
		title?: string;
		lead?: string;
		/** key from nav-icon.svelte — shown as a large badge above the heading */
		icon?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<section {id} class={cn('scroll-mt-20 py-20 md:py-28', className)}>
	<div class="mx-auto max-w-5xl px-5">
		<header class="mb-12 max-w-2xl">
			{#if icon}
				<div class="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					<NavIcon key={icon} class="size-6" />
				</div>
			{/if}
			{#if eyebrow}
				<p class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
			{/if}
			{#if title}
				<h2 class="text-3xl font-semibold text-balance md:text-4xl">{title}</h2>
			{/if}
			{#if lead}
				<p class="mt-4 text-lg text-muted-foreground text-pretty">{lead}</p>
			{/if}
		</header>
		{@render children()}
	</div>
</section>
