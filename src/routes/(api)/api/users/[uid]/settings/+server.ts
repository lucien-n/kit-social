import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, getSession, uid } }) => {
	const session = await getSession();

	if (!session)
		return new Response(JSON.stringify({ error: 'You must be logged in' }), { status: 401 });

	if (session.user.id !== uid)
		return new Response(JSON.stringify({ error: "You cannot access this user's settings" }), {
			status: 401
		});

	const { data, error } = await supabase.from('profiles_settings').select('*').match({ uid });

	if (error) new Response(null, { status: 500 });

	const settings_data = data?.[0];

	const settings: TSetting[] = [];

	if (settings_data)
		for (const [name, value] of Object.entries(settings_data)) {
			if (name === 'uid') continue;
			settings.push({ name, value } as TSetting);
		}

	return new Response(JSON.stringify({ data: settings }), { status: 200 });
};
