import type { SupabaseClient } from '@supabase/supabase-js';

type GetProfileArgs = {
	supabase: SupabaseClient;
	match: object;
};
export const getProfile = async ({
	supabase,
	match
}: GetProfileArgs): Promise<SupaProfile | null> => {
	try {
		const { data, error } = await supabase.from('profiles').select('*').match(match);

		if (error) throw new Error(error.message);

		const profile = data?.[0];

		if (profile) return profile;
		else throw new Error('Profile not found');
	} catch (e) {
		console.warn(e);
		throw e;
	}
};
