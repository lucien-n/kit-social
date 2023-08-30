import type { PageServerLoad } from '../$types';
import type { TNotification } from '$types/notification.type';

export const load: PageServerLoad = async ({ locals: { getSession }, fetch }) => {
	const session = await getSession();

	if (session) {
		const notifications = fetch(`/api/users/${session.user.id}/notifications`)
			.then((res) => {
				if (!res.ok || !res.body) throw 'Error';
				return res.json();
			})
			.then((data) => data as TNotification[]);

		return {
			streamed: {
				notifications
			}
		};
	}
};
