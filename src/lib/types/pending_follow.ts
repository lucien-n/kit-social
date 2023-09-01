import type { PublicProfile } from './public_profile.type';

export type PendingFollow = {
	follower: PublicProfile;
	followed_uid: string;
	accepted: false;
};
