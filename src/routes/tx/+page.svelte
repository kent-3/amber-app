<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { AMBER } from '$lib/contracts';
	import { readOnlyClient, secretAddress, signingClient } from '$lib/stores';
	import { MsgWithdrawDelegatorReward } from 'secretjs';
	import { fly } from 'svelte/transition';
	import SecretSpinner from '$lib/components/SecretSpinner.svelte';

	interface Tx {
		fn: Function;
		name: string;
	}

	let queries: Tx[] = [
		{ fn: getRewards, name: 'Check Staking Rewards' },
		{ fn: claimRewards, name: 'Claim Staking Rewards' },
	];

	let loading = false;
	let response: string;

	async function getRewards() {
		loading = true;
		try {
			const r = await $readOnlyClient.query.distribution.delegationTotalRewards({
				delegator_address: $secretAddress,
			});
			response = JSON.stringify(r, null, 2);
		} catch (error) {
			console.error(error);
		}

		loading = false;
	}

	async function claimRewards() {
		loading = true;
		try {
			const { rewards: r } = await $readOnlyClient.query.distribution.delegationTotalRewards({
				delegator_address: $signingClient.address,
			});

			console.log(r);

			if (!r) {
				alert('No rewards found.');
			}

			const validators: string[] = r!.map(
				(delegationReward) => delegationReward.validator_address!
			);

			console.log(validators);

			const messages: MsgWithdrawDelegatorReward[] = [];

			for (const validator of validators) {
				const msg = new MsgWithdrawDelegatorReward({
					delegator_address: $signingClient.address,
					validator_address: validator,
				});
				messages.push(msg);
			}

			console.log(messages)

			const tx = await $signingClient.tx.broadcast(messages, {
				gasLimit: 40_000 * validators.length,
				gasPriceInFeeDenom: 0.0125,
				feeDenom: 'uscrt',
			});

		} catch (error) {
			console.error(error);
		}

		loading = false;
	}

</script>

<div
	in:fly={{ y: 200, duration: 700 }}
	class="flex flex-col gap-4 px-2 py-4 pb-12 sm:p-6 md:flex-row md:flex-wrap"
>
	<div class="card flex h-full flex-wrap gap-2 bg-surface-50 p-4 dark:bg-[#28292a] lg:flex-col">
		{#each queries as query}
			<button
				class="variant-ghost-secondary material-color-transition btn min-w-fit flex-auto text-sm font-bold"
				on:click={() => query.fn()}
			>
				{query.name}
			</button>
		{/each}
	</div>
	<div class="flex justify-center">
		{#key response}
			<span in:fly={{ y: 200, duration: 700, delay: 200 }}>
				<CodeBlock language="json" code={response} />
			</span>
		{/key}
	</div>
	{#if loading}
		<SecretSpinner />
	{/if}
</div>
