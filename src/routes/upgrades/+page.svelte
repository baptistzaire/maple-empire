<script lang="ts">
	import { upgrades, coins } from '$lib/stores';

	const upgradeDetails = {
		taps: { name: 'Maple Taps', description: 'Add more taps to each tree to collect sap faster.', icon: 'eco' },
		buckets: { name: 'Collection Buckets', description: 'Better buckets hold more sap, reducing overflow.', icon: 'invert_colors' },
		evaporator: { name: 'Evaporator Pan', description: 'A larger pan boils more sap into syrup at once.', icon: 'outdoor_grill' },
		storage: { name: 'Sap Storage Tank', description: 'Increase your maximum sap storage capacity.', icon: 'propane_tank' }
	};

	function getUpgradeCost(type: keyof typeof upgradeDetails, level: number): number {
		// Simple cost scaling formula for demonstration
		return 100 * Math.pow(level, 2) + 50;
	}

	function handleUpgrade(type: keyof typeof upgradeDetails) {
		const currentLevel = $upgrades[type];
		const cost = getUpgradeCost(type, currentLevel);

		if ($coins >= cost) {
			coins.update(c => c - cost);
			upgrades.update(u => ({ ...u, [type]: u[type] + 1 }));
		} else {
			alert('Not enough coins!');
		}
	}
</script>

<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
	<!-- Top App Bar -->
	<header class="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 p-4 pb-3 backdrop-blur-sm dark:bg-background-dark/80">
		<a href="/" class="flex size-10 shrink-0 items-center justify-start text-stone-900 dark:text-stone-100">
			<span class="material-symbols-outlined">arrow_back</span>
		</a>
		<h1 class="flex-1 text-center text-lg font-bold tracking-tight text-stone-900 dark:text-white">Backyard Upgrades</h1>
		<div class="flex h-8 min-w-10 shrink-0 items-center justify-end gap-2 rounded-full bg-stone-200 px-3 dark:bg-stone-800">
			<span class="material-symbols-outlined text-amber-500">monetization_on</span>
			<p class="text-sm font-bold text-stone-800 dark:text-amber-100">{$coins}</p>
		</div>
	</header>

	<!-- Upgrades List -->
	<main class="flex flex-col gap-2 p-4 pt-2">
		{#each Object.entries(upgradeDetails) as [type, details]}
			{@const level = $upgrades[type as keyof typeof $upgrades]}
			{@const cost = getUpgradeCost(type as keyof typeof upgradeDetails, level)}
			{@const canAfford = $coins >= cost}
			<div class="flex w-full items-center gap-4 rounded-xl bg-stone-100 p-3 dark:bg-stone-900/50">
				<div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
					<span class="material-symbols-outlined">{details.icon}</span>
				</div>
				<div class="flex flex-1 flex-col justify-center">
					<p class="font-medium text-stone-900 dark:text-white">{details.name} - Lvl {level}</p>
					<p class="text-sm text-stone-600 dark:text-stone-400">{details.description}</p>
					<p class="text-sm font-medium {canAfford ? 'text-stone-800 dark:text-amber-200' : 'text-red-500 dark:text-red-400'}">Cost: {cost}</p>
				</div>
				<div class="shrink-0">
					<button
						on:click={() => handleUpgrade(type as keyof typeof upgradeDetails)}
						disabled={!canAfford}
						class="flex h-10 min-w-[90px] cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 text-sm font-bold text-white shadow-sm transition-transform active:scale-95 {canAfford ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-700 cursor-not-allowed opacity-70'}">
						<span class="truncate">Upgrade</span>
					</button>
				</div>
			</div>
		{/each}
	</main>
</div>
