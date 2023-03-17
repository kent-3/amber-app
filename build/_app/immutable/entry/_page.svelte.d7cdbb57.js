import{S as qe,i as Ie,s as je,k as s,q as d,a as g,l as a,m as l,r as c,h as t,c as m,n as r,b as Se,F as e,u as $,W as Ve,o as we}from"../chunks/index.1ba1bd69.js";import{b as ke}from"../chunks/browser.f1978947.js";import{a as xe}from"../chunks/index.23a336fb.js";function Ce(k){let v,i,o,S,y,x,C,n,h,b,L,u,E=(k[0]??"loading...")+"",w,N,_,P,ee,V,A,te,se,q,M=(k[1]??"loading...")+"",W,ae,R,le,re,I,F,oe,ie,U,G=(k[2]??"loading...")+"",z,ne,j,O,de,ce,T,H=(k[3]??"loading...")+"",B;return{c(){v=s("div"),i=s("div"),o=s("div"),S=s("h2"),y=s("strong"),x=d("AmberDAO Node Digest"),C=g(),n=s("div"),h=s("div"),b=d("Current Stake Value"),L=g(),u=s("div"),w=d(E),N=g(),_=s("span"),P=d("USD"),ee=g(),V=s("div"),A=s("div"),te=d("Voting Power"),se=g(),q=s("div"),W=d(M),ae=g(),R=s("span"),le=d("SCRT"),re=g(),I=s("div"),F=s("div"),oe=d("Delegators"),ie=g(),U=s("div"),z=d(G),ne=g(),j=s("div"),O=s("div"),de=d("Commission"),ce=g(),T=s("div"),B=d(H),this.h()},l(p){v=a(p,"DIV",{class:!0});var D=l(v);i=a(D,"DIV",{id:!0,class:!0});var ve=l(i);o=a(ve,"DIV",{id:!0,class:!0});var f=l(o);S=a(f,"H2",{});var ue=l(S);y=a(ue,"STRONG",{});var pe=l(y);x=c(pe,"AmberDAO Node Digest"),pe.forEach(t),ue.forEach(t),C=m(f),n=a(f,"DIV",{class:!0});var J=l(n);h=a(J,"DIV",{class:!0});var fe=l(h);b=c(fe,"Current Stake Value"),fe.forEach(t),L=m(J),u=a(J,"DIV",{class:!0});var K=l(u);w=c(K,E),N=m(K),_=a(K,"SPAN",{class:!0});var ge=l(_);P=c(ge,"USD"),ge.forEach(t),K.forEach(t),J.forEach(t),ee=m(f),V=a(f,"DIV",{class:!0});var Q=l(V);A=a(Q,"DIV",{class:!0});var me=l(A);te=c(me,"Voting Power"),me.forEach(t),se=m(Q),q=a(Q,"DIV",{class:!0});var X=l(q);W=c(X,M),ae=m(X),R=a(X,"SPAN",{class:!0});var he=l(R);le=c(he,"SCRT"),he.forEach(t),X.forEach(t),Q.forEach(t),re=m(f),I=a(f,"DIV",{class:!0});var Y=l(I);F=a(Y,"DIV",{class:!0});var _e=l(F);oe=c(_e,"Delegators"),_e.forEach(t),ie=m(Y),U=a(Y,"DIV",{class:!0});var De=l(U);z=c(De,G),De.forEach(t),Y.forEach(t),ne=m(f),j=a(f,"DIV",{class:!0});var Z=l(j);O=a(Z,"DIV",{class:!0});var ye=l(O);de=c(ye,"Commission"),ye.forEach(t),ce=m(Z),T=a(Z,"DIV",{class:!0});var Ee=l(T);B=c(Ee,H),Ee.forEach(t),Z.forEach(t),f.forEach(t),ve.forEach(t),D.forEach(t),this.h()},h(){r(h,"class","node-digest-key svelte-e6qfpj"),r(_,"class","text-primary-500"),r(u,"class","node-digest-value text-base svelte-e6qfpj"),r(n,"class","node-digest-item svelte-e6qfpj"),r(A,"class","node-digest-key svelte-e6qfpj"),r(R,"class","text-primary-500"),r(q,"class","node-digest-value svelte-e6qfpj"),r(V,"class","node-digest-item svelte-e6qfpj"),r(F,"class","node-digest-key svelte-e6qfpj"),r(U,"class","node-digest-value svelte-e6qfpj"),r(I,"class","node-digest-item svelte-e6qfpj"),r(O,"class","node-digest-key svelte-e6qfpj"),r(T,"class","node-digest-value svelte-e6qfpj"),r(j,"class","node-digest-item svelte-e6qfpj"),r(o,"id","node-digest-container"),r(o,"class","card variant-glass-surface p-4 svelte-e6qfpj"),r(i,"id","node-digest"),r(i,"class","flex flex-col w-full sm:w-auto md:flex-row justify-start space-x-8 space-y-4 md:space-y-0"),r(v,"class","container h-full flex p-4 sm:justify-start justify-center items-start")},m(p,D){Se(p,v,D),e(v,i),e(i,o),e(o,S),e(S,y),e(y,x),e(o,C),e(o,n),e(n,h),e(h,b),e(n,L),e(n,u),e(u,w),e(u,N),e(u,_),e(_,P),e(o,ee),e(o,V),e(V,A),e(A,te),e(V,se),e(V,q),e(q,W),e(q,ae),e(q,R),e(R,le),e(o,re),e(o,I),e(I,F),e(F,oe),e(I,ie),e(I,U),e(U,z),e(o,ne),e(o,j),e(j,O),e(O,de),e(j,ce),e(j,T),e(T,B)},p(p,[D]){D&1&&E!==(E=(p[0]??"loading...")+"")&&$(w,E),D&2&&M!==(M=(p[1]??"loading...")+"")&&$(W,M),D&4&&G!==(G=(p[2]??"loading...")+"")&&$(z,G),D&8&&H!==(H=(p[3]??"loading...")+"")&&$(B,H)},i:Ve,o:Ve,d(p){p&&t(v)}}}function be(k,v,i){const o=new ke.SecretNetworkClient({url:"https://lcd.secret.express",chainId:"secret-4"}),S=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});let y,x,C,n;return we(async()=>{var E,w,N,_,P;const h=await o.query.staking.validator({validator_addr:"secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6"});i(3,n=(parseFloat(((N=(w=(E=h.validator)==null?void 0:E.commission)==null?void 0:w.commission_rates)==null?void 0:N.rate)??"0.03")*100).toString()+"%");const b=Math.round(parseInt(((_=h.validator)==null?void 0:_.tokens)??"500000")/1e6);i(1,x=b.toLocaleString());const L=await xe.get("https://api.coingecko.com/api/v3/simple/price?ids=secret&vs_currencies=usd");i(0,y=S.format(b*L.data.secret.usd));const u=await o.query.staking.validatorDelegations({validator_addr:"secretvaloper18w7rm926ue3nmy8ay58e3lc2nqnttrlhhgpch6",pagination:{limit:"1",count_total:!0}});i(2,C=parseInt(((P=u.pagination)==null?void 0:P.total)??"1925").toLocaleString())}),[y,x,C,n]}class Re extends qe{constructor(v){super(),Ie(this,v,be,Ce,je,{})}}export{Re as default};