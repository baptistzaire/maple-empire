<script lang="ts">
	import { syrup, coins } from '$lib/stores';

	const syrupPrices = {
		golden: 80,
		amber: 60,
		dark: 40,
	};

	function sellSyrup(grade: keyof typeof syrupPrices, amount: number) {
		const currentAmount = $syrup[grade];
		if (currentAmount >= amount) {
			syrup.update(s => ({ ...s, [grade]: s[grade] - amount }));
			coins.update(c => c + (amount * syrupPrices[grade]));
		} else {
			alert('Not enough syrup to sell!');
		}
	}
</script>

<div class="relative mx-auto flex h-auto min-h-screen w-full max-w-lg flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
	<!-- Top App Bar -->
	<div class="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background-light/80 p-4 pb-3 dark:bg-background-dark/80 backdrop-blur-sm">
		<a href="/" class="flex h-10 w-10 shrink-0 items-center justify-center">
			<span class="material-symbols-outlined text-white/90 text-3xl">arrow_back</span>
		</a>
		<h1 class="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Market & Inventory</h1>
		<div class="flex items-center justify-end gap-2 shrink-0 min-w-[120px]">
			<div class="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1.5">
				<span class="material-symbols-outlined text-primary text-xl">monetization_on</span>
				<p class="text-white text-base font-bold leading-none tracking-tight">{$coins}</p>
			</div>
		</div>
	</div>
	<div class="px-4">
		<h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">My Inventory</h2>
		<div class="flex flex-col gap-4 rounded-xl bg-white/5 p-4">
			<div class="grid grid-cols-3 gap-4">
				<div class="flex flex-col gap-3 rounded-lg bg-background-dark/50 p-3">
					<p class="text-white/80 text-sm font-medium">Golden Syrup</p>
					<p class="text-white text-3xl font-bold">{$syrup.golden.toFixed(2)} <span class="text-xl">L</span></p>
				</div>
				<div class="flex flex-col gap-3 rounded-lg bg-background-dark/50 p-3">
					<p class="text-white/80 text-sm font-medium">Amber Syrup</p>
					<p class="text-white text-3xl font-bold">{$syrup.amber.toFixed(2)} <span class="text-xl">L</span></p>
				</div>
				<div class="flex flex-col gap-3 rounded-lg bg-background-dark/50 p-3">
					<p class="text-white/80 text-sm font-medium">Dark Syrup</p>
					<p class="text-white text-3xl font-bold">{$syrup.dark.toFixed(2)} <span class="text-xl">L</span></p>
				</div>
			</div>
		</div>
	</div>
	<div class="px-4">
		<h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-8">Farmer's Market</h2>
		{#each Object.entries(syrupPrices) as [grade, price]}
		<div class="flex flex-col gap-4 rounded-xl bg-white/5 p-4 mb-4">
			<div class="flex items-baseline justify-between">
				<p class="text-white/80 font-medium capitalize">{grade} Syrup Price</p>
				<p class="text-primary text-2xl font-bold">${price} <span class="text-base font-medium text-primary/80">/ Liter</span></p>
			</div>
			<div class="grid grid-cols-3 gap-3">
				<button on:click={() => sellSyrup(grade as keyof typeof syrupPrices, 1)} class="flex h-10 items-center justify-center rounded-lg bg-primary/20 text-primary hover:bg-primary/30 font-bold transition-colors">Sell 1</button>
				<button on:click={() => sellSyrup(grade as keyof typeof syrupPrices, 10)} class="flex h-10 items-center justify-center rounded-lg bg-primary/20 text-primary hover:bg-primary/30 font-bold transition-colors">Sell 10</button>
				<button on:click={() => sellSyrup(grade as keyof typeof syrupPrices, $syrup[grade as keyof typeof $syrup])} class="flex h-10 items-center justify-center rounded-lg bg-primary/20 text-primary hover:bg-primary/30 font-bold transition-colors">Sell Max</button>
			</div>
		</div>
		{/each}
	</div>
</div>
