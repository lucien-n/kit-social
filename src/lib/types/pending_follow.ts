import type { TPublicProfile } from './public_profile.type';

export type TPendingFollow = {
	follower: TPublicProfile;
	followed_uid: string;
	state: 'pending' | 'accepted' | 'refused';
};
