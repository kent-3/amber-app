import{S as Y,i as Z,s as w,e as j,b as J,W as M,h as _,$ as x,Q as tt,K as Q,L as W,k as N,q as I,a as A,l as p,m as O,r as L,c as D,n as C,F as h,N as F,a0 as et,u as U,_ as at,O as $,a6 as lt,a7 as ot,y as st,z as nt,A as ct,g as rt,d as it,B as ut}from"../chunks/index.1ba1bd69.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.dd8f6209.js";import{s as dt,A as P}from"../chunks/contracts.9bf8df88.js";import{c as ft}from"../chunks/clipboard.408a5421.js";import{b as ht}from"../chunks/stores.c1946089.js";function G(o){let e,t,a,s=X(o[0])+"",E,b,n,v=(o[7]?o[4]:o[3])+"",m,B,c,r,i,u,S,d,g,k;function T(f,y){return f[5]?mt:bt}let q=T(o),l=q(o);return{c(){e=N("div"),t=N("header"),a=N("span"),E=I(s),b=A(),n=N("button"),m=I(v),r=A(),i=N("pre"),u=N("code"),l.c(),this.h()},l(f){e=p(f,"DIV",{class:!0,"data-testid":!0});var y=O(e);t=p(y,"HEADER",{class:!0});var H=O(t);a=p(H,"SPAN",{class:!0});var R=O(a);E=L(R,s),R.forEach(_),b=D(H),n=p(H,"BUTTON",{class:!0});var V=O(n);m=L(V,v),V.forEach(_),H.forEach(_),r=D(y),i=p(y,"PRE",{class:!0});var z=O(i);u=p(z,"CODE",{class:!0});var K=O(u);l.l(K),K.forEach(_),z.forEach(_),y.forEach(_),this.h()},h(){C(a,"class","code-block-language"),C(n,"class",B="code-block-btn "+o[2]),C(t,"class","code-block-header "+kt),C(u,"class",S="code-block-code language-"+o[0]),C(i,"class","code-block-pre "+yt),C(e,"class",d="code-block "+o[8]),C(e,"data-testid","code-block")},m(f,y){J(f,e,y),h(e,t),h(t,a),h(a,E),h(t,b),h(t,n),h(n,m),h(e,r),h(e,i),h(i,u),l.m(u,null),g||(k=[F(n,"click",o[9]),et(c=ft.call(null,n,o[1]))],g=!0)},p(f,y){y&1&&s!==(s=X(f[0])+"")&&U(E,s),y&152&&v!==(v=(f[7]?f[4]:f[3])+"")&&U(m,v),y&4&&B!==(B="code-block-btn "+f[2])&&C(n,"class",B),c&&at(c.update)&&y&2&&c.update.call(null,f[1]),q===(q=T(f))&&l?l.p(f,y):(l.d(1),l=q(f),l&&(l.c(),l.m(u,null))),y&1&&S!==(S="code-block-code language-"+f[0])&&C(u,"class",S),y&256&&d!==(d="code-block "+f[8])&&C(e,"class",d)},d(f){f&&_(e),l.d(),g=!1,$(k)}}}function bt(o){let e=o[1].trim()+"",t;return{c(){t=I(e)},l(a){t=L(a,e)},m(a,s){J(a,t,s)},p(a,s){s&2&&e!==(e=a[1].trim()+"")&&U(t,e)},d(a){a&&_(t)}}}function mt(o){let e,t;return{c(){e=new lt(!1),t=j(),this.h()},l(a){e=ot(a,!1),t=j(),this.h()},h(){e.a=t},m(a,s){e.m(o[6],a,s),J(a,t,s)},p(a,s){s&64&&e.p(a[6])},d(a){a&&_(t),a&&e.d()}}}function _t(o){let e,t=o[0]&&o[1]&&G(o);return{c(){t&&t.c(),e=j()},l(a){t&&t.l(a),e=j()},m(a,s){t&&t.m(a,s),J(a,e,s)},p(a,[s]){a[0]&&a[1]?t?t.p(a,s):(t=G(a),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:M,o:M,d(a){t&&t.d(a),a&&_(e)}}}const gt="overflow-hidden shadow",kt="text-xs text-white/50 uppercase flex justify-between items-center p-2 pl-4",yt="whitespace-pre-wrap break-all p-4 pt-1";function X(o){return o==="js"?"javascript":o==="ts"?"typescript":o}function Ct(o,e,t){let a,s;x(o,dt,l=>t(16,s=l));const E=tt();let{language:b="plaintext"}=e,{code:n=""}=e,{background:v="bg-neutral-900/90"}=e,{blur:m=""}=e,{text:B="text-sm"}=e,{color:c="text-white"}=e,{rounded:r="rounded-container-token"}=e,{shadow:i="shadow"}=e,{button:u="btn btn-sm variant-soft !text-white"}=e,{buttonLabel:S="Copy"}=e,{buttonCopied:d="👍"}=e,g=!1,k=n,T=!1;function q(){t(7,T=!0),setTimeout(()=>{t(7,T=!1)},2e3),E("copy",{})}return o.$$set=l=>{t(18,e=Q(Q({},e),W(l))),"language"in l&&t(0,b=l.language),"code"in l&&t(1,n=l.code),"background"in l&&t(10,v=l.background),"blur"in l&&t(11,m=l.blur),"text"in l&&t(12,B=l.text),"color"in l&&t(13,c=l.color),"rounded"in l&&t(14,r=l.rounded),"shadow"in l&&t(15,i=l.shadow),"button"in l&&t(2,u=l.button),"buttonLabel"in l&&t(3,S=l.buttonLabel),"buttonCopied"in l&&t(4,d=l.buttonCopied)},o.$$.update=()=>{o.$$.dirty&65539&&s!==void 0&&(t(6,k=s.highlight(n,{language:b}).value.trim()),t(5,g=!0)),t(8,a=`${gt} ${v} ${m} ${B} ${c} ${r} ${i} ${e.class??""}`)},e=W(e),[b,n,u,S,d,g,k,T,a,q,v,m,B,c,r,i,s]}class vt extends Y{constructor(e){super(),Z(this,e,Ct,_t,w,{language:0,code:1,background:10,blur:11,text:12,color:13,rounded:14,shadow:15,button:2,buttonLabel:3,buttonCopied:4})}}function Et(o){let e,t,a,s,E,b,n,v,m,B,c,r,i,u,S;return r=new vt({props:{language:"json",code:o[0]}}),{c(){e=N("div"),t=N("div"),a=N("button"),s=I("Latest Block Info"),E=A(),b=N("button"),n=I("Community Pool Funds"),v=A(),m=N("button"),B=I("Amber Contract Info"),c=A(),st(r.$$.fragment),this.h()},l(d){e=p(d,"DIV",{class:!0});var g=O(e);t=p(g,"DIV",{class:!0});var k=O(t);a=p(k,"BUTTON",{class:!0});var T=O(a);s=L(T,"Latest Block Info"),T.forEach(_),E=D(k),b=p(k,"BUTTON",{class:!0});var q=O(b);n=L(q,"Community Pool Funds"),q.forEach(_),v=D(k),m=p(k,"BUTTON",{class:!0});var l=O(m);B=L(l,"Amber Contract Info"),l.forEach(_),k.forEach(_),c=D(g),nt(r.$$.fragment,g),g.forEach(_),this.h()},h(){C(a,"class","btn variant-filled-secondary"),C(b,"class","btn variant-filled-secondary"),C(m,"class","btn variant-filled-secondary"),C(t,"class","card variant-ghost-surface flex flex-col p-4 space-y-2 text-left"),C(e,"class","container h-full flex flex-col sm:flex-row gap-4 p-4 sm:items-start")},m(d,g){J(d,e,g),h(e,t),h(t,a),h(a,s),h(t,E),h(t,b),h(b,n),h(t,v),h(t,m),h(m,B),h(e,c),ct(r,e,null),i=!0,u||(S=[F(a,"click",o[4]),F(b,"click",o[5]),F(m,"click",o[6])],u=!0)},p(d,[g]){const k={};g&1&&(k.code=d[0]),r.$set(k)},i(d){i||(rt(r.$$.fragment,d),i=!0)},o(d){it(r.$$.fragment,d),i=!1},d(d){d&&_(e),ut(r),u=!1,$(S)}}}function Bt(o,e,t){let a;x(o,ht,c=>t(7,a=c));let s;async function E(){const c=await a.query.distribution.communityPool({});t(0,s=JSON.stringify(c.pool,null,2))}async function b(){var c,r,i;try{const u=await a.query.tendermint.getLatestBlock({});console.log((r=(c=u.block)==null?void 0:c.header)==null?void 0:r.time),t(0,s=JSON.stringify((i=u.block)==null?void 0:i.header,null,2))}catch(u){console.error(u)}}async function n(){const c=await a.query.compute.contractInfo({contract_address:P.address}),r=await a.query.snip20.getSnip20Params({contract:{address:P.address,code_hash:P.code_hash}}),i=await a.query.snip20.queryContract({contract_address:P.address,code_hash:P.code_hash,query:{token_config:{}}});t(0,s=JSON.stringify(c,null,2)+`,
`+JSON.stringify(r,null,2)+`,
`+JSON.stringify(i,null,2))}return[s,E,b,n,()=>b(),()=>E(),()=>n()]}class qt extends Y{constructor(e){super(),Z(this,e,Bt,Et,w,{})}}export{qt as default};
