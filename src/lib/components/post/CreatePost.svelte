<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { FormEventHandler, KeyboardEventHandler } from 'svelte/elements';
	import Avatar from '$comp/Avatar.svelte';
	import type SocialClient from '$sclient/sclient';
	import { POST_CHARACTER_LIMIT } from '$lib/utilities/constants';
	import { settingsStore } from '$stores/settings';
	import SubmitButton from '$comp/form/SubmitButton.svelte';

	export let sclient: SocialClient;
	export let form;

	let input: HTMLTextAreaElement;

	let loading = false;

	let content: string = (form?.content as string) || '';
	let hidePlaceholder = false;

	let current_character_count = 0;

	const handleSubmit: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.set('content', content);
		return async ({ result }) => {
			await applyAction(result);
			loading = false;

			if (result.type == 'success') {
				content = '';
				hidePlaceholder = false;
			}
		};
	};

	const handleInput: FormEventHandler<HTMLTextAreaElement> = () => {
		hidePlaceholder = content.length > 0;
		current_character_count = content.length;
		input.style.height = `${input.scrollHeight}px`;
	};

	const handleKeypress: KeyboardEventHandler<Window> = (event) => {
		if (event.key !== 'n' || !settingsStore.isEnabled('shortcuts')) return;
		event.preventDefault();
		input.focus();
	};
</script>

<svelte:window on:keypress={handleKeypress} />

<section class="card mx-auto flex w-full gap-2 p-3">
	<Avatar {sclient} profile={$profileStore} width="w-12" />
	<form method="post" class="relative flex h-full w-full flex-col" use:enhance={handleSubmit}>
		<div class="pointer-events-none absolute p-1 text-xl opacity-70" class:hidden={hidePlaceholder}>
			What's poppin {$profileStore?.name || ''}?
			<span class="kbd variant-ghost-primary">N</span>
		</div>
		<textarea
			class="h-24 w-full resize-none border-0 border-none bg-transparent p-1 text-xl outline-none outline-0 focus:outline-none focus:outline-0"
			maxlength={POST_CHARACTER_LIMIT}
			bind:this={input}
			bind:value={content}
			on:input={handleInput}
		/>
		<div class="flex items-center gap-3 self-end">
			<p class="flex gap-1 self-end tracking-wide opacity-70">
				<span>{current_character_count}</span><span>/</span> <span>{POST_CHARACTER_LIMIT}</span>
			</p>
			<SubmitButton
				bind:loading
				name="create-post"
				loading_text="Sending"
				default_text="Send"
				variant="variant-ghost-secondary"
			>
				<svelte:fragment slot="defaultIcon">
					<Icon icon="mdi:send" width={20} />
				</svelte:fragment>
			</SubmitButton>
		</div>
	</form>
</section>

<style>
	textarea:hover,
	textarea:active,
	textarea:focus {
		outline: 0px !important;
		appearance: none;
		-webkit-appearance: none;
		box-shadow: none !important;
	}
</style>
