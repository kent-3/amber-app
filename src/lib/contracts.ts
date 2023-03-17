import type { SecretAddress } from "./tokens"

interface Contract {
    address: SecretAddress,
    code_hash: string,
}

export const sSCRT: Contract = {
    address: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
    code_hash: 'af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e'
}

export const AMBER: Contract = {
    address: 'secret1s09x2xvfd2lp2skgzm29w2xtena7s8fq98v852',
    code_hash: '5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042'
}
