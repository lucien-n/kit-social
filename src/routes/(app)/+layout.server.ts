export const load = async ({ fetch, locals: { getSession, supabase } }) => {
	const session = await getSession();
	let notifications_amount;

	if (session) {
		const uid = session.user.id;
		await supabase.from('profiles').update({ last_seen: new Date().toUTCString() }).eq('uid', uid);

		notifications_amount = fetch(`/api/users/${uid}/notifications?amount`)
			.then((res) => {
				if (!res.ok || !res.body) throw 'Error';
				return res.json();
			})
			.then((amount: number) => amount);
	}

	return {
		session,
		streamed: {
			notifications_amount
		}
	};
};
