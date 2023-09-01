import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
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

	if (url.pathname.startsWith('/api/')) {
		const client_address = getClientAddress();
		const response = await handleRatelimit(client_address, ratelimit.api);
		if (response) return response;
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
