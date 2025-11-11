<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: number;
	export let imageSrc: string;
	export let position: { top: string; left: string };
	export let size: { width: string; height: string };

	let currentState: 'untapped' | 'tapping' | 'full' = 'untapped';
	let sapLevel = 0; // percentage
	const sapCapacity = 100;
	const sapAmount = 10; // The amount of sap this tree's bucket holds

	const dispatch = createEventDispatcher();

	function handleTap() {
		if (currentState === 'untapped') {
			currentState = 'tapping';
			startSapFlow();
		}
	}

	function startSapFlow() {
		const interval = setInterval(() => {
			sapLevel += 10; // Increase sap by 10% every second for demonstration
			if (sapLevel >= sapCapacity) {
				sapLevel = sapCapacity;
				currentState = 'full';
				clearInterval(interval);
			}
		}, 1000);
	}

	function handleCollect() {
		if (currentState === 'full') {
			dispatch('collect', { amount: sapAmount });
			sapLevel = 0;
			currentState = 'untapped'; // For now, revert to untapped after collection
		}
	}
</script>

<div class="absolute" style="left: {position.left}; top: {position.top}; width: {size.width}; height: {size.height};">
	<img class="w-full h-full object-contain transition-transform duration-200 hover:scale-105" alt="A sugar maple tree" src={imageSrc} />

	{#if currentState === 'untapped'}
		<button on:click={handleTap} class="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-lg">Tap</button>
	{:else if currentState === 'tapping'}
		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
			<div class="w-6 h-8 rounded border-2 border-gray-500 bg-gray-300 relative overflow-hidden">
				<div class="absolute bottom-0 left-0 w-full bg-blue-300" style="height: {sapLevel}%;"></div>
			</div>
		</div>
	{:else if currentState === 'full'}
		<div on:click={handleCollect} class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer">
			<div class="absolute -top-6 animate-bounce">
				<span class="material-symbols-outlined text-4xl text-blue-300" style="filter: drop-shadow(0 0 5px white);">water_drop</span>
			</div>
			<div class="w-8 h-10 rounded border-2 border-amber-600 bg-blue-300 shadow-lg shadow-blue-300/50"></div>
		</div>
	{/if}
</div>
