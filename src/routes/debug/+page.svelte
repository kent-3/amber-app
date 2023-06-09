<script lang="ts">
	import { apiUrl, secretClient } from '$lib/stores';
	import { SecretNetworkClient } from 'secretjs';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { Table, tableMapperValues, type ModalSettings, modalStore } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import type { ConfigResponse } from 'secretjs/dist/grpc_gateway/cosmos/base/node/v1beta1/query.pb';
	import type { GetNodeInfoResponse } from 'secretjs/dist/grpc_gateway/cosmos/base/tendermint/v1beta1/query.pb';

	const storageLocal: Writable<{ key: string | null; value: string | null }[]> = writable();
	function getAllLocalStorageItems() {
		const items = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			const value = localStorage.getItem(key!);
			items.push({ key, value });
		}
		$storageLocal = items;

		// const alert: ModalSettings = {
		// 	type: 'alert',
		// 	title: 'Local Storage',
		// 	body: `hmmm`,
		// 	buttonTextCancel: 'OK',
		// 	modalClasses: '!w-modal-slim',
		// 	backdropClasses: ''
		// };
		// modalStore.trigger(alert);
	}

	const balanceFormat = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 6
	}).format;

	const blockHeight: Writable<string> = writable('0');
	const gasPrice: Writable<string | undefined> = writable('');
	const nodeInfo: Writable<GetNodeInfoResponse> = writable({});
	const chainId: Writable<string | undefined> = writable('');

	const refreshNodeStatus = async (querySecretjs: SecretNetworkClient, showLoading: boolean) => {
		try {
			const { block } = await querySecretjs.query.tendermint.getLatestBlock({});
			let minimum_gas_price: string | undefined;
			try {
				({ minimum_gas_price } = await querySecretjs.query.node.config({}));
			} catch (error) {
				// Bug on most chains - this endpoint isn't connected
			}

			$nodeInfo = await querySecretjs.query.tendermint.getNodeInfo({});
			// $minimumGasPrice = parseFloat(minimum_gas_price!.substring(0, 6))
			// 	.toPrecision(3)
			// 	.toString() + " uscrt";
			$chainId = block?.header?.chain_id!;
			$blockHeight = balanceFormat(Number(block?.header?.height));

			// let gasPrice: string | undefined;
			if (minimum_gas_price) {
				$gasPrice = minimum_gas_price.replace(/0*([a-z]+)$/, '$1');
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
		const secretjs = new SecretNetworkClient({
			url: $apiUrl,
			chainId: ''
		});
		refreshNodeStatus(secretjs, false);

		const interval = setInterval(() => {
			refreshNodeStatus(secretjs, false);
		}, 30000);

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval);
	});

	$: tableArr = [
		{ key: 'Endpoint', value: $apiUrl },
		{ key: 'Chain ID', value: $chainId },
		{ key: 'Block', value: $blockHeight },
		{ key: 'Node Moniker', value: $nodeInfo.default_node_info?.moniker },
		{ key: 'Min Gas Price', value: $gasPrice },
		{ key: 'secretd', value: $nodeInfo.application_version?.version },
		{ key: 'Cosmos SDK', value: $nodeInfo.application_version?.cosmos_sdk_version }
	];

	$: tableSimple = {
		// A list of heading labels.
		head: ['Node Info'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(tableArr, ['key', 'value']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(tableArr, ['key', 'value'])
	};
</script>

<div
	in:fly={{ y: 200, duration: 700 }}
	class="flex flex-col-reverse md:flex-row flex-auto p-2 sm:p-6 mx-auto justify-start items-start gap-4"
>
	<div
		class="sm:card !bg-surface-50 dark:!bg-[#28292a] shadow-xl rounded-3xl sm:p-4
			flex flex-col flex-auto justify-start items-start
			md:min-w-fit md:max-w-[50%] w-full"
	>
		<Table
			source={tableSimple}
			regionHead="text-2xl"
			regionCell="!py-3 font-mono font-semibold hover:variant-soft"
		/>
	</div>
	<div class="flex-col space-y-4">
		<div
			class="card bg-surface-50 dark:bg-[#28292a] shadow-xl flex flex-wrap w-full md:justify-normal justify-center p-4 gap-4"
		>
			<button disabled class="btn btn-sm variant-ghost-tertiary flex-auto min-w-[33%]"
				>Refresh Balances</button
			>
			<button disabled class="btn btn-sm variant-ghost-tertiary flex-auto min-w-[33%]"
				>Refresh Viewing Keys</button
			>
			<button
				on:click={() => getAllLocalStorageItems()}
				class="btn btn-sm variant-ghost-tertiary flex-auto min-w-[33%]"
				>Inspect Local Storage</button
			>
			<button
				on:click={() => {storageLocal.set([]); localStorage.clear()}}
				class="btn btn-sm variant-ghost-tertiary flex-auto min-w-[33%]">Clear Local Storage</button
			>
		</div>
		{#if $storageLocal && $storageLocal.length > 0}
			<div
				class="card bg-surface-50 dark:bg-[#28292a] shadow-xl md:justify-normal justify-center p-4 gap-4"
			>
				{#each $storageLocal as item}
					<p class="font-mono text-sm">{item.key} = {item.value}</p>
				{/each}
			</div>
		{/if}
	</div>
</div>
