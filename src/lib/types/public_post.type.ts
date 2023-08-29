import type { PublicProfile } from './public_profile.type';

export type PublicPost = {
	uid: string;
	content: string;
	created_at: string;
	author: PublicProfile;
};
