import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

export const setupRealtime = (supabase: SupabaseClient) => {
	let channel: RealtimeChannel;
	supabase.auth.onAuthStateChange((_, session) => {
		if (!session) {
			if (channel) {
				const untrackPresence = async () => {
					const presenceUntrackStatus = await channel.untrack();
					console.log(presenceUntrackStatus);
				};
				untrackPresence();
			}
			return;
		}

		channel = supabase.channel('online', {
			config: {
				presence: {
					key: session.user.id
				}
			}
		});

		channel.subscribe(async (status) => {
			if (status !== 'SUBSCRIBED') return;
			const presenceTrackStatus = await channel.track({
				user: session.user.id,
				online_at: new Date().toUTCString()
			});
			console.log(presenceTrackStatus);
		});
	});
};
