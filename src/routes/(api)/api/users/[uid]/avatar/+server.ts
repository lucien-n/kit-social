import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const { uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const { data, error } = await supabase.from('profiles').select('avatar_url').match({ uid });

	if (error) return new Response(null, { status: 500 });

	const avatar_url = data?.[0].avatar_url;
	if (!avatar_url)
		return new Response(JSON.stringify({ message: "User doesn't have an avatar" }), {
			status: 204
		});

	const { data: url_data } = await supabase.storage
		.from('avatars')
		.createSignedUrl(avatar_url, 120);

	const signedUrl = url_data?.signedUrl;

	return new Response(JSON.stringify({ avatar_url: signedUrl }), { status: 200 });
};
