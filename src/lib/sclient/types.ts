export type Fetch = typeof fetch;
export type Ftch = (
	input: string,
	method: 'GET' | 'PUT' | 'DELETE' | 'UPDATE' | 'POST'
) => Promise<{ data?: unknown; error?: string }>;
