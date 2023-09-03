import type { TPublicProfile } from './public_profile.type';

export type TPendingFollow = {
	follower: TPublicProfile;
	followed_uid: string;
	accepted: false;
};
