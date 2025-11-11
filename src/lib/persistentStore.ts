import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function persistentWritable<T>(key: string, startValue: T) {
  const storedValue = browser ? window.localStorage.getItem(key) : null;
  const initialValue = storedValue ? JSON.parse(storedValue) : startValue;

  const store = writable<T>(initialValue);

  if (browser) {
    store.subscribe(value => {
      window.localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}
