import type { PageLoad } from './$types';
import { SecretNetworkClient } from 'secretjs';
import axios from "axios";

// let secretjs: SecretNetworkClient
// secretClient.subscribe((value)=> secretjs=value )
// const secretjs = new SecretNetworkClient({
//     url: "https://lcd.secret.express",
//     chainId: "secret-4"
// });

// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     maximumFractionDigits: 0
// });

// const scrtPrice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=secret&vs_currencies=usd')
// const validatorResponse = await secretjs.query.staking.validator({validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6'})
// const validatorDelegationsResponse = await secretjs.query.staking.validatorDelegations({validator_addr: 'secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6', pagination: {limit:'1', count_total: true}})
// const scrt = Math.round(parseInt(validatorResponse.validator?.tokens ?? "0") / 1000000 )

export const load = (() => {

    return {
    //     stakeValue: formatter.format(scrt * scrtPrice.data.secret.usd),
    //     votingPower: Math.round(parseInt(validatorResponse.validator?.tokens ?? "0") / 1000000).toLocaleString(),
    //     delegators: parseInt(validatorDelegationsResponse.pagination?.total ?? "0").toLocaleString(),
    //     commission: validatorResponse.validator?.commission
    };
}) satisfies PageLoad;