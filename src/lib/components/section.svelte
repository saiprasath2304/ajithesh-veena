<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	let {
		id,
		eyebrow,
		title,
		lead,
		class: className = '',
		children
	}: {
		id: string;
		eyebrow?: string;
		title: string;
		lead?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<section {id} class={cn('scroll-mt-20 py-20 md:py-28', className)}>
	<div class="mx-auto max-w-5xl px-5">
		<header class="mb-12 max-w-2xl">
			{#if eyebrow}
				<p class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
			{/if}
			<h2 class="text-3xl font-semibold text-balance md:text-4xl">{title}</h2>
			{#if lead}
				<p class="mt-4 text-lg text-muted-foreground text-pretty">{lead}</p>
			{/if}
		</header>
		{@render children()}
	</div>
</section>
