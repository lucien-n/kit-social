<script lang="ts">
	import Shortcut from '$comp/Shortcut.svelte';
	import { settingsStore } from '$stores/settings';
	import Icon from '@iconify/svelte';
	import type { KeyboardEventHandler } from 'svelte/elements';

	export let default_text: string;
	export let loading_text: string;
	export let loading = false;

	export let name: string;

	export let variant: string = 'variant-ghost-primary';
	export let gap: string = 'gap-1';

	let button: HTMLButtonElement;
</script>

<button
	bind:this={button}
	type="submit"
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
	<Shortcut shortcut={{ key: 'enter', ctrlRequired: true }} on:shortcut={() => button.click()} />
</button>
