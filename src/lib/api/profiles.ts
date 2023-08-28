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

export const getAvatar = async (uid: string): Promise<string> => {
	const res = await fetch(`/api/users/${uid}/avatar`);
	if (!res.ok || res.status === 204) return '';

	const avatar_public_url = await res.json();

	return avatar_public_url || '';
};
