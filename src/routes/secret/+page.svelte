<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { AMBER } from '$lib/contracts';
	import { secretClient } from '$lib/stores';
	import { ProposalStatus, SecretNetworkClient } from 'secretjs';
	import { fly } from 'svelte/transition';
	import SecretSpinner from '$lib/components/SecretSpinner.svelte';

	interface Query {
		fn: Function;
		name: string;
	}

	let queries: Query[] = [
		{ fn: getLatestBlock, name: 'Latest Block' },
		{ fn: checkCommunityPool, name: 'Community Pool Funds' },
		{ fn: getContractInfo, name: 'Amber Contract Info' },
		{ fn: getProposals, name: 'Active Proposals' },
		// { fn: getCodes, name: 'Codes' },
		{ fn: getAllAccounts, name: 'Total Accounts' },
		{ fn: getDecoys, name: 'SHD Decoys' },
	];

	let loading = false;
	let response: string;

	async function getLatestBlock() {
		loading = true;
		try {
			const r = await $secretClient.query.tendermint.getLatestBlock({});
			console.log(r.block?.header?.time);
			response = JSON.stringify(r.block?.header, null, 2);
		} catch (error) {
			console.error(error);
		}

		loading = false;
	}

	async function checkCommunityPool() {
		loading = true;

		const r = await $secretClient.query.distribution.communityPool({});
		response = JSON.stringify(r.pool, null, 2);
		// response = Number( (pool![1].amount as any) / 1e6 ).toString()

		loading = false;
	}

	interface TokenConfigResponse {
		public_total_supply: boolean;
		deposit_enabled: boolean;
		redeem_enabled: boolean;
		mint_enabled: boolean;
		burn_enabled: boolean;
		supported_denoms: string[];
	}

	async function getContractInfo() {
		loading = true;

		const r1 = await $secretClient.query.compute.contractInfo({
			contract_address: AMBER.address,
		});
		const r2 = await $secretClient.query.snip20.getSnip20Params({
			contract: {
				address: AMBER.address,
				code_hash: AMBER.code_hash,
			},
		});
		const r3 = (await $secretClient.query.snip20.queryContract({
			contract_address: AMBER.address,
			code_hash: AMBER.code_hash,
			query: { token_config: {} },
		})) as TokenConfigResponse;
		response =
			JSON.stringify(r1, null, 2) +
			',\n' +
			JSON.stringify(r2, null, 2) +
			',\n' +
			JSON.stringify(r3, null, 2);

		loading = false;
	}

	async function getProposals() {
		loading = true;

		try {
			const { proposals } = await $secretClient.query.gov.proposals({
				proposal_status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
			});
			response = JSON.stringify(proposals, null, 2);
		} catch (error) {
			console.error(error);
		}

		loading = false;
	}

	async function getAllAccounts() {
		loading = true;

		const result = await $secretClient.query.auth.accounts({
			pagination: { count_total: true, limit: '30' },
		});
		response = JSON.stringify({ total: result.pagination?.total }, null, 2);

		loading = false;
	}

	// async function getCodes() {
	// 	loading = true;

	// 	try {
	// 		const { code_infos } = await $secretClient.query.compute.codes({});
	// 		response = JSON.stringify(code_infos, null, 2);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}

	// 	loading = false;
	// }

	async function getDecoys() {
		loading = true;

		try {
			const resp = await $secretClient.query.txsQuery(
				"wasm.contract_address = 'secret153wu605vvp934xhd4k9dtd640zsep5jkesstdm'"
			);
			let decoys = resp
				.map((response) => response.arrayLog?.find((response) => response.key === 'sender')?.value)
				.filter((address) => address?.startsWith('secret1'));

			// Remove duplicates
			decoys = [...new Set(decoys)];

			// Fisher-Yates (Knuth) shuffle
			for (let i = decoys.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[decoys[i], decoys[j]] = [decoys[j], decoys[i]];
			}

			// Get the first 10 elements
			const selectedObjects = decoys.slice(0, 10);

			response = JSON.stringify(selectedObjects, null, 2);
		} catch (error) {
			console.error(error);
		}

		loading = false;
	}

	async function getContractsByCodeId() {
		try {
			const { contract_infos } = await $secretClient.query.compute.contractsByCodeId({
				code_id: '877',
			});
			response = JSON.stringify(contract_infos, null, 2);
		} catch (error) {
			console.error(error);
		}
	}

	const balanceFormat = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 6,
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

	// onMount(() => {
	// 	const interval = setInterval(() => {
	// 		const secretjs = new SecretNetworkClient({
	// 			url: $apiUrl,
	// 			chainId: ''
	// 		});

	// 		refreshNodeStatus(secretjs, false);
	// 	}, 10000);

	// 	// Clean up the interval when the component unmounts
	// 	return () => clearInterval(interval);
	// });
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
