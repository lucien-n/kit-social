import { titleStore } from '$stores/title';
import { TITLE_PREFIX } from './constants';

export const setTitle = (title: string, prefixed: boolean): void => {
	if (prefixed) titleStore.set(`${TITLE_PREFIX} - ${title}`);
	else titleStore.set(title);
};
