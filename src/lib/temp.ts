import type { SecretNetworkClient } from "secretjs";

export async function getSupply(
	client: SecretNetworkClient,
): Promise<string> {
	try {
		const response = await client.query.compute.queryContract({
			query: {
				token_info: {}
			},
			contract_address: "secret153wu605vvp934xhd4k9dtd640zsep5jkesstdm",
			code_hash: "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
		}) as string;
		return response;
	} catch (error) {
		console.log(error);
		return '👀';
	}
}


