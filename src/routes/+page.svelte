<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { SecretNetworkClient } from 'secretjs';
	import axios from "axios";

	const secretjs = new SecretNetworkClient({
		url: "https://lcd.secret.express",
		chainId: "secret-4"
	});

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0
	});
    
	let stakeValue: string
	let votingPower: string
	let delegators: string
	let commission: string

	onMount( async ()=> {
		const validatorResponse = await secretjs.query.staking.validator({validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6'})
		commission = (parseFloat(validatorResponse.validator?.commission?.commission_rates?.rate ?? "0.03")	 * 100).toString() + "%"
		const scrt = Math.round(parseInt(validatorResponse.validator?.tokens ?? "500000") / 1000000 )
		votingPower = scrt.toLocaleString()
		const scrtPrice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=secret&vs_currencies=usd')
		stakeValue = formatter.format(scrt * scrtPrice.data.secret.usd)
		const validatorDelegationsResponse = await secretjs.query.staking.validatorDelegations({validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6', pagination: {limit:'1', count_total: true}})
		delegators = parseInt(validatorDelegationsResponse.pagination?.total ?? "1925").toLocaleString()
		// delegators = "1920"
	})
    // export let data: PageData;
</script>

<div class="container h-full flex p-4 sm:p-6 items-start justify-center sm:justify-start">
	<!-- {#if $isAccountAvailable == true}
		<div class="card variant-ghost-primary p-4 space-y-2 text-center">
			<h2 class="font-bold"> You have {$amberBalance} AMBER </h2>
		</div>
	{:else}
		<div class="p-4 space-y-2 text-center">
			<strong class="text-9xl uppercase tracking-widest drop-shadow-[0_25px_25px_rgba(242,176,70,0.25)] drop"> O A C </strong>
		</div>
	{/if} -->
	<div id="node-digest" class="flex flex-col w-full sm:w-auto md:flex-row justify-start space-x-8 space-y-4 md:space-y-0">
		<div id="node-digest-container" class="card shadow-xl p-4">
		  <h2><strong>AmberDAO Node Digest</strong></h2>
		  <div class="node-digest-item">
			<div class="dark:text-neutral-500 w-40 h-5">Current Stake Value</div>
			<div class="node-digest-value text-base">{stakeValue ?? "loading..."} <span class="text-secondary-700 dark:text-primary-500">USD</span></div>
		  </div>
  
		  <div class="node-digest-item">
			<div class="dark:text-neutral-500 w-40 h-5">Voting Power</div>
			<div class="node-digest-value">{votingPower ?? "loading..."} <span class="text-secondary-700 dark:text-primary-500">SCRT</span></div>
		  </div>
  
		  <div class="node-digest-item">
			<div class="dark:text-neutral-500 w-40 h-5">Delegators</div>
			<div class="node-digest-value">{delegators ?? "loading..."}</div>
		  </div>
  
		  <div class="node-digest-item">
			<div class="dark:text-neutral-500 w-40 h-5">Commission</div>
			<div class="node-digest-value">{commission ?? "loading..."}</div>
		  </div>
		</div>
		<!-- <div id="rocket" class="absolute right-10 hidden lg:block translate-y-8">
		  <img src="{illustration}" alt="" class="">
		</div> -->
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
		@apply space-x-8 flex flex-row items-center justify-center
	}
	
	.node-digest-value {
		@apply text-center font-semibold text-lg
	}

</style>