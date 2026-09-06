<script lang="ts">
	import { site } from '$lib/site.js';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import VeenaMark from './veena-mark.svelte';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import MenuIcon from '@lucide/svelte/icons/menu';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 8;
	}
</script>

<svelte:window on:scroll={onScroll} />

<header
	class={[
		'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
		scrolled
			? 'border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70'
			: 'border-b border-transparent'
	]}
>
	<div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
		<a href="#top" class="flex items-center gap-2.5 font-heading text-lg font-semibold">
			<VeenaMark class="h-6 w-6 text-primary" />
			<span>{site.name}</span>
		</a>

		<nav class="hidden items-center gap-1 md:flex">
			{#each site.nav as item (item.href)}
				<a
					href={item.href}
					class="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					{item.label}
				</a>
			{/each}
			<Button variant="ghost" size="icon" class="ml-1" onclick={toggleMode} aria-label="Toggle theme">
				<SunIcon class="size-4 dark:hidden" />
				<MoonIcon class="hidden size-4 dark:block" />
			</Button>
		</nav>

		<div class="flex items-center gap-1 md:hidden">
			<Button variant="ghost" size="icon" onclick={toggleMode} aria-label="Toggle theme">
				<SunIcon class="size-4 dark:hidden" />
				<MoonIcon class="hidden size-4 dark:block" />
			</Button>
			<Sheet.Root bind:open={mobileOpen}>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost" size="icon" aria-label="Open menu">
							<MenuIcon class="size-5" />
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-64">
					<Sheet.Header>
						<Sheet.Title class="font-heading">{site.name}</Sheet.Title>
					</Sheet.Header>
					<nav class="mt-2 flex flex-col px-4">
						{#each site.nav as item (item.href)}
							<a
								href={item.href}
								class="rounded-md px-2 py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
								onclick={() => (mobileOpen = false)}
							>
								{item.label}
							</a>
						{/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
