import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const { uid: follower_uid, response: follower_id_resp } = checkUid(params.uid);
	if (follower_id_resp) return follower_id_resp;

	const { uid: followed_uid, response: followed_uid_resp } = checkUid(params.followed_uid);
	if (followed_uid_resp) return followed_uid_resp;

	const { data, error } = await supabase.rpc('is_following', {
		follower: follower_uid,
		followed: followed_uid
	});

	if (error) new Response(JSON.stringify({ error: 'Error checking following' }), { status: 500 });

	return new Response(JSON.stringify({ data }), { status: 200 });
};
