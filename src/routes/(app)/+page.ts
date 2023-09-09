import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, data }) => {
	const { sclient } = await parent();

	const posts = sclient.posts.getFeed().then(async (posts: TPost[]) => {
		await Promise.all(
			posts.map(async (post: TPost) => {
				const author = await sclient.users.getProfile({ uid: post.author_uid });
				post.author = author;
			})
		);

		return posts;
	});

	const { form } = data;

	return {
		streamed: {
			posts
		},
		form
	};
};
