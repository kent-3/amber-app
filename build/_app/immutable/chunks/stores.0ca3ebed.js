import{e as S}from"./browser.93fa1394.js";import{w as t}from"./index.632f5441.js";import{C}from"./index.2f0148f8.js";const _={"Secret Network":{chain_name:"Secret Network",deposit_channel_id:"",deposit_gas:0,withdraw_channel_id:"",withdraw_gas:0,chain_id:"secret-4",bech32_prefix:"secret",lcd:"https://lcd.secret.express",rpc:"https://rpc.secret.express",chain_image:"/scrt.svg",explorer_account:"https://www.mintscan.io/secret/account/"}},m={};function p(e){return e==="local"?localStorage:sessionStorage}function l(e,a,s){const n=(s==null?void 0:s.serializer)??JSON,w=(s==null?void 0:s.storage)??"local";function g(c,i){p(w).setItem(c,n.stringify(i))}if(!m[e]){const c=t(a,r=>{const o=p(w).getItem(e);o&&r(n.parse(o));{const h=d=>{d.key===e&&r(d.newValue?n.parse(d.newValue):null)};return window.addEventListener("storage",h),()=>window.removeEventListener("storage",h)}}),{subscribe:i,set:u}=c;m[e]={set(r){g(e,r),u(r)},update(r){const o=r(C(c));g(e,o),u(o)},subscribe:i}}return m[e]}const M=l("modeOsPrefers",!1),U=l("modeUserPrefers",void 0),A=l("modeCurrent",!1);function B(){const e=window.matchMedia("(prefers-color-scheme: light)").matches;return M.set(e),e}function D(e){U.set(e)}function H(e){const a=document.documentElement.classList,s="dark";e===!0?a.remove(s):a.add(s),A.set(e)}function T(){const e=document.documentElement.classList,a=localStorage.getItem("modeUserPrefers")==="false",s=!("modeUserPrefers"in localStorage),n=window.matchMedia("(prefers-color-scheme: dark)").matches;a||s&&n?e.add("dark"):e.remove("dark")}const b=_["Secret Network"].chain_id,f=_["Secret Network"].lcd;function j(){P.set(!1),v.set({name:"",algo:"",pubKey:new Uint8Array,address:new Uint8Array,bech32Address:"",isNanoLedger:!1,isKeystone:!1}),E.set(new S.SecretNetworkClient({url:f,chainId:b})),L.set("secret1..."),N.set("🤫"),k.set("🤫"),y.set(new Map),I.set(new Map),console.log("stores reset")}const P=l("accountAvailable",!1),v=t({name:"",algo:"",pubKey:new Uint8Array,address:new Uint8Array,bech32Address:"",isNanoLedger:!1,isKeystone:!1}),E=t(new S.SecretNetworkClient({url:f,chainId:b})),L=t("secret1..."),N=t("🤫"),k=t("🤫"),z=t(new Map),y=t(new Map),I=t(new Map),R=t(f);export{H as a,D as b,E as c,k as d,L as e,N as f,B as g,_ as h,P as i,R as j,v as k,A as m,j as r,T as s,z as t,y as v};