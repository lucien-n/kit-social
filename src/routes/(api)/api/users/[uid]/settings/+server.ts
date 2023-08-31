import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const { uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const session = await getSession();

	if (!session?.user)
		return new Response(JSON.stringify({ error: 'You must be logged in' }), { status: 401 });

	if (session.user.id === uid)
		return new Response(JSON.stringify({ error: "You cannot access this user's settings" }), {
			status: 401
		});

	const { data, error } = await supabase
		.from('profiles_settings')
		.select('is_private')
		.match({ uid });

	if (error) new Response(null, { status: 500 });

	const settings = data?.[0] as SupaProfileSettings;

	return new Response(JSON.stringify({ data: settings }), { status: 200 });
};
