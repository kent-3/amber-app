<script lang="ts">
    import { CodeBlock } from '@skeletonlabs/skeleton';
    import { AMBER } from '$lib/contracts'
    import { secretClient } from '$lib/stores'

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
</script>

<div class="container h-full flex flex-col sm:flex-row gap-4 p-4 sm:items-start">
    <div class="card variant-ghost-surface flex flex-col p-4 space-y-2 text-left">
        <button 
            class="btn variant-filled-secondary"
            on:click={()=>getLatestBlock()}
        >
            Latest Block Info
        </button>
        <button 
            class="btn variant-filled-secondary"
            on:click={()=>checkCommunityPool()}
        >
            Community Pool Funds
        </button>
        <button 
            class="btn variant-filled-secondary"
            on:click={()=>getContractInfo()}
        >
            Amber Contract Info
    </button>
    </div>
    <CodeBlock language="json" code={response}></CodeBlock>
</div>