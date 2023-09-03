import type { ToastSettings } from '@skeletonlabs/skeleton';

export const toasts = {
	error: (error?: string) => {
		const settings: ToastSettings = {
			message: error == undefined ? 'An error occured' : error,
			background: 'variant-ghost-error'
		};

		return settings;
	}
};
