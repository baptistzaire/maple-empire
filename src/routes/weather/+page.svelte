<script lang="ts">
	import { currentWether } from '$lib/stores';

	// Placeholder data for the forecast
	const forecast = [
		{ day: 'Mon', weather: 'Perfect', chance: 35 },
		{ day: 'Tue', weather: 'Perfect', chance: 40 },
		{ day: 'Wed', weather: 'Good', chance: 55 },
		{ day: 'Thu', weather: 'Poor', chance: 20 },
		{ day: 'Fri', weather: 'Warm', chance: 15 },
		{ day: 'Sat', weather: 'Perfect', chance: 30 },
		{ day: 'Sun', weather: 'Perfect', chance: 25 },
	];

	const seasonalProgress = 45;
	const daysLeft = 14;
	const totalSap = 1240;
</script>

<div class="relative mx-auto flex h-auto min-h-screen w-full max-w-md flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
	<!-- Top App Bar -->
	<div class="flex items-center p-4 pb-2">
		<a href="/" class="text-white/80 dark:text-white/80 flex size-12 shrink-0 items-center justify-start">
			<span class="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
		</a>
		<h2 class="text-zinc-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Weather & Season</h2>
		<div class="size-12 shrink-0"></div> <!-- Spacer -->
	</div>
	<!-- Main Visual Area -->
	<div class="@container px-4">
		<div class="relative w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-80" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAq88LpBcEL-7bkL4RwZ0jh8VIRuqjaNs-zHDLnkcF9Mvc8GLwtsKmXzxjxgbvI9mZnrJYXo6Qf3xawAHQ_lGIgvCNmxZLn-MsdA6w83RS0IGUpj6vKiWxs1T-Ncm1dN6KyAhE4rcrwBH7fqe7HlcQj-UGcvOhflRH4cxYRusPyLIwJUczEDhbWDO4kgcuKGVBxZK82NPcafK-QoQvaxPHv0Xb37fslw-Jte1PJ5t4fPoY-acc7oo3y1OlBs5qSDoCXmZp0xgB4B2g");'>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
			<div class="relative z-10 p-4 text-white">
				<div class="flex items-center gap-2">
					<span class="material-symbols-outlined !text-4xl text-orange-300">thermostat</span>
					<span class="text-4xl font-bold">{$currentWether === 'Ideal' ? '41°F' : '52°F'}</span>
				</div>
				<p class="text-lg font-medium text-white/90">{$currentWether === 'Ideal' ? 'Clear & Sunny' : 'Warm Spell'}</p>
			</div>
		</div>
	</div>
	<!-- Status Banner -->
	<div class="px-4 py-6">
		<h1 class="text-primary tracking-light text-center text-[32px] font-bold leading-tight">{$currentWether === 'Ideal' ? 'PERFECT SAP DAY!' : 'WARM SPELL'}</h1>
		<p class="text-zinc-600 dark:text-white/70 text-base font-normal leading-normal text-center pt-1">
			{$currentWether === 'Ideal' ? 'Freezing nights and warm days are ideal.' : 'Warm spells stop sap flow. Process what you have!'}
		</p>
	</div>
	<!-- Season Progress -->
	<div class="px-4 pt-8 pb-6">
		<div class="flex justify-between items-baseline mb-2">
			<h3 class="text-zinc-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Season Progress</h3>
			<p class="text-zinc-600 dark:text-white/70 text-sm font-medium">Mid Season</p>
		</div>
		<div class="w-full bg-zinc-200 dark:bg-white/10 rounded-full h-4">
			<div class="bg-primary h-4 rounded-full" style="width: {seasonalProgress}%"></div>
		</div>
		<div class="flex justify-between mt-1 text-xs text-zinc-500 dark:text-white/50">
			<span>Start</span>
			<span>End</span>
		</div>
	</div>
	<!-- Season Summary -->
	<div class="px-4 pb-8">
		<div class="rounded-xl bg-zinc-200/50 dark:bg-white/10 p-4 flex justify-around">
			<div class="text-center">
				<p class="text-zinc-600 dark:text-white/70 text-sm">Days Left</p>
				<p class="text-zinc-900 dark:text-white text-xl font-bold">{daysLeft}</p>
			</div>
			<div class="border-l border-zinc-300 dark:border-white/20"></div>
			<div class="text-center">
				<p class="text-zinc-600 dark:text-white/70 text-sm">Total Sap</p>
				<p class="text-zinc-900 dark:text-white text-xl font-bold">{totalSap}L</p>
			</div>
		</div>
	</div>
</div>
