import{D as _}from"./index.1ba1bd69.js";import{w as b}from"./index.b3b988f7.js";const u={};function w(e){return e==="local"?localStorage:sessionStorage}function c(e,S,t){const a=(t==null?void 0:t.serializer)??JSON,d=(t==null?void 0:t.storage)??"local",o=typeof window<"u"&&typeof document<"u";function i(n,l){o&&w(d).setItem(n,a.stringify(l))}if(!u[e]){const n=b(S,r=>{const s=o?w(d).getItem(e):null;if(s&&r(a.parse(s)),o){const m=f=>{f.key===e&&r(f.newValue?a.parse(f.newValue):null)};return window.addEventListener("storage",m),()=>window.removeEventListener("storage",m)}}),{subscribe:l,set:g}=n;u[e]={set(r){i(e,r),g(r)},update(r){const s=r(_(n));i(e,s),g(s)},subscribe:l}}return u[e]}c("modeOsPrefers",!1);c("modeUserPrefers",void 0);c("modeCurrent",!1);
