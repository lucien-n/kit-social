import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, uid } }) => {
	const { data, error } = await supabase.rpc('is_online', { user_uid: uid });

	if (error)
		new Response(JSON.stringify({ error: 'Error while checking if online' }), { status: 500 });

	return new Response(JSON.stringify({ data }), { status: 200 });
};
