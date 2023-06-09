import { chains } from '../config';
import { toHex, SecretNetworkClient } from 'secretjs';
// import { keccak256 } from '@cosmjs/crypto';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

const SECRET_CHAIN_ID = chains['Secret Network'].chain_id;
const SECRET_LCD = chains['Secret Network'].lcd;
const secretjs = new SecretNetworkClient({
	url: 'https://lcd.secret.express',
	chainId: 'secret-4',
});

async function generateRandomEthToken() {
	const array = new ArrayBuffer(32);
	const view = new Uint8Array(array);
	const randomBytes = window.crypto.getRandomValues(view);
	const randomAddress = '0x' + toHex(keccak256(randomBytes)).substring(24);
	console.log(randomAddress);

	window.ethereum
		.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: randomAddress,
					symbol: 'AMBER',
					decimals: 18,
				},
			},
		})
		.then((success: any) => {
			if (success) {
				console.log('FOO successfully added to wallet!');
			} else {
				throw new Error('Something went wrong.');
			}
		})
		.catch(console.error);
}
