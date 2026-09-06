<script lang="ts">
	import { cn } from '$lib/utils.js';
	let { class: className = '' }: { class?: string } = $props();
</script>

<!-- Stylised Saraswati veena: gourd resonator, dandi (neck), tuning gourd and strings. -->
<svg
	class={cn('h-6 w-6', className)}
	viewBox="0 0 48 48"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<circle cx="13" cy="34" r="9" />
	<path d="M13 34c4-1 6-3 7-7" />
	<path d="M20 27 39 8" />
	<path d="M38 5c2.6 0 4.5 1.9 4.5 4.4C42.5 12 40.6 14 38 14" />
	<path d="M17.5 30.5 36.5 11.5M15 33 34 14" />
</svg>
