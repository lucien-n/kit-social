export type CachedEndpoint = {
	max_age: number;
	type: 'public' | 'private';
};

export const CACHED_ENDPOINTS = {
	'/avatar': { max_age: 300 } as CachedEndpoint
};
