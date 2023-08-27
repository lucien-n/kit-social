import type { PublicProfile } from '$types/public_profile.type';
import { writable, type Subscriber, type Invalidator } from 'svelte/store';

type PublicProfileMap = { [uid: string]: PublicProfile };

type ProfilesStore = {
	subscribe: (
		this: void,
		run: Subscriber<PublicProfileMap>,
		invalidate?: Invalidator<PublicProfileMap>
	) => () => void;
	set: (value: PublicProfileMap) => void;
	update: (updater: (value: PublicProfileMap) => PublicProfileMap) => void;
	add: (profile: PublicProfile) => void;
	contains: ({ uid, username }: { uid?: string; username?: string }) => boolean;
	get: ({ uid, username }: { uid?: string; username?: string }) => PublicProfile | null;
};

function createProfilesStore(): ProfilesStore {
	const { subscribe, set, update } = writable<PublicProfileMap>({});

	const contains = ({ uid, username }: { uid?: string; username?: string }) => {
		let result = false;
		subscribe((profiles: PublicProfileMap) => {
			if (uid) result = Object.keys(profiles).includes(uid);
			if (username)
				result = Object.values(profiles).filter((profile) => profile.name == username).length > 0;
		});

		console.log(result ? 'Profiles contains' : 'Profiles does not contain', uid || username);

		return result;
	};

	const add = (profile: PublicProfile) => {
		update((profiles: PublicProfileMap) => {
			if (profile.uid && !contains({ uid: profile.uid })) {
				profiles[profile.uid] = profile;
			}

			console.log(`Added ${profile.name} to profiles`);

			return profiles;
		});
	};

	const get = ({ uid, username }: { uid?: string; username?: string }): PublicProfile | null => {
		if (!contains({ uid, username })) return null;
		let profile = null;

		subscribe((profiles: PublicProfileMap) => {
			if (uid) profile = profiles[uid];
			if (username)
				profile = Object.values(profiles).filter((profile) => profile.name == username)[0];
		});

		console.log(`Got ${uid || username} from profiles`);

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
