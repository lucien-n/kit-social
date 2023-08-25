import type { SupabaseClient } from '@supabase/supabase-js';

export type GetArgs = {
	supabase: SupabaseClient;
	match: object;
};
