import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const uid = params.uid as string;

	if (!checkUid(uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const followed_uid = params.followed_uid as string;
	if (!checkUid(followed_uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase.rpc('is_following', {
		follower: uid,
		followed: followed_uid
	});

	if (error) new Response(null, { status: 500 });

	return new Response(JSON.stringify(data), { status: 200 });
};
