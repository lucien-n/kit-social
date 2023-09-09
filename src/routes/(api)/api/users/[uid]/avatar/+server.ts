import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, uid } }) => {
	const { data, error } = await supabase.from('profiles').select('avatar_url').match({ uid });

	if (error) return new Response(null, { status: 500 });
	const avatar_url = data?.[0].avatar_url;

	if (!avatar_url)
		return new Response(JSON.stringify({ error: "User doesn't have an avatar" }), { status: 200 });

	const { data: url_data } = supabase.storage.from('avatars').getPublicUrl(avatar_url);

	const public_url = url_data?.publicUrl;

	return new Response(JSON.stringify({ data: public_url }), { status: 200 });
};
