<script lang="ts">
	import VeenaMark from './veena-mark.svelte';

	// Drop photos at src/lib/assets/gallery/*.(jpg|jpeg|png|webp) — sorted by
	// filename, so prefix them (01-, 02-, …) to control the order. The bit of
	// the filename after the number becomes the little caption on the photo,
	// e.g. "02-lok-bhavan-2.jpg" -> "Lok Bhavan 2".
	const images = import.meta.glob('$lib/assets/gallery/*.{jpg,jpeg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});

	function captionFrom(path: string) {
		const file = path.split('/').pop() ?? '';
		const stem = file.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '');
		return stem.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
	}

	// A handful of alternating tilt angles so the wall looks loosely pinned,
	// not mechanically aligned. Repeats if there are more photos than angles.
	const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5];

	const photos = Object.keys(images)
		.sort((a, b) => a.localeCompare(b))
		.map((path, i) => ({
			src: images[path] as string,
			caption: captionFrom(path),
			tilt: TILTS[i % TILTS.length]
		}));
</script>

{#if photos.length}
	<div class="rounded-2xl bg-muted/60 p-6 sm:p-10">
		<div class="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8">
			{#each photos as photo (photo.src)}
				<div
					class="wall-photo relative w-40 shrink-0 bg-card p-2.5 pb-6 shadow-md ring-1 ring-black/5 hover:z-10 hover:shadow-xl sm:w-48"
					style={`--tilt: ${photo.tilt}deg;`}
				>
					<span
						class="absolute -top-2.5 left-1/2 size-4 -translate-x-1/2 rounded-full bg-primary shadow-sm ring-2 ring-primary-foreground/60"
						aria-hidden="true"
					></span>
					<div class="aspect-square overflow-hidden bg-muted">
						<img
							src={photo.src}
							alt={photo.caption}
							loading="lazy"
							class="h-full w-full object-cover"
						/>
					</div>
					<p class="mt-2 truncate text-center font-heading text-xs text-muted-foreground">
						{photo.caption}
					</p>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div
		class="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground"
	>
		<VeenaMark class="h-8 w-8 text-primary/50" />
		<p class="text-sm">
			Add photos to <code>src/lib/assets/gallery/</code> to fill this wall.
		</p>
	</div>
{/if}

<style>
	.wall-photo {
		rotate: var(--tilt);
		transition:
			rotate 300ms ease-out,
			scale 300ms ease-out,
			box-shadow 300ms ease-out;
	}
	.wall-photo:hover {
		rotate: 0deg;
		scale: 1.05;
	}
</style>
