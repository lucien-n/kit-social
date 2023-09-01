<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: { error: string; profile: SupaProfile; settings: SupaProfileSettings };

	let { error, profile, settings } = data;
	$: ({ error, profile, settings } = data);

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const settings_text: { [_: string]: { label: string; description: string } } = {
		is_private: {
			label: 'Private',
			description: "Hide your posts and activity from people who don't follow you"
		},
		hide_likes: {
			label: 'Hide likes',
			description: 'Hide your likes people who follow you'
		},
		hide_followed: {
			label: 'Hide followed',
			description: 'Hide your followed list from people who follow you'
		}
	};
</script>

<form
	method="post"
	use:enhance={handleSubmit}
	class="flex h-full w-full items-center justify-center"
>
	<article class="flex h-full w-full flex-col gap-3 p-5" id="settings">
		{#if error}
			<p class="variant-error">
				{error}
			</p>
		{/if}
		<div class="flex flex-col gap-3">
			{#key settings}
				{#if settings}
					{#each Object.entries(settings) as [name, value]}
						{#if Object.keys(settings_text).includes(name)}
							<section class="flex items-center gap-2">
								<SlideToggle {name} checked={value === true} />
								<span class="font-semibold">
									<p class="text-lg">
										{settings_text[name].label}
									</p>
									<p class="opacity-70">
										{settings_text[name].description}
									</p>
								</span>
							</section>
						{/if}
					{/each}
				{/if}
			{/key}
		</div>
		<div class="mx-auto mt-auto flex w-fit gap-2 text-xl">
			<a
				href="/auth/signout"
				class="variant-ghost-error btn flex gap-2"
				aria-label="signout"
				data-sveltekit-reload><Icon icon="mdi:logout" width={24} /> Sign Out</a
			>
			<button type="submit" class="variant-ghost-primary btn flex gap-2" disabled={loading}>
				{#if loading}
					<span class="animate-spin">
						<Icon icon="mdi:loading" />
					</span>
				{:else}
					<span>
						<Icon icon="mdi:check" />
					</span>
				{/if}
				Save
			</button>
		</div>
		<slot />
	</article>
</form>
