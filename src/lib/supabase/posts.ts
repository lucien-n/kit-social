import type { GetArgs } from './types';

export const getPost = async ({ supabase, match }: GetArgs): Promise<SupaPost | null> => {
	try {
		const { data, error } = await supabase.from('posts').select('*').match(match);

		if (error) throw new Error(error.message);

		const post = data?.[0];

		if (post) return post;
	} catch (e) {
		console.warn(e);
	}

	return null;
};

export const getPosts = async ({
	supabase,
	match,
	limit = 10,
	offset = 0,
	ascending = false
}: GetArgs): Promise<SupaPost[] | null> => {
	try {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.match(match)
			.range(offset, offset + limit)
			.order('created_at', { ascending });

		if (error) throw new Error(error.message);

		const posts = data;

		if (posts) return posts;
	} catch (e) {
		console.warn(e);
	}

	return null;
};
