import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const followed_uid = params.followed_uid;

	if (followed_uid?.length != 36)
		return new Response(null, { status: 422, statusText: 'Please provide a correct uid' });

	const session = await getSession();
	if (!session) return new Response(null, { status: 401, statusText: 'You must be logged in' });

	const user_uid = session.user.id;

	const { error } = await supabase.from('f');

	return new Response();
};
