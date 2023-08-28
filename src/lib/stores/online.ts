import { writable, type Writable } from 'svelte/store';

export const onlineUsersStore: Writable<Set<string>> = writable(new Set());
