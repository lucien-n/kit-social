import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { sclient } = await parent();

	const posts = sclient.posts.getFeed();

	return {
		streamed: {
			posts
		}
	};
};
