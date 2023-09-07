import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

const schema = z.object({
	content: z.string().min(1).max(400)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(schema);

	return { form };
};

export const actions: Actions = {
	async default({ request, locals: { supabase, getSession } }) {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const content = form.data.content;

		if (!(content.length > 10)) {
			return setError(form, 'content', 'Please enter a content');
		}

		const currentUser = await getSession();
		if (!currentUser) {
			return fail(401, {
				error: 'You must be logged in',
				form
			});
		}

		const { error } = await supabase.from('posts').insert({
			author_uid: currentUser.user.id,
			content
		});

		if (error) {
			return fail(500, {
				error: 'Server error. Try again later.',
				form
			});
		}

		return { form };
	}
};
