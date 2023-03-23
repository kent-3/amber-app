<script lang="ts">
    import { CodeBlock } from '@skeletonlabs/skeleton';
    import { AMBER } from '$lib/contracts'
    import { apiUrl, secretClient } from '$lib/stores'
	import { onMount } from 'svelte';
	import { SecretNetworkClient } from 'secretjs';
	import type { ConfigResponse } from 'secretjs/dist/grpc_gateway/cosmos/base/node/v1beta1/query.pb';

    let response: string

    async function checkCommunityPool() {
        const r = await $secretClient.query.distribution.communityPool({})
        response = JSON.stringify(r.pool, null, 2)
        // response = Number( (pool![1].amount as any) / 1e6 ).toString()
    }

    async function getLatestBlock() {
        try {
            const r = await $secretClient.query.tendermint.getLatestBlock({})
            console.log(r.block?.header?.time)
            response = JSON.stringify(r.block?.header, null, 2)

        } catch (error) {
            console.error(error)
        }
    }

    interface TokenConfigResponse {
        public_total_supply: boolean,
        deposit_enabled: boolean,
        redeem_enabled: boolean,
        mint_enabled: boolean,
        burn_enabled: boolean,
        supported_denoms: string[],
    }

    async function getContractInfo() {
        const r1 = await $secretClient.query.compute.contractInfo({contract_address: AMBER.address})
        const r2 = await $secretClient.query.snip20.getSnip20Params({
            contract: {
                address: AMBER.address,
                code_hash: AMBER.code_hash,
            }})
        const r3 = await $secretClient.query.snip20.queryContract({
                contract_address: AMBER.address,
                code_hash: AMBER.code_hash,
                query: { token_config: {}}
            }) as TokenConfigResponse
        response = JSON.stringify(r1, null, 2) + ",\n" + JSON.stringify(r2, null, 2) + ",\n" + JSON.stringify(r3, null, 2)
    }

    const balanceFormat = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
    }).format;

    const refreshNodeStatus = async (
            querySecretjs: SecretNetworkClient,
            showLoading: boolean
        ) => {
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
                console.log(blockHeight)

                let gasPrice: string | undefined;
                if (minimum_gas_price) {
                    gasPrice = minimum_gas_price.replace(/0*([a-z]+)$/, "$1");
                }

                const blockTimeAgo = Math.floor(
                    (Date.now() - Date.parse(block?.header?.time as string)) / 1000
                );
                let blockTimeAgoString = `${blockTimeAgo}s ago`;
                if (blockTimeAgo <= 0) {
                    blockTimeAgoString = "now";
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

	onMount(()=> {
		const interval = setInterval(() => {

        const secretjs = new SecretNetworkClient({
            url: $apiUrl,
            chainId: ""
        })
        
        refreshNodeStatus(secretjs, false);

		}, 10000);

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval);
	})
</script>

<div class="container h-full flex flex-col sm:flex-row gap-4 p-4 sm:p-6 sm:items-start">
    <div class="card dark:bg-surface-900 flex flex-col p-4 space-y-2 text-left">
        <button 
            class="btn hover:bg-secondary-100-800-token dark:bg-[#28292a] material-color-transition"
            on:click={()=>getLatestBlock()}
        >
            Latest Block Info
        </button>
        <button 
            class="btn hover:bg-secondary-100-800-token dark:bg-[#28292a] transition-colors duration-300 ease-material-color"
            on:click={()=>checkCommunityPool()}
        >
            Community Pool Funds
        </button>
        <button 
            class="btn hover:bg-secondary-100-800-token dark:bg-[#28292a] transition-colors duration-300 ease-material-color"
            on:click={()=>getContractInfo()}
        >
            Amber Contract Info
    </button>
    </div>
    <CodeBlock language="json" code={response}></CodeBlock>
</div>
