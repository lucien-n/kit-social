import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	locals: { supabase, getSession, uid: follower_uid }
}) => {
	const session = await getSession();
	if (!session) return new Response(null, { status: 401 });

	const followed_uid = session.user.id;

	const res = await supabase.rpc('act_pending_follow', {
		follower: follower_uid,
		followed: followed_uid,
		accept: true
	});

	const { data: success, error } = res;

	if (error) new Response(JSON.stringify({ data: false, error }), { status: 500 });

	return new Response(JSON.stringify({ data: success }), { status: 200 });
};
