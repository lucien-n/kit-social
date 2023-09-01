import { checkUid } from '$lib/server/helper';
import type { PendingFollow } from '$types/pending_follow';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, sclient: sclient } }) => {
	const { uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const { data, error } = await supabase
		.from('pending_follows')
		.select('followed_uid, follower_uid')
		.match({ uid });

	if (error)
		return new Response(JSON.stringify({ error: 'Error while fetching pending follows' }), {
			status: 500
		});
	if (!data) return new Response(null, { status: 204 });

	const pending_follows: PendingFollow[] = [];

	for (const pending_follow_data of data) {
		const follower_profile = await sclient.users.getProfile({
			uid: pending_follow_data.follower_uid
		});
		if (!follower_profile) continue;

		const pending_follow: PendingFollow = {
			follower: follower_profile,
			followed_uid: pending_follow_data.followed_uid,
			accepted: false
		};
		pending_follows.push(pending_follow);
	}

	return new Response(JSON.stringify({ data: pending_follows }), { status: 200 });
};
