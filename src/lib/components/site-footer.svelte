<script lang="ts">
	import { site } from '$lib/site.js';
	import SocialStrip from './social-strip.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-primary text-primary-foreground">
	<div
		class="mx-auto grid max-w-5xl grid-cols-1 items-center gap-4 px-5 py-6 text-center sm:grid-cols-3 sm:text-left"
	>
		<div class="text-xs text-primary-foreground/80 sm:order-1">
			{#if site.credit}
				Designed by
				<a
					href={site.credit.href}
					target="_blank"
					rel="noopener"
					class="underline underline-offset-2 hover:text-primary-foreground"
				>
					{site.credit.label}
				</a>
			{/if}
		</div>

		<div class="text-xs sm:order-2 sm:text-center">
			<p>© {year} {site.domain}</p>
			<p class="text-primary-foreground/80">All rights reserved</p>
		</div>

		<div class="flex justify-center sm:order-3 sm:justify-end">
			<SocialStrip variant="inverted" size="sm" />
		</div>
	</div>
</footer>
