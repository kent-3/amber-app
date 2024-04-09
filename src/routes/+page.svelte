<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { SecretNetworkClient } from 'secretjs';
	import NodeDigest from '$lib/components/NodeDigest.svelte';
	import { fade, fly } from 'svelte/transition';
	import { Tab, TabGroup, CodeBlock } from '@skeletonlabs/skeleton';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	const secretjs = new SecretNetworkClient({
		url: 'https://lcd.mainnet.secretsaturn.net',
		chainId: 'secret-4',
	});

	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div
		in:fly={{ x: 100, duration: 700 }}
		class="mx-auto flex h-full flex-col
		 items-center justify-start space-y-4 p-4
		 sm:space-y-6 sm:p-6 sm:first:pt-8"
	>
		<!-- <h2 class="text-center !text-3xl font-semibold">AMBER</h2> -->
		<NodeDigest />
	</div>
{/if}
