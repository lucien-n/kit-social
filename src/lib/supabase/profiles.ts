import type { SupabaseClient } from '@supabase/supabase-js';

type GetProgileArgs = {
	supabase: SupabaseClient;
	uid: string;
	match?: object;
};
export const getProfile = async ({
	supabase,
	uid,
	match
}: GetProgileArgs): Promise<SupaProfile | null> => {
	try {
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.match({ uid, ...match });

		if (error) throw new Error(error.message);

		const profile = data?.[0];

		if (profile) return profile;
		else throw new Error('Profile not found');
	} catch (e) {
		console.warn(e);
		throw e;
	}
};
