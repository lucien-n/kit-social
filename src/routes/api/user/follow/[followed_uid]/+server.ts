import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const followed_uid = params.followed_uid;

	if (followed_uid?.length != 36)
		return new Response(JSON.stringify({ message: 'Please provide a correct uid' }), {
			status: 422
		});

	const session = await getSession();
	if (!session)
		return new Response(JSON.stringify({ message: 'You must be logged in' }), { status: 401 });

	const user_uid = session.user.id;

	if (followed_uid == user_uid)
		return new Response(JSON.stringify({ message: 'You cannot follow yourself' }), { status: 401 });

	const { error } = await supabase.from('follows').insert({ follower_uid: user_uid, followed_uid });
	if (error) return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 });

	return new Response();
};
