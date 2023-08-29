import { checkUid } from '$lib/utils';
import { profilesStore } from '$stores/profiles';
import type { PublicProfile } from '$types/public_profile.type';

export const getProfile = async ({
	uid,
	username
}: {
	uid?: string;
	username?: string;
}): Promise<PublicProfile | null> => {
	if (!username && !checkUid(uid)) return null;

	if (uid) {
		if (profilesStore.contains({ uid })) return profilesStore.get({ uid });
	} else {
		if (profilesStore.contains({ username })) return profilesStore.get({ username });
	}

	const res = await fetch(`/api/users/${uid}/profile`);
	if (!res.ok) return null;

	const data = await res.json();

	const profile = data as PublicProfile;

	profilesStore.add(profile);

	return profile;
};

export const isOnline = async (uid: string): Promise<boolean> => {
	const res = await fetch(`/api/users/${uid}/is-online`);
	if (!res.ok) return false;

	const data = await res.json();

	return data || false;
};

export const getAvatar = async (uid: string): Promise<string> => {
	const res = await fetch(`/api/users/${uid}/avatar`);
	if (!res.ok || res.status === 204) return '';

	const avatar_url = await res.json();

	return avatar_url || '';
};

export const getFollowedUsersUids = async (uid: string | undefined) => {
	const res = await fetch(`/api/users/${uid}/followed`);
	if (!res.ok) throw 'Error';

	const data = await res.json();

	const uids = data as string[];

	return uids;
};
