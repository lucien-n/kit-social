import { checkUid } from '$lib/utilities/methods';
import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type ProfileSet = Map<string, TProfile>;

type ProfilesStore = {
	subscribe: (
		this: void,
		run: Subscriber<ProfileSet>,
		invalidate?: Invalidator<ProfileSet>
	) => () => void;
	set: (value: ProfileSet) => void;
	update: (updater: (value: ProfileSet) => ProfileSet) => void;
	add: (profile: TProfile) => void;
	contains: ({ uid, username }: { uid?: string; username?: string }) => boolean;
	get: ({ uid, username }: { uid?: string; username?: string }) => TProfile | null;
};

function createProfilesStore(): ProfilesStore {
	const { subscribe, set, update } = writable<ProfileSet>(new Map());

	const contains = ({ uid, username }: { uid?: string; username?: string }) => {
		let result = false;
		subscribe((profiles: ProfileSet) => {
			if (checkUid(uid)) result = profiles.has(uid as string);
			if (username)
				result = Object.values(profiles).filter((profile) => profile.name == username).length > 0;
		});

		return result;
	};

	const add = (profile: TProfile) => {
		update((profiles: ProfileSet) => {
			if (checkUid(profile.uid)) profiles.set(profile.uid, profile);

			return profiles;
		});
	};

	const get = ({ uid, username }: { uid?: string; username?: string }): TProfile | null => {
		if (!contains({ uid, username })) return null;
		let profile = null;

		subscribe((profiles: ProfileSet) => {
			if (uid) profile = profiles.get(uid);
			if (username) profile = Object.values(profiles).find((profile) => profile.name == username);
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
