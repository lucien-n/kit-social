import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AuthApiError, type Provider } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	'signin-with-password': async ({ request, locals: { supabase } }) => {
		type FormResponse = {
			error: string;
			values: {
				email: string;
			};
		};
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email) {
			return fail(400, {
				error: 'Please enter your email',
				values: {
					email
				}
			} as FormResponse);
		}

		if (!password) {
			return fail(400, {
				error: 'Please enter your password',
				values: {
					email
				}
			} as FormResponse);
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });

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

		throw redirect(303, '/dashboard');
	},

	'signin-with-oauth': async ({ request, url, locals: { supabase } }) => {
		type FormResponse = {
			error: string;
		};
		const formData = await request.formData();
		const provider = formData.get('provider')?.toString();

		const {
			data: { url: oAuthUrl }
		} = await supabase.auth.signInWithOAuth({
			provider: provider as Provider,
			options: {
				redirectTo: `${url.origin}/api/auth/callback`
			}
		});

		if (!oAuthUrl) {
			return fail(500, {
				error: `Could not get provider url for ${provider}`
			} as FormResponse);
		}

		throw redirect(303, oAuthUrl);
	}
};
