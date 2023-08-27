import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	type Response = {
		error?: string;
		post_uid?: string;
	};
	const post_uid = params.post_uid;

	if (!post_uid || post_uid.length != 36)
		return {
			error: 'Not Found'
		} as Response;

	return {
		post_uid
	} as Response;
};
