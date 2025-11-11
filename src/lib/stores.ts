import { writable } from 'svelte/store';

// Initial player resources
export const rawSap = writable(0);
export const syrup = writable(0);
export const coins = writable(100);
