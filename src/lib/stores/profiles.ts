import { checkUid } from '$lib/utils';
import type { PublicProfile } from '$types/public_profile.type';
import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type PublicProfileSet = Map<string, PublicProfile>;

type ProfilesStore = {
	subscribe: (
		this: void,
		run: Subscriber<PublicProfileSet>,
		invalidate?: Invalidator<PublicProfileSet>
	) => () => void;
	set: (value: PublicProfileSet) => void;
	update: (updater: (value: PublicProfileSet) => PublicProfileSet) => void;
	add: (profile: PublicProfile) => void;
	contains: ({ uid, username }: { uid?: string; username?: string }) => boolean;
	get: ({ uid, username }: { uid?: string; username?: string }) => PublicProfile | null;
};

function createProfilesStore(): ProfilesStore {
	const { subscribe, set, update } = writable<PublicProfileSet>(new Map());

	const contains = ({ uid, username }: { uid?: string; username?: string }) => {
		let result = false;
		subscribe((profiles: PublicProfileSet) => {
			if (checkUid(uid)) result = profiles.has(uid as string);
			if (username)
				result = Object.values(profiles).filter((profile) => profile.name == username).length > 0;
		});

		return result;
	};

	const add = (profile: PublicProfile) => {
		update((profiles: PublicProfileSet) => {
			if (checkUid(profile.uid)) profiles.set(profile.uid, profile);

			return profiles;
		});
	};

	const get = ({ uid, username }: { uid?: string; username?: string }): PublicProfile | null => {
		if (!contains({ uid, username })) return null;
		let profile = null;

		subscribe((profiles: PublicProfileSet) => {
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
