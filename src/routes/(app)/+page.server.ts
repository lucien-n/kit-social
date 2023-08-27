import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async default({ request, locals: { supabase, getSession } }) {
		type FormResponse = {
			message: string;
			error: string;
			values: {
				content: string;
			};
		};
		const formData = await request.formData();

		const content = formData.get('content')?.toString();

		if (!content) {
			return fail(400, {
				error: 'Please enter a content',
				values: { content }
			} as FormResponse);
		}

		const currentUser = await getSession();
		if (!currentUser) {
			return fail(401, {
				error: 'You must be logged in',
				values: { content }
			} as FormResponse);
		}

		const { error } = await supabase.from('posts').insert({
			author_uid: currentUser.user.id,
			content
		});

		if (error) {
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					content
				}
			} as FormResponse);
		}
	}
};
