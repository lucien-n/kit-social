import { checkUid } from '$lib/utils';
import type { PublicProfile } from '$types/public_profile.type';

export const getProfile = async (uid: string): Promise<PublicProfile | null> => {
	if (!checkUid(uid)) return null;

	const res = await fetch(`/api/users/${uid}/profile`);
	if (!res.ok) return null;

	const data = await res.json();

	const profile = data as PublicProfile;

	return profile;
};

export const isOnline = async (uid: string): Promise<boolean> => {
	const res = await fetch(`/api/users/${uid}/is-online`);
	if (!res.ok) return false;

	const data = await res.json();

	return data || false;
};
