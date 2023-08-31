import { checkSession, checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const { uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const { session, response: session_resp } = await checkSession(getSession);
	if (session_resp) return session_resp;

	const user_uid = session.user.id;

	if (uid == user_uid)
		return new Response(JSON.stringify({ message: 'You cannot follow yourself' }), { status: 401 });

	const { data: is_private } = await supabase.rpc('is_private', { user_uid: uid });

	if (is_private) {
		const { error } = await supabase
			.from('pending_follows')
			.insert({ follower_uid: user_uid, followed_uid: uid });

		if (error) return new Response(null, { status: 500 });

		return new Response(JSON.stringify({ pending: true, message: 'Follow pending' }), { status: 200 });
	} else {
		const { error } = await supabase
			.from('follows')
			.insert({ follower_uid: user_uid, followed_uid: uid });
		if (error) return new Response(null, { status: 500 });

		return new Response(JSON.stringify({ following: true, message: 'Followed' }), { status: 200 });
	}
};

export const DELETE: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const { uid: followed_uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const { session, response: session_resp } = await checkSession(getSession);
	if (session_resp) return session_resp;

	const follower_uid = session.user.id;

	const { data: is_pending, error } = await supabase.rpc('is_follow_pending', {
		followed: followed_uid,
		follower: follower_uid
	});

	if (error) new Response(null, { status: 500 });

	if (is_pending) {
		const { error } = await supabase
			.from('pending_follows')
			.delete()
			.match({ followed_uid, follower_uid });
		if (error) new Response(null, { status: 500 });
	} else {
		const { data: is_following, error } = await supabase.rpc('is_following', {
			followed: followed_uid,
			follower: follower_uid
		});
		if (error) new Response(null, { status: 500 });

		if (is_following) {
			const { error } = await supabase
				.from('follows')
				.delete()
				.match({ followed_uid, follower_uid });
			if (error) new Response(null, { status: 500 });
		}
	}

	return new Response(null, { status: 204 });
};
