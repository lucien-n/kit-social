import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('posts')
		.select('uid, author_uid, content, created_at')
		.range(0, 10);

	if (error) return new Response(null, { status: 500 });

	if (!data) return new Response(JSON.stringify({ message: 'No posts found' }), { status: 200 });

	return new Response(JSON.stringify({ posts: data }), { status: 200 });
};
