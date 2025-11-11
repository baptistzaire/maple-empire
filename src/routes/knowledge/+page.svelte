<script lang="ts">
	import { mapleLeaves, knowledgeTree } from '$lib/stores';

	// Define the structure of the Knowledge Tree
	const treeData = {
		'collector-volume': { name: 'Mass Tapper', description: 'Tap 5 trees at once.', cost: 5, icon: 'eco', requires: [] },
		'collector-quality': { name: 'Golden Touch', description: '+25% Golden grade chance.', cost: 10, icon: 'invert_colors', requires: ['collector-volume'] },
		'tubing-network': { name: 'Tubing Network', description: 'Automatically collects sap from full trees.', cost: 20, icon: 'timeline', requires: ['collector-volume'] },
		'processor-speed': { name: 'Quick Boil', description: 'Sacrifice quality for speed.', cost: 5, icon: 'outdoor_grill', requires: [] },
		'processor-quality': { name: 'Precision Thermometer', description: 'Temp control automation.', cost: 10, icon: 'device_thermostat', requires: ['processor-speed'] },
		'marketer-premium': { name: 'Brand Recognition', description: '+50% Golden/Amber prices.', cost: 5, icon: 'storefront', requires: [] },
		'marketer-bulk': { name: 'Bulk Contracts', description: 'Guaranteed wholesale sales.', cost: 10, icon: 'local_shipping', requires: ['marketer-premium'] },
	};

	function canUnlock(nodeId: string): boolean {
		const node = treeData[nodeId as keyof typeof treeData];
		if (!node) return false;

		const hasEnoughLeaves = $mapleLeaves >= node.cost;
		const hasUnlocked = $knowledgeTree.includes(nodeId);
		const hasRequirements = node.requires.every(req => $knowledgeTree.includes(req));

		return hasEnoughLeaves && !hasUnlocked && hasRequirements;
	}

	function unlockNode(nodeId: string) {
		if (canUnlock(nodeId)) {
			const node = treeData[nodeId as keyof typeof treeData];
			mapleLeaves.update(l => l - node.cost);
			knowledgeTree.update(tree => [...tree, nodeId]);
		} else {
			alert('Cannot unlock this node yet!');
		}
	}
</script>

<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
	<!-- Top App Bar -->
	<header class="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 p-4 pb-3 backdrop-blur-sm dark:bg-background-dark/80">
		<a href="/" class="flex size-10 shrink-0 items-center justify-start text-stone-900 dark:text-stone-100">
			<span class="material-symbols-outlined">arrow_back</span>
		</a>
		<h1 class="flex-1 text-center text-lg font-bold tracking-tight text-stone-900 dark:text-white">Knowledge Tree</h1>
		<div class="flex h-8 min-w-10 shrink-0 items-center justify-end gap-2 rounded-full bg-stone-200 px-3 dark:bg-stone-800">
			<span class="material-symbols-outlined text-amber-500">emoji_events</span>
			<p class="text-sm font-bold text-stone-800 dark:text-amber-100">{$mapleLeaves}</p>
		</div>
	</header>

	<!-- Knowledge Tree -->
	<main class="flex flex-col gap-4 p-4">
		{#each Object.entries(treeData) as [id, node]}
			{@const isUnlocked = $knowledgeTree.includes(id)}
			{@const canBeUnlocked = canUnlock(id)}
			<div class="flex w-full items-center gap-4 rounded-xl p-3 {isUnlocked ? 'bg-primary/20' : 'bg-stone-100 dark:bg-stone-900/50'}">
				<div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
					<span class="material-symbols-outlined">{node.icon}</span>
				</div>
				<div class="flex flex-1 flex-col justify-center">
					<p class="font-medium text-stone-900 dark:text-white">{node.name}</p>
					<p class="text-sm text-stone-600 dark:text-stone-400">{node.description}</p>
					<p class="text-sm font-medium text-stone-800 dark:text-amber-200">Cost: {node.cost} Maple Leaves</p>
				</div>
				<div class="shrink-0">
					{#if isUnlocked}
						<button disabled class="flex h-10 min-w-[90px] cursor-not-allowed items-center justify-center overflow-hidden rounded-lg bg-stone-300 px-4 text-sm font-bold text-stone-500 opacity-70 dark:bg-stone-700 dark:text-stone-400">
							Unlocked
						</button>
					{:else}
						<button
							on:click={() => unlockNode(id)}
							disabled={!canBeUnlocked}
							class="flex h-10 min-w-[90px] cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 text-sm font-bold text-white shadow-sm transition-transform active:scale-95 {canBeUnlocked ? 'bg-primary' : 'bg-stone-300 dark:bg-stone-700 cursor-not-allowed opacity-70'}">
							<span class="truncate">Unlock</span>
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</main>
</div>
