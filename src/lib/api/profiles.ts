import type { PublicProfile } from '$types/public_profile.type';

type GetProfileArgs = {
	uid?: string;
	username?: string;
};
export const getProfile = async ({
	uid,
	username
}: GetProfileArgs): Promise<PublicProfile | null> => {
	if ((!uid || uid == '') && (!username || username == '')) return null;
	if ((!username || username == '') && uid?.length != 36) return null;

	const res = await fetch(`/api/users/${uid || username}`);
	if (!res.ok) return null;

	const data = await res.json();

	const profile = data as PublicProfile;

	return profile;
};
