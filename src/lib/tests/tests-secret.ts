import { chains } from '../config';
import { SecretNetworkClient, toBase64 } from 'secretjs';
// import { keccak256 } from '@cosmjs/crypto';
// import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
// import * as stores from '$lib/stores'
import { AMBER, sSCRT } from '$lib/contracts';

const secretAddress = 'secret1tvsne5ugx9e60qdq6whua6j5pjnv5jf3d7k0va';
const sSCRT_viewingKey = 'api_key_GwbVPXX2Sxb4RFa5yQgRFG/+1k+YXV/2EX8LS0NlXXk=';
const AMBER_viewingKey = 'api_key_jnLFB/CjNDKeMiva6QhhqNAGEu7KJboYqtoLVhaQ2bc=';

const SECRET_LCD = chains['Secret Network'].lcd;
const SECRET_CHAIN_ID = chains['Secret Network'].chain_id;

const secretjs = new SecretNetworkClient({
	url: SECRET_LCD,
	chainId: SECRET_CHAIN_ID,
});

interface Contract {
	address: string;
	code_hash: string;
}

interface Query {
	id: string;
	contract: Contract;
	query: string;
}

export async function testBatchQuery() {
	const encoder = new TextEncoder();
	const id = new Uint8Array(1);

	const sSCRT_query = toBase64(
		encoder.encode(
			JSON.stringify({
				balance: {
					address: secretAddress,
					key: sSCRT_viewingKey,
				},
			})
		)
	);

	const AMBER_query = toBase64(
		encoder.encode(
			JSON.stringify({
				balance: {
					address: secretAddress,
					key: AMBER_viewingKey,
				},
			})
		)
	);

	id.set([1]);
	console.log(id);
	console.log(`Base64: ${toBase64(id)}`);

	const query1: Query = {
		id: toBase64(id),
		contract: {
			address: sSCRT.address,
			code_hash: sSCRT.code_hash,
		},
		query: sSCRT_query,
	};

	id.set([2]);
	console.log(id);
	console.log(`Base64: ${toBase64(id)}`);

	const query2: Query = {
		id: toBase64(id),
		contract: {
			address: AMBER.address,
			code_hash: AMBER.code_hash,
		},
		query: AMBER_query,
	};

	console.log(query1);
	console.log(query2);

	try {
		const response = await secretjs.query.compute.queryContract({
			contract_address: 'secret17gnlxnwux0szd7qhl90ym8lw22qvedjz4v09dm',
			code_hash: '72a09535b77b76862f7b568baf1ddbe158a2e4bbd0f0879c69ada9b398e31c1f',
			query: { batch: { queries: [query1, query2] } },
		});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

// async function getBalances() {
//     try {
//         const response = await secretjs.query.bank.balance({
//             address: secretAddress,
//             denom: 'uscrt'
//         })
//     } catch (error) {
//         console.log(error)
//     }

//     try {
//         const snip20Response = await secretjs.query.snip20.getBalance({
//             contract: {
//                 address: AMBER.address,
//                 code_hash: AMBER.code_hash
//             },
//             address: secretAddress,
//             auth: {
//                 key: viewingKey
//             }
//         })
//     } catch (error) {
//         console.error(error)
//     }
// }
