export const getProfile = async (uid: string) => {
	const url = `/api/users/${uid}/profile`;

	const res = await fetch(url);
	if (!res.ok || !res.body) throw new Error('Empty response');
	const { data, error } = await res.json();
	if (error) throw new Error(error);

	return data.profile;
};
