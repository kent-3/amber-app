<script lang="ts">
	import { secretClient } from '$lib/stores';
	import type { Validator } from 'secretjs/dist/grpc_gateway/cosmos/staking/v1beta1/staking.pb';
	import { fade, fly } from 'svelte/transition';

	async function getValidators(): Promise<Validator[]> {
		const { validators } = await $secretClient.query.staking.validators({
			status: 'BOND_STATUS_BONDED'
		});
		return validators!;
	}
</script>

<div class="card bg-surface-50 dark:!bg-[#28292a] p-4 space-y-2 text-left w-full">
	<h2 class="font-bold tracking-wide !text-3xl">Validators</h2>
	{#await getValidators()}
		<p class="font-bold font-mono text-secondary-800 dark:text-primary-600">loading</p>
	{:then responses}
		{#each responses.sort(() => Math.random() - 0.5) as response}
		<div in:fade={{duration: 600 }} class="flex flex-row flex-nowrap items-center">
			<p class="font-bold font-mono text-secondary-800 dark:text-primary-600">
				{response.description?.moniker},
				<span class="text-token">
					{(Number(response.commission?.commission_rates?.rate ?? 0) * 100).toFixed(2)}%
				</span>
			</p>
		</div>
		{/each}
	{/await}
</div>
