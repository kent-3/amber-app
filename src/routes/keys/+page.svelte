<script lang="ts">
	import { clipboard, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { Token, SecretAddress } from '$lib/tokens';
	import { setKeplrViewingKey } from '$lib/wallets/keplr';
	import { tokenStore, viewingKeys, secretClient, secretAddress } from '$lib/stores';
	import { fly } from 'svelte/transition';

	// export let data: PageData;
	// console.log(data.test)

	let popupSettings: PopupSettings = {
		event: 'hover',
		placement: 'top-end',
		// Provide a matching 'data-popup' value.
		target: 'examplePopup'
	};

	let metamask = true;

	let tokens: Token[];
	tokenStore.subscribe((value) => {
		if (value) {
			tokens = [...value].map(([address, token]) => token) as Token[];
		} else tokens;
	});
</script>

<div
	in:fly={{ x: 100, duration: 500 }}
	class="container h-full flex gap-4 px-2 py-4 sm:p-6 items-start"
>
	<div class="card bg-surface-50 dark:!bg-[#28292a] p-4 space-y-2 text-left w-full sm:w-96">
		<h2 class="font-bold">Viewing Keys</h2>
		<div class="card variant-filled-primary text-sm px-1" data-popup="examplePopup">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path
					fill-rule="evenodd"
					d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
					clip-rule="evenodd"
				/>
				<path
					fill-rule="evenodd"
					d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
					clip-rule="evenodd"
				/>
			</svg>
			<!-- Append the arrow element -->
			<!-- <div class="arrow variant-filled-primary" /> -->
		</div>
		<div class="grid gap-2 items-center grid-cols-[5rem_minmax(0,_2fr)]">
			{#key viewingKeys}
				{#each tokens as token}
					{#if $viewingKeys.has(token.address)}
						<p class="font-medium">
							{token.symbol}:
						</p>
						<button
							class="btn p-0 text-surface-400 font-medium"
							use:clipboard={{ element: 'exampleElement' }}
						>
							<span>
								{$viewingKeys.get(token.address)?.slice(0, 12) +
									'...' +
									$viewingKeys.get(token.address)?.substring(52)}
							</span>
							<span class="hidden" data-clipboard="exampleElement">
								{$viewingKeys.get(token.address)}
							</span>
						</button>
					{:else}
						<!-- TODO work out better solution for this since metamask doesn't truly disconnect -->
						<!-- {#if metamask}
						<p>
							{token.symbol}: 
							<button class="btn p-0 px-2 variant-filled-secondary rounded-md" on:click={() => setMetamaskViewingKey(token.address)}>
								Create Viewing Key
							</button>
						</p> -->
						<!-- {:else} -->
						<p class="font-medium">
							{token.symbol}:
						</p>
						<button
							class="btn w-max p-1 px-4 rounded-full hover:bg-secondary-100-800-token bg-surface-200-700-token material-color-transition"
							on:click={() => setKeplrViewingKey(token.address)}
						>
							Create Viewing Key
						</button>
						<!-- {/if} -->
					{/if}
				{/each}
			{/key}
		</div>
	</div>
</div>
