import{b as f}from"./browser.f1978947.js";import{b as w,v as $,i as k,k as N,s as x,d as p,r as S}from"./stores.2a7a0fd6.js";import"./index.86962765.js";import{w as C}from"./index.bdbcb4eb.js";import"./ProgressBar.svelte_svelte_type_style_lang.3abe5e1b.js";function v(){const{subscribe:e,set:a,update:r}=C([]);return{subscribe:e,set:a,update:r,trigger:t=>r(s=>(s.push(t),s)),close:()=>r(t=>(t.length>0&&t.shift(),t)),clear:()=>a([])}}const h=v(),D={message:"Missing Toast Message",autohide:!0,timeout:5e3};function E(){const e=Math.random();return Number(e).toString(32)}function M(e){e.autohide===!0&&setTimeout(()=>{u.close(e.id)},e.timeout)}function O(){const{subscribe:e,set:a,update:r}=C([]);return{subscribe:e,trigger:t=>r(s=>{const n=E();t&&t.callback&&t.callback({id:n,status:"queued"});const o={...D,...t,id:n};return s.push(o),M(o),s}),close:t=>r(s=>{if(s.length>0){const n=s.findIndex(l=>l.id===t),o=s[n];o&&o.callback&&o.callback({id:t,status:"closed"}),s.splice(n,1)}return s}),clear:()=>a([])}}const u=O(),I={type:"alert",title:"No Wallet Detected",body:`
		<p>Please install a Secret Network wallet<p>
	`,buttonTextCancel:"OK",modalClasses:"variant-ghost-error"},c=p["Secret Network"].chain_id,L=p["Secret Network"].lcd;let y;w.subscribe(e=>y=e);function R(e){return Array.from(e,a=>("0"+(a&255).toString(16)).slice(-2)).join("")}async function G(){var e;await((e=window.keplr)==null?void 0:e.disable(c)),S()}async function B(){if(!window.keplr)h.trigger(I);else{const e=o=>new Promise(l=>setTimeout(l,o));for(;!window.keplr||!window.keplr.getEnigmaUtils||!window.keplr.getOfflineSignerOnlyAmino;)await e(50);await window.keplr.enable(c),window.keplr.defaultOptions={sign:{preferNoSetFee:!1,disableBalanceCheck:!1}};const a=window.keplr.getOfflineSignerOnlyAmino(c),t=(await a.getAccounts())[0].address,s=new f.SecretNetworkClient({url:L,chainId:c,wallet:a,walletAddress:t,encryptionUtils:window.keplr.getEnigmaUtils(c)}),n=await window.keplr.getKey(c);k.set(!0),N.set(n),x.set(t),w.set(s)}}async function J(e){if(!window.keplr){console.error("Keplr not present");return}window.keplr.defaultOptions={sign:{preferNoSetFee:!1,disableBalanceCheck:!1}};const a="Set Viewing Key",r=new Uint8Array(32),t=R(window.crypto.getRandomValues(r)),s="one amber club",n=y.address,o=e,l={set_viewing_key:{key:t,padding:s}},d=4e4,b=.0125,_="uscrt",A={type:"confirm",title:"Review Message Details",body:`
			<dl class="font-mono grid grid-cols-[6rem_minmax(0,_2fr)]">
				<dt class="opacity-50">Sender:</dt>
				<dd class="overflow-x-auto">${n}</dd>
				<dt class="opacity-50">Contract:</dt>
				<dd class="overflow-x-auto">${o}</dd>
				<dt class="opacity-50">Message:</dt>
				<dd><pre class="!text-xs !text-primary-500 !whitespace-pre !scroll-m-1">${JSON.stringify(l,null,2)}</pre></dd>
				<dt class="opacity-50">Gas Limit:</dt>
				<dd>${d.toLocaleString()}</dd>
				<dt class="opacity-50">Gas Fee:</dt>
				<dd>
					<span class="text-tertiary-600">${d*.0125}</span> /
					<span class="text-secondary-400">${d*.1}</span> /
					<span class="text-primary-500">${d*.25}</span> uscrt
				</dd>
			</dl>
		`,modalClasses:"ring-2 ring-surface-500 w-modal",response:i=>{},buttonTextCancel:"Cancel",buttonTextConfirm:"Confirm"};h.trigger(A);try{const i=await y.tx.snip20.setViewingKey({sender:n,contract_address:o,msg:l},{gasLimit:d,gasPriceInFeeDenom:b,feeDenom:_});if(i.code===0){const g=i.gasWanted*b/1e6;$.update(T=>T.set(e,t));const K={message:`
				<h4>Transaction Success 🥳</h4>
				<details class="text-sm">
					<summary>Details</summary>
					<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
						<dt class="opacity-50">Tx Hash:</dt>
						<a
							href="https://www.mintscan.io/secret/txs/${i.transactionHash}"
							target="_blank"
							rel="noreferrer"
						>
							<dd>View on block explorer</dd>
						</a>
						<dt class="opacity-50">Fee:</dt>
						<dd>${g} SCRT</dd>
						<dt class="opacity-50">Gas Used:</dt>
						<dd>${i.gasUsed.toLocaleString()}</dd>
						<dt class="opacity-50">Key:</dt>
						<dd>${t}</dd>
					</dl>
					</details>
				`,background:"variant-glass-surface !bg-success-900 !bg-opacity-50 sm:!bg-opacity-30 ring-2 ring-inset ring-success-800",autohide:!1,classes:"-translate-y-4 font-semibold"};u.trigger(K)}else{console.log(i.rawLog);const g={message:`
				<h4>Transaction Failed</h4>
				<details class="text-sm">
					<summary>Details</summary>
					<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
						<dt class="opacity-50">Raw Log:</dt>
						<dd>${i.rawLog}</dd>
					</dl>
				</details>
				`,background:"variant-glass-secondary ring-1 ring-inset ring-error-500",autohide:!1,classes:"-translate-y-4 font-semibold"};u.trigger(g)}}catch(i){const g={message:`
			<h4>Something went wrong 🤔</h4>
			<details class="text-sm">
				<summary>Details</summary>
				<dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
					<dt class="opacity-50">Action:</dt>
					<dd>${a}</dd>
					<dt class="opacity-50">Message:</dt>
					<dd class="text-error-500">${i.message}</dd>
				</dl>
			</details>
			`,background:"variant-glass-secondary ring-1 ring-inset ring-secondary-500",autohide:!1,classes:"-translate-y-4 font-semibold"};u.trigger(g)}}async function z(e){if(!window.keplr)return console.error("Keplr not present"),null;try{return await window.keplr.getSecret20ViewingKey(c,e)}catch{return null}}const U={type:"alert",title:"No Wallet Detected",body:`
		<p>Please install a Secret Network wallet<p>
	`,buttonTextCancel:"OK",modalClasses:"variant-ghost-error"},V=p["Secret Network"].chain_id,F=p["Secret Network"].lcd,m=window.ethereum;w.subscribe(e=>e);async function Q(){await m.request({method:"eth_requestAccounts"}),S()}async function X(){if(!m)h.trigger(U);else{const e=s=>new Promise(n=>setTimeout(n,s));for(;!window.ethereum;)await e(50);const[a]=await m.request({method:"eth_requestAccounts"}),r=await f.MetaMaskWallet.create(m,a);console.log(r.address);const t=new f.SecretNetworkClient({url:F,chainId:V,wallet:r,walletAddress:r.address});k.set(!0),x.set(r.address),w.set(t)}}export{X as a,Q as b,J as c,G as d,z as g,h as m,B as s,u as t};
