<script lang="ts">
	import { site } from '$lib/site.js';
	import PlayIcon from '@lucide/svelte/icons/play';

	// Track which videos have been "activated" (iframe swapped in on click) so we
	// don't ship four autoplaying iframes on load.
	let active = $state<Record<string, boolean>>({});
</script>

<div class="grid gap-6 sm:grid-cols-2">
	{#each site.youtube.featured as video (video.id)}
		<figure class="overflow-hidden rounded-xl border border-border bg-card">
			<div class="relative aspect-video">
				{#if active[video.id]}
					<iframe
						class="absolute inset-0 h-full w-full"
						src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
						title={video.title}
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<button
						type="button"
						class="group absolute inset-0 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
						onclick={() => (active[video.id] = true)}
						aria-label={`Play: ${video.title}`}
					>
						<img
							src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
							alt=""
							loading="lazy"
							class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<span class="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></span>
						<span
							class="relative flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110"
						>
							<PlayIcon class="size-6 translate-x-0.5 fill-current" />
						</span>
					</button>
				{/if}
			</div>
			<figcaption class="px-4 py-3 text-sm text-muted-foreground">{video.title}</figcaption>
		</figure>
	{/each}
</div>
