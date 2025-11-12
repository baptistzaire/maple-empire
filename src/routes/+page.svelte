<script lang="ts">
	import { totalRawSap, syrup, coins, storageCapacity, sapBatches, currentWether, mapleLeaves, knowledgeTree, lastSave, upgrades, firewood } from '$lib/stores';
	import type { SapBatch } from '$lib/stores';
	import Tree from '$lib/components/Tree.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		// Offline progress calculation
		const lastSaveTimestamp = $lastSave;
		if (lastSaveTimestamp) {
			const timeOffline = new Date().getTime() - new Date(lastSaveTimestamp).getTime();
			const hoursOffline = timeOffline / (1000 * 60 * 60);

			// Simple offline sap production
			const sapProduced = hoursOffline * 10 * ($upgrades.taps || 1);
			const newBatch: SapBatch = { amount: sapProduced, collectedAt: new Date().toISOString() };

			const currentSap = $totalRawSap;
			const capacity = $storageCapacity;

			if (currentSap + sapProduced > capacity) {
				const overflow = (currentSap + sapProduced) - capacity;
				const remainingAmount = capacity - currentSap;
				if (remainingAmount > 0) {
					newBatch.amount = remainingAmount;
					sapBatches.update(batches => [...batches, newBatch]);
				}
				alert(`Welcome back! You were away for ${hoursOffline.toFixed(2)} hours and produced sap, but ${overflow.toFixed(2)}L overflowed.`);
			} else {
				sapBatches.update(batches => [...batches, newBatch]);
				alert(`Welcome back! You were away for ${hoursOffline.toFixed(2)} hours and produced ${sapProduced.toFixed(2)}L of sap.`);
			}
		}

		// Save timestamp on page leave
		window.addEventListener('beforeunload', () => {
			lastSave.set(new Date().toISOString());
		});


		const weatherInterval = setInterval(() => {
			currentWether.update(weather => (weather === 'Ideal' ? 'Warm Spell' : 'Ideal'));
		}, 30000); // Change weather every 30 seconds

		const autoCollectInterval = setInterval(() => {
			if ($knowledgeTree.includes('tubing-network')) {
				// In a real implementation, we would need to get the state from the child components.
				// For now, this is a placeholder to show the logic.
			}
		}, 5000);

		return () => {
			clearInterval(weatherInterval);
			clearInterval(autoCollectInterval);
		};
	});

	const trees = [
		{
			id: 1,
			imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIvQ5MSf1zT6H4OA6RU2mNWcyOKS4lSxKFK9wMBzm6gRVmLqujqCI8RYMTjiV_BeNuYJVH152mR7XKZiCwIimOfjdcIEx5hJpPK_bsZgW8cJ7KhqCQKeXcB4NxBhmxrobhQ5_I3zulGZnhpSali_jP7ZcMD4eKOIRNjFHGC08Re8hupuU81XDf8Dl02tqYS6G1oB0Dp_F5dgScHMK6y8DcsqR9ZYoo2mcJPdA_otpzplJiXdU6cSbFdz3hS8fOgR_murpcxrsDL_4',
			position: { top: '35%', left: '10%' },
			size: { width: '96px', height: '128px' }
		},
		{
			id: 2,
			imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf9DOU8VuYkAUakoZWpYqlS_oZ99FbdLkqamzPIPP76hduDi6wJvWp_rTjgFaDSwrth_zEEUEqL_etJ-fJSWSpi81V2KqrvmA_kwfd2_cDcSFD9aZybryd7BgSycYpvf50D8KQR2TD0CphDX8hhQodxCYU2W32_aYRJb6QYLk1dNjijjkzCO63-pUJ39NM1lnCwIMC6c7frzCI01w1ySuDyLF48Sql6gSxOPUzZsUS8Cp-XM_tccccYIm-1rxGmbGt_jcnOfGGxAo',
			position: { top: '40%', left: '70%' },
			size: { width: '112px', height: '160px' }
		},
		{
			id: 3,
			imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs-rKIwGurVoYhl-7jZ16Qi7kLguaJNKohBv3ft8RjxbeJBjAM7Ynxw_bEvAfLkZltOw8w7-H2xsJs8BgcfBPimrAveigJP0tVf2nlk4R-tsocsc9fA7Tk0QG0H-8cZQSNleozI7Q5zX2GUkL1NZyLaAnHv8cj48SX0Onbk-YSVpHVsitj3jjjC6d-ouZzRnVT5wiI_nl2pmQvd3SGb4C63koMhHe9bn8kg_TBiEZU6jxV7xEf3VH67tqo6RVbpVZMVM2QfBgCyA4',
			position: { top: '55%', left: '45%' },
			size: { width: '128px', height: '192px' }
		}
	];

	function handleSapCollection(event: CustomEvent<{ amount: number }>) {
		const amount = event.detail.amount;
		const currentSap = $totalRawSap;
		const capacity = $storageCapacity;

		if (currentSap + amount > capacity) {
			const overflow = (currentSap + amount) - capacity;
			alert(`Sap overflowed! You lost ${overflow.toFixed(2)}L of sap. Upgrade your storage to prevent this.`);

			const remainingAmount = capacity - currentSap;
			if (remainingAmount > 0) {
				const newBatch: SapBatch = { amount: remainingAmount, collectedAt: new Date().toISOString() };
				sapBatches.update(batches => [...batches, newBatch]);
			}
		} else {
			const newBatch: SapBatch = { amount, collectedAt: new Date().toISOString() };
			sapBatches.update(batches => [...batches, newBatch]);
		}
	}

	function endSeason() {
		const totalSyrup = $syrup.golden + $syrup.amber + $syrup.dark;
		const leavesEarned = Math.floor(totalSyrup / 10);
		mapleLeaves.update(l => l + leavesEarned);

		sapBatches.set([]);
		syrup.set({ golden: 0, amber: 0, dark: 0 });
		coins.set(100);
		firewood.set(10);

		alert(`Season ended! You earned ${leavesEarned} Maple Leaves.`);
		goto('/knowledge');
	}
