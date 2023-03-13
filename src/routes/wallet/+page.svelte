<script lang="ts">
    import { base } from '$app/paths'
    import { blur, draw } from 'svelte/transition'
	import { onMount } from 'svelte'
	import type { SecretAddress, Token } from '$lib/tokens'
	import { tokenList } from '$lib/tokens'
	import {
		amberBalance,
		scrtBalance,
		isAccountAvailable,
		keplrKey,
		secretClient,
		secretAddress,
		tokenStore,
		viewingKeys,
		balances
	} from '$lib/stores'

    let tokens: Token[]
	tokenStore.subscribe((value) => {
		if (value) {
			tokens = [...value].map(([address, token]) => token) as Token[]
		} else tokens
	})

    async function getDelegations() {
        const { delegation_responses } = await $secretClient.query.staking.delegatorDelegations({delegator_addr: $secretAddress})
        console.log(delegation_responses)
    }

</script>

<div class="container h-full mx-auto sm:mx-0 flex flex-col gap-4 p-4 items-start">
    <div class="card variant-glass-surface p-4 space-y-2 text-left w-full sm:w-72">
		<h2 class="font-bold">Balances</h2>
		<p class="font-bold font-mono text-primary-600">{$scrtBalance} SCRT</p>
		<p class="font-bold font-mono text-primary-600">{$amberBalance} AMBER</p>
	</div>
    <div class="card variant-glass-surface p-4 space-y-2 text-left w-full sm:w-72">
		<h2 class="font-bold">Delegations</h2>
        <p class="font-bold font-mono text-primary-600">TODO</p>
	</div>
</div>