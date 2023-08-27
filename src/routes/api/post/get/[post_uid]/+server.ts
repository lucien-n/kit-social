import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const post_uid = params.post_uid;

	if (post_uid?.length != 36)
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	return new Response();
};
