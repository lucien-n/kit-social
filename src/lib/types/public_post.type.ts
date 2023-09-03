import type { TProfile } from './profile.type';

export type TPublicPost = {
	uid: string;
	content: string;
	created_at: string;
	author: TProfile;
};
