import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import SocialClient from '$sclient/sclient';
import { profileStore } from '$stores/profile';
import type { TPendingFollow } from '$types/pending_follow';
import type { TPublicProfile } from '$types/public_profile.type';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data?.session
	});

	const sclient = new SocialClient(fetch, supabase);

	const {
		data: { session }
	} = await supabase.auth.getSession();

	profileStore.refresh(sclient, session?.user.id);

	let followed_users: Promise<TPublicProfile[] | null> = new Promise((resolve) => resolve);
	let pending_follows: Promise<TPendingFollow[]> = new Promise((resolve) => resolve);

	if (session) {
		followed_users = sclient.users.getFollowedUsersUids(session.user.id).then(async (uids) => {
			if (uids.length < 1) return [] as TPublicProfile[];

			const profiles: TPublicProfile[] = [];

			for (const uid of uids) {
				const profile = await sclient.users.getProfile({ uid });
				if (profile) profiles.push(profile);
			}

			return profiles;
		});

		pending_follows = sclient.users.getPendingFollows(session.user.id);
	}

	return {
		supabase,
		session,
		sclient,
		streamed: {
			followed_users,
			pending_follows
		}
	};
};
