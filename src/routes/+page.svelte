<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { SecretNetworkClient } from 'secretjs';
	import NodeDigest from '$lib/components/NodeDigest.svelte';
	import { fly } from 'svelte/transition';

	const secretjs = new SecretNetworkClient({
		url: 'https://lcd.secret.express',
		chainId: 'secret-4'
	});

	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div
		in:fly={{ x: 100, duration: 700 }}
		class="flex flex-col justify-start items-center
		 p-4 h-[98%] mx-auto space-y-4
		 sm:p-6 sm:space-y-6 sm:first:pt-8 last:pb-10"
	>
		<h2 class="font-semibold !text-3xl text-center">AMBER Token Upgrade</h2>
		<!-- <div class="p-4 space-y-2 text-center">
		<strong
			class="text-9xl uppercase tracking-widest drop-shadow-[0_25px_25px_rgba(242,176,70,0.25)] drop"
		>
			O A C
		</strong>
	</div> -->
		<!-- <NodeDigest /> -->
		<div
			class="card shadow-lg bg-surface-50 dark:bg-[#28292a] rounded-3xl
			flex flex-1 flex-col justify-start items-center
			xl:w-1/2 md:w-2/3 w-full h-full p-6 sm:p-8"
		>
			<p class="">
				AMBER is upgrading to the latest SNIP25 token standard. This upgrade introduces the ability
				to add decoys to a number of execution types.
			</p>
			<button disabled class="btn mt-16 font-bold variant-ghost-success justify-center">
				Soon
			</button>
		</div>
	</div>
{/if}

<style lang="postcss">
</style>
