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
		const scrtPrice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=secret&vs_currencies=usd')
		const validatorResponse = await secretjs.query.staking.validator({validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6'})
		const validatorDelegationsResponse = await secretjs.query.staking.validatorDelegations({validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6', pagination: {limit:'1', count_total: true}})
		const scrt = Math.round(parseInt(validatorResponse.validator?.tokens ?? "0") / 1000000 )
		stakeValue = formatter.format(scrt * scrtPrice.data.secret.usd),
		votingPower = Math.round(parseInt(validatorResponse.validator?.tokens ?? "0") / 1000000).toLocaleString(),
		delegators = parseInt(validatorDelegationsResponse.pagination?.total ?? "0").toLocaleString(),
		commission = (parseFloat(validatorResponse.validator?.commission?.commission_rates?.rate ?? "0.03")	 * 100).toString() + "%"
	})
    // export let data: PageData;
</script>

<div class="container h-full flex p-4 sm:justify-start justify-center items-start">
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
		<div id="node-digest-container" class="card variant-glass-surface p-4">
		  <h2><strong>AmberDAO Node Digest</strong></h2>
		  <div class="node-digest-item">
			<div class="node-digest-key">Current Stake Value</div>
			<div class="node-digest-value text-base">{stakeValue ?? "loading..."} <span class="text-primary-500">USD</span></div>
		  </div>
  
		  <div class="node-digest-item">
			<div class="node-digest-key">Voting Power</div>
			<div class="node-digest-value">{votingPower ?? "loading..."} <span class="text-primary-500">SCRT</span></div>
		  </div>
  
		  <div class="node-digest-item">
			<div class="node-digest-key">Delegators</div>
			<div class="node-digest-value">{delegators ?? "loading..."}</div>
		  </div>
  
		  <div class="node-digest-item">
			<div class="node-digest-key">Commission</div>
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
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	/* gap: 88px; */
	@apply space-x-8
	}
	.node-digest-key {
		@apply text-neutral-400 font-normal;
	width: 160px;
	height: 20px;
	/* color: rgba(255, 255, 255, 0.54); */
	/* font-family: Montserrat, Helvetica, Arial, sans-serif; */
	/* font-size: 16px; */
	line-height: 20px;
	}
	.node-digest-value {
	text-align:center;
	color: #FEFFFF;
	font-weight: 600;
	font-size: 18px;
	}

</style>