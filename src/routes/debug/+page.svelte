<script lang="ts">
	import {
		amberBalance,
		apiUrl,
		isAccountAvailable,
		scrtBalance,
		secretAddress,
		secretClient,
		viewingKeys,
	} from '$lib/stores';
	import { SecretNetworkClient } from 'secretjs';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import type { GetNodeInfoResponse } from 'secretjs/dist/grpc_gateway/cosmos/base/tendermint/v1beta1/query.pb';
	import { AMBER } from '$lib/contracts';
	import { tokenList, type Token } from '$lib/tokens';
	import { getKeplrViewingKey } from '$lib/wallets/keplr';

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
		maximumFractionDigits: 6,
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

	async function getBalances() {
		try {
			const response = await $secretClient.query.bank.balance({
				address: $secretAddress,
				denom: 'uscrt',
			});
			$scrtBalance = Number((response.balance?.amount as any) / 1e6)
				.toFixed(6)
				.toString();
		} catch (error) {
			console.log(error);
		}

		try {
			const snip20Response = await $secretClient.query.snip20.getBalance({
				contract: {
					address: AMBER.address,
					code_hash: AMBER.code_hash,
				},
				address: $secretAddress,
				auth: {
					key: $viewingKeys.get(AMBER.address),
				},
			});
			$amberBalance = Number((snip20Response.balance.amount as any) / 1e6).toString();
		} catch (error) {
			console.log(`No viewing key for AMBER`);
		}
	}

	async function getViewingKeys(tokens: Token[]) {
		for (const token of tokens) {
			const key = await getKeplrViewingKey(token.address);
			if (key != null) {
				viewingKeys.update((map) => map.set(token.address, key));
			}
		}
	}

	onMount(() => {
		const secretjs = new SecretNetworkClient({
			url: $apiUrl,
			chainId: '',
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
		{
			key: 'Cosmos SDK',
			value: $nodeInfo.application_version?.cosmos_sdk_version,
		},
	];

	$: tableSimple = {
		// A list of heading labels.
		head: ['Node Info'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(tableArr, ['key', 'value']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(tableArr, ['key', 'value']),
	};
</script>

<div
	in:fly={{ y: 200, duration: 700 }}
	class="flex flex-1 flex-col-reverse items-start justify-start gap-4 p-2 sm:p-6 lg:flex-row"
>
	<div
		class="sm:card flex w-full flex-1 flex-col items-start justify-start rounded-3xl !bg-surface-50 shadow-xl dark:!bg-[#28292a] sm:p-4 lg:min-w-[50%] lg:max-w-[50%]"
	>
		<Table
			source={tableSimple}
			regionHead="text-2xl"
			regionCell="!py-3 font-mono font-semibold hover:variant-soft"
		/>
	</div>
	<div class="w-full flex-col space-y-4 lg:max-w-[50%]">
		<div
			class="card flex w-full flex-wrap justify-center gap-4 bg-surface-50 p-4 shadow-xl dark:bg-[#28292a] lg:justify-normal"
		>
			<button
				disabled={!$isAccountAvailable}
				on:click={() => getBalances()}
				class="variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto">Refresh Balances</button
			>
			<button
				disabled={!$isAccountAvailable}
				on:click={() => getViewingKeys(tokenList)}
				class="variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto">Refresh Viewing Keys</button
			>
			<button
				on:click={() => getAllLocalStorageItems()}
				class="variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto"
				>Inspect Local Storage</button
			>
			<button
				on:click={() => {
					storageLocal.set([]);
					localStorage.clear();
				}}
				class="variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto">Clear Local Storage</button
			>
		</div>
		{#if $storageLocal && $storageLocal.length > 0}
			<div
				class="card justify-center gap-4 overflow-auto bg-surface-50 p-4 shadow-xl dark:bg-[#28292a] md:justify-normal"
			>
				{#each $storageLocal as item}
					<p class="font-mono text-sm">{item.key} = {item.value}</p>
				{/each}
			</div>
		{/if}
	</div>
</div>
