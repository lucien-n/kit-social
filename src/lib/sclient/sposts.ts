import type { SupabaseClient } from '@supabase/supabase-js';
import type { Ftch } from './types';
import type { TPublicPost } from '$types/public_post.type';

export class KPosts {
	protected fetch: Ftch;
	protected supabase: SupabaseClient;
	protected url: string;

	constructor(fetch: Ftch, supabase: SupabaseClient, url: string) {
		this.fetch = fetch;
		this.supabase = supabase;
		this.url = url;
	}

	getFeed = async (): Promise<TPublicPost[]> => {
		const url = this.url + `feed`;

		const { data, error } = await this.fetch(url, 'GET');
		if (error) return [];

		return data as TPublicPost[];
	};
}
