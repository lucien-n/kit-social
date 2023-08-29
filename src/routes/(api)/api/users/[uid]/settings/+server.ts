import { checkUid } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase, getSession } }) => {
	const uid = params.uid as string;

	if (!checkUid(uid))
		new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const session = await getSession();

	if (!session?.user) return new Response(null, { status: 401 });

	if (session.user.id === uid) return new Response(null, { status: 401 });

	const { data, error } = await supabase
		.from('profiles_settings')
		.select('is_private')
		.match({ uid });

	if (error) new Response(null, { status: 500 });

	const settings = data?.[0] as SupaProfileSettings;

	return new Response(JSON.stringify(settings), { status: 200 });
};
