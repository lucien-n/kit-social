export const getAvatar = async (
	uid: string,
	fetch_?: (input: string) => Promise<Response>
): Promise<string | null> => {
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
