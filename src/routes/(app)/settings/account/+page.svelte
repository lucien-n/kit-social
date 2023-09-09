<script lang="ts">
	import { enhance } from '$app/forms';
	import SubmitButton from '$comp/form/SubmitButton.svelte';
	import Icon from '@iconify/svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	let {
		streamed: { settings }
	} = data;
	$: ({
		streamed: { settings }
	} = data);

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;

			if (result.type === 'success') invalidate('app:settings');
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
		},
		shortcuts: {
			label: 'Shortcuts',
			description: 'Shortcuts allow you to navigate quicker using the keyboard'
		}
	};
</script>

<form
	method="post"
	use:enhance={handleSubmit}
	class="flex h-full w-full items-center justify-center"
>
	<article class="flex h-full w-full flex-col gap-3" id="settings">
		<div class="flex flex-col gap-3">
			{#await settings}
				<p class="text-center">loading settings</p>
			{:then settings}
				{#key settings}
					{#if settings}
						{#each settings as { name, enabled: value }}
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
			{/await}
		</div>
		<div class="mx-auto mt-auto flex w-fit gap-2 text-xl">
			<a
				href="/auth/signout"
				class="variant-ghost-error btn flex gap-2"
				aria-label="signout"
				data-sveltekit-reload><Icon icon="mdi:logout" width={24} /> Sign Out</a
			>
			<SubmitButton bind:loading name="save-settings" loading_text="Saving" default_text="Save">
				<svelte:fragment slot="defaultIcon">
					<Icon icon="mdi:check" />
				</svelte:fragment>
			</SubmitButton>
		</div>
		<slot />
	</article>
</form>
