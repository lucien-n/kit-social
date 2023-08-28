import type { Database } from '$types/database.types';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	type SupaProfile = Database['public']['Tables']['profiles']['Row'];
	type SupaPost = Database['public']['Tables']['posts']['Row'];
	declare namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}
