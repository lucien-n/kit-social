import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import KClient from '$kclient/kclient';
import { checkUid } from '$lib/utils';
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
		followed_users = fetch(`/api/users/${session.user.id}/followed`)
			.then((res) => {
				if (res.ok) return res.json();
				else throw 'Error while requesting followed users';
			})
			.then(async ({ data }) => {
				const uids: string[] = [];

				data.forEach((potential_uid: string) => {
					if (checkUid(potential_uid)) uids.push(potential_uid);
				});

				const profiles: PublicProfile[] = [];

				for (const uid of uids) {
					const res = await fetch(`/api/users/${uid}/profile`);
					if (!res.ok) continue;

					const data = await res.json();

					const profile = data as PublicProfile;

					profiles.push(profile);
				}

				return profiles;
			})
			.catch((reason) => {
				console.warn('Error while retrieving followed users: ', reason);
				return null;
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
