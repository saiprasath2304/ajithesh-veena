<script lang="ts">
	import { site } from '$lib/site.js';
	import { cn } from '$lib/utils.js';
	import VeenaMark from './veena-mark.svelte';

	/**
	 * Wordmark used in the header and footer. Drop a real logo image at
	 * src/lib/assets/logo.(svg|png|webp) and it replaces the icon + text
	 * automatically — nothing else needs to change.
	 */
	let {
		class: className = '',
		markClass = '',
		textClass = ''
	}: { class?: string; markClass?: string; textClass?: string } = $props();

	const logos = import.meta.glob('$lib/assets/logo.{svg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const logoSrc = Object.values(logos)[0] as string | undefined;
</script>

<span class={cn('flex items-center gap-2.5', className)}>
	{#if logoSrc}
		<img src={logoSrc} alt={site.brand} class={cn('h-8 w-auto', markClass)} />
	{:else}
		<VeenaMark class={cn('h-6 w-6', markClass)} />
		<span class={cn('font-heading text-lg font-semibold', textClass)}>{site.brand}</span>
	{/if}
</span>
