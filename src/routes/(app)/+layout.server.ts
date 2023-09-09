import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	if (session) {
		const uid = session.user.id;
		supabase.from('profiles').update({ last_seen: new Date().toUTCString() }).eq('uid', uid);
	}

	return {
		session
	};
};
