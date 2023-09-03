import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { sclient } }) => {
	const { session } = await parent();
	const followers = sclient.users.getFollowers(session.user.id);

	return {
		streamed: { followers }
	};
};
