import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_ENABLE_RATE_LIMIT, PUBLIC_SUPABASE_URL } from '$env/static/public';
import SocialClient from '$sclient/sclient';
import { checkUid, handleRatelimit } from '$lib/server/helper';
import { ratelimit } from '$lib/server/redis';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { CACHED_ENDPOINTS, type CachedEndpoint } from '$lib/server/chached_endpoints';

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
		Object.entries(CACHED_ENDPOINTS).forEach(
			([endpoint, { type, max_age }]: [string, CachedEndpoint]) => {
				if (url.pathname.startsWith(endpoint))
					event.setHeaders({
						'Cache-Control': `${type}, max-age=${max_age}`
					});
			}
		);

		// Rate limit
		if (PUBLIC_ENABLE_RATE_LIMIT == 'true') {
			const client_address = getClientAddress();
			const response = await handleRatelimit(client_address, ratelimit.api);
			if (response) return response;
		}
	}

	if (url.pathname.startsWith('/api/users') && !url.pathname.endsWith('/profile')) {
		const { uid, response } = checkUid(event.params.uid);
		if (response)
			return new Response(JSON.stringify({ error: 'Please provide a valid uid' }), {
				status: 422
			});
		event.locals.uid = uid;
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
