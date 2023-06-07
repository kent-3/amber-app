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
		class="flex flex-col p-4 sm:p-6 h-full mx-auto justify-start items-center space-y-4 sm:space-y-6 sm:first:pt-8"
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
			class="card flex flex-1 flex-col justify-start rounded-3xl variant-ghost-surface xl:w-1/2 md:w-2/3 w-full h-full p-6 sm:p-8 items-center space-y-6"
		>
			<p>
				AMBER is upgrading to the latest SNIP25 token standard. This upgrade introduces the ability
				to add decoys to a number of execution types.
			</p>
			<button class="btn variant-ghost-success justify-center">
				Click Me
			</button>
		</div>
	</div>
{/if}

<style lang="postcss">
</style>
