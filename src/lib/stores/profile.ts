import { writable, type Writable } from 'svelte/store';

export const profileStore: Writable<SupaProfile | null> = writable();
