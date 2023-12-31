import { checkUid } from '$lib/utilities/methods';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const post_uid = params.post_uid as string;

	if (!checkUid(post_uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase
		.from('posts')
		.select('uid, author_uid, content, created_at')
		.match({ uid: post_uid });

	if (error) return new Response(JSON.stringify({ message: error.message }), { status: 500 });

	const post_data = data?.[0];
	if (!post_data)
		return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });

	const post = {
		uid: post_data.uid,
		content: post_data.content,
		created_at: post_data.created_at,
		author_uid: post_data.author_uid
	} as TPost;

	return new Response(JSON.stringify(post), { status: 200 });
};
