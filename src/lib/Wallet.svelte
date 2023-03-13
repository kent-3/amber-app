<script lang="ts" type="module">
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { setupKeplr, getKeplrViewingKey, disconnectKeplr } from '$lib/keplr'
	import { chains } from '$lib/config'
    import { AMBER } from '$lib/contracts'
	import { type Token, tokenList } from '$lib/tokens'
	import { compactAddress } from '$lib/utils'
	import {
		resetStores,
		amberBalance,
		scrtBalance,
		isAccountAvailable,
		keplrKey,
		secretClient,
		viewingKeys,
	} from '$lib/stores'
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import amber_nugget from '$lib/images/stickers/ambernugget-half.webp'

	let popupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click
		event: 'click',
		placement: 'bottom-end',
		// Provide a matching 'data-popup' value.
		target: 'walletMenu',
		closeQuery: '.btn',
	};

	const alert: ModalSettings = {
		type: 'alert',
		title: 'Attention',
		body: 'You need at least 1 AMBER to use this app.',
		image: amber_nugget,
		buttonTextCancel: 'OK'
	};

	function triggerConfirm(): void {
		const confirm: ModalSettings = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure you wish to proceed?',
			modalClasses: 'variant-ghost-primary',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {if (r) {disconnectKeplr()}},
			// Optionally override the button text
			buttonTextCancel: 'Cancel',
			buttonTextConfirm: 'Disconnect',
		};
		modalStore.trigger(confirm);
	}

	// TODO make some kind of 'user' object that can be saved to localstorage?

	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}

	const SECRET_CHAIN_ID = chains['Secret Network'].chain_id

	onMount(() => {
		window.addEventListener('keplr_keystorechange', async () => {
			console.log('Key store in Keplr is changed. You may need to refetch the account info.')
			await resetStores()
			await connect()
		})
		// TODO check if account is already available to update the button state
	})

	async function connect() {
		// resetStores()
		await setupKeplr()
		await getViewingKeys(tokenList)
		await getBalances()
	}

	async function getViewingKeys(tokens:Token[]) {
		for (const token of tokens) {
			const key = await getKeplrViewingKey(token.address)
			if (key != null) {
				viewingKeys.update(map => map.set(token.address, key))
			}
		}
	}
	
	async function getBalances() {
		try {
			const response = await $secretClient.query.bank.balance({
				address: $secretClient.address,
				denom: 'uscrt'
			})
			$scrtBalance = Number((response.balance?.amount as any) / 1e6).toString()
		} catch (error) {
			console.log(error)
		}
		
		try {
			const snip20Response = await $secretClient.query.snip20.getBalance({
				contract: {
					address: AMBER.address,
					code_hash: AMBER.code_hash
				},
				address: $secretClient.address,
				auth: {
					key: $viewingKeys.get(AMBER.address)
				}
			})
			$amberBalance = Number((snip20Response.balance.amount as any) / 1e6).toString()
		} catch (error) {
			console.log(`No viewing key for AMBER`)
		}
		// save this problem for later...
		// for (const token of tokenList) {
		// 	try {
		// 		const snip20Response = await $secretClient.query.snip20.getBalance({
		// 			contract: {
		// 				address: token.address,
		// 				code_hash: token.codeHash
		// 			},
		// 			address: $secretClient.address,
		// 			auth: {
		// 				key: $viewingKeys.get(token.address)
		// 			}
		// 		})
		// 		$balances.set(token.address, Number(snip20Response.balance.amount))
		// 	} catch (error) {
		// 		console.log(`No viewing key for ${token.name}`)
		// 	}
		// }
	}
</script>

<div
	class="card p-4 w-64 shadow-2xl rounded-2xl"
	data-popup="walletMenu"
>
	<div class="text-center space-y-4">
		<p class="text-center font-extrabold drop-shadow-md">
			[ {$keplrKey.name} ]
		</p>
		<hr class="!border-t-2" />
		<p class="font-bold font-mono text-primary-500">{$scrtBalance} SCRT<br/>{$amberBalance} AMBER</p>
		<!-- <p class="font-bold font-mono text-primary-500">{$amberBalance} AMBER</p> -->
		<button
			on:click={()=>triggerConfirm()}
			on:keypress={()=>triggerConfirm()}
			class="btn btn-sm px-8 variant-ghost-primary"
		>
			Disconnect
		</button>
	</div>
	<!-- Append the arrow element -->
	<!-- <div class="arrow bg-surface-800" /> -->
</div>

<div class="flex flex-row-reverse flex-nowrap md:gap-4 items-center">
	<!-- Alternate method for different button states -->
	<!-- <button 
		class="{$isAccountAvailable == true ? 'btn variant-ghost-secondary' : 'btn variant-ghost-primary'}"
		on:click={() => connect()}
	>
		{$isAccountAvailable == false ? 'Connect Wallet' : compactAddress($keplrKey.bech32Address)}
	</button> -->
	{#if $isAccountAvailable}
		<button 
			class="btn variant-ghost-secondary"
			use:popup={popupSettings}
		>
			{compactAddress($keplrKey.bech32Address)}
		</button>
	{:else}
		<button 
			class="btn variant-ghost-primary"
			on:click={() => connect()}
			on:click={() => modalStore.trigger(alert)}
		>
			Connect
		</button>
	{/if}
	{#if $keplrKey.name != ""}
		<div in:fade class="hidden lg:block text-secondary-400 font-bold ease-in duration-500">
			[ {$keplrKey.name} ]
		</div>
	{/if}
</div>
