import type { TPublicProfile } from './public_profile.type';

export type TPublicPost = {
	uid: string;
	content: string;
	created_at: string;
	author: TPublicProfile;
};
