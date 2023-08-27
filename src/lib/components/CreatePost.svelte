<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { profileStore } from '$stores/profile';
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { FormEventHandler } from 'svelte/elements';

	export let form;

	let loading = false;

	let content: string = form?.content || '';
	let hidePlaceholder = false;

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

	const handleInput: FormEventHandler<HTMLDivElement> = () => {
		hidePlaceholder = content != '';
	};
</script>

<section class="card mx-auto flex w-full gap-2 p-3">
	<div>
		<Avatar initials={$profileStore?.name[0]} width="w-12" />
	</div>
	<form method="post" class="relative flex h-full w-full flex-col" use:enhance={handleSubmit}>
		<div class="pointer-events-none absolute p-1 text-xl opacity-70" class:hidden={hidePlaceholder}>
			What's poppin {$profileStore?.name || ''}?
		</div>
		<div
			bind:textContent={content}
			contenteditable="true"
			placeholder="true"
			class="h-20 w-full p-1 text-xl outline-none"
			on:input={handleInput}
		/>
		<button
			type="submit"
			disabled={loading}
			class="variant-ghost-secondary btn flex items-center gap-1 self-end"
		>
			{#if loading}
				<span class="animate-spin">
					<Icon icon="mdi:loading" />
				</span>
			{:else}
				<span>
					<Icon icon="mdi:send" width={20} />
				</span>
			{/if}
			<p>{loading ? 'Sending' : 'Send'}</p></button
		>
	</form>
</section>
