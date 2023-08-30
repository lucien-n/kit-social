export type PublicProfile = {
	uid: string;
	name: string;
	avatar_url: string;
	restricted: boolean;
	created_at: string;
	last_seen?: string;
	is_private?: boolean;
	is_followed?: boolean;
	is_pending?: boolean;
};
