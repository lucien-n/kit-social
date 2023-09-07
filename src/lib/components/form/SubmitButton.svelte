<script lang="ts">
	import Avatar from '$comp/Avatar.svelte';
	import type { Shortcut } from '$types/shortcut.type';
	import Icon from '@iconify/svelte';
	import type { KeyboardEventHandler } from 'svelte/elements';

	export let default_text: string;
	export let loading_text: string;
	export let loading = false;

	export let shortcut_enabled: boolean = true;
	export let shortcut: Shortcut = {
		key: 'enter',
		ctrlRequired: true
	};

	export let name: string;

	export let variant: string = 'variant-ghost-primary';
	export let gap: string = 'gap-1';

	let button: HTMLButtonElement;

	const handleKeypress: KeyboardEventHandler<Window> = (event) => {
		if (!shortcut_enabled) return;

		if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) return;
		if (shortcut.ctrlRequired && !event.ctrlKey) return;
		if (shortcut.shiftRequired && !event.shiftKey) return;
		if (shortcut.altRequired && !event.altKey) return;

		button.click();
	};

	const getShortcutText = () => {
		let text = '';

		let key = shortcut.key.toUpperCase();
		let ctrl = shortcut.ctrlRequired === true;
		let shift = shortcut.shiftRequired === true;
		let alt = shortcut.altRequired === true;

		if (ctrl) {
			text += 'CTRL';
			if (shift || alt || key) text += '+';
		}

		if (alt) {
			text += 'ALT';
			if (shift || key) text += '+';
		}

		if (shift) {
			text += 'SHIFT';
			if (key) text += '+';
		}

		if (key) text += key;

		return text;
	};
</script>

<svelte:window on:keypress={handleKeypress} />

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
	{#if shortcut_enabled}
		<kbd class="kbd variant-ghost-primary text-xs font-semibold">{getShortcutText()}</kbd>
	{/if}
</button>
