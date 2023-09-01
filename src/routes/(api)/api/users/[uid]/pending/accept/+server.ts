import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const { uid: follower_uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const session = await getSession();
	if (!session) return new Response(null, { status: 401 });

	const followed_uid = session.user.id;

	const { error } = await supabase.rpc('accept_pending_follow', {
		follower: follower_uid,
		followed: followed_uid
	});

	if (error) new Response(JSON.stringify({ data: false, error }), { status: 500 });

	return new Response(JSON.stringify({ data: true }), { status: 200 });
};
