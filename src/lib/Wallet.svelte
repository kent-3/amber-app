<script lang="ts" type="module">
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { setupKeplr, getKeplrViewingKey, disconnectKeplr } from '$lib/keplr'
	import { disconnectMetamask, setupMetamask } from '$lib/metamask'
	import { connectLedger, getLedgerAddress } from '$lib/ledger'
	import { chains } from '$lib/config'
    import { AMBER } from '$lib/contracts'
	import { type Token, tokenList, type SecretAddress } from '$lib/tokens'
	import { compactAddress } from '$lib/utils'
	import {
		resetStores,
		amberBalance,
		scrtBalance,
		isAccountAvailable,
		keplrKey,
		secretAddress,
		secretClient,
		viewingKeys,
	} from '$lib/stores'
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import amber_pope from '$lib/images/stickers/amber-pope.webp'
	import createLogo from '@metamask/logo'

	// TODO implement a modal that displays details of the message before requesting signature

	// const viewer = createLogo({
	// 	pxNotRatio: true,
	// 	width: 50,
	// 	height: 50,
	// 	followMouse: false,
	// 	slowDrift: false,
	// });

	// // TODO control implement wallet choice modal on click connect button
	// // TODO display metamask logo based on screen size not this weird userAgent thing
	// const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/.test(navigator.userAgent)

	// if (mobile) {
	// 	viewer.setFollowMouse(false);
	// }

	let popupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click
		event: 'click',
		placement: 'bottom-end',
		// Provide a matching 'data-popup' value.
		target: 'walletMenu',
		closeQuery: '.btn',
	};

	let metamaskSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click
		event: 'click',
		placement: 'bottom-end',
		// Provide a matching 'data-popup' value.
		target: 'walletMenu-MM',
		closeQuery: '.btn',
		
	};

	const alert: ModalSettings = {
		type: 'alert',
		title: 'Attention',
		body: 'You need at least 1 AMBER to use this app.',
		// image: amber_pope,
		buttonTextCancel: 'OK',
		modalClasses: 'w-modal-slim',
		backdropClasses: '',
	};

	// TODO combine these two triggers
	function triggerConfirm(): void {
		const confirm: ModalSettings = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure you wish to proceed?',
			modalClasses: 'ring-secondary-500 ring-1',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {if (r) {disconnectKeplr()}},
			// Optionally override the button text
			buttonTextCancel: 'Cancel',
			buttonTextConfirm: 'Disconnect',
		};
		modalStore.trigger(confirm);
	}
	function triggerConfirmMetamask(): void {
		const confirm: ModalSettings = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure you wish to proceed?',
			modalClasses: 'text-black dark:text-dark-token ring-secondary-600 dark:ring-primary-500/70 ring-2',
			backdropClasses: '',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {if (r) {disconnectMetamask()}},
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
		// add viewer to DOM
		// if (!mobile) {
		// 	const container = document.getElementById('logo-container')!;
		// 	container.appendChild(viewer.container);
		// }

		// TODO check if account is already available to update the button state
	})

	async function connect() {
		// resetStores()
		await setupKeplr()
		await getViewingKeys(tokenList)
		await getBalances()
	}

	async function connectMetamask() {
		// resetStores()
		await setupMetamask()
		// await getViewingKeys(tokenList)
		await getBalances()
	}

	async function setupLedger() {
		try {
			await connectLedger()
		} catch (error) {
			console.log(error)
		}
		try {
			const address = await getLedgerAddress('usb')
			console.log(address)
		} catch (error) {
			console.log(error)
		}
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
				address: $secretAddress,
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
				address: $secretAddress,
				auth: {
					key: $viewingKeys.get(AMBER.address)
				}
			})
			$amberBalance = Number((snip20Response.balance.amount as any) / 1e6).toString()
		} catch (error) {
			// console.log(`No viewing key for AMBER`)
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
	class="card p-4 w-64 shadow-2xl transition-opacity"
	data-popup="walletMenu"
>
	<div class="text-center space-y-4">
		<p class="text-center font-extrabold drop-shadow-md">
			[ {$keplrKey.name} ]
		</p>
		<hr class="!border-t-2" />
		<p class="font-bold font-mono text-secondary-600 dark:text-primary-500">{$scrtBalance} SCRT<br/>{$amberBalance} AMBER</p>
		<!-- <p class="font-bold font-mono text-primary-500">{$amberBalance} AMBER</p> -->
		<button
			on:click={()=>triggerConfirm()}
			on:keypress={()=>triggerConfirm()}
			class="btn btn-sm px-8 font-medium variant-ghost-secondary"
		>
			Disconnect
		</button>
	</div>
	<!-- Append the arrow element -->
	<!-- <div class="arrow bg-surface-800" /> -->
</div>

<div
	class="card p-4 w-64 shadow-2xl"
	data-popup="walletMenu-MM"
>
	<div class="text-center space-y-4">
		<p class="text-center font-extrabold drop-shadow-md">
			[ metamask ]
		</p>
		<hr class="!border-t-2" />
		<p class="font-bold font-mono text-secondary-600 dark:text-primary-500">{$scrtBalance} SCRT<br/>{$amberBalance} AMBER</p>
		<!-- <p class="font-bold font-mono text-primary-500">{$amberBalance} AMBER</p> -->
		<button
			on:click={()=>triggerConfirmMetamask()}
			on:keypress={()=>triggerConfirmMetamask()}
			class="btn btn-sm px-8 font-medium variant-ghost-secondary"
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
			class="btn font-medium variant-ghost-secondary"
			use:popup={popupSettings}
		>
			{compactAddress($secretAddress)}
		</button>
	{:else}
		<button 
			class="btn font-medium variant-ghost-primary"
			on:click={() => connect()}
			on:click={() => modalStore.trigger(alert)}
		>
			Connect
		</button>
	{/if}
	{#if $keplrKey.name != ""}
		<div in:fade class="hidden lg:block dark:text-secondary-400 font-bold transition-all ease-standard duration-300">
			[ {$keplrKey.name} ]
		</div>
	{/if}
	<div 
		id="logo-container" class="btn p-0"
		use:popup={metamaskSettings} 
		on:click={() => connectMetamask()}
		on:keypress={() => connectMetamask()}
	/>
	<!-- <div
		id="ledger-container" class="btn p-0"
		on:click={() => setupLedger()}
		on:keypress={() => setupLedger()}
	>
		[ LEDGER ]
	</div> -->
</div>
