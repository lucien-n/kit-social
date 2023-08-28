import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const uid = params.uid;

	if (!checkUid(uid))
		new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase.from('profiles').select('avatar_url').match({ uid });

	if (error) return new Response(null, { status: 500 });

	const avatar_url = data?.[0].avatar_url;
	if (!avatar_url)
		return new Response(null, {
			status: 204
		});

	const {
		data: { publicUrl }
	} = supabase.storage.from('avatars').getPublicUrl(avatar_url);

	return new Response(JSON.stringify(publicUrl), { status: 200 });
};
