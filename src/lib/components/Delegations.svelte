<script lang="ts">
	import { chains } from '$lib/config';
	import { secretClient, secretAddress } from '$lib/stores';
	import { SecretNetworkClient } from 'secretjs';
	import type {
		Delegation,
		DelegationResponse,
	} from 'secretjs/dist/grpc_gateway/cosmos/staking/v1beta1/staking.pb';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	async function getDelegations(): Promise<DelegationResponse[]> {
		const { delegation_responses } = await $secretClient.query.staking.delegatorDelegations({
			delegator_addr: $secretAddress,
		});
		console.log(delegation_responses);
		return delegation_responses!;
	}
</script>

<div class="card w-full space-y-2 bg-surface-50 p-4 text-left dark:!bg-[#28292a]">
	<h2 class="!text-3xl font-bold tracking-wide">Delegations</h2>
	{#await getDelegations()}
		<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">loading</p>
	{:then responses}
		{#if responses.length > 0}
			{#each responses as response}
				<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">
					{response.delegation?.validator_address}
				</p>
			{/each}
		{:else}
			<p
				in:fade={{ duration: 600 }}
				class="font-mono font-bold text-secondary-800 dark:text-primary-600"
			>
				None
			</p>
		{/if}
	{:catch}
		<p
			in:fade={{ duration: 600 }}
			class="font-mono font-bold text-secondary-800 dark:text-primary-600"
		>
			Not Connected
		</p>
	{/await}
</div>
