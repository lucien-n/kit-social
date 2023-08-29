import type { PublicPost } from '$types/public_post.type';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase }, fetch }) => {
	const { data, error } = await supabase.from('posts').select('uid').range(0, 10);

	if (error) return new Response(null, { status: 500 });

	if (!data) return new Response(JSON.stringify({ message: 'No posts found' }), { status: 200 });

	const uids: string[] = [];

	data.forEach(({ uid }) => uids.push(uid));

	const posts: PublicPost[] = [];

	for (const uid of uids) {
		const res = await fetch(`/api/posts/${uid}`);
		if (!res.ok) continue;

		const data = await res.json();
		const post = data as PublicPost;

		posts.push(post);
	}

	return new Response(JSON.stringify(posts), { status: 200 });
};
