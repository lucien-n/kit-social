import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const uid = params.uid;

	if (!checkUid(uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase
		.from('follows')
		.select('followed_uid')
		.match({ uid })
		.limit(10);

	if (error) return new Response(null, { status: 500 });
	if (!data) return new Response(null, { status: 200 });

	const uids: string[] = [];

	data.forEach(({ followed_uid }) => uids.push(followed_uid));

	return new Response(JSON.stringify(uids), { status: 200 });
};
