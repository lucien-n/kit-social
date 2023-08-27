import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	type Response = {
		error?: string;
		post?: any;
	};
	const post_uid = params.post_uid;

	if (!post_uid || post_uid.length != 36)
		return {
			error: 'Not Found'
		} as Response;

	const post_data = fetch(`/api/posts/${post_uid}`);

	return {
		post: post_data
	} as Response;
};
