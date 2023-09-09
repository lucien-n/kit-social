import { v4 as uuid } from 'uuid';
import imageCompression from 'browser-image-compression';
import type { SupabaseClient } from '@supabase/supabase-js';
import { srcToWebP } from 'webp-converter-browser';

export const uploadAvatar = async (supabase: SupabaseClient, files: FileList): Promise<string> => {
	const file = files[0];

	// since we can't transform an image without a pro-plan, let's compress it to hell
	const compressed_image = await imageCompression(file, {
		maxSizeMB: 0.05,
		maxWidthOrHeight: 96,
		useWebWorker: true
	});

	const wepb_blob = await srcToWebP(URL.createObjectURL(compressed_image), {});

	const file_path = `${uuid()}.wepb`;
	const wepb_file = new File([wepb_blob], file_path, { type: 'image/webp' });

	const { error } = await supabase.storage.from('avatars').upload(file_path, wepb_file);
	console.log(error);

	if (error) throw error;

	return file_path;
};
