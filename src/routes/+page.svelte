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
		url: 'https://lcd.secret.express',
		chainId: 'secret-4',
	});

	let setKeyPopup: PopupSettings = {
		event: 'hover',
		placement: 'bottom',
		// Provide a matching 'data-popup' value.
		target: 'setKey',
	};

	let refreshPopup: PopupSettings = {
		event: 'hover',
		placement: 'bottom',
		// Provide a matching 'data-popup' value.
		target: 'refreshBalance',
	};

	const oldContractInfo = JSON.stringify(
		{
			contract_address: 'secret1s09x2xvfd2lp2skgzm29w2xtena7s8fq98v852',
			code_id: 563,
			code_hash: '5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042',
			label: 'amber-24',
		},
		null,
		2
	);

	const newContractInfo = JSON.stringify(
		{
			contract_address: 'TBD',
			code_id: 'TBD',
			code_hash: 'TBD',
			label: 'TBD',
		},
		null,
		2
	);

	const migratorContractInfo = JSON.stringify(
		{
			contract_address: 'TBD',
			code_id: 'TBD',
			code_hash: 'TBD',
			label: 'TBD',
		},
		null,
		2
	);

	const tabSet: Writable<number> = writable(0);

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
		<h2 class="text-center !text-3xl font-semibold">AMBER Token Upgrade</h2>
		<!-- <div class="p-4 space-y-2 text-center">
		<strong
			class="text-9xl uppercase tracking-widest drop-shadow-[0_25px_25px_rgba(242,176,70,0.25)] drop"
		>
			O A C
		</strong>
	</div> -->
		<!-- <NodeDigest /> -->
		<div
			class="card flex h-full w-full flex-1
			flex-col items-center justify-between rounded-3xl bg-surface-50
			p-6 shadow-lg dark:bg-[#28292a] sm:p-8 md:w-2/3 xl:w-1/2"
		>
			<p class="">
				AMBER is upgrading to the latest SNIP25 token standard. This upgrade introduces the ability
				to add decoys to a number of execution types.
			</p>

			<div
				class="card my-4 flex w-full flex-row justify-evenly gap-4 !bg-surface-100 p-4 text-center font-medium shadow-inner text-token dark:!bg-neutral-900/90"
			>
				<div class="w-full space-x-1 space-y-2">
					<p>
						AMBER (old):
						<span class="font-mono font-bold text-secondary-900 dark:text-primary-600">
							1.000001
						</span>
					</p>
					{#if true}
						<button
							class="btn btn-sm ring-1 ring-secondary-500 dark:ring-primary-500 [&>*]:pointer-events-none"
							use:popup={setKeyPopup}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									fill-rule="evenodd"
									d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{:else}
						<button
							class="btn btn-sm ring-1 ring-secondary-500 dark:ring-primary-500 [&>*]:pointer-events-none"
							use:popup={setKeyPopup}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-6 w-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
								/>
							</svg>
						</button>
					{/if}
					<button
						class="btn btn-sm ring-1 ring-secondary-500 dark:ring-primary-500 [&>*]:pointer-events-none"
						use:popup={refreshPopup}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>

				<div class="w-full space-x-1 space-y-2">
					<p>
						AMBER (new):
						<span class="font-mono font-bold text-secondary-900 dark:text-primary-600">
							1.000001
						</span>
					</p>
					<button
						class="btn btn-sm animate-pulse ring-1 ring-secondary-500 dark:ring-primary-500 [&>*]:pointer-events-none"
						use:popup={setKeyPopup}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
							/>
						</svg>
					</button>

					<button
						class="btn btn-sm ring-1 ring-secondary-500 dark:ring-primary-500 [&>*]:pointer-events-none"
						use:popup={refreshPopup}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>
			</div>
			<button class="variant-ghost-success btn w-full rounded-2xl py-4 text-2xl font-bold">
				Migrate
			</button>
			<div class="mt-3 self-start">
				<TabGroup
					regionList="dark:text-primary-500 text-secondary-900"
					active="border-b-2 dark:border-primary-500 border-secondary-900"
				>
					<Tab bind:group={$tabSet} name="tab1" value={0}>Old</Tab>
					<Tab bind:group={$tabSet} name="tab2" value={1}>New</Tab>
					<Tab bind:group={$tabSet} name="tab3" value={2}>Migrator</Tab>
					<!-- Tab Panels --->
					<svelte:fragment slot="panel">
						{#if $tabSet === 0}
							<CodeBlock language="json" code={oldContractInfo} text="text-xs" />
						{:else if $tabSet === 1}
							<CodeBlock language="json" code={newContractInfo} text="text-xs" />
						{:else if $tabSet === 2}
							<CodeBlock language="json" code={migratorContractInfo} text="text-xs" />
						{/if}
					</svelte:fragment>
				</TabGroup>
			</div>
		</div>
	</div>
{/if}
<div class="card variant-filled-surface rounded-lg px-2 py-1 text-sm shadow-md" data-popup="setKey">
	<p>Set New Viewing Key?</p>
	<div class="arrow variant-filled-surface" />
</div>
<div
	class="card variant-filled-surface rounded-lg px-2 py-1 text-sm shadow-md"
	data-popup="refreshBalance"
>
	<p>Refresh Balance</p>
	<div class="arrow variant-filled-surface" />
</div>

<style lang="postcss">
</style>
