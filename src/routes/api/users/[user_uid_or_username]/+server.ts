import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const user_uid_or_username = params.user_uid_or_username;

	let uid = '';
	let name = '';

	if (!user_uid_or_username)
		return new Response(JSON.stringify({ message: 'Please provide a valid uid or username' }), {
			status: 422
		});

	if (user_uid_or_username.length == 36) uid = user_uid_or_username;
	else name = user_uid_or_username;

	const { data, error } = await supabase
		.from('profiles')
		.select('uid, name, avatar_url, restricted, created_at')
		.match(uid != '' ? { uid } : { name });

	console.log(error);

	if (error) return new Response(null, { status: 500 });

	const user_data = data?.[0];
	if (!user_data)
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });

	return new Response(JSON.stringify({ ...user_data }), { status: 200 });
};
