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
	let hidePlaceholder: boolean = false;

	const handleSubmit: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.set('content', content);
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};

	const handleInput: FormEventHandler<HTMLDivElement> = (event) => {
		hidePlaceholder = content != '';
	};
</script>

<section class="card mx-auto flex w-2/3 gap-2 p-3">
	<div>
		<Avatar initials={$profileStore?.name[0]} width="w-12" />
	</div>
	<form method="post" class=" flex h-full w-full flex-col" use:enhance={handleSubmit}>
		<div class="pointer-events-none absolute p-1 text-xl opacity-80" class:hidden={hidePlaceholder}>
			What's poppin {$profileStore?.name}?
		</div>
		<div
			bind:textContent={content}
			contenteditable="true"
			placeholder="true"
			class="h-20 w-full p-1 text-xl outline-none"
			on:input={handleInput}
		/>
		<button type="submit" class="variant-ghost-secondary btn flex items-center gap-1 self-end"
			><span>
				<Icon icon="mdi:send" width={20} />
			</span>
			<p>Send</p></button
		>
	</form>
</section>
