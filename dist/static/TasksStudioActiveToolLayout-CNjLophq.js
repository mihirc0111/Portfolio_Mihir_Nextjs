import"./rolldown-runtime-CNC7AqOf.js";import{n as e,t}from"./react-BrRRJ8T6.js";import{t as n}from"./compiler-runtime-BwZ1Hg30.js";import{$r as r,F as i,S as a,ei as o,ht as s,k as c,wt as l}from"./dist-DbiiwUog.js";import{Ci as u,Jr as d,Qi as f,Si as p,Vt as m,_i as h,bi as g,di as _,fi as v,gi as y,lo as b,pi as x,qr as S,ui as C,vi as w,xi as T}from"./sanity-cQ8tvql9.js";var E=e(),D=n();t(),b(),T(),g(),y(),w(),x(),p(),u(),h(),f(),v(),_(),C();var O=1,k=3,A=o(c).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>r`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[k]}px) {
      position: relative;
    }
  `),j=o(i).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return r`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[k]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[O]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function M(e){let t=(0,D.c)(12),n=s(),{state:r}=d(),{isOpen:i}=r,o=n<=O&&i?`hidden`:`auto`,c;t[0]===e?c=t[1]:(c=e.renderDefault(e),t[0]=e,t[1]=c);let u;t[2]!==o||t[3]!==c?(u=(0,E.jsx)(a,{flex:1,height:`fill`,overflow:o,children:c}),t[2]=o,t[3]=c,t[4]=u):u=t[4];let f;t[5]===i?f=t[6]:(f=i&&(0,E.jsx)(j,{zOffset:100,height:`fill`,children:(0,E.jsx)(m,{})}),t[5]=i,t[6]=f);let p;t[7]===f?p=t[8]:(p=(0,E.jsx)(l,{initial:!1,children:f}),t[7]=f,t[8]=p);let h;return t[9]!==u||t[10]!==p?(h=(0,E.jsxs)(A,{sizing:`border`,height:`fill`,children:[u,p]}),t[9]=u,t[10]=p,t[11]=h):h=t[11],h}function N(e){let t=(0,D.c)(4),{enabled:n}=S();if(!n){let n;return t[0]===e?n=t[1]:(n=e.renderDefault(e),t[0]=e,t[1]=n),n}let r;return t[2]===e?r=t[3]:(r=(0,E.jsx)(M,{...e}),t[2]=e,t[3]=r),r}export{N as TasksStudioActiveToolLayout};