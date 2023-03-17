import { SecretNetworkClient } from 'secretjs'
import { chains } from './config'
import { resetStores, isAccountAvailable, keplrKey, secretClient, secretAddress, viewingKeys } from './stores'
import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
import type { SecretAddress } from './tokens';

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

let secretjs: SecretNetworkClient
secretClient.subscribe((client)=>
	secretjs = client
)

function toHexString(byteArray: Uint8Array): string {
	return Array.from(byteArray, (byte) => ("0" + (byte & 0xff).toString(16)).slice(-2)).join("");
}


export async function disconnectKeplr() {
	await window.keplr?.disable(SECRET_CHAIN_ID)
	resetStores()
}

export async function setupKeplr() {
	if (!window.keplr) {
		modalStore.trigger(alert)
	} else {
		const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

		while (
			!window.keplr ||
			!window.keplr.getEnigmaUtils ||
			!window.keplr.getOfflineSignerOnlyAmino
		) {
			await sleep(50)
		}

		await window.keplr.enable(SECRET_CHAIN_ID)
		window.keplr.defaultOptions = {
			sign: {
				preferNoSetFee: false,
				disableBalanceCheck: false
			}
		}

		const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(SECRET_CHAIN_ID)
		const accounts = await keplrOfflineSigner.getAccounts()
		const address = accounts[0].address

		const secretjs = new SecretNetworkClient({
			url: SECRET_LCD,
			chainId: SECRET_CHAIN_ID,
			wallet: keplrOfflineSigner,
			walletAddress: address,
			encryptionUtils: window.keplr.getEnigmaUtils(SECRET_CHAIN_ID)
		})

		const key = await window.keplr.getKey(SECRET_CHAIN_ID)

		isAccountAvailable.set(true)
		keplrKey.set(key)
		secretAddress.set(address)
		secretClient.set(secretjs)
	}
}

export async function setKeplrViewingKey(token: SecretAddress) {
	if (!window.keplr) {
		console.error('Keplr not present')
		return
	}
	window.keplr.defaultOptions = {
		sign: {
			preferNoSetFee: false,
			disableBalanceCheck: false
		}
	}
	// try {
	// 	await window.keplr.suggestToken(SECRET_CHAIN_ID, token)
	// } catch (error) {
	// 	console.log(error)
	// }
	const action = "Create Viewing Key"
	const buf = new Uint8Array(32);
	const key = toHexString(window.crypto.getRandomValues(buf))

	const gasPriceInFeeDenom = 0.0125
	
	try {
		const padding = "one amber club"
		const tx = await secretjs.tx.snip20.setViewingKey(
			{
				sender: secretjs.address,
				contract_address: token,
				// code_hash: "",
				msg: {
					set_viewing_key: {
						key,
						padding,
					}
				}
			},
			{
				gasLimit: 40_000,
				gasPriceInFeeDenom,
				feeDenom: "uscrt"
			}
		)
		// TODO show details of the transaction while waiting for it to be sent
		if (tx.code === 0) {
			// console.log(tx)

			// if wanting to display the tx msg
			// JSON.stringify(tx.tx.body?.messages[0].msg,null,2)
	
			// const data = new TextDecoder('utf-8').decode(tx.data[0].subarray(3))
			// const JSONdata = JSON.parse(data)

			// TODO add typescript stuff (define response object structure)
			// const key: string = JSONdata.create_viewing_key.key
			// console.log(key)

			// console.log(tx.events.find( (event) => event.type==="coin_spent"))

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
						<dt class="opacity-50">Key:</dt>
						<dd>${key}</dd>
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

export async function getKeplrViewingKey(token: string): Promise<string | null> {
	if (!window.keplr) {
		console.error('Keplr not present')
		return null
	}

	try {
		return await window.keplr.getSecret20ViewingKey(SECRET_CHAIN_ID, token)
	} catch (e) {
		return null
	}
}
