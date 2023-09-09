import { checkSession } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	locals: { supabase, getSession, uid: followed_uid }
}) => {
	const { session: _, response: session_resp } = await checkSession(getSession);
	if (session_resp) return session_resp;

	const { data, error } = await supabase
		.from('follows')
		.select('follower_uid')
		.match({ followed_uid })
		.limit(10);

	if (error) return new Response(null, { status: 500 });

	if (!data) return new Response(null, { status: 204 });

	const uids: string[] = [];

	data.forEach(({ follower_uid }) => uids.push(follower_uid));

	return new Response(JSON.stringify({ data: uids }), { status: 200 });
};

export const DELETE: RequestHandler = async ({
	locals: { getSession, supabase, uid: follower_uid }
}) => {
	const { session, response: session_resp } = await checkSession(getSession);
	if (session_resp) return session_resp;

	const { error } = await supabase
		.from('follows')
		.delete()
		.match({ follower_uid, followed_uid: session?.user.id });

	if (error) return new Response(null, { status: 500 });

	return new Response(JSON.stringify({ data: true }), { status: 200 });
};
