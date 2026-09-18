<script lang="ts">
	import VeenaMark from './veena-mark.svelte';

	// Drop photos at src/lib/assets/journey/*.(jpg|jpeg|png|webp) — a staggered,
	// caption-free strip alongside the timeline, editorial rather than gridded
	// (loosely after ranjanigayatri.com/about).
	const images = import.meta.glob('$lib/assets/journey/*.{jpg,jpeg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const photos = Object.keys(images)
		.sort((a, b) => a.localeCompare(b))
		.map((path) => images[path] as string);
</script>

{#if photos.length}
	<div class="columns-2 gap-4">
		{#each photos as src (src)}
			<div class="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border bg-muted">
				<img {src} alt="" loading="lazy" class="h-auto w-full object-cover" />
			</div>
		{/each}
	</div>
{:else}
	<div
		class="flex h-full min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground"
	>
		<VeenaMark class="h-8 w-8 text-primary/50" />
		<p class="text-sm">Add photos to <code>src/lib/assets/journey/</code> to fill this strip.</p>
	</div>
{/if}
