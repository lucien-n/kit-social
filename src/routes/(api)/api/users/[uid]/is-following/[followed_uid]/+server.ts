import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const uid = params.uid;

	if (!checkUid(uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const followed_uid = params.followed_uid;
	if (!checkUid(followed_uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase.rpc('is_following', { follower_uid: uid, followed_uid });

	if (error) new Response(null, { status: 500 });

	return new Response(JSON.stringify(data), { status: 200 });
};
