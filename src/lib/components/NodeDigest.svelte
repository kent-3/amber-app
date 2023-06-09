<script lang="ts">
	import { onMount } from 'svelte';
	import { SecretNetworkClient } from 'secretjs';
	import axios from 'axios';

	const secretjs = new SecretNetworkClient({
		url: 'https://lcd.secret.express',
		chainId: 'secret-4',
	});

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	});

	let stakeValue: string;
	let votingPower: string;
	let delegators: string;
	let commission: string;

	onMount(async () => {
		const validatorResponse = await secretjs.query.staking.validator({
			validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6',
		});
		commission =
			(
				parseFloat(validatorResponse.validator?.commission?.commission_rates?.rate ?? '0.03') * 100
			).toString() + '%';
		const scrt = Math.round(parseInt(validatorResponse.validator?.tokens ?? '500000') / 1000000);
		votingPower = scrt.toLocaleString();
		const scrtPrice = await axios.get(
			'https://api.coingecko.com/api/v3/simple/price?ids=secret&vs_currencies=usd'
		);
		stakeValue = formatter.format(scrt * scrtPrice.data.secret.usd);
		const validatorDelegationsResponse = await secretjs.query.staking.validatorDelegations({
			validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6',
			pagination: { limit: '1', count_total: true },
		});
		delegators = parseInt(
			validatorDelegationsResponse.pagination?.total ?? '1840'
		).toLocaleString();
		// delegators = "1840"
	});
</script>

<div
	id="node-digest"
	class="flex w-full flex-col justify-start space-x-8 space-y-4 sm:w-auto md:flex-row md:space-y-0"
>
	<div
		id="node-digest-container"
		class="card bg-surface-50 p-4 shadow-xl dark:!bg-[#28292a] sm:w-96"
	>
		<h2><strong>AmberDAO Node Digest</strong></h2>
		<div class="node-digest-item items-center">
			<div class="h-5 w-40 font-medium dark:text-neutral-400">Current Stake Value</div>
			<div class="node-digest-value text-base">
				{stakeValue ?? 'loading...'}
				<span class="font-bold text-secondary-700 dark:text-primary-500">USD</span>
			</div>
		</div>
		<div class="node-digest-item">
			<div class="h-5 w-40 font-medium dark:text-neutral-400">Voting Power</div>
			<div class="node-digest-value">
				{votingPower ?? 'loading...'}
				<span class="font-bold text-secondary-700 dark:text-primary-500">SCRT</span>
			</div>
		</div>
		<div class="node-digest-item">
			<div class="h-5 w-40 font-medium dark:text-neutral-400">Delegators</div>
			<div class="node-digest-value">{delegators ?? 'loading...'}</div>
		</div>
		<div class="node-digest-item">
			<div class="h-5 w-40 font-medium dark:text-neutral-400">Commission</div>
			<div class="node-digest-value">{commission ?? 'loading...'}</div>
		</div>
	</div>
</div>

<style lang="postcss">
	#node-digest-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		/* width: 595px; */
		height: 294px;
	}
	.node-digest-item {
		@apply flex flex-row items-center justify-center space-x-8;
	}

	.node-digest-value {
		@apply text-center text-lg font-semibold;
	}
</style>
