<script lang="ts">
	import Delegations from '$lib/components/Delegations.svelte';
	import Validators from '$lib/components/Validators.svelte';

	import { fly } from 'svelte/transition';
	import type { Token } from '$lib/tokens';
	import { amberBalance, scrtBalance, tokenStore } from '$lib/stores';

	let tokens: Token[];
	tokenStore.subscribe((value) => {
		if (value) {
			tokens = [...value].map(([address, token]) => token) as Token[];
		} else tokens;
	});
</script>

<div
	in:fly={{ y: 200, duration: 700 }}
	class="grid w-full grid-cols-1 items-start gap-2 px-2 py-4 sm:mx-0 sm:gap-4 sm:p-6 lg:grid-cols-2"
>
	<!-- <div class="order-first flex flex-1 lg:order-last">
		<div class="card w-full space-y-2 bg-surface-50 p-4 text-left dark:bg-[#28292a]">
			<h2 class="!text-3xl font-bold tracking-wide">Do Stuff</h2>
			
		</div>
	</div> -->
	<div class="order-last flex flex-1 flex-col gap-4 lg:order-first">
		<div class="card w-full space-y-2 bg-surface-50 p-4 text-left dark:bg-[#28292a]">
			<h2 class="!text-3xl font-bold">Balances</h2>
			<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">
				{$scrtBalance} SCRT
			</p>
			<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">
				{$amberBalance} AMBER
			</p>
		</div>
		<Delegations />
		<Validators />
	</div>
</div>
