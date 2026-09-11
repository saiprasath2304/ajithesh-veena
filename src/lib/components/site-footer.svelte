<script lang="ts">
	import { site } from '$lib/site.js';
	import SocialStrip from './social-strip.svelte';
	import Logo from './logo.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-card/40">
	<div
		class="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-14 sm:flex-row sm:items-end sm:justify-between"
	>
		<div>
			<a href="#top" class="flex items-center"><Logo /></a>
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

	<div class="bg-primary text-primary-foreground">
		<div
			class="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="text-xs">
				<p>© {year} {site.brand} · {site.domain} — All rights reserved.</p>
				{#if site.credit}
					<p class="mt-1 text-primary-foreground/70">
						Site by
						<a
							href={site.credit.href}
							target="_blank"
							rel="noopener"
							class="underline underline-offset-2 hover:text-primary-foreground"
						>
							{site.credit.label}
						</a>
					</p>
				{/if}
			</div>
			<SocialStrip variant="inverted" size="sm" />
		</div>
	</div>
</footer>
