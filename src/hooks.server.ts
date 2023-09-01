import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_ENABLE_RATE_LIMIT, PUBLIC_SUPABASE_URL } from '$env/static/public';
import SocialClient from '$sclient/sclient';
import { handleRatelimit } from '$lib/server/helper';
import { ratelimit } from '$lib/server/redis';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, getClientAddress, url }: RequestEvent = event;
	locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
		event
	});

	locals.getSession = async () => {
		const {
			data: { session }
		} = await locals.supabase.auth.getSession();
		return session;
	};

	locals.sclient = new SocialClient(event.fetch, locals.supabase);

	if (url.pathname.startsWith('/api/')) {
		event.setHeaders({ 'Cache-Control': 'public, max-age=300' });

		// Rate limit
		if (PUBLIC_ENABLE_RATE_LIMIT == 'true') {
			const client_address = getClientAddress();
			const response = await handleRatelimit(client_address, ratelimit.api);
			if (response) return response;
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
