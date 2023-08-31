import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { kclient } = await parent();

	const posts = kclient.posts.getFeed();

	return {
		streamed: {
			posts
		}
	};
};
