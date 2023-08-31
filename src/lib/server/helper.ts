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
