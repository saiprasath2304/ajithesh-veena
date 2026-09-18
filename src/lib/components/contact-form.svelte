<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { toast } from 'svelte-sonner';
	import { site } from '$lib/site.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import SendIcon from '@lucide/svelte/icons/send';
	import LoaderIcon from '@lucide/svelte/icons/loader-circle';

	const accessKey = env.PUBLIC_WEB3FORMS_ACCESS_KEY;
	const configured = Boolean(accessKey);

	let submitting = $state(false);
	let done = $state(false);

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		// Honeypot: real users never fill this.
		if (data.get('botcheck')) return;

		data.append('access_key', accessKey ?? '');
		data.append('subject', `Website enquiry — ${data.get('name') || 'someone'}`);
		data.append('from_name', `${site.name} website`);

		submitting = true;
		try {
			const res = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: data
			});
			const json = await res.json();
			if (json.success) {
				done = true;
				form.reset();
				toast.success('Message sent', {
					description: 'Thank you — you will hear back soon.'
				});
			} else {
				toast.error('Could not send message', {
					description: json.message ?? 'Please try again, or email directly.'
				});
			}
		} catch {
			toast.error('Network problem', { description: 'Please try again in a moment.' });
		} finally {
			submitting = false;
		}
	}
</script>

<div class="rounded-xl border border-border bg-card p-6 sm:p-8">
	{#if !configured}
		<p class="mb-6 rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
			<strong class="text-foreground">Setup needed:</strong> add a free
			<a class="underline" href="https://web3forms.com" target="_blank" rel="noopener">Web3Forms</a>
			access key as <code>PUBLIC_WEB3FORMS_ACCESS_KEY</code> to enable this form. Until then, please
			email
			<a class="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
		</p>
	{/if}

	{#if done}
		<div class="py-8 text-center">
			<h3 class="font-heading text-xl font-semibold">Message received</h3>
			<p class="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
				Thank you for reaching out. You will get a reply at the address you provided.
			</p>
			<Button variant="outline" class="mt-6" onclick={() => (done = false)}>Send another</Button>
		</div>
	{:else}
		<form class="grid gap-5" onsubmit={onSubmit}>
			<input
				type="checkbox"
				name="botcheck"
				class="hidden"
				tabindex="-1"
				autocomplete="off"
				aria-hidden="true"
			/>

			<div class="grid gap-2">
				<Label for="cf-name">Name</Label>
				<Input id="cf-name" name="name" required autocomplete="name" placeholder="Your name" />
			</div>

			<div class="grid gap-2 sm:grid-cols-2 sm:gap-4">
				<div class="grid gap-2">
					<Label for="cf-email">Email</Label>
					<Input
						id="cf-email"
						name="email"
						type="email"
						required
						autocomplete="email"
						placeholder="you@example.com"
					/>
				</div>
				<div class="grid gap-2">
					<Label for="cf-org">Organisation <span class="text-muted-foreground">(optional)</span></Label>
					<Input id="cf-org" name="organisation" autocomplete="organization" placeholder="Sabha / venue" />
				</div>
			</div>

			<div class="grid gap-2">
				<Label for="cf-message">Message</Label>
				<Textarea
					id="cf-message"
					name="message"
					required
					rows={5}
					placeholder="Concert enquiry, collaboration, or a note…"
				/>
			</div>

			<div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
				<Button type="submit" disabled={submitting || !configured}>
					{#if submitting}
						<LoaderIcon class="size-4 animate-spin" /> Sending…
					{:else}
						<SendIcon class="size-4" /> Send message
					{/if}
				</Button>
				<p class="text-xs break-words text-muted-foreground">
					or email <a class="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
				</p>
			</div>
		</form>
	{/if}
</div>
