import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const { uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const { data, error } = await supabase
		.from('follows')
		.select('followed_uid')
		.match({ follower_uid: uid })
		.limit(10);

	if (error) return new Response(null, { status: 500 });
	if (!data) return new Response(null, { status: 200 });

	const uids: string[] = [];

	data.forEach(({ followed_uid }) => uids.push(followed_uid));

	return new Response(JSON.stringify(uids), { status: 200 });
};
