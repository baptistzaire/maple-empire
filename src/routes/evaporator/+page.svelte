<script lang="ts">
	import { sapBatches, syrup, coins, firewood, totalRawSap } from '$lib/stores';
	import type { SapBatch } from '$lib/stores';
	import { onMount } from 'svelte';

	let temperature = 210; // Initial temperature in °F
	let boilProgress = 0;
	let sapToBoil: SapBatch[] = [];
	let totalSapAmount = 0;

	// Game loop for temperature and boiling
	onMount(() => {
		sapToBoil = $sapBatches;
		totalSapAmount = $totalRawSap;

		const gameLoop = setInterval(() => {
			// Temperature naturally cools over time
			if (temperature > 70) {
				temperature -= 0.5;
			}

			// Boiling progress depends on temperature
			if (temperature >= 217 && temperature <= 220) {
				// Perfect temperature range
				boilProgress += 1;
			} else if (temperature > 212) {
				// Still boiling, but slower
				boilProgress += 0.5;
			}

			if (boilProgress >= 100) {
				clearInterval(gameLoop);
				handleBoilComplete();
			}
		}, 1000); // Update every second

		return () => clearInterval(gameLoop);
	});

	function addFuel() {
		if ($firewood > 0) {
			firewood.update(f => f - 1);
			temperature += 10;
		} else {
			alert('Out of firewood!');
		}
	}

	function handleBoilComplete() {
		const averageAgeHours = sapToBoil.reduce((sum, batch) => {
			const age = (new Date().getTime() - new Date(batch.collectedAt).getTime()) / (1000 * 60 * 60);
			return sum + (age * batch.amount);
		}, 0) / totalSapAmount;

		let grade: 'golden' | 'amber' | 'dark';
		if (averageAgeHours <= 24) {
			grade = 'golden';
		} else if (averageAgeHours <= 48) {
			grade = 'amber';
		} else {
			grade = 'dark';
		}

		const syrupProduced = totalSapAmount / 40; // 40:1 ratio for simplicity
		const pricePerLiter = grade === 'golden' ? 80 : grade === 'amber' ? 60 : 40;
		const coinsEarned = syrupProduced * pricePerLiter;

		sapBatches.set([]); // Consume all sap
		syrup.update(s => ({ ...s, [grade]: s[grade] + syrupProduced }));
		coins.update(c => c + coinsEarned);

		alert(`Boil complete! You produced ${syrupProduced.toFixed(2)}L of ${grade} syrup and earned ${coinsEarned.toFixed(2)} coins.`);
	}

	// Calculate temperature gauge position (0-100%)
	$: tempPercent = Math.max(0, Math.min(100, ((temperature - 150) / 100) * 100));
</script>

<div class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
	<header class="flex shrink-0 items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 justify-between sticky top-0 z-10 backdrop-blur-sm">
		<a href="/" class="flex size-10 items-center justify-center">
			<span class="material-symbols-outlined text-zinc-400 text-3xl">arrow_back</span>
		</a>
		<h1 class="text-zinc-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Backyard Evaporator</h1>
	</header>
	<main class="flex-1 px-4 py-2">
		<!-- Stats Cards -->
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-1.5 rounded-xl p-4 bg-zinc-100 dark:bg-zinc-800/50">
				<p class="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-normal">Sap to Boil</p>
				<p class="text-zinc-900 dark:text-white tracking-light text-2xl font-bold leading-tight">{totalSapAmount.toFixed(2)}L</p>
			</div>
			<div class="flex flex-col gap-1.5 rounded-xl p-4 bg-zinc-100 dark:bg-zinc-800/50">
				<p class="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-normal">Firewood</p>
				<p class="text-zinc-900 dark:text-white tracking-light text-2xl font-bold leading-tight">{$firewood}</p>
			</div>
		</div>
		<!-- Evaporator Pan Visual & Temperature Gauge -->
		<div class="mt-6 flex gap-4">
			<div class="flex-1">
				<div class="w-full gap-1 overflow-hidden aspect-[4/3] flex rounded-xl">
					<div class="w-full bg-center bg-no-repeat bg-cover aspect-auto flex-1" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYD2YpzajzV5MIRdciR9bkaKVhYaLA9ydA4ztis9r46lTFOzSg3u7R1El10xvj7AJ3nUUi1of3RcHSrzh7v41dbPLY9qWuVFZ7YzJzEQcL4mAFYz56zfqSfKFeqkqu7ctdGJye3X8bZzexTQ9R4spbdw72pj02e4eFB3_9JgyFb7DvEdP0X9t1F8j4XTtSZABZj8oFueNlc3a_tiVyoI-yf_q-L2SCRFIPF28FKg1rrUIpSHwU4qZVYJ0O7bS0geapDwRzTiuCwDI");'></div>
				</div>
			</div>
			<!-- Temperature Gauge -->
			<div class="flex flex-col-reverse items-center gap-2 w-16 bg-zinc-100 dark:bg-zinc-800/50 p-2 rounded-xl">
				<span class="material-symbols-outlined text-orange-500 text-3xl">local_fire_department</span>
				<div class="w-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700 relative overflow-hidden">
					<!-- Sweet Spot background -->
					<div class="absolute inset-x-0 bg-green-500/30" style="top: 20%; bottom: 40%;"></div>
					<!-- Temperature fill -->
					<div class="w-full bg-primary absolute bottom-0" style="height: {tempPercent}%;"></div>
				</div>
				<p class="text-zinc-900 dark:text-white text-base font-bold">{temperature.toFixed(0)}°F</p>
			</div>
		</div>
		<!-- Progress Bar -->
		<div class="flex flex-col gap-3 p-4 mt-6 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
			<div class="flex gap-6 justify-between">
				<p class="text-zinc-900 dark:text-white text-base font-medium leading-normal">Sap to Syrup Progress</p>
				<p class="text-zinc-900 dark:text-white text-sm font-normal leading-normal">{boilProgress.toFixed(0)}%</p>
			</div>
			<div class="rounded-full h-2 bg-zinc-200 dark:bg-zinc-700">
				<div class="h-2 rounded-full bg-primary" style="width: {boilProgress}%;"></div>
			</div>
			<p class="text-zinc-600 dark:text-zinc-400 text-sm font-normal leading-normal">Keep the temp between 217-220°F for best results!</p>
		</div>
	</main>
	<!-- Action Buttons Footer -->
	<footer class="sticky bottom-0 p-4 pt-2 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
		<div class="grid grid-cols-2 gap-4">
			<button on:click={addFuel} class="flex items-center justify-center gap-2 rounded-lg bg-orange-900/80 px-4 py-4 text-white font-bold text-base hover:bg-orange-900 transition-colors">
				<span class="material-symbols-outlined">add</span>
				Add Fuel
			</button>
			<button class="flex items-center justify-center gap-2 rounded-lg bg-primary/40 px-4 py-4 text-white/50 font-bold text-base cursor-not-allowed">
				<span class="material-symbols-outlined">filter_alt</span>
				Filter Syrup
			</button>
		</div>
	</footer>
</div>
