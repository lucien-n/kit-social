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
	<article class="card flex h-full w-full flex-col gap-3 p-5" id="settings">
		<h2 class="h2 text-center">Settings</h2>
		{#if error}
			<p class="variant-error">
				{error}
			</p>
		{/if}
		<hr />
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
		<button
			type="submit"
			class="variant-ghost-primary btn mx-auto mt-auto flex w-fit gap-1 text-xl"
			disabled={loading}
		>
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
		<slot />
	</article>
</form>
