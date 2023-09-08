import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from 'assert';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	const { session } = await parent();

	const uid = session.user.id;

	const { data: profile_data, error: profile_error } = await supabase
		.from('profiles')
		.select('*')
		.match({ uid });

	if (profile_error)
		return {
			error: 'Could not fetch profile data'
		};

	if (!profile_data?.[0])
		return {
			error: 'Error with profile data'
		};

	const supa_profile = profile_data?.[0] as SupaProfile;

	const { data: settings_data, error: settings_error } = await supabase
		.from('profiles_settings')
		.select()
		.match({ uid });

	if (settings_error)
		return {
			error: 'Could not fetch settings data'
		};

	if (!settings_data?.[0])
		return {
			error: 'Error with settings data'
		};

	const supa_settings = settings_data?.[0] as SupaProfileSettings;

	return {
		profile: supa_profile,
		settings: supa_settings
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const uid = session?.user.id;
		if (!uid) return;

		const form_data = await request.formData();

		const is_private: boolean = form_data.get('is_private') == 'on';
		const hide_likes: boolean = form_data.get('hide_likes') == 'on';
		const hide_followed: boolean = form_data.get('hide_followed') == 'on';
		const shortcuts: boolean = form_data.get('shortcuts') == 'on';

		const { error } = await supabase
			.from('profiles_settings')
			.update({
				is_private,
				hide_likes,
				hide_followed,
				shortcuts
			})
			.match({ uid });

		if (error) {
			console.warn(error);
			return fail(error.message);
		}
	}
};
