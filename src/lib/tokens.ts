export type SecretAddress = `secret1${string}`

export interface Token {
	address: SecretAddress
	codeHash: string
	name: string
	symbol: string
	logo: string
	decimals: number
}

export const tokenList: Array<Token> = [
	{
		address: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
		codeHash: 'af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e',
		name: 'Secret SCRT',
		symbol: 'sSCRT',
		logo: '/scrt.svg',
		decimals: 6,
	},
	{
		address: 'secret1s09x2xvfd2lp2skgzm29w2xtena7s8fq98v852',
		codeHash: '5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042',
		name: 'Amber',
		symbol: 'AMBER',
		logo: '/amber.svg',
		decimals: 6,
	},
	// {
	//   address: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
	//   codeHash: "c7fe67b243dfedc625a28ada303434d6f5a46a3086e7d2b5063a814e9f9a379d",
	//   name: "Secret Finance",
	//   symbol: "SEFI",
	//   logo: "/sefi.svg",
	// },
	{
		address: "secret1vq0gc5wdjqnalvtgra3dr4m07kaxkhq2st3hzx",
		codeHash: "84508d76f34061e5e394b596fc293f1bf66d33d03def5b77a27643f2bc0bea8d",
		name: "Sienna",
		symbol: "SIENNA",
		logo: "/sienna.svg",
		decimals: 18,
	},
	{
		address: 'secret1qfql357amn448duf5gvp9gr48sxx9tsnhupu3d',
		codeHash: 'fa824c4504f21fc59250da0cdf549dd392fd862baf2689d246a07b9e941f04a9',
		name: 'Shade',
		symbol: 'SHD',
		logo: '/shade.svg',
		decimals: 8,
	},
	{
		address: 'secret1k6u0cy4feepm6pehnz804zmwakuwdapm69tuc4',
		codeHash: '',
		name: 'SCRT Staking Derivatives',
		symbol: 'stkd-SCRT',
		logo: '/stkd-scrt.svg',
		decimals: 6,
	},
	{
		address: 'secret16xz08fdtkp5m8m6arpfgnehlfl4t86l0p33xg0',
		codeHash: 'b6c896d21e46e037a2a1bca1d55af262d7ae4a5a175af055f3939722626b30c3',
		name: 'Silk',
		symbol: 'SILK',
		logo: '',
		decimals: 6,
	},
	{
		address: 'secret14mzwd0ps5q277l20ly2q3aetqe3ev4m4260gf4',
		codeHash: 'ad91060456344fc8d8e93c0600a3957b8158605c044b3bef7048510b3157b807',
		name: 'Cosmos Hub',
		symbol: 'sATOM',
		logo: '/atom.jpg',
		decimals: 6,
	},
	// {
	// 	address: 'secret1zwwealwm0pcl9cul4nt6f38dsy6vzplw8lp3qg',
	// 	codeHash: 'ad91060456344fc8d8e93c0600a3957b8158605c044b3bef7048510b3157b807',
	// 	name: 'Osmosis',
	// 	symbol: 'sOSMO',
	// 	logo: '/osmo.jpeg',
	// },
	// {
	//   address: "secret19ungtd2c7srftqdwgq0dspwvrw63dhu79qxv88",
	//   codeHash: "667a3dbec9096de530a5521a83e6090df0956475bd4acc8d05f382d4f8ffdd05",
	//   name: "Secret Monero",
	//   symbol: "sXMR",
	//   logo: "/sXMR.png",
	// },
	{
		address: "secret1yxcexylwyxlq58umhgsjgstgcg2a0ytfy4d9lt",
		codeHash: "f8b27343ff08290827560a1ba358eece600c9ea7f403b02684ad87ae7af0f288",
		name: "Buttcoin",
		symbol: "BUTT",
		logo: "/butt.png",
		// TODO verify this
		decimals: 6,
	},
	{
		address: "secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798",
		codeHash: "15361339b59f2753fc365283d4a144dd3a4838e237022ac0249992d8d9f3b88e",
		name: "Fat Secret",
		symbol: "FATS",
		logo: "/fat_secret.png",
		decimals: 3,
	},
	// ETH
	// {
	//   address: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
	//   codeHash: "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
	//   name: "Ethereum",
	//   symbol: "ETH",
	//   logo: "/eth.png",
	// },
	// {
	//   address: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
	//   codeHash: "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
	//   name: "Tether",
	//   symbol: "USDT",
	//   logo: "/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
	// },
	// {
	//   address: "secret1yxwnyk8htvvq25x2z87yj0r5tqpev452fk6h5h",
	//   codeHash: "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
	//   name: "Aave",
	//   symbol: "AAVE",
	//   logo: "/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
	// },
	// {
	//   address: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a",
	//   codeHash: "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
	//   name: "Wrapped BTC",
	//   symbol: "WBTC",
	//   logo: "/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
	// }
]
