<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let default_text: string;
	export let loading_text: string;
	export let loading = false;

	export let name: string;

	export let variant: string = 'variant-ghost-primary';
	export let gap: string = 'gap-1';

	const dispatch = createEventDispatcher();
</script>

<button
	type="submit"
	on:click={() => dispatch('submit')}
	disabled={loading}
	{name}
	class="btn {variant} flex items-center {gap}"
>
	{#if loading}
		<span class="animate-spin">
			<slot name="loadingIcon">
				<Icon icon="mdi:loading" />
			</slot>
		</span>
	{:else}
		<span>
			<slot name="defaultIcon" />
		</span>
	{/if}
	<p>{loading ? loading_text : default_text}</p>
</button>
