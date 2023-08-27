import type { PublicPost } from '$types/public_post.type';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const post_uid = params.post_uid;

	if (post_uid?.length != 36)
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase
		.from('posts')
		.select('uid, author_uid, content, created_at');

	if (error) return new Response(JSON.stringify({ message: error.message }), { status: 500 });

	const post_data = data?.[0];
	if (!post_data)
		return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });

	const post = post_data as PublicPost;

	return new Response(JSON.stringify(post), { status: 200 });
};
