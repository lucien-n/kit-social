import { v4 as uuid } from 'uuid';
import imageCompression from 'browser-image-compression';
import type { SupabaseClient } from '@supabase/supabase-js';

export const uploadAvatar = async (supabase: SupabaseClient, files: FileList): Promise<string> => {
	const file = files[0];

	// since we can't transform an image without a pro-plan, let's compress it to hell
	const compressed_image = await imageCompression(file, {
		maxSizeMB: 0.05,
		maxWidthOrHeight: 96,
		useWebWorker: true
	});

	const fileExt = file.name.split('.').pop();
	const filePath = `${uuid()}.${fileExt}`;

	const { error } = await supabase.storage.from('avatars').upload(filePath, compressed_image);

	if (error) throw error;

	return filePath;
};
