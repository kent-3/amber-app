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
	class="container mx-auto flex h-full w-full flex-col items-start gap-2 px-2 py-4 sm:mx-0 sm:gap-4 sm:p-6 lg:w-1/2"
>
	<div class="card w-full space-y-2 bg-surface-50 p-4 text-left dark:!bg-[#28292a]">
		<h2 class="!text-3xl font-bold tracking-wide">Balances</h2>
		<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">{$scrtBalance} SCRT</p>
		<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">
			{$amberBalance} AMBER
		</p>
	</div>
	<Delegations />
	<Validators />
</div>
