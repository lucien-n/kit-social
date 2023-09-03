import type { TProfile } from './profile.type';

export type TPendingFollow = {
	follower: TProfile;
	followed_uid: string;
	state: 'pending' | 'accepted' | 'refused';
};
