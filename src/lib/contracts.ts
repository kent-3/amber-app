import type { SecretAddress } from './tokens';

interface Contract {
	address: SecretAddress;
	code_hash: string;
}

export const sSCRT: Contract = {
	address: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
	code_hash: 'af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e',
};

export const AMBER: Contract = {
	address: 'secret1s09x2xvfd2lp2skgzm29w2xtena7s8fq98v852',
	code_hash: '9a00ca4ad505e9be7e6e6dddf8d939b7ec7e9ac8e109c8681f10db9cacb36d42',
};
