import { AuthApiError } from '@supabase/supabase-js';
import { fail, type Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	async default({ request, url, locals: { supabase } }) {
		type FormResponse = {
			message: string;
			error: string;
			values: {
				email: string;
				username: string;
			};
		};
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!username) {
			return fail(400, {
				error: 'Please enter your username'
			});
		}

		if (!email) {
			return fail(400, {
				error: 'Please enter your email'
			});
		}
		if (!password) {
			return fail(400, {
				error: 'Please enter a password',
				values: {
					email
				}
			} as FormResponse);
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: url.origin,
				data: {
					name: username
				}
			}
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.',
					values: {
						email
					}
				} as FormResponse);
			}

			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			} as FormResponse);
		}

		return {
			message: 'Please check your email.'
		} as FormResponse;
	}
};
