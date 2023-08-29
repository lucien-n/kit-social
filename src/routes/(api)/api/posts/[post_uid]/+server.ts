import { checkUid } from '$lib/utils';
import type { PublicPost } from '$types/public_post.type';
import type { PublicProfile } from '$types/public_profile.type';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase }, fetch }) => {
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

	const author_uid = post_data.author_uid;

	const res = await fetch(`/api/users/${author_uid}/profile`);
	if (!res.ok)
		return new Response(JSON.stringify({ message: 'Author not found' }), { status: 404 });

	const author_data = await res.json();

	const author = author_data as PublicProfile;

	const post = {
		uid: post_data.uid,
		content: post_data.content,
		created_at: post_data.created_at,
		author
	} as PublicPost;

	return new Response(JSON.stringify(post), { status: 200 });
};
