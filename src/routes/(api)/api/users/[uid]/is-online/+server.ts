import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const uid = params.uid as string;

	if (!checkUid(uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const { data, error } = await supabase.rpc('is_online', { body: { user_uid: uid } });

	if (error) new Response(null, { status: 500 });

	console.log(data);

	return new Response();
};
