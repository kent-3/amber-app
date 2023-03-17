import{b as w}from"./browser.f1978947.js";import{b as g,v as _,i as p,k as x,s as f,d as u,r as y}from"./stores.c1946089.js";import"./index.1ba1bd69.js";import{w as h}from"./index.b3b988f7.js";import"./ProgressBar.svelte_svelte_type_style_lang.dd8f6209.js";function C(){const{subscribe:e,set:r,update:n}=h([]);return{subscribe:e,set:r,update:n,trigger:t=>n(s=>(s.push(t),s)),close:()=>n(t=>(t.length>0&&t.shift(),t)),clear:()=>r([])}}const b=C(),A={message:"Missing Toast Message",autohide:!0,timeout:5e3};function K(){const e=Math.random();return Number(e).toString(32)}function N(e){e.autohide===!0&&setTimeout(()=>{l.close(e.id)},e.timeout)}function T(){const{subscribe:e,set:r,update:n}=h([]);return{subscribe:e,trigger:t=>n(s=>{const i=K();t&&t.callback&&t.callback({id:i,status:"queued"});const a={...A,...t,id:i};return s.push(a),N(a),s}),close:t=>n(s=>{if(s.length>0){const i=s.findIndex(o=>o.id===t),a=s[i];a&&a.callback&&a.callback({id:t,status:"closed"}),s.splice(i,1)}return s}),clear:()=>r([])}}const l=T(),D={type:"alert",title:"No Wallet Detected",body:`
		<p>Please install a Secret Network wallet<p>
	`,buttonTextCancel:"OK",modalClasses:"variant-ghost-error"},c=u["Secret Network"].chain_id,v=u["Secret Network"].lcd;let m;g.subscribe(e=>m=e);function E(e){return Array.from(e,r=>("0"+(r&255).toString(16)).slice(-2)).join("")}async function H(){var e;await((e=window.keplr)==null?void 0:e.disable(c)),y()}async function q(){if(!window.keplr)b.trigger(D);else{const e=a=>new Promise(o=>setTimeout(o,a));for(;!window.keplr||!window.keplr.getEnigmaUtils||!window.keplr.getOfflineSignerOnlyAmino;)await e(50);await window.keplr.enable(c),window.keplr.defaultOptions={sign:{preferNoSetFee:!1,disableBalanceCheck:!1}};const r=window.keplr.getOfflineSignerOnlyAmino(c),t=(await r.getAccounts())[0].address,s=new w.SecretNetworkClient({url:v,chainId:c,wallet:r,walletAddress:t,encryptionUtils:window.keplr.getEnigmaUtils(c)}),i=await window.keplr.getKey(c);p.set(!0),x.set(i),f.set(t),g.set(s)}}async function F(e){if(!window.keplr){console.error("Keplr not present");return}window.keplr.defaultOptions={sign:{preferNoSetFee:!1,disableBalanceCheck:!1}};const r="Create Viewing Key",n=new Uint8Array(32),t=E(window.crypto.getRandomValues(n)),s=.0125;try{const i="one amber club",a=await m.tx.snip20.setViewingKey({sender:m.address,contract_address:e,msg:{set_viewing_key:{key:t,padding:i}}},{gasLimit:4e4,gasPriceInFeeDenom:s,feeDenom:"uscrt"});if(a.code===0){const o=a.gasWanted*s/1e6;_.update(S=>S.set(e,t));const k={message:`
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
						<dd>${o} SCRT</dd>
						<dt class="opacity-50">Gas Used:</dt>
						<dd>${a.gasUsed.toLocaleString()}</dd>
						<dt class="opacity-50">Key:</dt>
						<dd>${t}</dd>
					</dl>
					</details>
				`,background:"variant-glass-surface !bg-success-900 !bg-opacity-50 sm:!bg-opacity-30 ring-2 ring-inset ring-success-800",autohide:!1,classes:"-translate-y-4 font-semibold"};l.trigger(k)}else{console.log(a.rawLog);const o={message:`
				<h4>Transaction Failed</h4>
				<details class="text-sm">
					<summary>Details</summary>
					<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
						<dt class="opacity-50">Raw Log:</dt>
						<dd>${a.rawLog}</dd>
					</dl>
				</details>
				`,background:"variant-glass-secondary ring-1 ring-inset ring-error-500",autohide:!1,classes:"-translate-y-4 font-semibold"};l.trigger(o)}}catch(i){const a={message:`
			<h4>Something went wrong 🤔</h4>
			<details class="text-sm">
				<summary>Details</summary>
				<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
					<dt class="opacity-50">Action:</dt>
					<dd>${r}</dd>
					<dt class="opacity-50">Message:</dt>
					<dd class="text-error-500">${i.message}</dd>
				</dl>
			</details>
			`,background:"variant-glass-secondary ring-1 ring-inset ring-secondary-500",autohide:!1,classes:"-translate-y-4 font-semibold"};l.trigger(a)}}async function P(e){if(!window.keplr)return console.error("Keplr not present"),null;try{return await window.keplr.getSecret20ViewingKey(c,e)}catch{return null}}const $={type:"alert",title:"No Wallet Detected",body:`
		<p>Please install a Secret Network wallet<p>
	`,buttonTextCancel:"OK",modalClasses:"variant-ghost-error"},I=u["Secret Network"].chain_id,M=u["Secret Network"].lcd,d=window.ethereum;g.subscribe(e=>e);async function j(){await d.request({method:"eth_requestAccounts"}),y()}async function W(){if(!d)b.trigger($);else{const e=s=>new Promise(i=>setTimeout(i,s));for(;!window.ethereum;)await e(50);const[r]=await d.request({method:"eth_requestAccounts"}),n=await w.MetaMaskWallet.create(d,r);console.log(n.address);const t=new w.SecretNetworkClient({url:M,chainId:I,wallet:n,walletAddress:n.address});p.set(!0),f.set(n.address),g.set(t)}}export{W as a,j as b,F as c,H as d,P as g,b as m,q as s,l as t};
