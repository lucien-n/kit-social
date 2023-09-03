import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { sclient } }) => {
	const { session } = await parent();
	const pending_follows = sclient.users.getPendingFollows(session.user.id);

	return {
		streamed: { pending_follows }
	};
};
