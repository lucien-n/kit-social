import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const username = params.username;

	if (!username || username.length < 3) {
		throw new Error('Username must be at least 3 characters long');
	}

	return { username };
};
