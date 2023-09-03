import { checkUid } from '$lib/utilities/methods';
import type { TProfile } from '$types/profile.type';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch, locals: { getSession, supabase } }) => {
	const uid_or_username = params.uid as string;

	let uid = '';
	let username = '';

	if (checkUid(uid_or_username)) uid = uid_or_username;
	else username = uid_or_username;

	const { data, error } = await supabase
		.from('profiles')
		.select(
			'uid, name, avatar_url, restricted, last_seen, created_at, profiles_settings ( is_private )'
		)
		.match(uid ? { uid } : { name: username });

	if (error)
		return new Response(JSON.stringify({ error: 'Error while fetching profile' }), { status: 500 });

	const user_data = data?.[0];
	if (!user_data) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

	const is_private = user_data.profiles_settings?.[0]?.is_private || false;

	const profile: TProfile = {
		uid: user_data.uid,
		name: user_data.name,
		avatar_url: '',
		restricted: user_data.restricted,
		is_private
	};

	const res = await fetch(`/api/users/${user_data.uid}/avatar`);
	if (res.ok && res.body) {
		const {
			data: { avatar_url }
		} = await res.json();
		profile.avatar_url = avatar_url;
	}

	const session = await getSession();
	if (session) {
		const { data: is_followed } = await supabase.rpc('is_following', {
			followed: user_data.uid,
			follower: session.user.id
		});

		if (!is_followed && is_private)
			return new Response(JSON.stringify({ data: profile }), { status: 200 });

		profile.is_followed = is_followed || false;

		const { data: is_follower } = await supabase.rpc('is_following', {
			follower: user_data.uid,
			followed: session.user.id
		});

		profile.is_follower = is_follower || false;

		if (!is_followed) {
			const { data: is_pending } = await supabase.rpc('is_follow_pending', {
				followed: user_data.uid,
				follower: session.user.id
			});
			profile.is_pending = is_pending || false;
		}
	}

	return new Response(JSON.stringify({ data: profile }), { status: 200 });
};
