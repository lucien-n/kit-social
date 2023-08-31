import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$types/database.types';
import { KUsers } from './kusers';
import { KPosts } from './kposts';
import type { Fetch, Ftch } from './types';

export default class KClient {
	protected fetch: Fetch;

	public supabase: SupabaseClient<Database>;

	public users: KUsers;
	public posts: KPosts;

	constructor(fetch: Fetch, supabase: SupabaseClient) {
		this.fetch = fetch;
		this.supabase = supabase;
		this.users = new KUsers(this.ftch, supabase, '/api/users/');
		this.posts = new KPosts(this.ftch, supabase, '/api/posts/');
	}

	ftch: Ftch = async (url, method = 'GET') => {
		const res = await this.fetch(url, { method });

		if (!res.ok) throw new Error(`[${res.status}] <${method}> '${url}': ${res.statusText}`);

		const data = await res.json();

		return data;
	};
}
