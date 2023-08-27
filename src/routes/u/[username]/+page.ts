import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	type Response = {
		error?: string;
		username?: string;
	};
	const username = params.username;

	if (!username || username.length < 3)
		return { error: 'Username must be at least 3 characters long' } as Response;

	return { username } as Response;
};
