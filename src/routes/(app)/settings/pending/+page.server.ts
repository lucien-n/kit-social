import { checkUid } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { sclient } }) => {
	const { session } = await parent();
	const pending_follows = sclient.users.getPendingFollows(session.user.id);

	return {
		streamed: { pending_follows }
	};
};

export const actions: Actions = {
	refuse: async ({ request, locals: { getSession, sclient } }) => {
		const session = await getSession();
		if (!session) return;

		const form_data = await request.formData();

		const follower_uid = form_data.get('uid')?.toString() || '';
		console.log(follower_uid);
		if (!checkUid(follower_uid)) return;

		const success = await sclient.users.refusePendingFollow(follower_uid);
		console.log('refuse', success);

		return { action: 'refuse', success };
	},
	accept: async ({ request, locals: { getSession, sclient } }) => {
		const session = await getSession();
		if (!session) return;

		const form_data = await request.formData();

		const follower_uid = form_data.get('uid')?.toString() || '';
		console.log(follower_uid);
		if (!checkUid(follower_uid)) return;

		const success = await sclient.users.acceptPendingFollow(follower_uid);
		console.log('accept', success);

		return { action: 'accept', success };
	}
};
