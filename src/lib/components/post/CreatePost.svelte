<script lang="ts">
	import Avatar from '$comp/Avatar.svelte';
	import Shortcut from '$comp/Shortcut.svelte';
	import SubmitButton from '$comp/form/SubmitButton.svelte';
	import { POST_CHARACTER_LIMIT } from '$lib/utilities/constants';
	import type SocialClient from '$sclient/sclient';
	import { profileStore } from '$stores/profile';
	import { settingsStore } from '$stores/settings';
	import Icon from '@iconify/svelte';
	import type { FormEventHandler, KeyboardEventHandler } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let sclient: SocialClient;
	export let form_data;

	let input: HTMLTextAreaElement;

	let loading = false;

	let hidePlaceholder = false;

	let current_character_count = 0;

	let is_focused = false;

	const handleSubmit = () => {
		loading = true;
		return async () => {
			loading = false;

			hidePlaceholder = false;
		};
	};

	const handleInput: FormEventHandler<HTMLTextAreaElement> = () => {
		hidePlaceholder = $form.content.length > 0;
		current_character_count = $form.content.length;
		input.style.height = `${input.scrollHeight}px`;
	};

	const { form, errors, constraints, enhance } = superForm(form_data, {
		applyAction: false,
		invalidateAll: false,
		onSubmit: handleSubmit,
		onResult: ({ result }) => {
			loading = false;
			if (result.type == 'failure') {
				setTimeout(() => ($errors.content = undefined), 2_000);
			}
		}
	});
</script>

<section class="card mx-auto flex w-full gap-2 p-3">
	<Avatar {sclient} profile={$profileStore} width="w-12" />
	<form method="post" use:enhance class="relative flex h-full w-full flex-col">
		<div class="pointer-events-none absolute p-1 text-xl opacity-70" class:hidden={hidePlaceholder}>
			What's poppin {$profileStore?.name || ''}?
			<Shortcut
				shortcut={{ key: 'n' }}
				on:shortcut={(event) => {
					event.preventDefault();
					input.focus();
				}}
			/>
		</div>
		<textarea
			class="h-24 w-full resize-none border-0 border-none bg-transparent p-1 text-xl outline-none outline-0 focus:outline-none focus:outline-0"
			name="content"
			maxlength={POST_CHARACTER_LIMIT}
			aria-invalid={$errors.content ? 'true' : undefined}
			bind:this={input}
			bind:value={$form.content}
			on:input={handleInput}
			on:focusin={() => {
				is_focused = true;
				settingsStore.disable('shortcuts');
			}}
			on:focusout={() => {
				is_focused = false;
				settingsStore.enable('shortcuts');
			}}
			{...$constraints.content}
		/>
		<div class="flex items-center justify-between">
			<div>
				{#if $errors.content}
					<p
						transition:fade={{ duration: 200 }}
						class="variant-glass-error px-2 py-1 rounded-token"
					>
						{$errors.content}
					</p>
				{/if}
			</div>
			<div class="flex items-center gap-3">
				<p class="flex gap-1 self-end tracking-wide opacity-70">
					<span>{current_character_count}</span><span>/</span> <span>{POST_CHARACTER_LIMIT}</span>
				</p>
				<SubmitButton
					bind:loading
					name="create-post"
					loading_text="Sending"
					default_text="Send"
					variant="variant-ghost-secondary"
					bind:shortcut_enabled={is_focused}
					shortcut_force_enabled
				>
					<svelte:fragment slot="defaultIcon">
						<Icon icon="mdi:send" width={20} />
					</svelte:fragment>
				</SubmitButton>
			</div>
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
