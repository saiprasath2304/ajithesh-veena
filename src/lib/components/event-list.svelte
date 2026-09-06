<script lang="ts">
	import type { VeenaEvent } from '$lib/events.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import TicketIcon from '@lucide/svelte/icons/ticket';
	import CalendarIcon from '@lucide/svelte/icons/calendar';

	let {
		upcoming,
		past,
		loading = false
	}: { upcoming: VeenaEvent[]; past: VeenaEvent[]; loading?: boolean } = $props();

	function fmt(date: string) {
		const d = new Date(date);
		if (Number.isNaN(d.getTime())) return { day: '', rest: date };
		return {
			day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
			month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
			year: d.getFullYear(),
			full: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
		};
	}

	function place(e: VeenaEvent) {
		return [e.venue, e.city, e.country].filter(Boolean).join(', ');
	}
</script>

{#snippet eventRow(e: VeenaEvent, dim: boolean)}
	{@const f = fmt(e.date)}
	<div
		class={[
			'flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:gap-6',
			dim && 'opacity-80'
		]}
	>
		<div
			class="flex shrink-0 flex-row items-baseline gap-2 sm:w-20 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
		>
			<span class="font-heading text-3xl leading-none font-semibold">{f.day}</span>
			<span class="text-xs font-medium tracking-widest text-primary">{f.month}</span>
			<span class="text-xs text-muted-foreground">{f.year}</span>
		</div>

		<div class="hidden h-14 w-px bg-border sm:block"></div>

		<div class="min-w-0 flex-1">
			<h3 class="font-heading text-lg font-semibold text-balance">{e.title}</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				{#if e.time}<span>{e.time}</span> · {/if}{place(e) || f.full}
			</p>
			{#if e.presenter}
				<p class="mt-0.5 text-sm text-muted-foreground">Presented by {e.presenter}</p>
			{/if}
			{#if e.notes}
				<p class="mt-2 text-sm text-pretty">{e.notes}</p>
			{/if}
		</div>

		{#if (e.ticketsUrl || e.mapUrl) && !dim}
			<div class="flex shrink-0 flex-wrap gap-2">
				{#if e.ticketsUrl}
					<Button href={e.ticketsUrl} target="_blank" rel="noopener" size="sm">
						<TicketIcon class="size-4" /> Tickets
					</Button>
				{/if}
				{#if e.mapUrl}
					<Button href={e.mapUrl} target="_blank" rel="noopener" size="sm" variant="outline">
						<MapPinIcon class="size-4" /> Map
					</Button>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#if loading}
	<div class="space-y-4">
		{#each { length: 2 } as _, i (i)}
			<div class="h-28 animate-pulse rounded-xl border border-border bg-muted/50"></div>
		{/each}
	</div>
{:else if upcoming.length === 0 && past.length === 0}
	<div class="rounded-xl border border-dashed border-border p-10 text-center">
		<CalendarIcon class="mx-auto size-6 text-muted-foreground" />
		<p class="mt-3 font-medium">No concerts listed right now</p>
		<p class="mt-1 text-sm text-muted-foreground">
			Please check back soon, or get in touch about a performance.
		</p>
	</div>
{:else}
	<div class="space-y-4">
		{#if upcoming.length}
			{#each upcoming as e (e.date + e.title)}
				{@render eventRow(e, false)}
			{/each}
		{:else}
			<p class="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
				No upcoming dates are confirmed at the moment — new concerts are added here as they are
				scheduled.
			</p>
		{/if}
	</div>

	{#if past.length}
		<div class="mt-8">
			<Accordion.Root type="single" class="rounded-xl border border-border bg-card px-5">
				<Accordion.Item value="past">
					<Accordion.Trigger class="text-sm font-medium">
						Past concerts <Badge variant="secondary" class="ml-2">{past.length}</Badge>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="space-y-3 pb-2">
							{#each past as e (e.date + e.title)}
								{@render eventRow(e, true)}
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	{/if}
{/if}
