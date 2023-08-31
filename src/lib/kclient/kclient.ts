import type { PublicProfile } from '$types/public_profile.type';
import imageCompression from 'browser-image-compression';
import type { Fetch } from './fetch.type';
import { v4 as uuid } from 'uuid';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$types/database.types';

export default class KClient {
	protected fetch: Fetch;
	protected supabase: SupabaseClient<Database>;

	constructor(fetch: Fetch, supabase: SupabaseClient) {
		this.fetch = fetch;
		this.supabase = supabase;
	}

	get = async (url: string) => {
		const res = await this.fetch(url);

		if (!res.ok) throw new Error(`Error ${res.status} in request: ${res.statusText}`);

		const data = await res.json();

		return data;
	};

	getProfile = async (uid: string): Promise<PublicProfile | null> => {
		if (!uid) return null;

		const url = `/api/users/${uid}/profile`;

		const { data, error } = await this.get(url);
		if (error) return null;

		return data as PublicProfile;
	};

	getAvatar = async (uid: string): Promise<string | null> => {
		if (!uid) return null;

		const url = `/api/users/${uid}/avatar`;

		const { data, error } = await this.get(url);
		if (error) return null;

		return data as string;
	};

	uploadAvatar = async (files: FileList): Promise<string> => {
		const file = files[0];

		// since we can't transform an image without a pro-plan, let's compress it to hell
		const compressed_image = await imageCompression(file, {
			maxSizeMB: 0.05,
			maxWidthOrHeight: 96,
			useWebWorker: true
		});

		const fileExt = file.name.split('.').pop();
		const filePath = `${uuid()}.${fileExt}`;

		const { error } = await this.supabase.storage
			.from('avatars')
			.upload(filePath, compressed_image);

		if (error) throw error;

		return filePath;
	};
}
