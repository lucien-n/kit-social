import { writable, type Subscriber, type Writable, type Invalidator } from 'svelte/store';

type SupaProfileMap = { [uid: string]: SupaProfile };
export const profilesStore: Writable<SupaProfileMap> = writable({});

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
			const profilesLength = Object.keys(profiles).length;
			if (profilesLength > 20) {
				const newProfiles: SupaProfileMap = {};
				for (let i = 0; i < 20; i++) {
					const uid = Object.keys(profiles)[profilesLength - 20 + i];
					if (uid == profile.uid) newProfiles[uid] = profile;
					newProfiles[uid] = profiles[uid];
				}
			} else if (profile.uid && !contains({ uid: profile.uid })) {
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
