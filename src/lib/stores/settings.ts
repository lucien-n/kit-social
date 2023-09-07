import { writable, type Invalidator, type Subscriber } from 'svelte/store';

type SettingsMap = Map<string, boolean>;

type SettingStore = {
	subscribe: (
		this: void,
		run: Subscriber<SettingsMap>,
		invalidate?: Invalidator<SettingsMap>
	) => () => void;
	set: (value: SettingsMap) => void;
	update: (updater: (value: SettingsMap) => SettingsMap) => void;
	enable: (setting: string) => void;
	disable: (setting: string) => void;
	isEnabled: (setting: string) => boolean;
};

const createShortcutStore = (): SettingStore => {
	const { subscribe, set, update } = writable<SettingsMap>(new Map());

	const enable = (setting: string) =>
		update((settings) => {
			const state = settings.get(setting);
			if (state) settings.set(setting, true);
			return settings;
		});

	const disable = (setting: string) =>
		update((settings) => {
			const state = settings.get(setting);
			if (state) settings.set(setting, false);
			return settings;
		});

	const isEnabled = (setting: string) => {
		let is_enabled = false;

		subscribe((settings) => (is_enabled = settings.get(setting) || false));

		return is_enabled;
	};

	return {
		subscribe,
		set,
		update,
		enable,
		disable,
		isEnabled
	};
};

export const shortcutStore = createShortcutStore();
