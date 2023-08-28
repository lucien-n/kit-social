import type { Database } from '$types/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';
import { v4 as uuid } from 'uuid';
import { readFileAsArrayBuffer } from '$lib/utils';
import sharp from 'sharp';

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

		const cropped_image = await cropImage(file);

		// since we can't transform an image without a pro-plan, let's compress it to hell
		const compressed_image = await imageCompression(cropped_image, {
			maxSizeMB: 1,
			maxWidthOrHeight: 128,
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

const cropImage = async (file: File) => {
	const buffer = await readFileAsArrayBuffer(file);
	const image = sharp(buffer);

	const metadata = await image.metadata();
	const original_width = metadata.width || 0;
	const original_height = metadata.height || 0;

	const crop_width = Math.min(original_width, original_height * 1);
	const crop_height = Math.min(original_height, original_width / 1);

	const left = Math.floor((original_width - crop_width) / 2);
	const top = Math.floor((original_height - crop_height) / 2);

	const cropped_buffer = await image
		.extract({ left, top, width: crop_width, height: crop_height })
		.toBuffer();

	const cropped_file = new File([cropped_buffer], 'cropped_image.jpg', {
		type: 'image/jpeg'
	});

	return cropped_file;
};
