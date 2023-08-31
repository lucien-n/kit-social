import type { Session } from '@supabase/supabase-js';

export const handleRatelimit = async (
	identifier: string,
	limiter: { limit: (identifier: string) => Promise<{ success: boolean; reset: number }> }
): Promise<Response | null> => {
	const { success, reset } = await limiter.limit(identifier);

	if (!success) {
		const time_remaining = Math.floor((reset - Date.now()) / 1000);
		return new Response(
			JSON.stringify({ message: `Rate limit exceeded, try again in ${time_remaining} seconds` }),
			{ status: 429 }
		);
	}

	return null;
};

export const checkUid = (uid: string | undefined): { uid: string; response?: Response } => {
	if (!uid || uid.length != 36)
		return {
			uid: '',
			response: new Response(JSON.stringify({ message: 'Please provide a valid uid' }), {
				status: 422
			})
		};

	return { uid };
};

export const checkSession = async (
	getSession: () => Promise<Session | null>
): Promise<{ session: Session; response?: Response }> => {
	const session = await getSession();

	if (!session) {
		return {
			session: {} as Session,
			response: new Response(null, { status: 401 })
		};
	}

	return {
		session
	};
};
