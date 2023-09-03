import type SocialClient from '$sclient/sclient';
import type { TPublicProfile } from '$types/public_profile.type';
import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type ProfileStore = {
	subscribe: (
		this: void,
		run: Subscriber<TPublicProfile | null>,
		invalidate?: Invalidator<TPublicProfile | null>
	) => () => void;
	set: (value: TPublicProfile | null) => void;
	update: (updater: (value: TPublicProfile | null) => TPublicProfile | null) => void;
	refresh: (sclient: SocialClient, uid?: string) => void;
};

function createProfileStore(): ProfileStore {
	const { subscribe, set, update } = writable<TPublicProfile | null>(null);

	const refresh = async (sclient: SocialClient, uid?: string) => {
		update((profile: TPublicProfile | null) => {
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
