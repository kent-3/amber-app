import { SecretNetworkClient, MetaMaskWallet } from 'secretjs'
import { chains } from '../config'
import { resetStores, isAccountAvailable, secretClient, secretAddress, viewingKeys } from '../stores'
import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
import { AMBER } from '$lib/contracts'
import type { SecretAddress } from '$lib/tokens';

const alert: ModalSettings = {
	type: 'alert',
	title: 'No Wallet Detected',
	body: `
		<p>Please install a Secret Network wallet<p>
	`,
	buttonTextCancel: 'OK',
	modalClasses: 'variant-ghost-error'
};

const SECRET_CHAIN_ID = chains['Secret Network'].chain_id
const SECRET_LCD = chains['Secret Network'].lcd

const ethereum = window.ethereum

let secretjs: SecretNetworkClient
secretClient.subscribe((signing_client) => 
	secretjs = signing_client
)

export async function disconnectMetamask() {
	await ethereum.request({
		method: "eth_requestAccounts",
	});
	resetStores()
}

export async function setupMetamask() {
	if (!ethereum) {
		modalStore.trigger(alert)
	} else {
		const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

		while (
			!window.ethereum
		) {
			await sleep(50)
		}
        
		// method to ask which account every time
		// const accounts = await ethereum.request({
		// 	method: "wallet_requestPermissions",
		// 	params: [{
		// 		eth_accounts: {}
		// 	}]
		// }).then(() => ethereum.request({
		// 	method: 'eth_requestAccounts'
		// }))
		// const ethAddress = accounts[0]


		// will remember previous permission setting
        const [ethAddress] = await ethereum.request({
            method: "eth_requestAccounts",
        });

		const wallet = await MetaMaskWallet.create(ethereum, ethAddress);
		console.log(wallet.address)

		const secretjs = new SecretNetworkClient({
			url: SECRET_LCD,
			chainId: SECRET_CHAIN_ID,
			wallet: wallet,
			walletAddress: wallet.address,
			// encryptionSeed: new Uint8Array(32)
		})

		isAccountAvailable.set(true)
		secretAddress.set(wallet.address)
		secretClient.set(secretjs)
	}
}

export async function setMetamaskViewingKey(token: SecretAddress) {
	// TODO
	console.log(`creating metamask vk for ${token}`)
	const action = "Create Viewing Key"
	const gasPriceInFeeDenom = 0.0125
	
	try {
		const entropy = "one amber club"
		const padding = "xoxoxo"
		const tx = await secretjs.tx.snip20.createViewingKey(
			{
				sender: secretjs.address,
				contract_address: AMBER.address,
				code_hash: AMBER.code_hash,
				msg: {
					create_viewing_key: {
						entropy,
						padding,
					}
				}
			},
			{
				gasLimit: 50_000,
				gasPriceInFeeDenom,
				feeDenom: "uscrt"
			}
		)
		// TODO show details of the transaction while waiting for it to be sent
		if (tx.code === 0) {
			console.log(tx)

			// if wanting to display the tx msg

			// JSON.stringify(tx.tx.body?.messages[0].msg,null,2)

	
			const data = new TextDecoder('utf-8').decode(tx.data[0].subarray(3))
			const JSONdata = JSON.parse(data)

			// TODO add typescript stuff (define response object structure)
			const key: string = JSONdata.create_viewing_key.key
			console.log(key)

			console.log(tx.events.find( (event) => event.type==="coin_spent"))
			// TODO report error from secretjs: EventAttribute keys and value are base64 strings, not Uint8Arrays
			// TODO find better way to convert from base64 to normal string
			// const base64_fee = tx.events.find( (event) => event.type==="coin_spent")?.attributes![1].value
			// const fee = new TextDecoder().decode(fromBase64(base64_fee))

			const fee = tx.gasWanted * gasPriceInFeeDenom / 1e6

			viewingKeys.update((map)=> map.set(token,key))

			const t: ToastSettings = {
				message: `
				<h4>Transaction Success 🥳</h4>
				<details class="text-sm">
					<summary>Details</summary>
					<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
						<dt class="opacity-50">Tx Hash:</dt>
						<a
							href="https://www.mintscan.io/secret/txs/${tx.transactionHash}"
							target="_blank"
							rel="noreferrer"
						>
							<dd>View on block explorer</dd>
						</a>
						<dt class="opacity-50">Fee:</dt>
						<dd>${fee} SCRT</dd>
						<dt class="opacity-50">Gas Used:</dt>
						<dd>${tx.gasUsed.toLocaleString()}</dd>
					</dl>
				</details>
				`,
				background: 'variant-glass-surface !bg-success-900 !bg-opacity-50 sm:!bg-opacity-30 ring-2 ring-inset ring-success-800',
				autohide: false,
				classes: '-translate-y-4 font-semibold',
				// action: {
				// 	label: 'retry',
				// 	response: () => console.log("action")
				// }
			};
			toastStore.trigger(t)
			// modalStore.trigger(success);
		} else {
			console.log(tx.rawLog)
			const t: ToastSettings = {
				message: `
				<h4>Transaction Failed</h4>
				<details class="text-sm">
					<summary>Details</summary>
					<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
						<dt class="opacity-50">Raw Log:</dt>
						<dd>${tx.rawLog}</dd>
					</dl>
				</details>
				`,
				background: 'variant-glass-secondary ring-1 ring-inset ring-error-500',
				autohide: false,
				classes: '-translate-y-4 font-semibold',
				// action: {
				// 	label: 'retry',
				// 	response: () => console.log("action")
				// }
			};
			toastStore.trigger(t)
			// modalStore.trigger(warning);
		  }
	} catch (error) {
		// TODO create function that can provide suggestions based on the error
		// TODO add easy way for user to report an issue / ask for help
			// copy the action and message to clipboard and share that to telegram or discord?
		const t: ToastSettings = {
			message: `
			<h4>Something went wrong 🤔</h4>
			<details class="text-sm">
				<summary>Details</summary>
				<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
					<dt class="opacity-50">Action:</dt>
					<dd>${action}</dd>
					<dt class="opacity-50">Message:</dt>
					<dd class="text-error-500">${error.message}</dd>
				</dl>
			</details>
			`,
			background: 'variant-glass-secondary ring-1 ring-inset ring-secondary-500',
			autohide: false,
			classes: '-translate-y-4 font-semibold',
			// action: {
			// 	label: 'retry',
			// 	response: () => console.log("action")
			// }
		};
		toastStore.trigger(t)
	}
}

export async function addToken() {
	ethereum
		.request({
		method: 'wallet_watchAsset',
		params: {
			type: 'ERC20',
			options: {
			address: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
			symbol: 'FOO',
			decimals: 18,
			image: 'https://foo.io/token-image.svg',
			},
		},
		})
		.then((success) => {
		if (success) {
			console.log('FOO successfully added to wallet!');
		} else {
			throw new Error('Something went wrong.');
		}
		})
		.catch(console.error);
}