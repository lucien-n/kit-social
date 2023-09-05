import type SocialClient from '$sclient/sclient';
import type { Database } from '$types/database.types';
import type { PendingFollow } from '$types/pending_follow';
import type { Profile } from '$types/profile.type';
import type { Post } from '$types/post.type';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	type SupaProfile = Database['public']['Tables']['profiles']['Row'];
	type SupaPost = Database['public']['Tables']['posts']['Row'];
	type SupaProfileSettings = Database['public']['Tables']['profiles_settings']['Row'];
	type SupaPendingFollow = Database['public']['Tables']['pending_follows']['Row'];
	type SupaFollow = Database['public']['Tables']['follows']['Row'];

	type TProfile = Profile;
	type TPost = Post;
	type TPendingFollow = PendingFollow;

	declare namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			sclient: SocialClient;
			uid: string;
		}
		interface PageData {
			session: Session | null;
		}
	}
}
