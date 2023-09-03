import type { SupabaseClient } from '@supabase/supabase-js';
import type { TPublicProfile } from '$types/public_profile.type';
import type { Ftch } from './types';
import { checkUid } from '$lib/utils';
import { browser } from '$app/environment';
import { profilesStore } from '$stores/profiles';
import type { TPendingFollow } from '$types/pending_follow';

export class KUsers {
	protected fetch: Ftch;
	protected supabase: SupabaseClient;
	protected url: string;

	constructor(fetch: Ftch, supabase: SupabaseClient, url: string) {
		this.fetch = fetch;
		this.supabase = supabase;
		this.url = url;
	}

	getProfile = async ({
		uid,
		username
	}: {
		uid?: string;
		username?: string;
	}): Promise<TPublicProfile | null> => {
		if (!checkUid(uid) && !username) return null;

		if (browser && profilesStore.contains(uid ? { uid } : { username }))
			return profilesStore.get(uid ? { uid } : { username });

		const url = this.url + `${uid || username}/profile`;

		const { data, error } = await this.fetch(url, 'GET');
		if (error) return null;

		return data as TPublicProfile;
	};

	getAvatar = async (uid: string): Promise<string | null> => {
		if (!checkUid(uid)) return null;

		const url = this.url + `${uid}/avatar`;

		const { data, error } = await this.fetch(url, 'GET');
		if (error) return null;

		return data as string;
	};

	isOnline = async (uid: string): Promise<boolean> => {
		if (!checkUid(uid)) return false;

		const url = this.url + `${uid}/is-online`;

		const { data, error } = await this.fetch(url, 'GET');
		if (error) return false;

		return data as boolean;
	};

	getSettings = async (uid: string | undefined): Promise<SupaProfileSettings | null> => {
		if (!checkUid(uid)) return null;

		const url = this.url + `${uid}/settings`;
		const { data, error } = await this.fetch(url, 'GET');
		if (error) return null;

		const settings = data as SupaProfileSettings;

		return settings;
	};

	getFollowedUsersUids = async (uid: string): Promise<string[]> => {
		if (!checkUid(uid)) return [];

		const url = this.url + `${uid}/followed`;
		const { data, error } = await this.fetch(url, 'GET');
		if (error) return [];

		const uids = data as string[];

		return uids;
	};

	getFollowersUids = async (uid: string): Promise<string[]> => {
		if (!checkUid(uid)) return [];

		const url = this.url + `${uid}/followers`;
		const { data, error } = await this.fetch(url, 'GET');
		if (error) return [];

		const profiles = data as string[];

		return profiles;
	};

	getFollowers = async (uid: string): Promise<TPublicProfile[]> => {
		if (!checkUid(uid)) return [];

		const uids = await this.getFollowersUids(uid);

		if (uids.length < 1) return [];

		const profiles: TPublicProfile[] = [];

		for (const uid of uids) {
			const profile = await this.getProfile({ uid });
			if (!profile) continue;
			profiles.push(profile);
		}

		return profiles;
	};

	getPendingFollows = async (uid: string): Promise<TPendingFollow[] | null> => {
		if (!checkUid(uid)) return null;

		const url = this.url + `${uid}/pending`;
		const { data, error } = await this.fetch(url, 'GET');
		if (error) return [];

		const pending_follows = data as TPendingFollow[];

		return pending_follows;
	};

	refusePendingFollow = async (uid: string): Promise<boolean> => {
		if (!checkUid(uid)) return false;

		const url = this.url + `${uid}/pending/refuse`;
		const { data, error } = await this.fetch(url, 'GET');
		if (error) return false;

		return data === true;
	};

	acceptPendingFollow = async (uid: string): Promise<boolean> => {
		if (!checkUid(uid)) return false;

		const url = this.url + `${uid}/pending/accept`;
		const { data, error } = await this.fetch(url, 'GET');
		if (error) return false;

		return data === true;
	};
}
