<script lang="ts">
	import { settingsStore } from '$stores/settings';
	import { createEventDispatcher } from 'svelte';
	import type { KeyboardEventHandler } from 'svelte/elements';
	import Kbd from './Kbd.svelte';

	export let shortcut: TShortcut;
	export let enabled: boolean = true;
	export let force: boolean = false;

	$: is_enabled = (settingsStore.isEnabled('shortcuts') && enabled) || force;

	const dispatch = createEventDispatcher();

	const getShortcutKeys = () => {
		const keys: string[] = [];

		if (shortcut.ctrlRequired === true) keys.push('CTRL');
		if (shortcut.shiftRequired === true) keys.push('ALT');
		if (shortcut.altRequired === true) keys.push('SHIFT');
		keys.push(shortcut.key.toUpperCase());

		return keys;
	};

	const handleKeypress: KeyboardEventHandler<Window> = (event) => {
		if (!is_enabled) return;

		if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) return;
		if (shortcut.ctrlRequired && !event.ctrlKey) return;
		if (shortcut.shiftRequired && !event.shiftKey) return;
		if (shortcut.altRequired && !event.altKey) return;

		dispatch('shortcut', event);
	};
</script>

<svelte:window on:keypress={handleKeypress} />

{#if is_enabled}
	<span class="flex items-center gap-1">
		{#each getShortcutKeys() as key, index}
			<Kbd>{key}</Kbd>
			{#if index < getShortcutKeys().length - 1}
				+
			{/if}
		{/each}
	</span>
{/if}
