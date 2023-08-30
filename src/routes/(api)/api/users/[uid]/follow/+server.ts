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
		return new Response(JSON.stringify({ message: 'You cannot follow yourself' }), { status: 401 });

	const { data: is_private } = await supabase.rpc('is_private', { user_uid: uid });

	if (is_private) {
		const { error } = await supabase
			.from('pending_follows')
			.insert({ follower_uid: user_uid, followed_uid: uid });

		if (error) return new Response(null, { status: 500 });

		await supabase.rpc('notify', {
			content: '{name} wants to follow you',
			type: 'follow_request',
			uid
		});

		return new Response(JSON.stringify({ message: 'Follow pending' }), { status: 200 });
	} else {
		const { error } = await supabase
			.from('follows')
			.insert({ follower_uid: user_uid, followed_uid: uid });
		if (error) return new Response(null, { status: 500 });

		return new Response(JSON.stringify({ message: 'Followed' }), { status: 200 });
	}
};
