import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const uid = params.uid as string;

	if (!checkUid(uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase
		.from('profiles')
		.select('uid, name, avatar_url, restricted, last_seen, created_at')
		.match({ uid });

	if (error) return new Response(null, { status: 500 });

	const user_data = data?.[0];
	if (!user_data)
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });

	return new Response(JSON.stringify(user_data), { status: 200 });
};
