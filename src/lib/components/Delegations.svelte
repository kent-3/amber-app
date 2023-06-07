<script lang="ts">
	import { chains } from '$lib/config';
	import { secretClient, secretAddress } from '$lib/stores';
	import { SecretNetworkClient } from 'secretjs';
	import type {
		Delegation,
		DelegationResponse
	} from 'secretjs/dist/grpc_gateway/cosmos/staking/v1beta1/staking.pb';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	async function getDelegations(): Promise<DelegationResponse[]> {
		const { delegation_responses } = await $secretClient.query.staking.delegatorDelegations({
			delegator_addr: $secretAddress
		});
		console.log(delegation_responses);
		return delegation_responses!;
	}
</script>

<div class="card bg-surface-50 dark:!bg-[#28292a] p-4 space-y-2 text-left w-full">
	<h2 class="font-bold tracking-wide !text-3xl">Delegations</h2>
	{#await getDelegations()}
		<p class="font-bold font-mono text-secondary-800 dark:text-primary-600">loading</p>
	{:then responses}
		{#if responses.length > 0}
			{#each responses as response}
				<p class="font-bold font-mono text-secondary-800 dark:text-primary-600">
					{response.delegation?.validator_address}
				</p>
			{/each}
		{:else}
			<p in:fade={{duration: 600 }} class="font-bold font-mono text-secondary-800 dark:text-primary-600">
				None
			</p>
		{/if}
	{/await}
</div>
