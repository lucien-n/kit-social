import type { Fetch } from './helper';

export const getAvatar = async (uid: string, fetch_?: Fetch): Promise<string | null> => {
	const url = `/api/users/${uid}/avatar`;
	const res = await (fetch_ ? fetch_(url) : fetch(url));

	if (!res.ok || !res.body) {
		throw new Error('Error while getting avatar');
	}

	const data = await res.json();

	const { avatar_url, message } = data;

	if (message) {
		throw new Error(message);
	}

	return avatar_url;
};

export const follow = async (
	uid: string,
	fetch_?: Fetch
): Promise<{ following: boolean; pending: boolean }> => {
	const url = `/api/users/${uid}/follow`;
	const res = await (fetch_ ? fetch_(url) : fetch(url));

	if (!res.ok || !res.body) {
		throw new Error('Error while following user');
	}

	const data = await res.json();

	const { following, pending, message } = data;

	if (following) {
		return { following, pending: false };
	} else if (pending) {
		return { following: false, pending };
	}

	throw new Error(message);
};

export const unfollow = async (uid: string, fetch_?: Fetch): Promise<{ unfollowed: boolean }> => {
	const url = `/api/users/${uid}/follow`;
	const res = await (fetch_ ? fetch_(url, { method: 'DELETE' }) : fetch(url, { method: 'DELETE' }));

	if (!res.ok || !res.body) {
		throw new Error('Error while unfollowing user');
	}

	const data = await res.json();

	const { unfollowed, message } = data;

	if (unfollowed) return unfollowed;

	throw new Error(message);
};
