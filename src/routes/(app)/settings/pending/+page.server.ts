import { checkUid } from '$lib/server/helper';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { sclient } }) => {
	const { session } = await parent();
	const pending_follows = sclient.users.getPendingFollows(session.user.id);

	return {
		streamed: { pending_follows }
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { getSession } }) => {
		const session = await getSession();
		const uid = session?.user.id;
		if (!checkUid(uid)) return;

		const form_data = await request.formData();
	}
};
