import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		type FormResponse = {
			error: string;
			values: {
				email: string;
			};
		};
		const form_data = await request.formData();

		const email = form_data.get('email')?.toString();
		const password = form_data.get('password')?.toString();

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

		throw redirect(303, '/');
	}
};
