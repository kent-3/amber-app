import{b as s}from"./browser.f1978947.js";import{w as e}from"./index.b3b988f7.js";const t={"Secret Network":{chain_name:"Secret Network",deposit_channel_id:"",deposit_gas:0,withdraw_channel_id:"",withdraw_gas:0,chain_id:"secret-4",bech32_prefix:"secret",lcd:"https://lcd.secret.express",rpc:"https://rpc.secret.express",chain_image:"/scrt.svg",explorer_account:"https://www.mintscan.io/secret/account/"}},r=t["Secret Network"].chain_id,a=t["Secret Network"].lcd;function b(){n.set(!1),c.set({name:"",algo:"",pubKey:new Uint8Array,address:new Uint8Array,bech32Address:"",isNanoLedger:!1,isKeystone:!1}),o.set(new s.SecretNetworkClient({url:a,chainId:r})),i.set("secret1..."),l.set("🤫"),w.set("🤫"),d.set(new Map),p.set(new Map),console.log("stores reset")}const n=e(!1),c=e({name:"",algo:"",pubKey:new Uint8Array,address:new Uint8Array,bech32Address:"",isNanoLedger:!1,isKeystone:!1}),o=e(new s.SecretNetworkClient({url:a,chainId:r})),i=e("secret1..."),l=e("🤫"),w=e("🤫"),f=e(new Map),d=e(new Map),p=e(new Map);export{w as a,o as b,l as c,t as d,n as i,c as k,b as r,i as s,f as t,d as v};