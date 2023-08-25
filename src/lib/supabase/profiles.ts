import type { GetArgs } from './types';

export const getProfile = async ({ supabase, match }: GetArgs): Promise<SupaProfile | null> => {
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
