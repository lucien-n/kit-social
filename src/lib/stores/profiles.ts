import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type SupaProfileMap = { [uid: string]: SupaProfile };

type ProfilesStore = {
	subscribe: (
		this: void,
		run: Subscriber<SupaProfileMap>,
		invalidate?: Invalidator<SupaProfileMap>
	) => () => void;
	set: (value: SupaProfileMap) => void;
	update: (updater: (value: SupaProfileMap) => SupaProfileMap) => void;
	add: (profile: SupaProfile) => void;
	contains: ({ uid, username }: { uid?: string; username?: string }) => boolean;
	get: ({ uid, username }: { uid?: string; username?: string }) => SupaProfile | null;
};

function createProfilesStore(): ProfilesStore {
	const { subscribe, set, update } = writable<SupaProfileMap>({});

	const contains = ({ uid, username }: { uid?: string; username?: string }) => {
		let result = false;
		subscribe((profiles: SupaProfileMap) => {
			if (uid) result = Object.keys(profiles).includes(uid);
			if (username)
				result = Object.values(profiles).filter((profile) => profile.name == username).length > 0;
		});

		return result;
	};

	const add = (profile: SupaProfile) => {
		update((profiles: SupaProfileMap) => {
			if (profile.uid && !contains({ uid: profile.uid })) {
				profiles[profile.uid] = profile;
			}

			return profiles;
		});
	};

	const get = ({ uid, username }: { uid?: string; username?: string }): SupaProfile | null => {
		if (!contains({ uid, username })) return null;
		let profile = null;

		subscribe((profiles: SupaProfileMap) => {
			if (uid) profile = profiles[uid];
			if (username)
				profile = Object.values(profiles).filter((profile) => profile.name == username)[0];
		});

		return profile;
	};

	return {
		subscribe,
		set,
		update,
		add,
		contains,
		get
	};
}

export const profilesStore: ProfilesStore = createProfilesStore();
