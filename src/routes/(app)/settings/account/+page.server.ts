import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from 'assert';

export const load: PageServerLoad = async ({ parent, locals: { sclient } }) => {
	const { session } = await parent();

	const uid = session.user.id;

	const settings = sclient.users.getSettings(uid);

	return {
		streamed: { settings }
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const uid = session?.user.id;
		if (!uid) return;

		const form_data = await request.formData();

		const is_private: boolean = form_data.get('is_private') == 'on';
		const hide_likes: boolean = form_data.get('hide_likes') == 'on';
		const hide_followed: boolean = form_data.get('hide_followed') == 'on';
		const shortcuts: boolean = form_data.get('shortcuts') == 'on';

		const { error } = await supabase
			.from('profiles_settings')
			.update({
				is_private,
				hide_likes,
				hide_followed,
				shortcuts
			})
			.match({ uid });

		if (error) {
			console.warn(error);
			return fail(error.message);
		}
	}
};
