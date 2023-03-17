import{b as w}from"./browser.f1978947.js";import{d as g,i as h,k as A,s as k,b as p,r as b,v as K}from"./stores.c1946089.js";import"./index.1ba1bd69.js";import{A as y}from"./contracts.4e7b2a19.js";import{w as _}from"./index.b3b988f7.js";function N(){const{subscribe:e,set:r,update:n}=_([]);return{subscribe:e,set:r,update:n,trigger:t=>n(s=>(s.push(t),s)),close:()=>n(t=>(t.length>0&&t.shift(),t)),clear:()=>r([])}}const x=N(),T={message:"Missing Toast Message",autohide:!0,timeout:5e3};function v(){const e=Math.random();return Number(e).toString(32)}function D(e){e.autohide===!0&&setTimeout(()=>{l.close(e.id)},e.timeout)}function E(){const{subscribe:e,set:r,update:n}=_([]);return{subscribe:e,trigger:t=>n(s=>{const a=v();t&&t.callback&&t.callback({id:a,status:"queued"});const o={...T,...t,id:a};return s.push(o),D(o),s}),close:t=>n(s=>{if(s.length>0){const a=s.findIndex(c=>c.id===t),o=s[a];o&&o.callback&&o.callback({id:t,status:"closed"}),s.splice(a,1)}return s}),clear:()=>r([])}}const l=E(),M={type:"alert",title:"No Wallet Detected",body:`
		<p>Please install a Secret Network wallet<p>
	`,buttonTextCancel:"OK",modalClasses:"variant-ghost-error"},i=g["Secret Network"].chain_id,O=g["Secret Network"].lcd;async function P(){var e;await((e=window.keplr)==null?void 0:e.disable(i)),b()}async function F(){if(!window.keplr)x.trigger(M);else{const e=o=>new Promise(c=>setTimeout(c,o));for(;!window.keplr||!window.keplr.getEnigmaUtils||!window.keplr.getOfflineSignerOnlyAmino;)await e(50);await window.keplr.enable(i),window.keplr.defaultOptions={sign:{preferNoSetFee:!1,disableBalanceCheck:!1}};const r=window.keplr.getOfflineSignerOnlyAmino(i),t=(await r.getAccounts())[0].address,s=new w.SecretNetworkClient({url:O,chainId:i,wallet:r,walletAddress:t,encryptionUtils:window.keplr.getEnigmaUtils(i)}),a=await window.keplr.getKey(i);h.set(!0),A.set(a),k.set(t),p.set(s)}}async function W(e){if(!window.keplr){console.error("Keplr not present");return}try{await window.keplr.suggestToken(i,e)}catch(r){console.log(r)}}async function j(e){if(!window.keplr)return console.error("Keplr not present"),null;try{return await window.keplr.getSecret20ViewingKey(i,e)}catch{return null}}const $={type:"alert",title:"No Wallet Detected",body:`
		<p>Please install a Secret Network wallet<p>
	`,buttonTextCancel:"OK",modalClasses:"variant-ghost-error"},I=g["Secret Network"].chain_id,L=g["Secret Network"].lcd,d=window.ethereum;let m;p.subscribe(e=>m=e);async function J(){await d.request({method:"eth_requestAccounts"}),b()}async function B(){if(!d)x.trigger($);else{const e=s=>new Promise(a=>setTimeout(a,s));for(;!window.ethereum;)await e(50);const[r]=await d.request({method:"eth_requestAccounts"}),n=await w.MetaMaskWallet.create(d,r);console.log(n.address);const t=new w.SecretNetworkClient({url:L,chainId:I,wallet:n,walletAddress:n.address});h.set(!0),k.set(n.address),p.set(t)}}async function G(e){console.log(`creating metamask vk for ${e}`);const r="Create Viewing Key",n=.0125;try{const t="one amber club",s="xoxoxo",a=await m.tx.snip20.createViewingKey({sender:m.address,contract_address:y.address,code_hash:y.code_hash,msg:{create_viewing_key:{entropy:t,padding:s}}},{gasLimit:5e4,gasPriceInFeeDenom:n,feeDenom:"uscrt"});if(a.code===0){console.log(a);const o=new TextDecoder("utf-8").decode(a.data[0].subarray(3)),f=JSON.parse(o).create_viewing_key.key;console.log(f),console.log(a.events.find(u=>u.type==="coin_spent"));const S=a.gasWanted*n/1e6;K.update(u=>u.set(e,f));const C={message:`
				<h4>Transaction Success 🥳</h4>
				<details class="text-sm">
					<summary>Details</summary>
					<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
						<dt class="opacity-50">Tx Hash:</dt>
						<a
							href="https://www.mintscan.io/secret/txs/${a.transactionHash}"
							target="_blank"
							rel="noreferrer"
						>
							<dd>View on block explorer</dd>
						</a>
						<dt class="opacity-50">Fee:</dt>
						<dd>${S} SCRT</dd>
						<dt class="opacity-50">Gas Used:</dt>
						<dd>${a.gasUsed.toLocaleString()}</dd>
					</dl>
					</details>
				`,background:"variant-glass-surface !bg-success-900 !bg-opacity-50 sm:!bg-opacity-30 ring-2 ring-inset ring-success-800",autohide:!1,classes:"-translate-y-4 font-semibold"};l.trigger(C)}else{console.log(a.rawLog);const o={message:`
				<h4>Transaction Failed</h4>
				<details class="text-sm">
					<summary>Details</summary>
					<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
						<dt class="opacity-50">Raw Log:</dt>
						<dd>${a.rawLog}</dd>
					</dl>
				</details>
				`,background:"variant-glass-secondary ring-1 ring-inset ring-error-500",autohide:!1,classes:"-translate-y-4 font-semibold"};l.trigger(o)}}catch(t){const s={message:`
			<h4>Something went wrong 🤔</h4>
			<details class="text-sm">
				<summary>Details</summary>
				<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
					<dt class="opacity-50">Action:</dt>
					<dd>${r}</dd>
					<dt class="opacity-50">Message:</dt>
					<dd class="text-error-500">${t.message}</dd>
				</dl>
			</details>
			`,background:"variant-glass-secondary ring-1 ring-inset ring-secondary-500",autohide:!1,classes:"-translate-y-4 font-semibold"};l.trigger(s)}}export{B as a,J as b,G as c,P as d,W as e,j as g,x as m,F as s,l as t};
