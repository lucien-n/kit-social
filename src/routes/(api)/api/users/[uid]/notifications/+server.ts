import { checkUid } from '$lib/utils';
import type { TNotification } from '$types/notification.type';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
	params,
	url: { searchParams },
	locals: { supabase, getSession }
}) => {
	const uid = params.uid as string;

	if (!checkUid(uid))
		return new Response(JSON.stringify({ message: 'Please provide a valid uid' }), { status: 422 });

	const session = await getSession();

	if (!session) return new Response(null, { status: 401 });

	if (uid != session.user.id) return new Response(null, { status: 401 });

	const get_amount = searchParams.has('amount');

	if (get_amount) {
		const { count, error } = await supabase
			.from('notifications')
			.select('*', { count: 'exact', head: true })
			.match({ user_uid: uid });

		if (error) return new Response(null, { status: 500 });

		return new Response(JSON.stringify(count), { status: 200 });
	} else {
		const { data, error } = await supabase
			.from('notifications')
			.select('uid, type, content')
			.match({ user_uid: uid })
			.limit(10);

		if (error) return new Response(null, { status: 500 });

		const notifications =
			data?.map((notification) => ({
				...notification,
				type: notification.type as TNotification['type']
			})) || [];

		return new Response(JSON.stringify(notifications), { status: 200 });
	}
};
