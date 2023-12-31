export type Profile = {
	uid: string;
	name: string;
	avatar_url: string;
	restricted: boolean;
	created_at?: string;
	last_seen?: string;
	is_private?: boolean;
	is_followed?: boolean;
	is_follower?: boolean;
	is_pending?: boolean;
	is_self?: boolean;
};
