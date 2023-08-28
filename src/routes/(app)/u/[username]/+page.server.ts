import { checkUid } from '$lib/utils';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();

		const avatar_url = formData.get('avatarUrl') as string;
		if (!avatar_url || avatar_url.length < 36) return;

		const session = await getSession();

		const uid = session?.user.id;
		if (!checkUid(uid)) return;

		const { error } = await supabase
			.from('profiles')
			.update({
				avatar_url
			})
			.match({ uid });

		if (error) {
			console.warn(error);
		}
	}
};
