import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const follower_uid = params.follower_uid;
	if (!follower_uid || follower_uid.length != 36)
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase
		.from('follows')
		.select('followed_uid')
		.match({ follower_uid })
		.limit(10);

	if (error) return new Response(null, { status: 500 });
	if (!data) return new Response(null, { status: 200 });

	const uids: string[] = [];

	data.forEach(({ followed_uid }) => uids.push(followed_uid));

	return new Response(JSON.stringify(uids), { status: 200 });
};
