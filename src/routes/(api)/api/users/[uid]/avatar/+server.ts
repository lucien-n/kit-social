import { checkUid } from '$lib/server/helper';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const { uid, response: uid_resp } = checkUid(params.uid);
	if (uid_resp) return uid_resp;

	const { data, error } = await supabase.from('profiles').select('avatar_url').match({ uid });

	if (error) return new Response(null, { status: 500 });

	const avatar_url = data?.[0].avatar_url;
	if (!avatar_url)
		return new Response(JSON.stringify({ data: { status: "User doesn't have an avatar" } }), {
			status: 200
		});

	const { data: url_data } = supabase.storage.from('avatars').getPublicUrl(avatar_url);

	const public_url = url_data?.publicUrl;

	return new Response(JSON.stringify({ data: { avatar_url: public_url } }), { status: 200 });
};
