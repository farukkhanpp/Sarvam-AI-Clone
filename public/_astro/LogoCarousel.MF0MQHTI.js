import{j as r}from"./jsx-runtime.u17CrQMm.js";import{r as o}from"./index.DUTUzmOK.js";import"./gsap.B_32UFSg.js";import{g as G}from"./customerLogoSizing.CDxt5ip8.js";import{i as H}from"./imagekit.VzlTVmcc.js";import{D as U}from"./customerLogos.BJzoQDjE.js";import L from"./index.Crpphvpt.js";const J=({className:j="",speed:m=60,logoHeight:h=60,gap:g=40,hoverScale:l=1.1,whiteLogos:S=!1,logos:z,logoWrapperClassName:R="",showBorders:p=!1})=>{const c=o.useRef(null),[$,u]=o.useState(null),[v,b]=o.useState(!1),i=o.useRef(null),[w,I]=o.useState(!1),[x,N]=o.useState(!1);o.useEffect(()=>{const e=()=>I(window.innerWidth<768);return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),o.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>N(e.matches);return t(),e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);const W=Math.min(Math.round(h*.72),52),C=Math.min(Math.round(g*.65),36),s=w?W:h,k=w?C:g,d=z??U,y=d.map(e=>G(e,s,l)),M=y.map(e=>Math.ceil(e.width*l)),n=M.reduce((e,t)=>e+t+k,0);o.useEffect(()=>{if(!c.current)return;const e=c.current;if(L.set(e,{x:0}),!x)return i.current=L.to(e,{x:-n,duration:m,ease:"linear",repeat:-1,modifiers:{x:t=>`${parseFloat(t)%-n}px`}}),()=>{i.current?.kill()}},[m,n,s,x]),o.useEffect(()=>{i.current&&i.current.paused(v)},[v]);const O=()=>b(!0),P=()=>{b(!1),u(null)},E=(e,t,D)=>{const a=$===t,F=M[t],f=y[t];return r.jsx("div",{className:"logo-item",onMouseEnter:()=>u(t),onMouseLeave:()=>u(null),style:{width:F,height:s,marginRight:k,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",overflow:"visible",zIndex:a?2:1,outline:p?"1.5px solid #22c55e":void 0},children:r.jsx("div",{className:`flex items-center justify-center h-full w-full overflow-visible ${R}`,children:r.jsx("img",{className:"max-w-none shrink-0",src:H(e),alt:`Partner logo ${t+1}`,loading:"eager",style:{width:f.width,height:f.height,maxWidth:f.width,objectFit:"contain",transformOrigin:"center center",transform:a?`scale(${l})`:"scale(1)",filter:S?"brightness(1.5)":a?"none":"grayscale(100%) brightness(0.8)",opacity:a?.6:.5,transition:"transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",outline:p?"1.5px solid #ef4444":void 0}})})},`${D}-${t}`)};return r.jsxs("div",{className:`logo-carousel-container w-full ${j}`,role:"region","aria-label":"Partner logos carousel",children:[r.jsx("div",{className:"logo-carousel-track",onMouseEnter:O,onMouseLeave:P,style:{overflowX:"clip",overflowY:"visible",width:"100%",position:"relative",height:s},children:r.jsxs("div",{ref:c,className:"logo-carousel-inner",style:{display:"flex",alignItems:"center",width:`${n*2}px`,height:s},children:[d.map((e,t)=>E(e,t,"first")),d.map((e,t)=>E(e,t,"second"))]})}),r.jsx("style",{children:`
        .logo-carousel-container {
          position: relative;
          width: 100%;
          will-change: transform;
        }

        .logo-carousel-container,
        .logo-carousel-container * {
          border-radius: 0 !important;
        }

        .logo-carousel-track {
          mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .logo-item img {
          max-width: none;
          will-change: filter, transform;
          pointer-events: none;
        }

        .logo-item:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        .logo-carousel-container * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `})]})};export{J as default};
