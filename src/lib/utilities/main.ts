import { titleStore } from '$stores/title';
import { TITLE_PREFIX } from './constants';

export const setTitle = (title: string, prefixed = true): void => {
	if (prefixed) {
		if (title) titleStore.set(`${TITLE_PREFIX} - ${title}`);
		else titleStore.set(TITLE_PREFIX);
	} else titleStore.set(title);
};
