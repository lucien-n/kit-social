import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../signin/$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	await supabase.auth.signOut();
	console.log('signed out');
	throw redirect(303, '/');
};
