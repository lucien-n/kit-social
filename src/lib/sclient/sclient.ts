import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$types/database.types';
import { KUsers as SUsers } from './susers';
import { KPosts as SPosts } from './sposts';
import type { Fetch, Ftch } from './types';

export default class SocialClient {
	protected fetch: Fetch;

	public supabase: SupabaseClient<Database>;

	public users: SUsers;
	public posts: SPosts;

	constructor(fetch: Fetch, supabase: SupabaseClient) {
		this.fetch = fetch;
		this.supabase = supabase;
		this.users = new SUsers(this.ftch, supabase, '/api/users/');
		this.posts = new SPosts(this.ftch, supabase, '/api/posts/');
	}

	ftch: Ftch = async (url, method = 'GET') => {
		const res = await this.fetch(url, { method });

		if (!res.ok) return { error: `[${res.status}] <${method}> '${url}': ${res.statusText}` };

		const { data } = await res.json();

		return { data };
	};
}
