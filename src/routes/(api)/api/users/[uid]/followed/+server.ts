import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, uid } }) => {
	const { data, error } = await supabase
		.from('follows')
		.select('followed_uid')
		.match({ follower_uid: uid })
		.limit(10);

	if (error)
		return new Response(JSON.stringify({ error: 'Error while fetching followed users' }), {
			status: 500
		});
	if (!data) return new Response(null, { status: 204 });

	const uids: string[] = [];

	data.forEach(({ followed_uid }) => uids.push(followed_uid));

	return new Response(JSON.stringify({ data: uids }), { status: 200 });
};
