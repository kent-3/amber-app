import{S as F,i as W,s as j,k as E,q as S,a as C,a9 as T,e as I,l as V,m as w,r as B,h as u,c as D,ab as M,n as h,b as P,F as m,W as O,ai as x,$ as G,N as J,u as H,a0 as L}from"../chunks/index.86962765.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.3abe5e1b.js";import{c as Q}from"../chunks/clipboard.408a5421.js";import{c as R}from"../chunks/metamask.42f42be9.js";import{t as X,v as Y}from"../chunks/stores.2a7a0fd6.js";function U(o,t,l){const n=o.slice();return n[4]=t[l],n}function Z(o){let t,l=o[4].symbol+"",n,v,r,e,s,_,g,K;function b(){return o[2](o[4])}return{c(){t=E("p"),n=S(l),v=S(":"),r=C(),e=E("button"),s=S("Create Viewing Key"),_=C(),this.h()},l(a){t=V(a,"P",{class:!0});var d=w(t);n=B(d,l),v=B(d,":"),d.forEach(u),r=D(a),e=V(a,"BUTTON",{class:!0});var c=w(e);s=B(c,"Create Viewing Key"),c.forEach(u),_=D(a),this.h()},h(){h(t,"class","font-medium"),h(e,"class","btn w-max p-1 px-4 rounded-full hover:bg-secondary-100-800-token bg-surface-200-700-token material-color-transition")},m(a,d){P(a,t,d),m(t,n),m(t,v),P(a,r,d),P(a,e,d),m(e,s),P(a,_,d),g||(K=J(e,"click",b),g=!0)},p(a,d){o=a,d&1&&l!==(l=o[4].symbol+"")&&H(n,l)},d(a){a&&u(t),a&&u(r),a&&u(e),a&&u(_),g=!1,K()}}}function ee(o){var i,z;let t,l=o[4].symbol+"",n,v,r,e,s,_=((i=o[1].get(o[4].address))==null?void 0:i.slice(0,12))+"..."+((z=o[1].get(o[4].address))==null?void 0:z.substring(52)),g,K,b,a=o[1].get(o[4].address)+"",d,c,f,N;return{c(){t=E("p"),n=S(l),v=S(":"),r=C(),e=E("button"),s=E("span"),g=S(_),K=C(),b=E("span"),d=S(a),c=C(),this.h()},l(p){t=V(p,"P",{class:!0});var k=w(t);n=B(k,l),v=B(k,":"),k.forEach(u),r=D(p),e=V(p,"BUTTON",{class:!0});var y=w(e);s=V(y,"SPAN",{});var A=w(s);g=B(A,_),A.forEach(u),K=D(y),b=V(y,"SPAN",{class:!0,"data-clipboard":!0});var q=w(b);d=B(q,a),q.forEach(u),c=D(y),y.forEach(u),this.h()},h(){h(t,"class","font-medium"),h(b,"class","hidden"),h(b,"data-clipboard","exampleElement"),h(e,"class","btn p-0 text-surface-400 font-medium")},m(p,k){P(p,t,k),m(t,n),m(t,v),P(p,r,k),P(p,e,k),m(e,s),m(s,g),m(e,K),m(e,b),m(b,d),m(e,c),f||(N=L(Q.call(null,e,{element:"exampleElement"})),f=!0)},p(p,k){var y,A;k&1&&l!==(l=p[4].symbol+"")&&H(n,l),k&3&&_!==(_=((y=p[1].get(p[4].address))==null?void 0:y.slice(0,12))+"..."+((A=p[1].get(p[4].address))==null?void 0:A.substring(52)))&&H(g,_),k&3&&a!==(a=p[1].get(p[4].address)+"")&&H(d,a)},d(p){p&&u(t),p&&u(r),p&&u(e),f=!1,N()}}}function $(o){let t,l;function n(e,s){return s&3&&(t=null),t==null&&(t=!!e[1].has(e[4].address)),t?ee:Z}let v=n(o,-1),r=v(o);return{c(){r.c(),l=I()},l(e){r.l(e),l=I()},m(e,s){r.m(e,s),P(e,l,s)},p(e,s){v===(v=n(e,s))&&r?r.p(e,s):(r.d(1),r=v(e),r&&(r.c(),r.m(l.parentNode,l)))},d(e){r.d(e),e&&u(l)}}}function te(o){let t,l,n,v,r,e,s,_,g,K,b,a,d=o[0],c=[];for(let f=0;f<d.length;f+=1)c[f]=$(U(o,d,f));return{c(){t=E("div"),l=E("div"),n=E("h2"),v=S("Viewing Keys"),r=C(),e=E("div"),s=T("svg"),_=T("path"),g=T("path"),K=C(),b=E("div");for(let f=0;f<c.length;f+=1)c[f].c();a=I(),this.h()},l(f){t=V(f,"DIV",{class:!0});var N=w(t);l=V(N,"DIV",{class:!0});var i=w(l);n=V(i,"H2",{class:!0});var z=w(n);v=B(z,"Viewing Keys"),z.forEach(u),r=D(i),e=V(i,"DIV",{class:!0,"data-popup":!0});var p=w(e);s=M(p,"svg",{xmlns:!0,viewBox:!0,fill:!0,class:!0});var k=w(s);_=M(k,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),w(_).forEach(u),g=M(k,"path",{"fill-rule":!0,d:!0,"clip-rule":!0}),w(g).forEach(u),k.forEach(u),p.forEach(u),K=D(i),b=V(i,"DIV",{class:!0});var y=w(b);for(let A=0;A<c.length;A+=1)c[A].l(y);a=I(),y.forEach(u),i.forEach(u),N.forEach(u),this.h()},h(){h(n,"class","font-bold"),h(_,"fill-rule","evenodd"),h(_,"d","M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"),h(_,"clip-rule","evenodd"),h(g,"fill-rule","evenodd"),h(g,"d","M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"),h(g,"clip-rule","evenodd"),h(s,"xmlns","http://www.w3.org/2000/svg"),h(s,"viewBox","0 0 20 20"),h(s,"fill","currentColor"),h(s,"class","w-5 h-5"),h(e,"class","card variant-filled-primary text-sm px-1"),h(e,"data-popup","examplePopup"),h(b,"class","grid gap-2 items-center grid-cols-[5rem_minmax(0,_2fr)]"),h(l,"class","card bg-surface-50 dark:!bg-[#28292a] p-4 space-y-2 text-left w-full sm:w-96"),h(t,"class","container h-full flex gap-4 p-4 sm:p-6 items-start")},m(f,N){P(f,t,N),m(t,l),m(l,n),m(n,v),m(l,r),m(l,e),m(e,s),m(s,_),m(s,g),m(l,K),m(l,b);for(let i=0;i<c.length;i+=1)c[i].m(b,null);m(b,a)},p(f,[N]){if(N&3){d=f[0];let i;for(i=0;i<d.length;i+=1){const z=U(f,d,i);c[i]?c[i].p(z,N):(c[i]=$(z),c[i].c(),c[i].m(a.parentNode,a))}for(;i<c.length;i+=1)c[i].d(1);c.length=d.length}},i:O,o:O,d(f){f&&u(t),x(c,f)}}}function le(o,t,l){let n;G(o,Y,e=>l(1,n=e));let v;return X.subscribe(e=>{e&&l(0,v=[...e].map(([s,_])=>_))}),[v,n,e=>R(e.address)]}class oe extends F{constructor(t){super(),W(this,t,le,te,j,{})}}export{oe as default};
