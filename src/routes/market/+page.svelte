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
				<div class="flex flex-col gap-2 rounded-xl bg-white/5 p-3">
					<div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxsXpr-Lngg-uFXnZalenOZ9jaU-l3lbUj4d8ShahKU23bkTykWvv5grROEFo82geNf7ulWG3r0MIQ82bxTbNkVWH3S98Q3hrA-dQaZZhtDpMlu8JCsBDMpw9-HM-ohqyfnFG5WuaCUMP5ihnOi4_gkn3jjw36JWjz3nDJikQjpQ5r_2CgcDgRcsKB4vyCv03XAcc43YrVwyC9Qxoi_PVAZocLESRpYxAAgej9IaVZGgukqIUfrNFGrrQMxW9bYBekVxrsDri9bnY");'></div>
					<div>
						<p class="text-white text-base font-medium leading-normal">Golden Syrup</p>
						<p class="text-primary/80 text-sm font-normal leading-normal">{$syrup.golden.toFixed(2)} L</p>
					</div>
				</div>
				<div class="flex flex-col gap-2 rounded-xl bg-white/5 p-3">
					<div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAbx5Vo5NmORQCtPF-cHIsy1OfuhfwYjaqadxadIxFrxcueU1u-1ehK1byxk5suaOA5Gq_RF6IjonKZ7_2fH3V0dOUvVillVClbdDn-_QGV6bSvo146htFwrbU7U7Pgd5TzadqeIQ4R3-qziuczdYTpEx9CwNSJ8JC-5rP0xhEaH4ekvnkdxns7JSB6OOZgl3eoi7IlWLBz13OUBrEVbcbcZVCdHnBzsv3GBdIR9zVH_9MUurB5jnXCQDff-X9vAKTkC9G8w5GBhM");'></div>
					<div>
						<p class="text-white text-base font-medium leading-normal">Amber Syrup</p>
						<p class="text-primary/80 text-sm font-normal leading-normal">{$syrup.amber.toFixed(2)} L</p>
					</div>
				</div>
				<div class="flex flex-col gap-2 rounded-xl bg-white/5 p-3">
					<div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1uV9Zi0WLlwN4fQogxtd7HnnEAxGhY8oLTohHGkEz1X7svt-liMQ37Zt4lwz-QXupL6ooS0RK33oiP2ZoWzGaaW8zzhF6rtAaE45lAC0NPLW97AlghwmcxdSH6Ail3vSStGWngmEiI8EMDphGrXqj0G-0ImWCvXp6F00pqIGdQenWMITZo7zh8KEvac2m_FN7wZogna-evMQ1aJS3gR63RLepBQm_xQ3W8-os4PSd90txJdaHKKcckS97RFeWjaer48WseO9ptPQ");'></div>
					<div>
						<p class="text-white text-base font-medium leading-normal">Dark Syrup</p>
						<p class="text-primary/80 text-sm font-normal leading-normal">{$syrup.dark.toFixed(2)} L</p>
					</div>
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
