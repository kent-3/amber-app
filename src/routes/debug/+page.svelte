<script lang="ts">
	import { apiUrl, secretClient } from '$lib/stores';
	import { SecretNetworkClient } from 'secretjs';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	const balanceFormat = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 6
	}).format;

	const refreshNodeStatus = async (querySecretjs: SecretNetworkClient, showLoading: boolean) => {
		try {
			const { block } = await querySecretjs.query.tendermint.getLatestBlock({});
			let minimum_gas_price: string | undefined;
			try {
				({ minimum_gas_price } = await querySecretjs.query.node.config({}));
			} catch (error) {
				// Bug on most chains - this endpoint isn't connected
			}

			// const { params } = await querySecretjs.query.staking.params({});
			// setDenom(params!.bond_denom!);

			const chainId = block?.header?.chain_id!;
			// setChainId(chainId);

			const blockHeight = balanceFormat(Number(block?.header?.height));
			console.log(blockHeight);

			let gasPrice: string | undefined;
			if (minimum_gas_price) {
				gasPrice = minimum_gas_price.replace(/0*([a-z]+)$/, '$1');
			}

			const blockTimeAgo = Math.floor(
				(Date.now() - Date.parse(block?.header?.time as string)) / 1000
			);
			let blockTimeAgoString = `${blockTimeAgo}s ago`;
			if (blockTimeAgo <= 0) {
				blockTimeAgoString = 'now';
			}
		} catch (error) {
			let errorMessage: string;
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = JSON.stringify(error);
			}
		}
	};

	onMount(() => {
		const interval = setInterval(() => {
			const secretjs = new SecretNetworkClient({
				url: $apiUrl,
				chainId: ''
			});

			refreshNodeStatus(secretjs, false);
		}, 10000);

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval);
	});

	const tableArr = [
		{ key: 'Endpoint', value: $apiUrl },
		{ key: 'Connected Address', value: $secretClient.address },
		{ key: 'tbd', value: '0' }
	];
</script>

<div
	in:fly={{ duration: 500, x: -500 }}
	class="flex flex-col p-4 sm:p-6 w-full h-full mx-auto justify-start items-start space-y-4 sm:space-y-6"
>
	<div
		class="card w-[70%] flex flex-col justify-start items-start rounded-3xl variant-soft p-4 space-y-6"
	>
		<!-- Responsive Container (recommended) -->
		<div class="table-container font-mono font-semibold">
			<!-- Native Table Element -->
			<table class="table">
				<thead>
					<tr>
						<th colspan="2">The table header</th>
					</tr>
				</thead>
				<tbody>
					{#each tableArr as row, i}
						<tr>
							<td>{row.key}</td>
							<td>{row.value}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
