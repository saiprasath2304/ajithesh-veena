<script lang="ts">
	import { site } from '$lib/site.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Logo from './logo.svelte';
	import NavIcon from './nav-icon.svelte';
	import MenuIcon from '@lucide/svelte/icons/menu';

	let mobileOpen = $state(false);
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-primary shadow-sm">
	<div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
		<a href="#top" class="flex items-center">
			<Logo markClass="text-primary-foreground" textClass="text-primary-foreground" />
		</a>

		<nav class="hidden items-center gap-1 lg:flex">
			{#each site.nav as item (item.href)}
				<a
					href={item.href}
					class="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
				>
					<NavIcon key={item.icon} class="size-5" />
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="lg:hidden">
			<Sheet.Root bind:open={mobileOpen}>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="ghost"
							size="icon"
							class="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
							aria-label="Open menu"
						>
							<MenuIcon class="size-6" />
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-72">
					<Sheet.Header>
						<Sheet.Title>
							<Logo />
						</Sheet.Title>
					</Sheet.Header>
					<nav class="mt-2 flex flex-col px-4">
						{#each site.nav as item (item.href)}
							<a
								href={item.href}
								class="flex items-center gap-3 rounded-md px-2 py-3 text-base text-foreground/90 transition-colors hover:bg-muted hover:text-foreground"
								onclick={() => (mobileOpen = false)}
							>
								<NavIcon key={item.icon} class="size-5 text-primary" />
								{item.label}
							</a>
						{/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
