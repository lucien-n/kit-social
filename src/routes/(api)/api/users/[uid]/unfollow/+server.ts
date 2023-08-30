import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const uid = params.uid as string;

	if (!checkUid(uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), {
			status: 422
		});

	const session = await getSession();
	if (!session)
		return new Response(JSON.stringify({ message: 'You must be logged in' }), { status: 401 });

	const user_uid = session.user.id;

	if (uid == user_uid)
		return new Response(JSON.stringify({ message: 'You cannot unfollow yourself' }), {
			status: 401
		});

	const { error } = await supabase
		.from('follows')
		.delete()
		.match({ followed_uid: uid, follower_uid: user_uid });
	if (error) return new Response(null, { status: 500 });

	return new Response(JSON.stringify({ message: 'Unfollowed' }), { status: 200 });
};
