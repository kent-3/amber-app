<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { AMBER } from '$lib/contracts';
	import { signingClient, isAccountAvailable } from '$lib/stores';
	import { getKeplrViewingKey, setKeplrViewingKey } from '$lib/wallets';
	import amber_pope from '$lib/images/stickers/amber-pope.webp';
	import amber_nugget from '$lib/images/stickers/ambernugget.webp';

	let ready = false;
	let success = false;
	let fail = false;
	onMount(() => (ready = true));

	async function getCode(): Promise<string> {
		success = false;
		fail = false;

		const viewingKey = await getKeplrViewingKey(AMBER.address);

		if (viewingKey === null) {
			fail = true;
			throw 'No viewing key for AMBER';
		}

		try {
			const response = await $signingClient.query.compute.queryContract({
				contract_address: AMBER.address,
				code_hash: AMBER.code_hash,
				query: {
					member_code: {
						address: $signingClient.address,
						key: viewingKey,
					},
				},
			});

			const code = response.member_code?.code;
    	const errorMessage = response.viewing_key_error?.msg

    	if (errorMessage) {
			  fail = true;
      	return errorMessage
    	} else if (code) {
    		success = true;
				return code;
    	} else {
			  fail = true;
    		return JSON.stringify(response)
    	}

		} catch (error) {
			fail = true;
			throw error.message;
		}
	}

</script>

{#if ready}
	<div
		in:fade={{ duration: 500 }}
		class="mx-auto flex h-full flex-col
		 items-center justify-start space-y-8 p-4
		 first:pt-8 "
	>
		<h2 class="text-center !text-3xl font-semibold">OAC Member Code</h2>
		{#if $isAccountAvailable}
			{#await getCode() then response}
				<h2 class="text-center !text-4xl font-semibold">{response}</h2>
				{#if response === 'Wrong viewing key for this address or viewing key not set'}
					<button
						on:click={() => setKeplrViewingKey(AMBER.address) }
						class="btn variant-ghost-primary w-48">Set Viewing Key</button>
					<button
							on:click={getCode}
							class="btn variant-ghost-secondary w-48">Retry</button>
				{/if}
			{:catch error}
				<p
					class="max-w-lg text-center font-mono font-bold text-secondary-800 dark:text-primary-600"
				>
					{error}
				</p>
				{#if error === 'No viewing key for AMBER'}
					<button
						on:click={() => setKeplrViewingKey(AMBER.address) }
						class="btn variant-ghost-primary w-48">Set Viewing Key</button>
				{/if}
				<button
						on:click={getCode}
						class="btn variant-ghost-secondary w-48">Retry</button>
			{/await}
		{:else}
			<p class="font-mono font-bold text-secondary-800 dark:text-primary-600">connect a wallet</p>
		{/if}
	</div>
	{#if success}
		<div
			in:fly={{ y: 400, duration: 4000 }}
			class="absolute bottom-0 sm:max-w-md sm:left-0 sm:ml-8 -z-50"
		>
			<img class="brightness-85" src={amber_pope} alt="amber_pope"/>
		</div>
	{:else if fail}
		<div
			in:fly={{ y: 400, duration: 4000 }}
			class="absolute bottom-0 w-full sm:max-w-sm sm:right-0 sm:mr-8 -z-50"
		>
			<img class="brightness-85" src={amber_nugget} alt="amber_nugget"/>
		</div>
	{/if}
{/if}
