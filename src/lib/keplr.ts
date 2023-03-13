import { SecretNetworkClient } from 'secretjs'
import { chains } from './config'
import { resetStores, isAccountAvailable, keplrKey, secretClient, secretAddress } from './stores'
import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

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

export async function setKeplrViewingKey(token: string) {
	if (!window.keplr) {
		console.error('Keplr not present')
		return
	}
	try {
		await window.keplr.suggestToken(SECRET_CHAIN_ID, token)
	} catch (error) {
		console.log(error)
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
