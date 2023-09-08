<script lang="ts">
	import { settingsStore } from '$stores/settings';
	import { createEventDispatcher } from 'svelte';
	import type { KeyboardEventHandler } from 'svelte/elements';

	export let shortcut: TShortcut;

	const dispatch = createEventDispatcher();

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

	$: shortcuts_enabled = settingsStore.isEnabled('shortcuts');

	const handleKeypress: KeyboardEventHandler<Window> = (event) => {
		if (!shortcuts_enabled) return;

		if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) return;
		if (shortcut.ctrlRequired && !event.ctrlKey) return;
		if (shortcut.shiftRequired && !event.shiftKey) return;
		if (shortcut.altRequired && !event.altKey) return;

		dispatch('shortcut', event);
	};
</script>

<svelte:window on:keypress={handleKeypress} />

{#if shortcuts_enabled}
	<kbd class="kbd variant-ghost-primary text-xs font-semibold">{getShortcutText()}</kbd>
{/if}
