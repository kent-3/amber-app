<script lang="ts">
	import { readOnlyClient } from '$lib/stores';
	import type { Validator } from 'secretjs/dist/grpc_gateway/cosmos/staking/v1beta1/staking.pb';
	import { fade } from 'svelte/transition';

	async function getValidators(): Promise<Validator[]> {
		const { validators } = await $readOnlyClient.query.staking.validators({
			status: 'BOND_STATUS_BONDED',
		});
		return validators!;
	}
</script>

<div class="card w-full space-y-2 bg-surface-50 p-4 text-left dark:!bg-[#28292a]">
	<h2 class="!text-3xl font-bold tracking-wide">Validators</h2>
	{#await getValidators()}
		<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">loading</p>
	{:then responses}
		{#each responses.sort(() => Math.random() - 0.5) as response}
			<div in:fade={{ duration: 600 }} class="flex flex-row flex-nowrap items-center">
				<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">
					{response.description?.moniker},
					<span class="text-token">
						{(Number(response.commission?.commission_rates?.rate ?? 0) * 100).toFixed(2)}%
					</span>
				</p>
			</div>
		{/each}
	{/await}
</div>
