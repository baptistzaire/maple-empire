<script lang="ts">
	import { rawSap, syrup, coins } from '$lib/stores';
	import { onMount } from 'svelte';

	let boilProgress = 0;
	let timeLeft = 3; // 3-minute boil for the tutorial

	onMount(() => {
		const interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft -= 1;
				boilProgress = (3 - timeLeft) / 3 * 100;
			} else {
				clearInterval(interval);
				handleBoilComplete();
			}
		}, 1000 * 60); // Update every minute
	});

	function handleBoilComplete() {
		// In a real implementation, we'd use a more complex formula
		// For now, 20L of sap produces 0.5L of syrup
		const sapUsed = 20;
		const syrupProduced = 0.5;
		const coinsEarned = 30;

		rawSap.update(n => n - sapUsed);
		syrup.update(n => n + syrupProduced);
		coins.update(n => n + coinsEarned);
	}
</script>

<div class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
	<header class="flex shrink-0 items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 justify-between sticky top-0 z-10 backdrop-blur-sm">
		<a href="/" class="flex size-10 items-center justify-center">
			<span class="material-symbols-outlined text-zinc-400 text-3xl">arrow_back</span>
		</a>
		<h1 class="text-zinc-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Backyard Evaporator</h1>
	</header>
	<main class="flex-1 px-4 py-2">
		<div class="mt-4 flex flex-col gap-3 rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800/50">
			<div class="flex items-center justify-between gap-6">
				<p class="text-base font-medium text-zinc-900 dark:text-white">Batch Progress</p>
				<div class="flex items-center gap-2">
					<span class="material-symbols-outlined text-zinc-500">timer</span>
					<p class="text-sm font-medium text-zinc-900 dark:text-white">{timeLeft} minutes left</p>
				</div>
			</div>
			<div class="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
				<div class="h-2 rounded-full bg-primary" style="width: {boilProgress}%"></div>
			</div>
		</div>
	</main>
</div>
