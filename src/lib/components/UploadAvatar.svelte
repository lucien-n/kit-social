<script lang="ts">
	import { uploadAvatar } from '$lib/utilities/storage';
	import Icon from '@iconify/svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let supabase: SupabaseClient;

	let uploading = false;
	let files: FileList;
	let url: string | undefined;

	const dispatch = createEventDispatcher();

	const upload = async () => {
		try {
			uploading = true;
			url = await uploadAvatar(supabase, files);
			setTimeout(() => {
				dispatch('upload');
			}, 1000);
		} catch (error) {
			console.warn(error);
		} finally {
			uploading = false;
		}
	};
</script>

<div
	class="absolute left-0 top-0 h-full w-full rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-50"
>
	<input type="hidden" name="avatarUrl" value={url} />
	<div
		class="flex h-full w-full cursor-pointer items-center justify-center opacity-0 transition-all duration-300 ease-in-out hover:opacity-100"
	>
		{#if uploading}
			<Icon icon="mdi:loading" width={50} />
		{:else}
			<label for="single">
				<Icon icon="mdi:upload" width={50} />
			</label>
			<input
				style="visibility: hidden; position:absolute;"
				type="file"
				id="single"
				accept="image/*"
				bind:files
				on:change={upload}
				disabled={uploading}
			/>
		{/if}
	</div>
</div>
