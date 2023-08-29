import type { PublicPost } from '$types/public_post.type';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const getPosts = async () => {
		const res = await fetch('/api/posts/get-feed');
		if (!res.ok) throw 'Internal Error';

		const data = await res.json();

		const posts = data as PublicPost[];

		return posts;
	};

	return { posts: await getPosts() };
};
