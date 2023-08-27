import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const uid_or_username = params.uid as string;

	let uid = '';
	let username = '';

	if (checkUid(uid_or_username)) uid = uid_or_username;
	else username = uid_or_username;

	const { data, error } = await supabase
		.from('profiles')
		.select('uid, name, avatar_url, restricted, last_seen, created_at')
		.match(uid ? { uid } : { name: username });

	if (error) return new Response(null, { status: 500 });

	const user_data = data?.[0];
	if (!user_data)
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });

	return new Response(JSON.stringify(user_data), { status: 200 });
};
