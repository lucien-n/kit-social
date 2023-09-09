import { checkSession } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	locals: { supabase, getSession, uid: follower_uid }
}) => {
	const { session, response } = await checkSession(getSession);
	if (response) return response;

	const followed_uid = session.user.id;

	const { data: success, error } = await supabase.rpc('act_pending_follow', {
		follower: follower_uid,
		followed: followed_uid,
		accept: true
	});

	if (error) new Response(JSON.stringify({ data: false, error }), { status: 500 });

	return new Response(JSON.stringify({ data: success }), { status: 200 });
};
