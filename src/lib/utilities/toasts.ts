import type { ToastSettings } from '@skeletonlabs/skeleton';

export const toasts = {
	error: (message?: string) => {
		const settings: ToastSettings = {
			message: message == undefined ? 'An error occured' : message,
			background: 'variant-ghost-error'
		};

		return settings;
	},
	info: (message?: string) => {
		const settings: ToastSettings = {
			message: message == undefined ? 'Success' : message,
			background: 'variant-ghost-success'
		};

		return settings;
	}
};
