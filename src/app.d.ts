import type { Database } from '$types/database.types';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	declare namespace App {
		type SupaProfile = Database['public']['Tables']['profiles']['Row'];
		type SupaPost = Database['public']['Tables']['posts']['Row'];

		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}
