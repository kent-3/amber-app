import type { SecretNetworkClient } from 'secretjs';
import type { SecretAddress, Token } from '../tokens';
import { type ModalSettings, modalStore } from '@skeletonlabs/skeleton/index';
import { setLoading, doneLoading } from '../modals';
import { secretClient, viewingKeys } from '../stores';
import { responseToast, errorToast } from '../toasts';

let secretjs: SecretNetworkClient;
secretClient.subscribe((client) => (secretjs = client));

function toHexString(byteArray: Uint8Array): string {
	return Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');
}

export async function setViewingKey(token: SecretAddress) {
	if (!window.keplr) {
		console.error('Keplr not present');
		return;
	}
	window.keplr.defaultOptions = {
		sign: {
			preferNoSetFee: false,
			disableBalanceCheck: false,
		},
	};

	// TODO make this set of variables into a properties object
	const action = 'Set Viewing Key';
	const buf = new Uint8Array(32);
	const key = toHexString(window.crypto.getRandomValues(buf));
	const padding = 'one amber club';

	const sender = secretjs.address;
	const contract_address = token;
	const msg = {
		set_viewing_key: {
			key,
			padding,
		},
	};
	const gasLimit = 40_000;
	const gasPriceInFeeDenom = 0.0125;
	const feeDenom = 'uscrt';

	// TODO move all this to a different function
	// TODO add code highlighting
	const confirm: ModalSettings = {
		type: 'confirm',
		title: 'Review Message Details',
		body: `
			<dl class="font-mono grid grid-cols-[6rem_minmax(0,_2fr)]">
				<dt class="opacity-50">Sender:</dt>
				<dd class="overflow-x-auto">${sender}</dd>
				<dt class="opacity-50">Contract:</dt>
				<dd class="overflow-x-auto">${contract_address}</dd>
				<dt class="opacity-50">Message:</dt>
				<dd><pre class="!text-xs !text-primary-500 !whitespace-pre !scroll-m-1">${JSON.stringify(
					msg,
					null,
					2
				)}</pre></dd>
				<dt class="opacity-50">Gas Limit:</dt>
				<dd>${gasLimit.toLocaleString()}</dd>
				<dt class="opacity-50">Gas Fee:</dt>
				<dd>
					<span class="text-tertiary-600">${gasLimit * 0.0125}</span> /
					<span class="text-secondary-400">${gasLimit * 0.1}</span> /
					<span class="text-primary-500">${gasLimit * 0.25}</span> uscrt
				</dd>
			</dl>
		`,
		modalClasses: 'ring-2 ring-surface-500 w-modal',
		// TRUE if confirm pressed, FALSE if cancel pressed
		// TODO have this call the actual message signing function, passing a properties object
		response: (r: boolean) => {
			if (!r) {
				return;
			}
		},
		// Optionally override the button text
		buttonTextCancel: 'Cancel',
		buttonTextConfirm: 'Confirm',
	};
	modalStore.trigger(confirm);
	// TODO move all this to a different function

	try {
		setLoading();
		const tx = await secretjs.tx.snip20.setViewingKey(
			{
				sender,
				contract_address,
				// code_hash: "",
				msg,
			},
			{
				gasLimit,
				gasPriceInFeeDenom,
				feeDenom,
			}
		);
		// TODO show details of the transaction while waiting for it to be sent
		doneLoading();
		responseToast(tx);

		if (tx.code === 0) {
			// if wanting to display the tx msg
			// JSON.stringify(tx.tx.body?.messages[0].msg,null,2)

			// const data = new TextDecoder('utf-8').decode(tx.data[0].subarray(3))
			// const JSONdata = JSON.parse(data)
			// const key: string = JSONdata.create_viewing_key.key
			// console.log(key)

			// TODO report error from secretjs: EventAttribute keys and value are base64 strings, not Uint8Arrays
			// TODO find better way to convert from base64 to normal string
			// console.log(tx.events.find( (event) => event.type==="coin_spent"))
			// const base64_fee = tx.events.find( (event) => event.type==="coin_spent")?.attributes![1].value
			// const fee = new TextDecoder().decode(fromBase64(base64_fee!))

			const fee = (tx.gasWanted * gasPriceInFeeDenom) / 1e6;
			console.log('Gas Fee: ', fee);
			viewingKeys.update((map) => map.set(token, key));
		}
	} catch (error) {
		// TODO create function that can provide suggestions based on the error
		// TODO add easy way for user to report an issue / ask for help
		// copy the action and message to clipboard and share that to telegram or discord?
		errorToast(error);
		doneLoading();
	}
}

export async function increaseAllowance(
	client: SecretNetworkClient,
	token: Token,
	spender: string,
	amount: string
) {
	const tx = await client.tx.snip20.increaseAllowance(
		{
			sender: client.address,
			contract_address: token.address,
			code_hash: token.codeHash,
			msg: {
				increase_allowance: {
					spender: spender,
					amount: amount,
				},
			},
		},
		{
			gasLimit: 100_000,
		}
	);

	if (tx.code !== 0) {
		throw new Error(`Failed with the following error:\n ${tx.rawLog}`);
	}
}

export async function getAllowance(
	client: SecretNetworkClient,
	token: Token,
	owner: string,
	spender: string,
	auth: string
): Promise<string> {
	try {
		const snip20Response = await client.query.snip20.GetAllowance({
			contract: {
				address: token.address,
				code_hash: token.codeHash,
			},
			owner: owner,
			spender: spender,
			auth: {
				key: auth,
			},
		});
		const allowance = (
			parseInt(snip20Response.allowance.allowance) /
			10 ** token.decimals
		).toString();
		return allowance;
	} catch (error) {
		console.log(error);
		return '0';
	}
}

export async function getBalance(
	client: SecretNetworkClient,
	token: Token,
	address: string,
	auth: string
): Promise<string> {
	try {
		const snip20Response = await client.query.snip20.getBalance({
			contract: {
				address: token.address,
				code_hash: token.codeHash,
			},
			address: address,
			auth: {
				key: auth,
			},
		});
		const balance = (parseInt(snip20Response.balance.amount) / 10 ** token.decimals).toString();
		return balance;
	} catch (error) {
		console.log(error);
		return '👀';
	}
}
