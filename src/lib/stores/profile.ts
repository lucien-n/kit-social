import type SocialClient from '$sclient/sclient';
import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type ProfileStore = {
	subscribe: (
		this: void,
		run: Subscriber<TProfile | null>,
		invalidate?: Invalidator<TProfile | null>
	) => () => void;
	set: (value: TProfile | null) => void;
	update: (updater: (value: TProfile | null) => TProfile | null) => void;
	refresh: (sclient: SocialClient, uid?: string) => void;
};

function createProfileStore(): ProfileStore {
	const { subscribe, set, update } = writable<TProfile | null>(null);

	const refresh = async (sclient: SocialClient, uid?: string) => {
		update((profile: TProfile | null) => {
			if (!profile && !uid) return null;

			const func = async () => {
				if (!uid) return;
				try {
					const new_profile = await sclient.users.getProfile({ uid });
					if (!new_profile) return;
					set(new_profile);
				} catch (e) {
					console.warn(e);
				}
			};
			func();

			return profile;
		});
	};

	return {
		subscribe,
		set,
		update,
		refresh
	};
}

export const profileStore: ProfileStore = createProfileStore();
