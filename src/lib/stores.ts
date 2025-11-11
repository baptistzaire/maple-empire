import { derived } from 'svelte/store';
import { persistentWritable } from './persistentStore';

// Define the structure for a batch of sap
export interface SapBatch {
  amount: number;
  collectedAt: string; // Use string to ensure serializability
}

// Player resources
export const sapBatches = persistentWritable<SapBatch[]>('sapBatches', []);
export const syrup = persistentWritable('syrup', {
  golden: 0,
  amber: 0,
  dark: 0,
});
export const coins = persistentWritable('coins', 100);
export const firewood = persistentWritable('firewood', 10);
export const mapleLeaves = persistentWritable('mapleLeaves', 0);
export const lastSave = persistentWritable<string | null>('lastSave', null);

// Knowledge Tree unlocks
export const knowledgeTree = persistentWritable<string[]>('knowledgeTree', []);

// Derived store to calculate the total raw sap from all batches
export const totalRawSap = derived(sapBatches, ($sapBatches) => {
  return $sapBatches.reduce((total, batch) => total + batch.amount, 0);
});

// Weather state
export type Weather = "Ideal" | "Warm Spell";
export const currentWether = persistentWritable<Weather>('currentWeather', 'Ideal');

// Player upgrades
export const upgrades = persistentWritable('upgrades', {
  taps: 1,
  buckets: 1,
  storage: 1,
  evaporator: 1,
});

export const storageCapacity = derived(upgrades, ($upgrades) => {
  // Simple formula for capacity based on storage level
  return 100 * Math.pow($upgrades.storage, 2);
});