</script>

<div class="relative mx-auto flex h-screen max-w-md flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display">
	<!-- Top App Bar & Stats -->
	<header class="absolute top-0 z-10 w-full p-4 font-display">
		<div class="flex items-center justify-between pb-2">
			<h1 class="text-xl font-bold leading-tight tracking-tighter text-white" style="text-shadow: 0 1px 3px rgba(0,0,0,0.4);">Maple Empire</h1>
			<a href="/weather" class="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-white backdrop-blur-sm">
				<span class="material-symbols-outlined text-xl">{$currentWether === 'Ideal' ? 'wb_sunny' : 'thermostat'}</span>
				<p class="text-sm font-semibold">{$currentWether}</p>
			</a>
			<button class="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
				<span class="material-symbols-outlined">settings</span>
			</button>
		</div>
		<div class="flex flex-wrap gap-2">
			<div class="flex min-w-[120px] flex-1 items-center gap-2 rounded-lg bg-black/30 p-2 backdrop-blur-sm">
				<span class="material-symbols-outlined text-amber-300">water_drop</span>
				<div class="flex flex-col">
					<p class="text-xs font-medium leading-tight text-amber-100">Raw Sap</p>
					<p class="text-base font-bold leading-tight text-white">{$totalRawSap.toFixed(2)} / {$storageCapacity} L</p>
				</div>
			</div>
			<div class="flex min-w-[120px] flex-1 items-center gap-2 rounded-lg bg-black/30 p-2 backdrop-blur-sm">
				<span class="material-symbols-outlined text-amber-400">local_drink</span>
				<div class="flex flex-col">
					<p class="text-xs font-medium leading-tight text-amber-100">Syrup</p>
					<p class="text-base font-bold leading-tight text-white">{$syrup.golden.toFixed(2)}G, {$syrup.amber.toFixed(2)}A, {$syrup.dark.toFixed(2)}D L</p>
				</div>
			</div>
			<div class="flex min-w-[120px] flex-1 items-center gap-2 rounded-lg bg-black/30 p-2 backdrop-blur-sm">
				<span class="material-symbols-outlined text-amber-500">monetization_on</span>
				<div class="flex flex-col">
					<p class="text-xs font-medium leading-tight text-amber-100">Coins</p>
					<p class="text-base font-bold leading-tight text-white">{$coins}</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Game Area -->
	<main class="relative flex-1">
		<div class="absolute inset-0 h-full w-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCipXpm2yrC8FyEpGAPRAZezcE10-PC0gN8hVS_udTSB_EiWzZj0KYlL80XVbkuybDDDsp3SwUpxhluoYS8pk28ymXFttHUAO3OegOCqpDC0WxPKcEpwUTmgwmp6k9vnUpE9LYEDkImgkzL3Dl5DVU8SqW1oYCxdFjgGCTDMIz0hoZ0zRxeOiLtIokNt9Y2QKUP4i_97GLxOs9rG1DrHriE5muNONrGm6OUBunXx4T_cHJB_46xg5lRNqB-eZQDmVcVcIY7850zJ_g');">
		</div>
		<!-- Interactive Tree Objects -->
		<div class="absolute inset-0">
			{#each trees as tree, i}
				<Tree {...tree} bind:state={trees[i].state} bind:sapLevel={trees[i].sapLevel} on:collect={handleSapCollection} />
			{/each}
		</div>
		<!-- Tutorial Pop-up -->
		<div class="absolute bottom-24 left-1/2 -translate-x-1/2 w-11/12 max-w-sm rounded-xl border border-primary/20 bg-background-dark/80 p-4 text-center text-white shadow-2xl backdrop-blur-md">
			<h3 class="font-bold text-primary">Your bucket is full!</h3>
			<p class="mt-1 text-sm text-slate-200">Tap the glowing droplet to collect the sap and start making syrup.</p>
		</div>
	</main>

	<!-- Bottom Navigation Bar -->
	<footer class="relative z-10 w-full font-display">
		<div class="flex border-t border-primary/20 bg-background-dark/80 px-4 pb-3 pt-2 backdrop-blur-sm">
			<a class="flex flex-1 flex-col items-center justify-end gap-1 text-primary" href="/">
				<span class="material-symbols-outlined fill text-2xl">forest</span>
				<p class="text-xs font-bold leading-normal tracking-wide">Sugarbush</p>
			</a>
			<a class="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-primary" href="/upgrades">
				<span class="material-symbols-outlined text-2xl">trending_up</span>
				<p class="text-xs font-medium leading-normal tracking-wide">Upgrades</p>
			</a>
			<a class="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-primary" href="/market">
				<span class="material-symbols-outlined text-2xl">storefront</span>
				<p class="text-xs font-medium leading-normal tracking-wide">Shop</p>
			</a>
		</div>
	</footer>
</div>
