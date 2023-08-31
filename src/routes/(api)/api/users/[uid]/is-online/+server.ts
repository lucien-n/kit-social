import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const { uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const { data, error } = await supabase.rpc('is_online', { user_uid: uid });

	if (error)
		new Response(JSON.stringify({ error: 'Error while checking if online' }), { status: 500 });

	return new Response(JSON.stringify({ data }), { status: 200 });
};
