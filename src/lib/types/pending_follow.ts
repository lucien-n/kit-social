import type { Profile } from '$types/profile.type';

export type PendingFollow = {
	follower: Profile;
	followed_uid: string;
	state: 'pending' | 'accepted' | 'refused';
};
