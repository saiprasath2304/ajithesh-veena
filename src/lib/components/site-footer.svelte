<script lang="ts">
	import { site } from '$lib/site.js';
	import SocialStrip from './social-strip.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-primary text-primary-foreground">
	<div
		class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:flex-row sm:text-left"
	>
		<div class="text-xs">
			<p>© {year} {site.domain}</p>
			<p class="text-primary-foreground/80">All rights reserved</p>
		</div>

		<SocialStrip variant="inverted" size="sm" />
	</div>
</footer>
