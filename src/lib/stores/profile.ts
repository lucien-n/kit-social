import { getProfile } from '$supa/profiles';
import type { SupabaseClient } from '@supabase/supabase-js';
import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type ProfileStore = {
	subscribe: (
		this: void,
		run: Subscriber<SupaProfile | null>,
		invalidate?: Invalidator<SupaProfile | null>
	) => () => void;
	set: (value: SupaProfile | null) => void;
	update: (updater: (value: SupaProfile | null) => SupaProfile | null) => void;
	refresh: (suapabase: SupabaseClient, uid?: string) => void;
};

function createProfileStore(): ProfileStore {
	const { subscribe, set, update } = writable<SupaProfile | null>(null);

	const refresh = async (supabase: SupabaseClient, uid?: string) => {
		update((profile: SupaProfile | null) => {
			if (!profile && !uid) return null;

			const func = async () => {
				const new_profile = await getProfile({
					supabase,
					match: { uid: uid || profile?.uid || '' }
				});
				if (new_profile) set(new_profile);
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
