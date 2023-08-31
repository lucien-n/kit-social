import type { PublicPost } from '$types/public_post.type';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ fetch }) => {
	const posts_data = fetch('/api/posts/feed')
		.then((res) => res.json())
		.then((data) => data as PublicPost[]);

	return {
		streamed: {
			posts: new Promise((resolve) => posts_data.then((data) => resolve(data)))
		}
	};
};
