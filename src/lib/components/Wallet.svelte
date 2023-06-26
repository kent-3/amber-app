<script lang="ts" type="module">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { setupKeplr, getKeplrViewingKey, disconnectKeplr } from '$lib/wallets/keplr';
	import { disconnectMetamask, setupMetamask } from '$lib/wallets/metamask';
	import { connectLedger, getLedgerAddress } from '$lib/wallets/ledger';
	import { chains } from '$lib/config';
	import { AMBER } from '$lib/contracts';
	import { type Token, tokenList, type SecretAddress } from '$lib/tokens';
	import { compactAddress } from '$lib/utils';
	import {
		resetStores,
		amberBalance,
		scrtBalance,
		isAccountAvailable,
		keplrKey,
		secretAddress,
		signingClient,
		viewingKeys,
	} from '$lib/stores';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import keplr_icon from '$lib/icons/Keplr_icon.svg';
	import starshell_icon from '$lib/icons/Starshell_icon.png';
	import fina_icon from '$lib/icons/Fina_icon.webp';
	import leap_icon from '$lib/icons/Leap_icon.png';
	import metamask_icon from '$lib/icons/Metamask_icon.svg';
	// import createLogo from '@metamask/logo';

	// const viewer = createLogo({
	// 	pxNotRatio: true,
	// 	width: 50,
	// 	height: 50,
	// 	followMouse: false,
	// 	slowDrift: false,
	// });

	// TODO control implement wallet choice modal on click connect button
	// TODO display metamask logo based on screen size not this weird userAgent thing
	// const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/.test(navigator.userAgent)

	// if (mobile) {
	// 	viewer.setFollowMouse(false);
	// }

	let popupSettings: PopupSettings = {
		event: 'click',
		placement: 'bottom-end',
		middleware: {
			offset: 24,
		},
		// Provide a matching 'data-popup' value.
		target: 'walletMenu',
		closeQuery: '.btn',
	};

	// let metamaskSettings: PopupSettings = {
	// 	event: 'click',
	// 	placement: 'bottom-end',
	// 	// Provide a matching 'data-popup' value.
	// 	target: 'walletMenu-MM',
	// 	closeQuery: '.btn'
	// };

	// const alert: ModalSettings = {
	// 	type: 'alert',
	// 	title: 'Attention',
	// 	body: 'You need at least 1 AMBER to use this app.',
	// 	image: amber_pope,
	// 	buttonTextCancel: 'OK',
	// 	modalClasses: '!w-modal-slim',
	// 	backdropClasses: ''
	// };

	// TODO combine these two triggers
	function triggerConfirm(): void {
		const confirm: ModalSettings = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure you wish to proceed?',
			modalClasses: 'ring-secondary-500 ring-[1.5px]',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {
				if (r) {
					disconnectKeplr();
				}
			},
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
			modalClasses:
				'text-black dark:text-dark-token ring-secondary-600 dark:ring-primary-500/70 ring-2',
			backdropClasses: '',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {
				if (r) {
					disconnectMetamask();
				}
			},
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

	function openWalletModal(): void {
		const html = document.querySelector<HTMLElement>('#wallet-modal');
		const wallets: ModalSettings = {
			type: 'alert',
			title: '<div class="hidden">Choose your wallet provider</div>',
			body: html?.innerHTML,
			modalClasses:
				'w-[768px] !space-y-0 -translate-y-4 !rounded-2xl !bg-surface-50 dark:!bg-[#28292a]',
			// Optionally override the button text
			buttonTextCancel: 'Cancel',
		};
		modalStore.trigger(wallets);
		// Get all the div elements with the specified class
		const myDivs = document.getElementsByClassName('keplr-btn');

		// Define the event handler function
		function handleClick() {
			window.alert('Div clicked');
		}

		// Loop through the divs and attach the click event listener
		for (let i = 0; i < myDivs.length; i++) {
			myDivs[i].addEventListener('click', handleClick);
		}
	}

	const SECRET_CHAIN_ID = chains['Secret Network'].chain_id;

	onMount(async () => {
		window.addEventListener('keplr_keystorechange', async () => {
			console.log('Key store in Keplr is changed. You may need to refetch the account info.');
			await resetStores();
			await connect();
		});
		if ($isAccountAvailable == true) {
			await connect();
		}
		// add viewer to DOM
		// if (!mobile) {
		// 	const container = document.getElementById('logo-container')!;
		// 	container.appendChild(viewer.container);
		// }

		// TODO check if account is already available to update the button state
	});

	async function connect() {
		// resetStores()
		await setupKeplr();
		await getViewingKeys(tokenList);
		await getBalances();
	}

	// async function connectMetamask() {
	// 	// resetStores()
	// 	await setupMetamask();
	// 	// await getViewingKeys(tokenList)
	// 	await getBalances();
	// }

	// async function setupLedger() {
	// 	try {
	// 		await connectLedger();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	try {
	// 		const address = await getLedgerAddress('usb');
	// 		console.log(address);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	async function getViewingKeys(tokens: Token[]) {
		const keysAndAddresses: { promise: Promise<string | null>; address: SecretAddress }[] = [];

		for (const token of tokens) {
			const promise = getKeplrViewingKey(token.address);
			keysAndAddresses.push({ promise, address: token.address });
		}
		console.log('start');
		await Promise.all(keysAndAddresses);
		console.log('stop');

		for (const { promise, address } of keysAndAddresses) {
			const key = await promise;
			if (key != null) {
				viewingKeys.update((map) => map.set(address, key));
			}
		}
		console.log($viewingKeys.entries())
	}

	async function getBalances() {
		try {
			const response = await $signingClient.query.bank.balance({
				address: $secretAddress,
				denom: 'uscrt',
			});
			$scrtBalance = Number((response.balance?.amount as any) / 1e6)
				.toFixed(6)
				.toString();
		} catch (error) {
			console.log(error);
		}

		try {
			const snip20Response = await $signingClient.query.snip20.getBalance({
				contract: {
					address: AMBER.address,
					code_hash: AMBER.code_hash,
				},
				address: $secretAddress,
				auth: {
					key: $viewingKeys.get(AMBER.address),
				},
			});
			$amberBalance = Number((snip20Response.balance.amount as any) / 1e6).toString();
		} catch (error) {
			console.log(`No viewing key for AMBER`)
		}
		
		// save this problem for later...
		// for (const token of tokenList) {
		// 	try {
		// 		const snip20Response = await $signingClient.query.snip20.getBalance({
		// 			contract: {
		// 				address: token.address,
		// 				code_hash: token.codeHash
		// 			},
		// 			address: $signingClient.address,
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

<div id="wallet-modal" class="hidden">
	<div class="-mb-10 grid grid-cols-[2fr_3.56fr] items-start">
		<div
			id="sidebar"
			class="flex h-[380px] flex-col gap-4 border-r-[1px] pr-4 border-surface-300-600-token"
		>
			<div id="inner container" class="flex flex-1 flex-col justify-between p-6">
				<div class="container flex flex-1 flex-col items-start gap-4 text-sm font-medium">
					<div class="min-w-14 container flex h-14">
						<img
							src="/amber-logo.png"
							alt="logo"
							class="object-contain object-[top_50%_left_2.5rem]"
						/>
					</div>
					<div class="text-base">Connect your wallet</div>
					<div>
						Connecting your wallet is like “logging in” to Web3. Select your wallet from the options
						to get started.
					</div>
				</div>
				<div class="list text-xs">
					<div class=" list-item">&sup1 Coming soon</div>
					<div class=" list-item">&sup2 Experimental</div>
				</div>
			</div>
			<span class="text-center text-xs"
				>powered by <strong class="gradient-heading">AmberDAO</strong></span
			>
		</div>
		<div id="available-wallets" class="flex flex-wrap gap-3 p-4 pr-0 pt-8 font-medium">
			<div
				class="container btn flex flex-grow basis-44 items-center !justify-start gap-4 rounded-3xl p-4 !text-left ring-1 ring-surface-300-600-token hover:cursor-pointer"
			>
				<div
					class="block h-12 w-12 rounded-xl p-[8.333333333333334px] ring-1 ring-surface-300-600-token"
				>
					<img src={starshell_icon} alt=" " />
				</div>
				<div class="!ml-0">Starshell</div>
			</div>
			<div
				id="keplr-btn"
				class="keplr-btn container btn flex flex-grow basis-44 items-center !justify-start gap-4 rounded-3xl p-4 !text-left ring-1 ring-surface-300-600-token hover:cursor-pointer"
			>
				<div class="h-12 w-12 rounded-xl p-[8.333333333333334px] ring-1 ring-surface-300-600-token">
					<img src={keplr_icon} alt="keplr" />
				</div>
				<div class="!ml-0">Keplr</div>
			</div>
			<div
				class="container btn flex flex-grow basis-44 items-center !justify-start gap-4 rounded-3xl p-4 !text-left ring-1 ring-surface-300-600-token hover:cursor-pointer"
			>
				<div class="h-12 w-12 rounded-xl p-[8.333333333333334px] ring-1 ring-surface-300-600-token">
					<img src={fina_icon} alt=" " />
				</div>
				<div class="!ml-0">Fina</div>
			</div>
			<div
				class="container btn flex flex-grow basis-44 items-center !justify-start gap-4 rounded-3xl p-4 !text-left ring-1 ring-surface-300-600-token hover:cursor-pointer"
			>
				<div class="h-12 w-12 rounded-xl p-[8.333333333333334px] ring-1 ring-surface-300-600-token">
					<img src={leap_icon} alt=" " />
				</div>
				<div class="!ml-0">Leap&sup1</div>
			</div>
			<div
				class="container btn flex flex-grow basis-44 items-center !justify-start gap-4 rounded-3xl p-4 !text-left ring-1 ring-surface-300-600-token hover:cursor-pointer"
			>
				<div class="h-12 w-12 rounded-xl p-[8.333333333333334px] ring-1 ring-surface-300-600-token">
					<img src={metamask_icon} alt=" " />
				</div>
				<div class="!ml-0">MetaMask&sup2</div>
			</div>
			<div
				class="container btn flex flex-grow basis-44 items-center !justify-start gap-4 rounded-3xl p-4 !text-left ring-1 ring-surface-300-600-token hover:cursor-pointer"
			>
				<div class="h-12 w-12 rounded-xl p-[8.333333333333334px] ring-1 ring-surface-300-600-token">
					<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="160" height="160" rx="16" fill="#00000D" />
						<path
							d="M93.1482 119.207V125H135V98.8769H128.902V119.207H93.1482ZM93.1482 33V38.792H128.902V59.1231H135V33H93.1482ZM74.0104 59.1231H67.9125V98.8769H95.4153V93.6539H74.0104V59.1231ZM26 98.8769V125H67.8518V119.207H32.0979V98.8769H26ZM26 33V59.1231H32.0979V38.792H67.8518V33H26Z"
							fill="white"
						/>
					</svg>
				</div>
				<div class="!ml-0">Ledger&sup2</div>
			</div>
		</div>
	</div>
</div>

<div
	class="card w-64 translate-x-[4px] p-4 shadow-2xl !ring-secondary-500 md:-translate-x-[11px]"
	data-popup="walletMenu"
>
	<div class="space-y-4 text-center">
		<p class="text-center font-extrabold drop-shadow-md">
			[ {$keplrKey.name} ]
		</p>
		<hr class="!border-t-2" />
		<p class="font-mono font-bold text-secondary-600 dark:text-primary-500">
			{$scrtBalance} SCRT<br />{$amberBalance} AMBER
		</p>
		<!-- <p class="font-bold font-mono text-primary-500">{$amberBalance} AMBER</p> -->
		<button
			on:click={() => triggerConfirm()}
			on:keypress={() => triggerConfirm()}
			class="variant-ghost-secondary btn btn-sm px-8 font-medium"
		>
			Disconnect
		</button>
	</div>
	<!-- Append the arrow element -->
	<!-- <div class="arrow bg-surface-800" /> -->
</div>

<div class="card w-64 p-4 shadow-2xl" data-popup="walletMenu-MM">
	<div class="space-y-4 text-center">
		<p class="text-center font-extrabold drop-shadow-md">[ metamask ]</p>
		<hr class="!border-t-2" />
		<p class="font-mono font-bold text-secondary-600 dark:text-primary-500">
			{$scrtBalance} SCRT<br />{$amberBalance} AMBER
		</p>
		<!-- <p class="font-bold font-mono text-primary-500">{$amberBalance} AMBER</p> -->
		<button
			on:click={() => triggerConfirmMetamask()}
			on:keypress={() => triggerConfirmMetamask()}
			class="variant-ghost-secondary btn btn-sm px-8 font-medium"
		>
			Disconnect
		</button>
	</div>
	<!-- Append the arrow element -->
	<!-- <div class="arrow bg-surface-800" /> -->
</div>

<div class="flex flex-row-reverse flex-nowrap items-center md:gap-4">
	<!-- Alternate method for different button states -->
	<!-- <button 
		class="{$isAccountAvailable == true ? 'btn variant-ghost-secondary' : 'btn variant-ghost-primary'}"
		on:click={() => connect()}
	>
		{$isAccountAvailable == false ? 'Connect Wallet' : compactAddress($keplrKey.bech32Address)}
	</button> -->
	{#if $isAccountAvailable}
		<button class="variant-ghost-primary btn text-sm font-bold" use:popup={popupSettings}>
			<svg
				viewBox="0 0 21 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				focusable="false"
				class=" mr-3 h-[18px] w-[21px] fill-token"
				aria-hidden="true"
				><path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 3C0 1.34315 1.34315 0 3 0H16C17.6569 0 19 1.34315 19 3V5.17071C20.1652 5.58254 21 6.69378 21 8V10C21 11.3062 20.1652 12.4175 19 12.8293V15C19 16.6569 17.6569 18 16 18H3C1.34315 18 0 16.6569 0 15V3ZM17 3V5H14C12.3431 5 11 6.34315 11 8V10C11 11.6569 12.3431 13 14 13H17V15C17 15.5523 16.5523 16 16 16H3C2.44772 16 2 15.5523 2 15V3C2 2.44772 2.44772 2 3 2H16C16.5523 2 17 2.44772 17 3ZM14 7C13.4477 7 13 7.44772 13 8V10C13 10.5523 13.4477 11 14 11H18C18.5523 11 19 10.5523 19 10V8C19 7.44772 18.5523 7 18 7H14ZM17 9C17 9.55228 16.5523 10 16 10C15.4477 10 15 9.55228 15 9C15 8.44771 15.4477 8 16 8C16.5523 8 17 8.44771 17 9Z"
					fill="current"
				/></svg
			>
			{compactAddress($secretAddress)}
		</button>
	{:else}
		<button class="variant-ghost-primary btn text-sm font-bold" on:click={() => connect()}>
			<svg
				viewBox="0 0 21 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				focusable="false"
				class=" mr-3 h-[18px] w-[21px] fill-token"
				aria-hidden="true"
				><path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 3C0 1.34315 1.34315 0 3 0H16C17.6569 0 19 1.34315 19 3V5.17071C20.1652 5.58254 21 6.69378 21 8V10C21 11.3062 20.1652 12.4175 19 12.8293V15C19 16.6569 17.6569 18 16 18H3C1.34315 18 0 16.6569 0 15V3ZM17 3V5H14C12.3431 5 11 6.34315 11 8V10C11 11.6569 12.3431 13 14 13H17V15C17 15.5523 16.5523 16 16 16H3C2.44772 16 2 15.5523 2 15V3C2 2.44772 2.44772 2 3 2H16C16.5523 2 17 2.44772 17 3ZM14 7C13.4477 7 13 7.44772 13 8V10C13 10.5523 13.4477 11 14 11H18C18.5523 11 19 10.5523 19 10V8C19 7.44772 18.5523 7 18 7H14ZM17 9C17 9.55228 16.5523 10 16 10C15.4477 10 15 9.55228 15 9C15 8.44771 15.4477 8 16 8C16.5523 8 17 8.44771 17 9Z"
					fill="current"
				/></svg
			>
			Connect
		</button>
	{/if}
	{#if $keplrKey.name != ''}
		<div
			in:fade
			class="hidden font-bold transition-all duration-300 ease-standard dark:text-secondary-400 lg:block"
		>
			[ {$keplrKey.name} ]
		</div>
	{/if}
	<!-- <div
		id="logo-container"
		class="btn p-0"
		use:popup={metamaskSettings}
		on:click={() => connectMetamask()}
		on:keypress={() => connectMetamask()}
	/> -->
	<!-- <div
		id="ledger-container" class="btn p-0"
		on:click={() => setupLedger()}
		on:keypress={() => setupLedger()}
	>
		<svg width="48" height="48" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="160" height="160" rx="16" fill="#00000D"></rect>
			<path d="M93.1482 119.207V125H135V98.8769H128.902V119.207H93.1482ZM93.1482 33V38.792H128.902V59.1231H135V33H93.1482ZM74.0104 59.1231H67.9125V98.8769H95.4153V93.6539H74.0104V59.1231ZM26 98.8769V125H67.8518V119.207H32.0979V98.8769H26ZM26 33V59.1231H32.0979V38.792H67.8518V33H26Z" fill="white"></path>
		</svg>
	</div> -->
</div>
