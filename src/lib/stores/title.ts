import { writable, type Writable } from 'svelte/store';

export const titleStore: Writable<string> = writable('');
