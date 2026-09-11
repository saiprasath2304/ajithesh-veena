<script lang="ts">
	import VeenaMark from './veena-mark.svelte';

	// Drop photos at src/lib/assets/gallery/*.(jpg|jpeg|png|webp) — sorted by
	// filename, so prefix them (01-, 02-, …) to control the order.
	const images = import.meta.glob('$lib/assets/gallery/*.{jpg,jpeg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const photos = Object.entries(images)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([, url]) => url as string);
</script>

{#if photos.length}
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each photos as src (src)}
			<div class="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
				<img
					{src}
					alt=""
					loading="lazy"
					class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
				/>
			</div>
		{/each}
	</div>
{:else}
	<div class="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
		<VeenaMark class="h-8 w-8 text-primary/50" />
		<p class="text-sm">
			Add photos to <code>src/lib/assets/gallery/</code> to fill this gallery.
		</p>
	</div>
{/if}
