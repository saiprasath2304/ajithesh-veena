<script lang="ts">
	import UserIcon from '@lucide/svelte/icons/user';
	import ImageIcon from '@lucide/svelte/icons/image';
	import CalendarDaysIcon from '@lucide/svelte/icons/calendar-days';
	import MusicIcon from '@lucide/svelte/icons/music';
	import CompassIcon from '@lucide/svelte/icons/compass';
	import MailIcon from '@lucide/svelte/icons/mail';

	// Registry for the `icon` keys used in site.ts (`nav`, and Section's `icon`
	// prop). Add a case here before referencing a new key.
	const ICONS = {
		about: UserIcon,
		media: ImageIcon,
		concerts: CalendarDaysIcon,
		music: MusicIcon,
		journey: CompassIcon,
		contact: MailIcon
	};

	let { key, class: className = '' }: { key: string; class?: string } = $props();
	const Icon = $derived(ICONS[key as keyof typeof ICONS] ?? UserIcon);
</script>

<Icon class={className} aria-hidden="true" />
