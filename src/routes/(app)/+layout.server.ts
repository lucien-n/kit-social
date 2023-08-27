export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession()

	if (session) {
		const uid = session.user.id
		await supabase.from("profiles").update({last_seen: new Date().toUTCString()}).eq("uid", uid)
	}

	return {
		session
	};
};
