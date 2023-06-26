import{S as Q,i as Y,s as L,k as P,a as C,l as x,m as A,h as k,c as I,n as D,b as J,D as O,d as q,f as E,g as S,Y as F,aq as K,U as X,q as Z,r as $,M as ee,y as M,z as U,A as V,ac as z,B as R,v as B,W as te}from"../chunks/index.13f60c6c.js";import{i as re,f as W}from"../chunks/ProgressBar.svelte_svelte_type_style_lang.6c5a6801.js";import{C as se}from"../chunks/CodeBlock.f3f29600.js";import{A as N}from"../chunks/contracts.e8ea57ef.js";import{d as ne}from"../chunks/stores.a58dd92f.js";import{S as oe}from"../chunks/SecretSpinner.2902106f.js";function T(u,t,e){const s=u.slice();return s[15]=t[e],s}function j(u){let t,e=u[15].name+"",s,i,n,c;function y(){return u[3](u[15])}return{c(){t=P("button"),s=Z(e),i=C(),this.h()},l(d){t=x(d,"BUTTON",{class:!0});var m=A(t);s=$(m,e),i=I(m),m.forEach(k),this.h()},h(){D(t,"class","variant-ghost-secondary material-color-transition btn min-w-fit flex-auto text-sm font-bold")},m(d,m){J(d,t,m),O(t,s),O(t,i),n||(c=ee(t,"click",y),n=!0)},p(d,m){u=d},d(d){d&&k(t),n=!1,c()}}}function v(u){let t,e,s,i;return e=new se({props:{language:"json",code:u[1]}}),{c(){t=P("span"),M(e.$$.fragment)},l(n){t=x(n,"SPAN",{});var c=A(t);U(e.$$.fragment,c),c.forEach(k)},m(n,c){J(n,t,c),V(e,t,null),i=!0},p(n,c){const y={};c&2&&(y.code=n[1]),e.$set(y)},i(n){i||(S(e.$$.fragment,n),s||F(()=>{s=z(t,W,{y:200,duration:700,delay:200}),s.start()}),i=!0)},o(n){q(e.$$.fragment,n),i=!1},d(n){n&&k(t),R(e)}}}function H(u){let t,e;return t=new oe({}),{c(){M(t.$$.fragment)},l(s){U(t.$$.fragment,s)},m(s,i){V(t,s,i),e=!0},i(s){e||(S(t.$$.fragment,s),e=!0)},o(s){q(t.$$.fragment,s),e=!1},d(s){R(t,s)}}}function ae(u){let t,e,s,i,n=u[1],c,y,d,m=u[2],f=[];for(let o=0;o<m.length;o+=1)f[o]=j(T(u,m,o));let h=v(u),l=u[0]&&H();return{c(){t=P("div"),e=P("div");for(let o=0;o<f.length;o+=1)f[o].c();s=C(),i=P("div"),h.c(),c=C(),l&&l.c(),this.h()},l(o){t=x(o,"DIV",{class:!0});var p=A(t);e=x(p,"DIV",{class:!0});var r=A(e);for(let g=0;g<f.length;g+=1)f[g].l(r);r.forEach(k),s=I(p),i=x(p,"DIV",{class:!0});var a=A(i);h.l(a),a.forEach(k),c=I(p),l&&l.l(p),p.forEach(k),this.h()},h(){D(e,"class","card flex h-full flex-wrap gap-2 bg-surface-50 p-4 dark:bg-[#28292a] lg:flex-col"),D(i,"class","flex justify-center"),D(t,"class","flex flex-col gap-4 px-2 py-4 pb-12 sm:p-6 md:flex-row md:flex-wrap")},m(o,p){J(o,t,p),O(t,e);for(let r=0;r<f.length;r+=1)f[r]&&f[r].m(e,null);O(t,s),O(t,i),h.m(i,null),O(t,c),l&&l.m(t,null),d=!0},p(o,[p]){if(p&4){m=o[2];let r;for(r=0;r<m.length;r+=1){const a=T(o,m,r);f[r]?f[r].p(a,p):(f[r]=j(a),f[r].c(),f[r].m(e,null))}for(;r<f.length;r+=1)f[r].d(1);f.length=m.length}p&2&&L(n,n=o[1])?(B(),q(h,1,1,te),E(),h=v(o),h.c(),S(h,1),h.m(i,null)):h.p(o,p),o[0]?l?p&1&&S(l,1):(l=H(),l.c(),S(l,1),l.m(t,null)):l&&(B(),q(l,1,1,()=>{l=null}),E())},i(o){d||(S(h),S(l),y||F(()=>{y=z(t,W,{y:200,duration:700}),y.start()}),d=!0)},o(o){q(h),q(l),d=!1},d(o){o&&k(t),K(f,o),h.d(o),l&&l.d()}}}function ce(u,t,e){let s;X(u,ne,r=>e(4,s=r));let i=[{fn:y,name:"Latest Block"},{fn:d,name:"Community Pool Funds"},{fn:m,name:"Amber Contract Info"},{fn:f,name:"Active Proposals"},{fn:h,name:"Total Accounts"},{fn:l,name:"SHD Decoys"},{fn:o,name:"Snip20 History"}],n=!1,c;async function y(){var r;e(0,n=!0);try{const a=await s.query.tendermint.getLatestBlock({});e(1,c=JSON.stringify((r=a.block)==null?void 0:r.header,null,2))}catch(a){console.error(a)}e(0,n=!1)}async function d(){e(0,n=!0);const r=await s.query.distribution.communityPool({});e(1,c=JSON.stringify(r.pool,null,2)),e(0,n=!1)}async function m(){e(0,n=!0);const r=await s.query.compute.contractInfo({contract_address:N.address}),a=await s.query.snip20.getSnip20Params({contract:{address:N.address,code_hash:N.code_hash}}),g=await s.query.snip20.queryContract({contract_address:N.address,code_hash:N.code_hash,query:{token_config:{}}});e(1,c=JSON.stringify(r,null,2)+`,
`+JSON.stringify(a,null,2)+`,
`+JSON.stringify(g,null,2)),e(0,n=!1)}async function f(){e(0,n=!0);try{const{proposals:r}=await s.query.gov.proposals({proposal_status:re.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD});e(1,c=JSON.stringify(r,null,2))}catch(r){console.error(r)}e(0,n=!1)}async function h(){var a;e(0,n=!0);const r=await s.query.auth.accounts({pagination:{count_total:!0,limit:"30"}});e(1,c=JSON.stringify({total:(a=r.pagination)==null?void 0:a.total},null,2)),e(0,n=!1)}async function l(){e(0,n=!0);try{let a=(await s.query.txsQuery("wasm.contract_address = 'secret153wu605vvp934xhd4k9dtd640zsep5jkesstdm'")).map(_=>{var b,w;return(w=(b=_.arrayLog)==null?void 0:b.find(G=>G.key==="sender"))==null?void 0:w.value}).filter(_=>_==null?void 0:_.startsWith("secret1"));a=[...new Set(a)];for(let _=a.length-1;_>0;_--){const b=Math.floor(Math.random()*(_+1));[a[_],a[b]]=[a[b],a[_]]}const g=a.slice(0,10);e(1,c=JSON.stringify(g,null,2))}catch(r){console.error(r)}e(0,n=!1)}async function o(r,a,g,_,b){e(0,n=!0);try{const w=await r.query.snip20.getTransferHistory({contract:{address:a.address,code_hash:a.codeHash},address:g??r.address,auth:{permit:_,key:b},page_size:10});e(1,c=JSON.stringify(w,null,2))}catch(w){console.error(w)}e(0,n=!1)}return new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:6}).format,[n,c,i,r=>r.fn()]}class de extends Q{constructor(t){super(),Y(this,t,ce,ae,L,{})}}export{de as component};