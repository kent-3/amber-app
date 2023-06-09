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
	class="container h-full lg:w-1/2 w-full mx-auto sm:mx-0 flex flex-col gap-2 sm:gap-4 px-2 pt-4 sm:p-6 items-start pb-12"
>
	<div class="card bg-surface-50 dark:!bg-[#28292a] p-4 space-y-2 text-left w-full">
		<h2 class="font-bold tracking-wide !text-3xl">Balances</h2>
		<p class="font-bold font-mono text-secondary-800 dark:text-primary-600">{$scrtBalance} SCRT</p>
		<p class="font-bold font-mono text-secondary-800 dark:text-primary-600">
			{$amberBalance} AMBER
		</p>
	</div>
	<Delegations />
	<Validators />
</div>
