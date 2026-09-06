<script lang="ts">
	import { site } from '$lib/site.js';
	import SocialStrip from './social-strip.svelte';
	import VeenaMark from './veena-mark.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-card/40">
	<div class="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-14 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<a href="#top" class="flex items-center gap-2.5 font-heading text-lg font-semibold">
				<VeenaMark class="h-6 w-6 text-primary" />
				<span>{site.name}</span>
			</a>
			<p class="mt-3 max-w-xs text-sm text-muted-foreground">
				{site.role} · {site.location}
			</p>
		</div>

		<div class="sm:text-right">
			<p class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
				Elsewhere
			</p>
			<SocialStrip class="sm:justify-end" size="sm" />
		</div>
	</div>
	<div class="border-t border-border">
		<div class="mx-auto max-w-5xl px-5 py-5 text-xs text-muted-foreground">
			© {year} {site.name}. All rights reserved.
		</div>
	</div>
</footer>
