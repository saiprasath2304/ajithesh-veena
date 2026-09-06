<script lang="ts">
	import { site } from '$lib/site.js';
	import { cn } from '$lib/utils.js';

	let {
		class: className = '',
		size = 'md'
	}: { class?: string; size?: 'sm' | 'md' } = $props();

	/**
	 * Brand glyphs as raw SVG path data (24x24 viewBox).
	 * To support a new platform, add a key here and reference it from `site.socials`.
	 * Any social whose `icon` is not found here still renders — it just uses the
	 * generic link glyph — so removing or adding badges never breaks the layout.
	 */
	const BRAND_ICONS: Record<string, string> = {
		youtube:
			'M23 12s0-3.4-.4-5a2.8 2.8 0 0 0-2-2C18.8 4.5 12 4.5 12 4.5s-6.8 0-8.6.5a2.8 2.8 0 0 0-2 2C1 8.6 1 12 1 12s0 3.4.4 5a2.8 2.8 0 0 0 2 2c1.8.5 8.6.5 8.6.5s6.8 0 8.6-.5a2.8 2.8 0 0 0 2-2c.4-1.6.4-5 .4-5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z',
		instagram:
			'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.9 2.6 10.3 2.6 12s0 2.1.1 3.2c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.1.1-1.5.1-3.2s0-2.1-.1-3.2c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm5.1-8.3a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3Z',
		facebook:
			'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z',
		x: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.83L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z',
		spotify:
			'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.9.9 0 0 1-1.2.3c-3.3-2-7.4-2.5-12.3-1.4a.9.9 0 1 1-.4-1.7c5.3-1.2 9.9-.7 13.6 1.6.4.2.5.8.3 1.2Zm1.2-2.8a1 1 0 0 1-1.4.3c-3.7-2.3-9.4-3-13.8-1.6a1 1 0 1 1-.6-2c5-1.5 11.3-.7 15.6 1.9.5.3.6.9.2 1.4Zm.1-2.9C15.6 8 8.7 7.8 4.9 9a1.4 1.4 0 1 1-.8-2.6c4.4-1.3 12-1.1 16.4 1.6a1.4 1.4 0 0 1-1.5 2.3Z',
		apple:
			'M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.7 2.5 3 2.4 1.2-.1 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.7 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0-.1-2.5-1-2.6-3.9ZM14 5.6c.7-.8 1.1-2 1-3.1-1 0-2.1.6-2.8 1.4-.6.7-1.1 1.9-1 3 1.1.1 2.2-.5 2.8-1.3Z',
		soundcloud:
			'M1 15c0-1 .3-2 .8-2.8v5.6C1.3 17 1 16 1 15Zm2.4-4.3v8.6h.9V10.4c-.3.1-.6.2-.9.3Zm2.1-.7v9.3h.9V9.7c-.3.1-.6.2-.9.3Zm2.1-.3v9.6h.9V9.5l-.9.2Zm2.1-.2v9.8h.9V9.3h-.9Zm2.1 0v9.8h.9V9.4l-.9-.1Zm10.2 3.1a3.3 3.3 0 0 0-1.3.3 5 5 0 0 0-9.8 1.6v7.9h11.1a4.8 4.8 0 0 0 0-9.8Z',
		mail: 'M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2.2-.3 7.8 5.4 7.8-5.4A.8.8 0 0 0 19 5H5a.8.8 0 0 0-.8.7Z',
		link: 'M3.9 12a5 5 0 0 1 5-5h3.1v2H8.9a3 3 0 0 0 0 6H12v2H8.9a5 5 0 0 1-5-5Zm6.1-1h4v2h-4v-2Zm2-4h3.1a5 5 0 0 1 0 10H12v-2h3.1a3 3 0 0 0 0-6H12V7Z'
	};

	const iconSize = $derived(size === 'sm' ? 'size-4' : 'size-5');
	const boxSize = $derived(size === 'sm' ? 'size-9' : 'size-11');
</script>

{#if site.socials.length}
	<ul class={cn('flex flex-wrap items-center gap-2.5', className)}>
		{#each site.socials as social (social.href + social.label)}
			<li>
				<a
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.label}
					title={social.label}
					class={cn(
						'group flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
						boxSize
					)}
				>
					<svg class={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d={BRAND_ICONS[social.icon] ?? BRAND_ICONS.link} />
					</svg>
				</a>
			</li>
		{/each}
	</ul>
{/if}
