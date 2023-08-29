import type { Database } from '$types/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';
import { v4 as uuid } from 'uuid';

export const downloadImage = async (
	supabase: SupabaseClient<Database>,
	storage_id: 'avatars' | string,
	path: string
): Promise<string | undefined> => {
	try {
		const { data, error } = await supabase.storage.from(storage_id).download(path);

		if (error) {
			throw error;
		}

		const url = URL.createObjectURL(data);

		return url;
	} catch (e) {
		if (e instanceof Error) {
			console.warn('Error while downloading image: ', e.message);
		}
	}
};

export const uploadImage = async (
	supabase: SupabaseClient<Database>,
	storage_id: 'avatars' | string,
	files: FileList
) => {
	try {
		if (!files || files.length === 0) throw new Error('You must select an image to upload.');

		const file = files[0];

		// since we can't transform an image without a pro-plan, let's compress it to hell
		const compressed_image = await imageCompression(file, {
			maxSizeMB: 1,
			maxWidthOrHeight: 96,
			useWebWorker: true
		});

		const fileExt = file.name.split('.').pop();
		const filePath = `${uuid()}.${fileExt}`;

		const { error } = await supabase.storage.from(storage_id).upload(filePath, compressed_image);

		if (error) throw error;

		return filePath;
	} catch (e) {
		if (e instanceof Error) console.warn('Error while uploading image: ', e.message);
	}
};
