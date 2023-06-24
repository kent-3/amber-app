import{d as De}from"../chunks/environment.9aa685ef.js";import{S as Te,i as Ce,s as Se,k as C,a as j,l as S,m as A,h as _,c as x,n as m,al as ae,b as U,D as k,X as Re,W as ne,aq as Q,V as He,I as oe,J as re,M as Y,O as Ae,y as Le,q as J,z as Me,r as G,A as Ne,g as Oe,Y as Fe,d as Ve,B as qe,U as V,o as Ke,u as se,ac as Ue,a7 as z}from"../chunks/index.13f60c6c.js";import{f as je,a as ie,v as ce,b as xe,d as Pe,c as fe,i as ze}from"../chunks/stores.a12d4e88.js";import{i as Je,f as Ge}from"../chunks/ProgressBar.svelte_svelte_type_style_lang.6c5a6801.js";import{w as X}from"../chunks/index.26c07168.js";import{A as ee}from"../chunks/contracts.e8ea57ef.js";import{g as We,t as Ye}from"../chunks/tokens.215e7bb0.js";function Xe(a){const e=["ArrowRight","ArrowUp","ArrowLeft","ArrowDown","Home","End"],t=l=>{if(e.includes(l.code))switch(l.preventDefault(),l.code){case"ArrowUp":Z(a,0,-1);break;case"ArrowDown":Z(a,0,1);break;case"ArrowLeft":Z(a,-1,0);break;case"ArrowRight":Z(a,1,0);break;case"Home":ue(a,"first");break;case"End":ue(a,"last");break}};return a.addEventListener("keydown",t),{destroy(){a.removeEventListener("keydown",t)}}}function Z(a,e,t){const l=document.activeElement;if(!l||!l.parentElement||!l.parentElement.ariaRowIndex||!l.ariaColIndex)return;const o=parseInt(l.parentElement.ariaRowIndex),r=parseInt(l.ariaColIndex),n=a.querySelector(`[aria-rowindex="${o+t}"]`);if(n!==null){const s=n.querySelector(`[aria-colindex="${r+e}"]`);s!==null&&s.focus()}}function Qe(a){const e=document.activeElement;if(!e||!e.parentElement||!e.parentElement.ariaRowIndex)return null;const t=parseInt(e.parentElement.ariaRowIndex);return a.querySelector(`[aria-rowindex="${t}"]`)}function ue(a,e="first"){const t=Qe(a);if(t===null)return;const l=t.children.length,o=e==="first"?1:l,r=t.querySelector(`[aria-colindex="${o}"]`);r!==null&&r.focus()}function Ze(a,e){return a.map(t=>{const l={};return e.forEach(o=>l[o]=t[o]),l})}function $e(a){return a.map(e=>Object.values(e))}function de(a,e){return $e(Ze(a,e))}function he(a,e,t){const l=a.slice();return l[19]=e[t],l}function ge(a,e,t){const l=a.slice();return l[22]=e[t],l[24]=t,l}function me(a,e,t){const l=a.slice();return l[19]=e[t],l[26]=t,l}function _e(a,e,t){const l=a.slice();return l[27]=e[t],l}function be(a){let e,t=a[27]+"";return{c(){e=C("th"),this.h()},l(l){e=S(l,"TH",{colspan:!0,class:!0});var o=A(e);o.forEach(_),this.h()},h(){m(e,"colspan","2"),m(e,"class",a[3])},m(l,o){U(l,e,o),e.innerHTML=t},p(l,o){o&1&&t!==(t=l[27]+"")&&(e.innerHTML=t),o&8&&m(e,"class",l[3])},d(l){l&&_(e)}}}function ve(a){let e,t=(a[19]?a[19]:"-")+"";return{c(){e=C("td"),this.h()},l(l){e=S(l,"TD",{class:!0,role:!0,"aria-colindex":!0,tabindex:!0});var o=A(e);o.forEach(_),this.h()},h(){m(e,"class",a[5]),m(e,"role","gridcell"),m(e,"aria-colindex",a[26]+1),m(e,"tabindex",a[26]===0?0:-1)},m(l,o){U(l,e,o),e.innerHTML=t},p(l,o){o&1&&t!==(t=(l[19]?l[19]:"-")+"")&&(e.innerHTML=t),o&32&&m(e,"class",l[5])},d(l){l&&_(e)}}}function ye(a){let e,t,l,o,r=a[22],n=[];for(let d=0;d<r.length;d+=1)n[d]=ve(me(a,r,d));function s(...d){return a[15](a[24],...d)}function f(...d){return a[16](a[24],...d)}return{c(){e=C("tr");for(let d=0;d<n.length;d+=1)n[d].c();t=j(),this.h()},l(d){e=S(d,"TR",{"aria-rowindex":!0});var w=A(e);for(let g=0;g<n.length;g+=1)n[g].l(w);t=x(w),w.forEach(_),this.h()},h(){m(e,"aria-rowindex",a[24]+1)},m(d,w){U(d,e,w);for(let g=0;g<n.length;g+=1)n[g]&&n[g].m(e,null);k(e,t),l||(o=[Y(e,"click",s),Y(e,"keydown",f)],l=!0)},p(d,w){if(a=d,w&33){r=a[22];let g;for(g=0;g<r.length;g+=1){const H=me(a,r,g);n[g]?n[g].p(H,w):(n[g]=ve(H),n[g].c(),n[g].m(e,t))}for(;g<n.length;g+=1)n[g].d(1);n.length=r.length}},d(d){d&&_(e),Q(n,d),l=!1,Ae(o)}}}function ke(a){let e,t,l,o=a[0].foot,r=[];for(let n=0;n<o.length;n+=1)r[n]=we(he(a,o,n));return{c(){e=C("tfoot"),t=C("tr");for(let n=0;n<r.length;n+=1)r[n].c();this.h()},l(n){e=S(n,"TFOOT",{class:!0});var s=A(e);t=S(s,"TR",{});var f=A(t);for(let d=0;d<r.length;d+=1)r[d].l(f);f.forEach(_),s.forEach(_),this.h()},h(){m(e,"class",l="table-foot "+a[6])},m(n,s){U(n,e,s),k(e,t);for(let f=0;f<r.length;f+=1)r[f]&&r[f].m(t,null)},p(n,s){if(s&129){o=n[0].foot;let f;for(f=0;f<o.length;f+=1){const d=he(n,o,f);r[f]?r[f].p(d,s):(r[f]=we(d),r[f].c(),r[f].m(t,null))}for(;f<r.length;f+=1)r[f].d(1);r.length=o.length}s&64&&l!==(l="table-foot "+n[6])&&m(e,"class",l)},d(n){n&&_(e),Q(r,n)}}}function we(a){let e,t=a[19]+"";return{c(){e=C("td"),this.h()},l(l){e=S(l,"TD",{class:!0});var o=A(e);o.forEach(_),this.h()},h(){m(e,"class",a[7])},m(l,o){U(l,e,o),e.innerHTML=t},p(l,o){o&1&&t!==(t=l[19]+"")&&(e.innerHTML=t),o&128&&m(e,"class",l[7])},d(l){l&&_(e)}}}function et(a){let e,t,l,o,r,n,s,f,d,w,g,H,R=a[0].head,v=[];for(let i=0;i<R.length;i+=1)v[i]=be(_e(a,R,i));let p=a[0].body,y=[];for(let i=0;i<p.length;i+=1)y[i]=ye(ge(a,p,i));let b=a[0].foot&&ke(a);return{c(){e=C("div"),t=C("table"),l=C("thead"),o=C("tr");for(let i=0;i<v.length;i+=1)v[i].c();n=j(),s=C("tbody");for(let i=0;i<y.length;i+=1)y[i].c();d=j(),b&&b.c(),this.h()},l(i){e=S(i,"DIV",{class:!0});var E=A(e);t=S(E,"TABLE",{class:!0,role:!0});var c=A(t);l=S(c,"THEAD",{class:!0});var u=A(l);o=S(u,"TR",{});var I=A(o);for(let M=0;M<v.length;M+=1)v[M].l(I);I.forEach(_),u.forEach(_),n=x(c),s=S(c,"TBODY",{class:!0});var F=A(s);for(let M=0;M<y.length;M+=1)y[M].l(F);F.forEach(_),d=x(c),b&&b.l(c),c.forEach(_),E.forEach(_),this.h()},h(){m(l,"class",r="table-head "+a[2]),m(s,"class",f="table-body "+a[4]),m(t,"class",a[8]),m(t,"role","grid"),ae(t,"table-interactive",a[1]),m(e,"class",w="table-container "+a[9])},m(i,E){U(i,e,E),k(e,t),k(t,l),k(l,o);for(let c=0;c<v.length;c+=1)v[c]&&v[c].m(o,null);k(t,n),k(t,s);for(let c=0;c<y.length;c+=1)y[c]&&y[c].m(s,null);k(t,d),b&&b.m(t,null),g||(H=Re(Xe.call(null,t)),g=!0)},p(i,[E]){if(E&9){R=i[0].head;let c;for(c=0;c<R.length;c+=1){const u=_e(i,R,c);v[c]?v[c].p(u,E):(v[c]=be(u),v[c].c(),v[c].m(o,null))}for(;c<v.length;c+=1)v[c].d(1);v.length=R.length}if(E&4&&r!==(r="table-head "+i[2])&&m(l,"class",r),E&3105){p=i[0].body;let c;for(c=0;c<p.length;c+=1){const u=ge(i,p,c);y[c]?y[c].p(u,E):(y[c]=ye(u),y[c].c(),y[c].m(s,null))}for(;c<y.length;c+=1)y[c].d(1);y.length=p.length}E&16&&f!==(f="table-body "+i[4])&&m(s,"class",f),i[0].foot?b?b.p(i,E):(b=ke(i),b.c(),b.m(t,null)):b&&(b.d(1),b=null),E&256&&m(t,"class",i[8]),E&258&&ae(t,"table-interactive",i[1]),E&512&&w!==(w="table-container "+i[9])&&m(e,"class",w)},i:ne,o:ne,d(i){i&&_(e),Q(v,i),Q(y,i),b&&b.d(),g=!1,H()}}}function tt(a,e,t){let l,o;const r=He();let{source:n}=e,{interactive:s=!1}=e,{element:f="table"}=e,{text:d=""}=e,{color:w=""}=e,{regionHead:g=""}=e,{regionHeadCell:H=""}=e,{regionBody:R=""}=e,{regionCell:v=""}=e,{regionFoot:p=""}=e,{regionFootCell:y=""}=e;function b(u,I){if(!s)return;u.preventDefault(),u.stopPropagation();const F=n.meta?n.meta[I]:n.body[I];r("selected",F)}function i(u,I){["Enter","Space"].includes(u.code)&&b(u,I)}const E=(u,I)=>{b(I,u)},c=(u,I)=>{i(I,u)};return a.$$set=u=>{t(18,e=oe(oe({},e),re(u))),"source"in u&&t(0,n=u.source),"interactive"in u&&t(1,s=u.interactive),"element"in u&&t(12,f=u.element),"text"in u&&t(13,d=u.text),"color"in u&&t(14,w=u.color),"regionHead"in u&&t(2,g=u.regionHead),"regionHeadCell"in u&&t(3,H=u.regionHeadCell),"regionBody"in u&&t(4,R=u.regionBody),"regionCell"in u&&t(5,v=u.regionCell),"regionFoot"in u&&t(6,p=u.regionFoot),"regionFootCell"in u&&t(7,y=u.regionFootCell)},a.$$.update=()=>{t(9,l=`${e.class||""}`),a.$$.dirty&28672&&t(8,o=`${f} ${d} ${w}`)},e=re(e),[n,s,g,H,R,v,p,y,o,l,b,i,f,d,w,E,c]}class lt extends Te{constructor(e){super(),Ce(this,e,tt,et,Se,{source:0,interactive:1,element:12,text:13,color:14,regionHead:2,regionHeadCell:3,regionBody:4,regionCell:5,regionFoot:6,regionFootCell:7})}}const at=De,nt=!0,mt=Object.freeze(Object.defineProperty({__proto__:null,csr:at,prerender:nt},Symbol.toStringTag,{value:"Module"}));function Ee(a,e,t){const l=a.slice();return l[28]=e[t],l}function pe(a){let e,t=a[1],l=[];for(let o=0;o<t.length;o+=1)l[o]=Ie(Ee(a,t,o));return{c(){e=C("div");for(let o=0;o<l.length;o+=1)l[o].c();this.h()},l(o){e=S(o,"DIV",{class:!0});var r=A(e);for(let n=0;n<l.length;n+=1)l[n].l(r);r.forEach(_),this.h()},h(){m(e,"class","card justify-center gap-4 overflow-auto bg-surface-50 p-4 shadow-xl dark:bg-[#28292a] md:justify-normal")},m(o,r){U(o,e,r);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null)},p(o,r){if(r&2){t=o[1];let n;for(n=0;n<t.length;n+=1){const s=Ee(o,t,n);l[n]?l[n].p(s,r):(l[n]=Ie(s),l[n].c(),l[n].m(e,null))}for(;n<l.length;n+=1)l[n].d(1);l.length=t.length}},d(o){o&&_(e),Q(l,o)}}}function Ie(a){let e,t=a[28].key+"",l,o,r=a[28].value+"",n;return{c(){e=C("p"),l=J(t),o=J(" = "),n=J(r),this.h()},l(s){e=S(s,"P",{class:!0});var f=A(e);l=G(f,t),o=G(f," = "),n=G(f,r),f.forEach(_),this.h()},h(){m(e,"class","font-mono text-sm")},m(s,f){U(s,e,f),k(e,l),k(e,o),k(e,n)},p(s,f){f&2&&t!==(t=s[28].key+"")&&se(l,t),f&2&&r!==(r=s[28].value+"")&&se(n,r)},d(s){s&&_(e)}}}function ot(a){let e,t,l,o,r,n,s,f,d,w,g,H,R,v,p,y,b,i,E,c,u,I,F,M;l=new lt({props:{source:a[0],regionHead:"text-2xl",regionCell:"!py-3 font-mono font-semibold hover:variant-soft"}});let D=a[1]&&a[1].length>0&&pe(a);return{c(){e=C("div"),t=C("div"),Le(l.$$.fragment),o=j(),r=C("div"),n=C("div"),s=C("button"),f=J("Refresh Balances"),w=j(),g=C("button"),H=J("Refresh Viewing Keys"),v=j(),p=C("button"),y=J("Inspect Local Storage"),b=j(),i=C("button"),E=J("Clear Local Storage"),c=j(),D&&D.c(),this.h()},l(B){e=S(B,"DIV",{class:!0});var N=A(e);t=S(N,"DIV",{class:!0});var P=A(t);Me(l.$$.fragment,P),P.forEach(_),o=x(N),r=S(N,"DIV",{class:!0});var W=A(r);n=S(W,"DIV",{class:!0});var q=A(n);s=S(q,"BUTTON",{class:!0});var h=A(s);f=G(h,"Refresh Balances"),h.forEach(_),w=x(q),g=S(q,"BUTTON",{class:!0});var T=A(g);H=G(T,"Refresh Viewing Keys"),T.forEach(_),v=x(q),p=S(q,"BUTTON",{class:!0});var L=A(p);y=G(L,"Inspect Local Storage"),L.forEach(_),b=x(q),i=S(q,"BUTTON",{class:!0});var K=A(i);E=G(K,"Clear Local Storage"),K.forEach(_),q.forEach(_),c=x(W),D&&D.l(W),W.forEach(_),N.forEach(_),this.h()},h(){m(t,"class","sm:card flex w-full flex-1 flex-col items-start justify-start rounded-3xl !bg-surface-50 shadow-xl dark:!bg-[#28292a] sm:p-4 lg:min-w-[50%] lg:max-w-[50%]"),s.disabled=d=!a[2],m(s,"class","variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto"),g.disabled=R=!a[2],m(g,"class","variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto"),m(p,"class","variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto"),m(i,"class","variant-ghost-tertiary btn btn-sm min-w-[33%] flex-auto"),m(n,"class","card flex w-full flex-wrap justify-center gap-4 bg-surface-50 p-4 shadow-xl dark:bg-[#28292a] lg:justify-normal"),m(r,"class","w-full flex-col space-y-4 lg:max-w-[50%]"),m(e,"class","flex flex-1 flex-col-reverse items-start justify-start gap-4 p-2 sm:p-6 lg:flex-row")},m(B,N){U(B,e,N),k(e,t),Ne(l,t,null),k(e,o),k(e,r),k(r,n),k(n,s),k(s,f),k(n,w),k(n,g),k(g,H),k(n,v),k(n,p),k(p,y),k(n,b),k(n,i),k(i,E),k(r,c),D&&D.m(r,null),I=!0,F||(M=[Y(s,"click",a[17]),Y(g,"click",a[18]),Y(p,"click",a[19]),Y(i,"click",a[20])],F=!0)},p(B,[N]){const P={};N&1&&(P.source=B[0]),l.$set(P),(!I||N&4&&d!==(d=!B[2]))&&(s.disabled=d),(!I||N&4&&R!==(R=!B[2]))&&(g.disabled=R),B[1]&&B[1].length>0?D?D.p(B,N):(D=pe(B),D.c(),D.m(r,null)):D&&(D.d(1),D=null)},i(B){I||(Oe(l.$$.fragment,B),u||Fe(()=>{u=Ue(e,Ge,{y:200,duration:700}),u.start()}),I=!0)},o(B){Ve(l.$$.fragment,B),I=!1},d(B){B&&_(e),qe(l),D&&D.d(),F=!1,Ae(M)}}}function rt(a,e,t){let l,o,r,n,s,f,d,w,g,H,R,v,p,y;V(a,je,h=>t(16,d=h)),V(a,ie,h=>t(21,w=h)),V(a,ce,h=>t(22,g=h)),V(a,xe,h=>t(23,H=h)),V(a,Pe,h=>t(24,R=h)),V(a,fe,h=>t(25,v=h)),V(a,ze,h=>t(2,y=h));const b=X();V(a,b,h=>t(1,p=h));function i(){const h=[];for(let T=0;T<localStorage.length;T++){const L=localStorage.key(T),K=localStorage.getItem(L);h.push({key:L,value:K})}z(b,p=h,p)}const E=new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:6}).format,c=X("0");V(a,c,h=>t(14,s=h));const u=X("");V(a,u,h=>t(13,n=h));const I=X({});V(a,I,h=>t(12,r=h));const F=X("");V(a,F,h=>t(15,f=h));const M=async(h,T)=>{var L,K,te;try{const{block:O}=await h.query.tendermint.getLatestBlock({});let $;try{({minimum_gas_price:$}=await h.query.node.config({}))}catch{}z(I,r=await h.query.tendermint.getNodeInfo({}),r),z(F,f=(L=O==null?void 0:O.header)==null?void 0:L.chain_id,f),z(c,s=E(Number((K=O==null?void 0:O.header)==null?void 0:K.height)),s),$&&z(u,n=$.replace(/0*([a-z]+)$/,"$1"),n);const le=Math.floor((Date.now()-Date.parse((te=O==null?void 0:O.header)==null?void 0:te.time))/1e3);let Be=`${le}s ago`;le<=0&&(Be="now")}catch(O){O instanceof Error?O.message:JSON.stringify(O)}};async function D(){var h;try{const T=await R.query.bank.balance({address:H,denom:"uscrt"});z(fe,v=Number(((h=T.balance)==null?void 0:h.amount)/1e6).toFixed(6).toString(),v)}catch(T){console.log(T)}try{const T=await R.query.snip20.getBalance({contract:{address:ee.address,code_hash:ee.code_hash},address:H,auth:{key:g.get(ee.address)}});z(ie,w=Number(T.balance.amount/1e6).toString(),w)}catch{console.log("No viewing key for AMBER")}}async function B(h){for(const T of h){const L=await We(T.address);L!=null&&ce.update(K=>K.set(T.address,L))}}Ke(()=>{const h=new Je.SecretNetworkClient({url:d,chainId:""});M(h);const T=setInterval(()=>{M(h)},3e4);return()=>clearInterval(T)});const N=()=>D(),P=()=>B(Ye),W=()=>i(),q=()=>{b.set([]),localStorage.clear()};return a.$$.update=()=>{var h,T,L;a.$$.dirty&126976&&t(11,l=[{key:"Endpoint",value:d},{key:"Chain ID",value:f},{key:"Block",value:s},{key:"Node Moniker",value:(h=r.default_node_info)==null?void 0:h.moniker},{key:"Min Gas Price",value:n},{key:"secretd",value:(T=r.application_version)==null?void 0:T.version},{key:"Cosmos SDK",value:(L=r.application_version)==null?void 0:L.cosmos_sdk_version}]),a.$$.dirty&2048&&t(0,o={head:["Node Info"],body:de(l,["key","value"]),meta:de(l,["key","value"])})},[o,p,y,b,i,c,u,I,F,D,B,l,r,n,s,f,d,N,P,W,q]}class _t extends Te{constructor(e){super(),Ce(this,e,rt,ot,Se,{})}}export{_t as component,mt as universal};
