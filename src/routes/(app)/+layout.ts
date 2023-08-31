import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import KClient from '$kclient/kclient';
import { profileStore } from '$stores/profile';
import type { PublicProfile } from '$types/public_profile.type';
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

	const kclient = new KClient(fetch, supabase);

	const {
		data: { session }
	} = await supabase.auth.getSession();

	profileStore.refresh(kclient, session?.user.id);

	let followed_users: Promise<PublicProfile[] | null> = new Promise((resolve) => resolve);

	if (session) {
		followed_users = kclient.users.getFollowedUsersUids(session.user.id).then(async (uids) => {
			if (uids.length < 1) return [] as PublicProfile[];

			const profiles: PublicProfile[] = [];

			for (const uid of uids) {
				const profile = await kclient.users.getProfile({ uid });
				if (profile) profiles.push(profile);
			}

			return profiles;
		});
	}

	return {
		supabase,
		session,
		kclient,
		streamed: {
			followed_users
		}
	};
};
