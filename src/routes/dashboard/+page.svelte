<script lang="ts">
	import { totalRawSap, syrup, coins, storageCapacity } from '$lib/stores';

	// Placeholder values for now
	const seasonalProgress = 65;
	const sapFlowRate = 80;
	const boilingProgress = 75;
</script>

<div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
	<div class="mx-auto flex w-full max-w-md flex-col bg-background-light dark:bg-background-dark pb-28">
		<!-- Header: Stats -->
		<header class="flex flex-wrap gap-3 p-4">
			<div class="flex min-w-[100px] flex-1 items-center gap-2 rounded-xl p-3 bg-white/5 dark:bg-black/20">
				<span class="material-symbols-outlined text-primary">water_drop</span>
				<div>
					<p class="text-gray-400 text-xs font-medium leading-normal">Sap</p>
					<p class="text-white tracking-tight text-base font-bold leading-tight">{$totalRawSap.toFixed(2)}L</p>
				</div>
			</div>
			<div class="flex min-w-[100px] flex-1 items-center gap-2 rounded-xl p-3 bg-white/5 dark:bg-black/20">
				<span class="material-symbols-outlined text-primary">local_fire_department</span>
				<div>
					<p class="text-gray-400 text-xs font-medium leading-normal">Syrup</p>
					<p class="text-white tracking-tight text-base font-bold leading-tight">{$syrup.golden + $syrup.amber + $syrup.dark}L</p>
				</div>
			</div>
			<div class="flex min-w-[100px] flex-1 items-center gap-2 rounded-xl p-3 bg-white/5 dark:bg-black/20">
				<span class="material-symbols-outlined text-primary">monetization_on</span>
				<div>
					<p class="text-gray-400 text-xs font-medium leading-normal">Cash</p>
					<p class="text-white tracking-tight text-base font-bold leading-tight">${$coins}</p>
				</div>
			</div>
		</header>
		<!-- Central Visual Area -->
		<div class="@container p-4">
			<div class="relative w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-80" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLdimntLHNg-VZOrAdTh4B3R1g8APzOJ4aTF9lCxaf9V060DucdgtkMQv07TA23C-eRWWbROXpLTWXTaB73j8ujeST1l8pW46228h0X-af7DPoVbGWHruQ3tEuBDuyU9VTFEqs2GGDkTHRyPV_D1wVR80f426I5cBoyA_6d6ltL2MDlpMqCp4r7ynLwPiC17nh0eqGmEjJX2AezyGUInCkCsPZMpaGVPLyHgrMSsB-GkL_o3wO7yIv1ytWIItetNywq4MsBk_UBLE");'>
				<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
				<div class="relative p-4">
					<div class="flex flex-col gap-3">
						<div class="flex gap-6 justify-between items-center">
							<p class="text-white text-base font-medium leading-normal">Mid-Season</p>
							<p class="text-white text-sm font-normal leading-normal">{seasonalProgress}%</p>
						</div>
						<div class="rounded-full bg-white/20"><div class="h-2 rounded-full bg-primary" style="width: {seasonalProgress}%;"></div></div>
						<p class="text-gray-300 text-sm font-normal leading-normal">Seasonal Progress</p>
					</div>
				</div>
			</div>
		</div>
		<!-- Key Metrics -->
		<div class="flex flex-col gap-4 p-4">
			<div class="flex flex-col gap-3 p-4 rounded-xl bg-white/5 dark:bg-black/20">
				<div class="flex gap-6 justify-between">
					<p class="text-white text-base font-medium leading-normal">Sap Flow Rate</p>
					<p class="text-gray-300 text-sm font-normal leading-normal">{sapFlowRate}L/min</p>
				</div>
				<div class="rounded bg-gray-700/50"><div class="h-2 rounded bg-primary" style="width: {sapFlowRate}%;"></div></div>
			</div>
			<div class="flex flex-col gap-3 p-4 rounded-xl bg-white/5 dark:bg-black/20">
				<div class="flex gap-6 justify-between">
					<p class="text-white text-base font-medium leading-normal">Boiling Progress</p>
					<p class="text-white text-sm font-normal leading-normal">{boilingProgress}%</p>
				</div>
				<div class="rounded bg-gray-700/50"><div class="h-2 rounded bg-primary" style="width: {boilingProgress}%;"></div></div>
			</div>
		</div>
	</div>
</div>
