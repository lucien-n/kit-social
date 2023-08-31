import type KClient from '$kclient/kclient';
import type { PublicProfile } from '$types/public_profile.type';
import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type ProfileStore = {
	subscribe: (
		this: void,
		run: Subscriber<PublicProfile | null>,
		invalidate?: Invalidator<PublicProfile | null>
	) => () => void;
	set: (value: PublicProfile | null) => void;
	update: (updater: (value: PublicProfile | null) => PublicProfile | null) => void;
	refresh: (kclient: KClient, uid?: string) => void;
};

function createProfileStore(): ProfileStore {
	const { subscribe, set, update } = writable<PublicProfile | null>(null);

	const refresh = async (kclient: KClient, uid?: string) => {
		update((profile: PublicProfile | null) => {
			if (!profile && !uid) return null;

			const func = async () => {
				if (!uid) return;
				try {
					const new_profile = await kclient.users.getProfile({ uid });
					if (!new_profile) return;
					set(new_profile);
				} catch (e) {
					console.warn(e);
				}
				// const { data, error } = await supabase.from('profiles').select('*').match({ uid });

				// if (error) return;

				// const new_profile = data?.[0];

				// if (new_profile) set(new_profile);
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
