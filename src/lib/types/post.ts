import type { Profile } from '$types/profile.type';

export type Post = {
	uid: string;
	content: string;
	created_at: string;
	author: Profile;
};
