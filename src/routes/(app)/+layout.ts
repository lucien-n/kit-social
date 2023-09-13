import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import SocialClient from '$sclient/sclient';
import { profileStore } from '$stores/profile';
import { settingsStore } from '$stores/settings';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data?.session,
		options: {
			realtime: {
				params: {
					eventsPerSecond: 5
				}
			}
		}
	});

	const sclient = new SocialClient(fetch, supabase);

	const {
		data: { session }
	} = await supabase.auth.getSession();

	profileStore.refresh(sclient, session?.user.id);

	depends('app:settings');
	if (session) {
		const settings = await sclient.users.getSettings(session.user.id);
		settings.forEach(({ name, enabled: value }) => settingsStore.create(name, !!value));
	}

	return {
		supabase,
		session,
		sclient
	};
};
