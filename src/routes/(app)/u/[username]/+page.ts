import type { PageLoad } from "./$types";

export const load: PageLoad = async ({params, parent}) => {
    const {sclient} = await parent()

	type Response = {
		error?: string;
		streamed?: {profile: Promise<TProfile>};
	};
	const username = params.username;

	if (!username || username.length < 3)
		return { error: 'Username must be at least 3 characters long' } as Response;

	const profile = sclient.users.getProfile({ username })

	return { streamed: {profile} } as Response;
};