import { writable, type Invalidator, type Subscriber } from 'svelte/store';

type ShortcutStore = {
	subscribe: (
		this: void,
		run: Subscriber<boolean | null>,
		invalidate?: Invalidator<boolean | null>
	) => () => void;
	set: (value: boolean | null) => void;
	update: (updater: (value: boolean | null) => boolean | null) => void;
	enable: () => void;
	disable: () => void;
	isEnabled: () => boolean;
};

const createShortcutStore = (): ShortcutStore => {
	const { subscribe, set, update } = writable<boolean>(true);

	const enable = () => {};

	return {
		subscribe,
		set,
		update,
		enable,
		disable,
		isEnabled
	};
};
