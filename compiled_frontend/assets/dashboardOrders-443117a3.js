import{u as X,r as m,g as ir,a as sr,c as at,o as cr,l as je,b as ur,j as O,R as _,S as Le,N as lr,d as $t,m as it,B as fr,e as dr,f as pr,q as st,h as vr,i as mr,k as te,n as re,A as hr,p as gr,s as Ct,t as wr,v as pe,w as yr,x as br,y as xr,M as Ne}from"./index-62ccd585.js";function Or(e,t,r,n=!1){const o=X(r);m.useEffect(()=>{const a=typeof e=="function"?e():e;return a.addEventListener(t,o,n),()=>a.removeEventListener(t,o,n)},[e])}var $r=function(){},Cr=$r;const jr=ir(Cr);function Dr(e,t,r){const n=m.useRef(e!==void 0),[o,a]=m.useState(t),l=e!==void 0,s=n.current;return n.current=l,!l&&s&&o!==t&&a(t),[l?e:o,m.useCallback((...i)=>{const[u,...c]=i;let d=r==null?void 0:r(u,...c);return a(u),d},[r])]}const Sr=m.createContext(null),Pe=Sr;var ct=Object.prototype.hasOwnProperty;function ut(e,t,r){for(r of e.keys())if(ve(r,t))return r}function ve(e,t){var r,n,o;if(e===t)return!0;if(e&&t&&(r=e.constructor)===t.constructor){if(r===Date)return e.getTime()===t.getTime();if(r===RegExp)return e.toString()===t.toString();if(r===Array){if((n=e.length)===t.length)for(;n--&&ve(e[n],t[n]););return n===-1}if(r===Set){if(e.size!==t.size)return!1;for(n of e)if(o=n,o&&typeof o=="object"&&(o=ut(t,o),!o)||!t.has(o))return!1;return!0}if(r===Map){if(e.size!==t.size)return!1;for(n of e)if(o=n[0],o&&typeof o=="object"&&(o=ut(t,o),!o)||!ve(n[1],t.get(o)))return!1;return!0}if(r===ArrayBuffer)e=new Uint8Array(e),t=new Uint8Array(t);else if(r===DataView){if((n=e.byteLength)===t.byteLength)for(;n--&&e.getInt8(n)===t.getInt8(n););return n===-1}if(ArrayBuffer.isView(e)){if((n=e.byteLength)===t.byteLength)for(;n--&&e[n]===t[n];);return n===-1}if(!r||typeof e=="object"){n=0;for(r in e)if(ct.call(e,r)&&++n&&!ct.call(t,r)||!(r in t)||!ve(e[r],t[r]))return!1;return Object.keys(t).length===n}}return e!==e&&t!==t}function Er(e){const t=sr();return[e[0],m.useCallback(r=>{if(t())return e[1](r)},[t,e[1]])]}var N="top",H="bottom",F="right",B="left",Ve="auto",ye=[N,H,F,B],ae="start",ge="end",Ar="clippingParents",jt="viewport",de="popper",Mr="reference",lt=ye.reduce(function(e,t){return e.concat([t+"-"+ae,t+"-"+ge])},[]),Dt=[].concat(ye,[Ve]).reduce(function(e,t){return e.concat([t,t+"-"+ae,t+"-"+ge])},[]),Pr="beforeRead",kr="read",Rr="afterRead",Tr="beforeMain",Ir="main",Nr="afterMain",Br="beforeWrite",Wr="write",Lr="afterWrite",Hr=[Pr,kr,Rr,Tr,Ir,Nr,Br,Wr,Lr];function q(e){return e.split("-")[0]}function L(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function ee(e){var t=L(e).Element;return e instanceof t||e instanceof Element}function z(e){var t=L(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function qe(e){if(typeof ShadowRoot>"u")return!1;var t=L(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}var Z=Math.max,Ae=Math.min,ie=Math.round;function He(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function St(){return!/^((?!chrome|android).)*safari/i.test(He())}function se(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&z(e)&&(o=e.offsetWidth>0&&ie(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&ie(n.height)/e.offsetHeight||1);var l=ee(e)?L(e):window,s=l.visualViewport,i=!St()&&r,u=(n.left+(i&&s?s.offsetLeft:0))/o,c=(n.top+(i&&s?s.offsetTop:0))/a,d=n.width/o,g=n.height/a;return{width:d,height:g,top:c,right:u+d,bottom:c+g,left:u,x:u,y:c}}function ze(e){var t=se(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function Et(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&qe(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function Y(e){return e?(e.nodeName||"").toLowerCase():null}function U(e){return L(e).getComputedStyle(e)}function Fr(e){return["table","td","th"].indexOf(Y(e))>=0}function G(e){return((ee(e)?e.ownerDocument:e.document)||window.document).documentElement}function ke(e){return Y(e)==="html"?e:e.assignedSlot||e.parentNode||(qe(e)?e.host:null)||G(e)}function ft(e){return!z(e)||U(e).position==="fixed"?null:e.offsetParent}function Vr(e){var t=/firefox/i.test(He()),r=/Trident/i.test(He());if(r&&z(e)){var n=U(e);if(n.position==="fixed")return null}var o=ke(e);for(qe(o)&&(o=o.host);z(o)&&["html","body"].indexOf(Y(o))<0;){var a=U(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function be(e){for(var t=L(e),r=ft(e);r&&Fr(r)&&U(r).position==="static";)r=ft(r);return r&&(Y(r)==="html"||Y(r)==="body"&&U(r).position==="static")?t:r||Vr(e)||t}function Ue(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function me(e,t,r){return Z(e,Ae(t,r))}function qr(e,t,r){var n=me(e,t,r);return n>r?r:n}function At(){return{top:0,right:0,bottom:0,left:0}}function Mt(e){return Object.assign({},At(),e)}function Pt(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var zr=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,Mt(typeof t!="number"?t:Pt(t,ye))};function Ur(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,l=r.modifiersData.popperOffsets,s=q(r.placement),i=Ue(s),u=[B,F].indexOf(s)>=0,c=u?"height":"width";if(!(!a||!l)){var d=zr(o.padding,r),g=ze(a),f=i==="y"?N:B,v=i==="y"?H:F,h=r.rects.reference[c]+r.rects.reference[i]-l[i]-r.rects.popper[c],p=l[i]-r.rects.reference[i],$=be(a),b=$?i==="y"?$.clientHeight||0:$.clientWidth||0:0,x=h/2-p/2,w=d[f],y=b-g[c]-d[v],j=b/2-g[c]/2+x,D=me(w,j,y),E=i;r.modifiersData[n]=(t={},t[E]=D,t.centerOffset=D-j,t)}}function Kr(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Et(t.elements.popper,o)&&(t.elements.arrow=o))}const Xr={name:"arrow",enabled:!0,phase:"main",fn:Ur,effect:Kr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ce(e){return e.split("-")[1]}var Yr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Gr(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:ie(r*o)/o||0,y:ie(n*o)/o||0}}function dt(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,l=e.offsets,s=e.position,i=e.gpuAcceleration,u=e.adaptive,c=e.roundOffsets,d=e.isFixed,g=l.x,f=g===void 0?0:g,v=l.y,h=v===void 0?0:v,p=typeof c=="function"?c({x:f,y:h}):{x:f,y:h};f=p.x,h=p.y;var $=l.hasOwnProperty("x"),b=l.hasOwnProperty("y"),x=B,w=N,y=window;if(u){var j=be(r),D="clientHeight",E="clientWidth";if(j===L(r)&&(j=G(r),U(j).position!=="static"&&s==="absolute"&&(D="scrollHeight",E="scrollWidth")),j=j,o===N||(o===B||o===F)&&a===ge){w=H;var P=d&&j===y&&y.visualViewport?y.visualViewport.height:j[D];h-=P-n.height,h*=i?1:-1}if(o===B||(o===N||o===H)&&a===ge){x=F;var M=d&&j===y&&y.visualViewport?y.visualViewport.width:j[E];f-=M-n.width,f*=i?1:-1}}var C=Object.assign({position:s},u&&Yr),S=c===!0?Gr({x:f,y:h},L(r)):{x:f,y:h};if(f=S.x,h=S.y,i){var A;return Object.assign({},C,(A={},A[w]=b?"0":"",A[x]=$?"0":"",A.transform=(y.devicePixelRatio||1)<=1?"translate("+f+"px, "+h+"px)":"translate3d("+f+"px, "+h+"px, 0)",A))}return Object.assign({},C,(t={},t[w]=b?h+"px":"",t[x]=$?f+"px":"",t.transform="",t))}function Jr(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,l=a===void 0?!0:a,s=r.roundOffsets,i=s===void 0?!0:s,u={placement:q(t.placement),variation:ce(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,dt(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:l,roundOffsets:i})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,dt(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:i})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Qr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Jr,data:{}};var De={passive:!0};function Zr(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,l=n.resize,s=l===void 0?!0:l,i=L(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&u.forEach(function(c){c.addEventListener("scroll",r.update,De)}),s&&i.addEventListener("resize",r.update,De),function(){a&&u.forEach(function(c){c.removeEventListener("scroll",r.update,De)}),s&&i.removeEventListener("resize",r.update,De)}}const _r={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Zr,data:{}};var en={left:"right",right:"left",bottom:"top",top:"bottom"};function Ee(e){return e.replace(/left|right|bottom|top/g,function(t){return en[t]})}var tn={start:"end",end:"start"};function pt(e){return e.replace(/start|end/g,function(t){return tn[t]})}function Ke(e){var t=L(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Xe(e){return se(G(e)).left+Ke(e).scrollLeft}function rn(e,t){var r=L(e),n=G(e),o=r.visualViewport,a=n.clientWidth,l=n.clientHeight,s=0,i=0;if(o){a=o.width,l=o.height;var u=St();(u||!u&&t==="fixed")&&(s=o.offsetLeft,i=o.offsetTop)}return{width:a,height:l,x:s+Xe(e),y:i}}function nn(e){var t,r=G(e),n=Ke(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=Z(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),l=Z(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-n.scrollLeft+Xe(e),i=-n.scrollTop;return U(o||r).direction==="rtl"&&(s+=Z(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:l,x:s,y:i}}function Ye(e){var t=U(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function kt(e){return["html","body","#document"].indexOf(Y(e))>=0?e.ownerDocument.body:z(e)&&Ye(e)?e:kt(ke(e))}function he(e,t){var r;t===void 0&&(t=[]);var n=kt(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=L(n),l=o?[a].concat(a.visualViewport||[],Ye(n)?n:[]):n,s=t.concat(l);return o?s:s.concat(he(ke(l)))}function Fe(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function on(e,t){var r=se(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function vt(e,t,r){return t===jt?Fe(rn(e,r)):ee(t)?on(t,r):Fe(nn(G(e)))}function an(e){var t=he(ke(e)),r=["absolute","fixed"].indexOf(U(e).position)>=0,n=r&&z(e)?be(e):e;return ee(n)?t.filter(function(o){return ee(o)&&Et(o,n)&&Y(o)!=="body"}):[]}function sn(e,t,r,n){var o=t==="clippingParents"?an(e):[].concat(t),a=[].concat(o,[r]),l=a[0],s=a.reduce(function(i,u){var c=vt(e,u,n);return i.top=Z(c.top,i.top),i.right=Ae(c.right,i.right),i.bottom=Ae(c.bottom,i.bottom),i.left=Z(c.left,i.left),i},vt(e,l,n));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Rt(e){var t=e.reference,r=e.element,n=e.placement,o=n?q(n):null,a=n?ce(n):null,l=t.x+t.width/2-r.width/2,s=t.y+t.height/2-r.height/2,i;switch(o){case N:i={x:l,y:t.y-r.height};break;case H:i={x:l,y:t.y+t.height};break;case F:i={x:t.x+t.width,y:s};break;case B:i={x:t.x-r.width,y:s};break;default:i={x:t.x,y:t.y}}var u=o?Ue(o):null;if(u!=null){var c=u==="y"?"height":"width";switch(a){case ae:i[u]=i[u]-(t[c]/2-r[c]/2);break;case ge:i[u]=i[u]+(t[c]/2-r[c]/2);break}}return i}function we(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,l=a===void 0?e.strategy:a,s=r.boundary,i=s===void 0?Ar:s,u=r.rootBoundary,c=u===void 0?jt:u,d=r.elementContext,g=d===void 0?de:d,f=r.altBoundary,v=f===void 0?!1:f,h=r.padding,p=h===void 0?0:h,$=Mt(typeof p!="number"?p:Pt(p,ye)),b=g===de?Mr:de,x=e.rects.popper,w=e.elements[v?b:g],y=sn(ee(w)?w:w.contextElement||G(e.elements.popper),i,c,l),j=se(e.elements.reference),D=Rt({reference:j,element:x,strategy:"absolute",placement:o}),E=Fe(Object.assign({},x,D)),P=g===de?E:j,M={top:y.top-P.top+$.top,bottom:P.bottom-y.bottom+$.bottom,left:y.left-P.left+$.left,right:P.right-y.right+$.right},C=e.modifiersData.offset;if(g===de&&C){var S=C[o];Object.keys(M).forEach(function(A){var k=[F,H].indexOf(A)>=0?1:-1,I=[N,H].indexOf(A)>=0?"y":"x";M[A]+=S[I]*k})}return M}function cn(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,l=r.padding,s=r.flipVariations,i=r.allowedAutoPlacements,u=i===void 0?Dt:i,c=ce(n),d=c?s?lt:lt.filter(function(v){return ce(v)===c}):ye,g=d.filter(function(v){return u.indexOf(v)>=0});g.length===0&&(g=d);var f=g.reduce(function(v,h){return v[h]=we(e,{placement:h,boundary:o,rootBoundary:a,padding:l})[q(h)],v},{});return Object.keys(f).sort(function(v,h){return f[v]-f[h]})}function un(e){if(q(e)===Ve)return[];var t=Ee(e);return[pt(e),t,pt(t)]}function ln(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,l=r.altAxis,s=l===void 0?!0:l,i=r.fallbackPlacements,u=r.padding,c=r.boundary,d=r.rootBoundary,g=r.altBoundary,f=r.flipVariations,v=f===void 0?!0:f,h=r.allowedAutoPlacements,p=t.options.placement,$=q(p),b=$===p,x=i||(b||!v?[Ee(p)]:un(p)),w=[p].concat(x).reduce(function(oe,K){return oe.concat(q(K)===Ve?cn(t,{placement:K,boundary:c,rootBoundary:d,padding:u,flipVariations:v,allowedAutoPlacements:h}):K)},[]),y=t.rects.reference,j=t.rects.popper,D=new Map,E=!0,P=w[0],M=0;M<w.length;M++){var C=w[M],S=q(C),A=ce(C)===ae,k=[N,H].indexOf(S)>=0,I=k?"width":"height",R=we(t,{placement:C,boundary:c,rootBoundary:d,altBoundary:g,padding:u}),W=k?A?F:B:A?H:N;y[I]>j[I]&&(W=Ee(W));var ue=Ee(W),V=[];if(a&&V.push(R[S]<=0),s&&V.push(R[W]<=0,R[ue]<=0),V.every(function(oe){return oe})){P=C,E=!1;break}D.set(C,V)}if(E)for(var T=v?3:1,ne=function(K){var fe=w.find(function($e){var J=D.get($e);if(J)return J.slice(0,K).every(function(Re){return Re})});if(fe)return P=fe,"break"},le=T;le>0;le--){var Oe=ne(le);if(Oe==="break")break}t.placement!==P&&(t.modifiersData[n]._skip=!0,t.placement=P,t.reset=!0)}}const fn={name:"flip",enabled:!0,phase:"main",fn:ln,requiresIfExists:["offset"],data:{_skip:!1}};function mt(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function ht(e){return[N,F,H,B].some(function(t){return e[t]>=0})}function dn(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,l=we(t,{elementContext:"reference"}),s=we(t,{altBoundary:!0}),i=mt(l,n),u=mt(s,o,a),c=ht(i),d=ht(u);t.modifiersData[r]={referenceClippingOffsets:i,popperEscapeOffsets:u,isReferenceHidden:c,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":d})}const pn={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:dn};function vn(e,t,r){var n=q(e),o=[B,N].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,l=a[0],s=a[1];return l=l||0,s=(s||0)*o,[B,F].indexOf(n)>=0?{x:s,y:l}:{x:l,y:s}}function mn(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,l=Dt.reduce(function(c,d){return c[d]=vn(d,t.rects,a),c},{}),s=l[t.placement],i=s.x,u=s.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=i,t.modifiersData.popperOffsets.y+=u),t.modifiersData[n]=l}const hn={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:mn};function gn(e){var t=e.state,r=e.name;t.modifiersData[r]=Rt({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const wn={name:"popperOffsets",enabled:!0,phase:"read",fn:gn,data:{}};function yn(e){return e==="x"?"y":"x"}function bn(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,l=r.altAxis,s=l===void 0?!1:l,i=r.boundary,u=r.rootBoundary,c=r.altBoundary,d=r.padding,g=r.tether,f=g===void 0?!0:g,v=r.tetherOffset,h=v===void 0?0:v,p=we(t,{boundary:i,rootBoundary:u,padding:d,altBoundary:c}),$=q(t.placement),b=ce(t.placement),x=!b,w=Ue($),y=yn(w),j=t.modifiersData.popperOffsets,D=t.rects.reference,E=t.rects.popper,P=typeof h=="function"?h(Object.assign({},t.rects,{placement:t.placement})):h,M=typeof P=="number"?{mainAxis:P,altAxis:P}:Object.assign({mainAxis:0,altAxis:0},P),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,S={x:0,y:0};if(j){if(a){var A,k=w==="y"?N:B,I=w==="y"?H:F,R=w==="y"?"height":"width",W=j[w],ue=W+p[k],V=W-p[I],T=f?-E[R]/2:0,ne=b===ae?D[R]:E[R],le=b===ae?-E[R]:-D[R],Oe=t.elements.arrow,oe=f&&Oe?ze(Oe):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:At(),fe=K[k],$e=K[I],J=me(0,D[R],oe[R]),Re=x?D[R]/2-T-J-fe-M.mainAxis:ne-J-fe-M.mainAxis,er=x?-D[R]/2+T+J+$e+M.mainAxis:le+J+$e+M.mainAxis,Te=t.elements.arrow&&be(t.elements.arrow),tr=Te?w==="y"?Te.clientTop||0:Te.clientLeft||0:0,Je=(A=C==null?void 0:C[w])!=null?A:0,rr=W+Re-Je-tr,nr=W+er-Je,Qe=me(f?Ae(ue,rr):ue,W,f?Z(V,nr):V);j[w]=Qe,S[w]=Qe-W}if(s){var Ze,or=w==="x"?N:B,ar=w==="x"?H:F,Q=j[y],Ce=y==="y"?"height":"width",_e=Q+p[or],et=Q-p[ar],Ie=[N,B].indexOf($)!==-1,tt=(Ze=C==null?void 0:C[y])!=null?Ze:0,rt=Ie?_e:Q-D[Ce]-E[Ce]-tt+M.altAxis,nt=Ie?Q+D[Ce]+E[Ce]-tt-M.altAxis:et,ot=f&&Ie?qr(rt,Q,nt):me(f?rt:_e,Q,f?nt:et);j[y]=ot,S[y]=ot-Q}t.modifiersData[n]=S}}const xn={name:"preventOverflow",enabled:!0,phase:"main",fn:bn,requiresIfExists:["offset"]};function On(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function $n(e){return e===L(e)||!z(e)?Ke(e):On(e)}function Cn(e){var t=e.getBoundingClientRect(),r=ie(t.width)/e.offsetWidth||1,n=ie(t.height)/e.offsetHeight||1;return r!==1||n!==1}function jn(e,t,r){r===void 0&&(r=!1);var n=z(t),o=z(t)&&Cn(t),a=G(t),l=se(e,o,r),s={scrollLeft:0,scrollTop:0},i={x:0,y:0};return(n||!n&&!r)&&((Y(t)!=="body"||Ye(a))&&(s=$n(t)),z(t)?(i=se(t,!0),i.x+=t.clientLeft,i.y+=t.clientTop):a&&(i.x=Xe(a))),{x:l.left+s.scrollLeft-i.x,y:l.top+s.scrollTop-i.y,width:l.width,height:l.height}}function Dn(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var l=[].concat(a.requires||[],a.requiresIfExists||[]);l.forEach(function(s){if(!r.has(s)){var i=t.get(s);i&&o(i)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function Sn(e){var t=Dn(e);return Hr.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function En(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function An(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var gt={placement:"bottom",modifiers:[],strategy:"absolute"};function wt(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Mn(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?gt:o;return function(s,i,u){u===void 0&&(u=a);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},gt,a),modifiersData:{},elements:{reference:s,popper:i},attributes:{},styles:{}},d=[],g=!1,f={state:c,setOptions:function($){var b=typeof $=="function"?$(c.options):$;h(),c.options=Object.assign({},a,c.options,b),c.scrollParents={reference:ee(s)?he(s):s.contextElement?he(s.contextElement):[],popper:he(i)};var x=Sn(An([].concat(n,c.options.modifiers)));return c.orderedModifiers=x.filter(function(w){return w.enabled}),v(),f.update()},forceUpdate:function(){if(!g){var $=c.elements,b=$.reference,x=$.popper;if(wt(b,x)){c.rects={reference:jn(b,be(x),c.options.strategy==="fixed"),popper:ze(x)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(M){return c.modifiersData[M.name]=Object.assign({},M.data)});for(var w=0;w<c.orderedModifiers.length;w++){if(c.reset===!0){c.reset=!1,w=-1;continue}var y=c.orderedModifiers[w],j=y.fn,D=y.options,E=D===void 0?{}:D,P=y.name;typeof j=="function"&&(c=j({state:c,options:E,name:P,instance:f})||c)}}}},update:En(function(){return new Promise(function(p){f.forceUpdate(),p(c)})}),destroy:function(){h(),g=!0}};if(!wt(s,i))return f;f.setOptions(u).then(function(p){!g&&u.onFirstUpdate&&u.onFirstUpdate(p)});function v(){c.orderedModifiers.forEach(function(p){var $=p.name,b=p.options,x=b===void 0?{}:b,w=p.effect;if(typeof w=="function"){var y=w({state:c,name:$,instance:f,options:x}),j=function(){};d.push(y||j)}})}function h(){d.forEach(function(p){return p()}),d=[]}return f}}const Pn=Mn({defaultModifiers:[pn,wn,Qr,_r,hn,fn,xn,Xr]}),kn=["enabled","placement","strategy","modifiers"];function Rn(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const Tn={name:"applyStyles",enabled:!1,phase:"afterWrite",fn:()=>{}},In={name:"ariaDescribedBy",enabled:!0,phase:"afterWrite",effect:({state:e})=>()=>{const{reference:t,popper:r}=e.elements;if("removeAttribute"in t){const n=(t.getAttribute("aria-describedby")||"").split(",").filter(o=>o.trim()!==r.id);n.length?t.setAttribute("aria-describedby",n.join(",")):t.removeAttribute("aria-describedby")}},fn:({state:e})=>{var t;const{popper:r,reference:n}=e.elements,o=(t=r.getAttribute("role"))==null?void 0:t.toLowerCase();if(r.id&&o==="tooltip"&&"setAttribute"in n){const a=n.getAttribute("aria-describedby");if(a&&a.split(",").indexOf(r.id)!==-1)return;n.setAttribute("aria-describedby",a?`${a},${r.id}`:r.id)}}},Nn=[];function Bn(e,t,r={}){let{enabled:n=!0,placement:o="bottom",strategy:a="absolute",modifiers:l=Nn}=r,s=Rn(r,kn);const i=m.useRef(l),u=m.useRef(),c=m.useCallback(()=>{var p;(p=u.current)==null||p.update()},[]),d=m.useCallback(()=>{var p;(p=u.current)==null||p.forceUpdate()},[]),[g,f]=Er(m.useState({placement:o,update:c,forceUpdate:d,attributes:{},styles:{popper:{},arrow:{}}})),v=m.useMemo(()=>({name:"updateStateModifier",enabled:!0,phase:"write",requires:["computeStyles"],fn:({state:p})=>{const $={},b={};Object.keys(p.elements).forEach(x=>{$[x]=p.styles[x],b[x]=p.attributes[x]}),f({state:p,styles:$,attributes:b,update:c,forceUpdate:d,placement:p.placement})}}),[c,d,f]),h=m.useMemo(()=>(ve(i.current,l)||(i.current=l),i.current),[l]);return m.useEffect(()=>{!u.current||!n||u.current.setOptions({placement:o,strategy:a,modifiers:[...h,v,Tn]})},[a,o,v,n,h]),m.useEffect(()=>{if(!(!n||e==null||t==null))return u.current=Pn(e,t,Object.assign({},s,{placement:o,strategy:a,modifiers:[...h,In,v]})),()=>{u.current!=null&&(u.current.destroy(),u.current=void 0,f(p=>Object.assign({},p,{attributes:{},styles:{popper:{}}})))}},[n,e,t]),g}const yt=()=>{};function Wn(e){return e.button===0}function Ln(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}const Be=e=>e&&("current"in e?e.current:e),bt={click:"mousedown",mouseup:"mousedown",pointerup:"pointerdown"};function Hn(e,t=yt,{disabled:r,clickTrigger:n="click"}={}){const o=m.useRef(!1),a=m.useRef(!1),l=m.useCallback(u=>{const c=Be(e);jr(!!c,"ClickOutside captured a close event but does not have a ref to compare it to. useClickOutside(), should be passed a ref that resolves to a DOM node"),o.current=!c||Ln(u)||!Wn(u)||!!at(c,u.target)||a.current,a.current=!1},[e]),s=X(u=>{const c=Be(e);c&&at(c,u.target)&&(a.current=!0)}),i=X(u=>{o.current||t(u)});m.useEffect(()=>{var u,c;if(r||e==null)return;const d=cr(Be(e)),g=d.defaultView||window;let f=(u=g.event)!=null?u:(c=g.parent)==null?void 0:c.event,v=null;bt[n]&&(v=je(d,bt[n],s,!0));const h=je(d,n,l,!0),p=je(d,n,b=>{if(b===f){f=void 0;return}i(b)});let $=[];return"ontouchstart"in d.documentElement&&($=[].slice.call(d.body.children).map(b=>je(b,"mousemove",yt))),()=>{v==null||v(),h(),p(),$.forEach(b=>b())}},[e,r,n,l,s,i])}function Fn(e){const t={};return Array.isArray(e)?(e==null||e.forEach(r=>{t[r.name]=r}),t):e||t}function Vn(e={}){return Array.isArray(e)?e:Object.keys(e).map(t=>(e[t].name=t,e[t]))}function qn({enabled:e,enableEvents:t,placement:r,flip:n,offset:o,fixed:a,containerPadding:l,arrowElement:s,popperConfig:i={}}){var u,c,d,g,f;const v=Fn(i.modifiers);return Object.assign({},i,{placement:r,enabled:e,strategy:a?"fixed":i.strategy,modifiers:Vn(Object.assign({},v,{eventListeners:{enabled:t,options:(u=v.eventListeners)==null?void 0:u.options},preventOverflow:Object.assign({},v.preventOverflow,{options:l?Object.assign({padding:l},(c=v.preventOverflow)==null?void 0:c.options):(d=v.preventOverflow)==null?void 0:d.options}),offset:{options:Object.assign({offset:o},(g=v.offset)==null?void 0:g.options)},arrow:Object.assign({},v.arrow,{enabled:!!s,options:Object.assign({},(f=v.arrow)==null?void 0:f.options,{element:s})}),flip:Object.assign({enabled:!!n},v.flip)}))})}const zn=["children"];function Un(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const Kn=()=>{};function Tt(e={}){const t=m.useContext(Pe),[r,n]=ur(),o=m.useRef(!1),{flip:a,offset:l,rootCloseEvent:s,fixed:i=!1,placement:u,popperConfig:c={},enableEventListeners:d=!0,usePopper:g=!!t}=e,f=(t==null?void 0:t.show)==null?!!e.show:t.show;f&&!o.current&&(o.current=!0);const v=j=>{t==null||t.toggle(!1,j)},{placement:h,setMenu:p,menuElement:$,toggleElement:b}=t||{},x=Bn(b,$,qn({placement:u||h||"bottom-start",enabled:g,enableEvents:d??f,offset:l,flip:a,fixed:i,arrowElement:r,popperConfig:c})),w=Object.assign({ref:p||Kn,"aria-labelledby":b==null?void 0:b.id},x.attributes.popper,{style:x.styles.popper}),y={show:f,placement:h,hasShown:o.current,toggle:t==null?void 0:t.toggle,popper:g?x:null,arrowProps:g?Object.assign({ref:n},x.attributes.arrow,{style:x.styles.arrow}):{}};return Hn($,v,{clickTrigger:s,disabled:!f}),[w,y]}const Xn={usePopper:!0};function Ge(e){let{children:t}=e,r=Un(e,zn);const[n,o]=Tt(r);return O.jsx(O.Fragment,{children:t(n,o)})}Ge.displayName="DropdownMenu";Ge.defaultProps=Xn;const Me={prefix:String(Math.round(Math.random()*1e10)),current:0},It=_.createContext(Me),Yn=_.createContext(!1);let Gn=!!(typeof window<"u"&&window.document&&window.document.createElement),We=new WeakMap;function Jn(e=!1){let t=m.useContext(It),r=m.useRef(null);if(r.current===null&&!e){var n,o;let a=(n=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)===null||n===void 0||(o=n.ReactCurrentOwner)===null||o===void 0?void 0:o.current;if(a){let l=We.get(a);l==null?We.set(a,{id:t.current,state:a.memoizedState}):a.memoizedState!==l.state&&(t.current=l.id,We.delete(a))}r.current=++t.current}return r.current}function Qn(e){let t=m.useContext(It);t===Me&&!Gn&&console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");let r=Jn(!!e),n=`react-aria${t.prefix}`;return e||`${n}-${r}`}function Zn(e){let t=_.useId(),[r]=m.useState(no()),n=r?"react-aria":`react-aria${Me.prefix}`;return e||`${n}-${t}`}const _n=typeof _.useId=="function"?Zn:Qn;function eo(){return!1}function to(){return!0}function ro(e){return()=>{}}function no(){return typeof _.useSyncExternalStore=="function"?_.useSyncExternalStore(ro,eo,to):m.useContext(Yn)}const Nt=e=>{var t;return((t=e.getAttribute("role"))==null?void 0:t.toLowerCase())==="menu"},xt=()=>{};function Bt(){const e=_n(),{show:t=!1,toggle:r=xt,setToggle:n,menuElement:o}=m.useContext(Pe)||{},a=m.useCallback(s=>{r(!t,s)},[t,r]),l={id:e,ref:n||xt,onClick:a,"aria-expanded":!!t};return o&&Nt(o)&&(l["aria-haspopup"]=!0),[l,{show:t,toggle:r}]}function Wt({children:e}){const[t,r]=Bt();return O.jsx(O.Fragment,{children:e(t,r)})}Wt.displayName="DropdownToggle";const oo=["eventKey","disabled","onClick","active","as"];function ao(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}function Lt({key:e,href:t,active:r,disabled:n,onClick:o}){const a=m.useContext(Le),l=m.useContext(lr),{activeKey:s}=l||{},i=it(e,t),u=r==null&&e!=null?it(s)===i:r;return[{onClick:X(d=>{n||(o==null||o(d),a&&!d.isPropagationStopped()&&a(i,d))}),"aria-disabled":n||void 0,"aria-selected":u,[$t("dropdown-item")]:""},{isActive:u}]}const Ht=m.forwardRef((e,t)=>{let{eventKey:r,disabled:n,onClick:o,active:a,as:l=fr}=e,s=ao(e,oo);const[i]=Lt({key:r,href:s.href,disabled:n,onClick:o,active:a});return O.jsx(l,Object.assign({},s,{ref:t},i))});Ht.displayName="DropdownItem";function Ot(){const e=mr(),t=m.useRef(null),r=m.useCallback(n=>{t.current=n,e()},[e]);return[t,r]}function xe({defaultShow:e,show:t,onSelect:r,onToggle:n,itemSelector:o=`* [${$t("dropdown-item")}]`,focusFirstItemOnShow:a,placement:l="bottom-start",children:s}){const i=dr(),[u,c]=Dr(t,e,n),[d,g]=Ot(),f=d.current,[v,h]=Ot(),p=v.current,$=pr(u),b=m.useRef(null),x=m.useRef(!1),w=m.useContext(Le),y=m.useCallback((C,S,A=S==null?void 0:S.type)=>{c(C,{originalEvent:S,source:A})},[c]),j=X((C,S)=>{r==null||r(C,S),y(!1,S,"select"),S.isPropagationStopped()||w==null||w(C,S)}),D=m.useMemo(()=>({toggle:y,placement:l,show:u,menuElement:f,toggleElement:p,setMenu:g,setToggle:h}),[y,l,u,f,p,g,h]);f&&$&&!u&&(x.current=f.contains(f.ownerDocument.activeElement));const E=X(()=>{p&&p.focus&&p.focus()}),P=X(()=>{const C=b.current;let S=a;if(S==null&&(S=d.current&&Nt(d.current)?"keyboard":!1),S===!1||S==="keyboard"&&!/^key.+$/.test(C))return;const A=st(d.current,o)[0];A&&A.focus&&A.focus()});m.useEffect(()=>{u?P():x.current&&(x.current=!1,E())},[u,x,E,P]),m.useEffect(()=>{b.current=null});const M=(C,S)=>{if(!d.current)return null;const A=st(d.current,o);let k=A.indexOf(C)+S;return k=Math.max(0,Math.min(k,A.length)),A[k]};return Or(m.useCallback(()=>i.document,[i]),"keydown",C=>{var S,A;const{key:k}=C,I=C.target,R=(S=d.current)==null?void 0:S.contains(I),W=(A=v.current)==null?void 0:A.contains(I);if(/input|textarea/i.test(I.tagName)&&(k===" "||k!=="Escape"&&R||k==="Escape"&&I.type==="search")||!R&&!W||k==="Tab"&&(!d.current||!u))return;b.current=C.type;const V={originalEvent:C,source:C.type};switch(k){case"ArrowUp":{const T=M(I,-1);T&&T.focus&&T.focus(),C.preventDefault();return}case"ArrowDown":if(C.preventDefault(),!u)c(!0,V);else{const T=M(I,1);T&&T.focus&&T.focus()}return;case"Tab":vr(I.ownerDocument,"keyup",T=>{var ne;(T.key==="Tab"&&!T.target||!((ne=d.current)!=null&&ne.contains(T.target)))&&c(!1,V)},{once:!0});break;case"Escape":k==="Escape"&&(C.preventDefault(),C.stopPropagation()),c(!1,V);break}}),O.jsx(Le.Provider,{value:j,children:O.jsx(Pe.Provider,{value:D,children:s})})}xe.displayName="Dropdown";xe.Menu=Ge;xe.Toggle=Wt;xe.Item=Ht;const Ft=m.createContext({});Ft.displayName="DropdownContext";const Vt=Ft,qt=m.forwardRef(({className:e,bsPrefix:t,as:r="hr",role:n="separator",...o},a)=>(t=te(t,"dropdown-divider"),O.jsx(r,{ref:a,className:re(e,t),role:n,...o})));qt.displayName="DropdownDivider";const io=qt,zt=m.forwardRef(({className:e,bsPrefix:t,as:r="div",role:n="heading",...o},a)=>(t=te(t,"dropdown-header"),O.jsx(r,{ref:a,className:re(e,t),role:n,...o})));zt.displayName="DropdownHeader";const so=zt,Ut=m.forwardRef(({bsPrefix:e,className:t,eventKey:r,disabled:n=!1,onClick:o,active:a,as:l=hr,...s},i)=>{const u=te(e,"dropdown-item"),[c,d]=Lt({key:r,href:s.href,disabled:n,onClick:o,active:a});return O.jsx(l,{...s,...c,ref:i,className:re(t,u,d.isActive&&"active",n&&"disabled")})});Ut.displayName="DropdownItem";const co=Ut,Kt=m.forwardRef(({className:e,bsPrefix:t,as:r="span",...n},o)=>(t=te(t,"dropdown-item-text"),O.jsx(r,{ref:o,className:re(e,t),...n})));Kt.displayName="DropdownItemText";const uo=Kt,Xt=m.createContext(null);Xt.displayName="InputGroupContext";const Yt=Xt;function Gt(e,t){return e}function Jt(e,t,r){const n=r?"top-end":"top-start",o=r?"top-start":"top-end",a=r?"bottom-end":"bottom-start",l=r?"bottom-start":"bottom-end",s=r?"right-start":"left-start",i=r?"right-end":"left-end",u=r?"left-start":"right-start",c=r?"left-end":"right-end";let d=e?l:a;return t==="up"?d=e?o:n:t==="end"?d=e?c:u:t==="start"?d=e?i:s:t==="down-centered"?d="bottom":t==="up-centered"&&(d="top"),d}const Qt=m.forwardRef(({bsPrefix:e,className:t,align:r,rootCloseEvent:n,flip:o=!0,show:a,renderOnMount:l,as:s="div",popperConfig:i,variant:u,...c},d)=>{let g=!1;const f=m.useContext(gr),v=te(e,"dropdown-menu"),{align:h,drop:p,isRTL:$}=m.useContext(Vt);r=r||h;const b=m.useContext(Yt),x=[];if(r)if(typeof r=="object"){const C=Object.keys(r);if(C.length){const S=C[0],A=r[S];g=A==="start",x.push(`${v}-${S}-${A}`)}}else r==="end"&&(g=!0);const w=Jt(g,p,$),[y,{hasShown:j,popper:D,show:E,toggle:P}]=Tt({flip:o,rootCloseEvent:n,show:a,usePopper:!f&&x.length===0,offset:[0,2],popperConfig:i,placement:w});if(y.ref=Ct(Gt(d),y.ref),wr(()=>{E&&(D==null||D.update())},[E]),!j&&!l&&!b)return null;typeof s!="string"&&(y.show=E,y.close=()=>P==null?void 0:P(!1),y.align=r);let M=c.style;return D!=null&&D.placement&&(M={...c.style,...y.style},c["x-placement"]=D.placement),O.jsx(s,{...c,...y,style:M,...(x.length||f)&&{"data-bs-popper":"static"},className:re(t,v,E&&"show",g&&`${v}-end`,u&&`${v}-${u}`,...x)})});Qt.displayName="DropdownMenu";const lo=Qt,Zt=m.forwardRef(({bsPrefix:e,split:t,className:r,childBsPrefix:n,as:o=pe,...a},l)=>{const s=te(e,"dropdown-toggle"),i=m.useContext(Pe);n!==void 0&&(a.bsPrefix=n);const[u]=Bt();return u.ref=Ct(u.ref,Gt(l)),O.jsx(o,{className:re(r,s,t&&`${s}-split`,(i==null?void 0:i.show)&&"show"),...u,...a})});Zt.displayName="DropdownToggle";const fo=Zt,_t=m.forwardRef((e,t)=>{const{bsPrefix:r,drop:n="down",show:o,className:a,align:l="start",onSelect:s,onToggle:i,focusFirstItemOnShow:u,as:c="div",navbar:d,autoClose:g=!0,...f}=yr(e,{show:"onToggle"}),v=m.useContext(Yt),h=te(r,"dropdown"),p=br(),$=D=>g===!1?D==="click":g==="inside"?D!=="rootClose":g==="outside"?D!=="select":!0,b=X((D,E)=>{E.originalEvent.currentTarget===document&&(E.source!=="keydown"||E.originalEvent.key==="Escape")&&(E.source="rootClose"),$(E.source)&&(i==null||i(D,E))}),w=Jt(l==="end",n,p),y=m.useMemo(()=>({align:l,drop:n,isRTL:p}),[l,n,p]),j={down:h,"down-centered":`${h}-center`,up:"dropup","up-centered":"dropup-center dropup",end:"dropend",start:"dropstart"};return O.jsx(Vt.Provider,{value:y,children:O.jsx(xe,{placement:w,show:o,onSelect:s,onToggle:b,focusFirstItemOnShow:u,itemSelector:`.${h}-item:not(.disabled):not(:disabled)`,children:v?f.children:O.jsx(c,{...f,ref:t,className:re(a,o&&"show",j[n])})})})});_t.displayName="Dropdown";const Se=Object.assign(_t,{Toggle:fo,Menu:lo,Item:co,ItemText:uo,Divider:io,Header:so}),vo=()=>{const[e,t]=m.useState([]),[r,n]=m.useState(null),[o,a]=m.useState(!1),[l,s]=m.useState({});m.useEffect(()=>{async function f(){try{const h=await(await fetch("http://localhost:3000/food/restaurants")).json();t(h)}catch(v){console.error("Error fetching restaurants:",v)}}f()},[]);const i=f=>{n(f)},u=f=>{s(f),a(!0)},c=()=>{a(!0)},d=()=>{const f=r.dishes.map(h=>h===l?{...h,Name:itemName,Description:itemDescription,Price:itemPrice,Spice:itemSpice}:h),v=e.map(h=>h===r?{...h,dishes:f}:h);t(v),g()},g=()=>{a(!1),s({})};return O.jsxs("div",{className:"dashbody",children:[O.jsx(xr,{loc:"listNav"}),O.jsxs(Se,{children:[O.jsx(Se.Toggle,{variant:"success",id:"dropdown-basic",children:r?r.name:"Select a Restaurant"}),O.jsx(Se.Menu,{children:e.map(f=>O.jsx(Se.Item,{onClick:()=>i(f),children:f.name},f._id))})]}),r&&O.jsxs("div",{children:[O.jsx("h2",{children:r.name}),O.jsx("img",{src:r.imageurl,alt:r.name}),O.jsxs("p",{children:["Rating: ",r.rating]}),O.jsx("h3",{children:"Menu:"}),O.jsx("ul",{children:r.dishes.map((f,v)=>O.jsxs("li",{children:[O.jsx("h4",{children:f.Name}),O.jsxs("p",{children:["Description: ",f.Description]}),O.jsxs("p",{children:["Price: ",f.Price]}),O.jsxs("p",{children:["Spice: ",f.Spice]}),O.jsx("img",{src:f.imageurl,alt:f.Name}),O.jsx(pe,{onClick:()=>u(f),children:"Modify"})]},v))}),O.jsx(pe,{onClick:c,children:"Add New Item"})]}),O.jsxs(Ne,{show:o,onHide:g,children:[O.jsx(Ne.Body,{}),O.jsxs(Ne.Footer,{children:[O.jsx(pe,{variant:"secondary",onClick:g,children:"Close"}),O.jsx(pe,{variant:"primary",onClick:d,children:"Save Changes"})]})]})]})};export{vo as default};
