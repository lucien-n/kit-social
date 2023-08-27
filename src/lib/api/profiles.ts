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
