const fs=require('fs');
const html=fs.readFileSync(process.argv[2],'utf8');
const js=html.match(/<script>([\s\S]*)<\/script>/)[1];
const noop=()=>{};
const grad={addColorStop(){}};const ctx=new Proxy({},{get:(t,k)=>k in t?t[k]:(k==='createRadialGradient'||k==='createLinearGradient'?()=>grad:noop),set:(t,k,v)=>{t[k]=v;return true}});
const els={};
function el(id){return els[id]||(els[id]={id,style:{},classList:{toggle:noop,remove:noop},appendChild:noop,listeners:{},addEventListener(n,f){const L=this._l||(this._l={});(L[n]=L[n]||[]).push(f);this.listeners[n]=e=>L[n].forEach(g=>g(e))},getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:1305.3,height:720}),width:720,height:720,setPointerCapture:noop,textContent:''});}
const fabBtns=['inf','at','tank','hosp'].map(t=>Object.assign(el('fab_'+t),{getAttribute:()=>t,classList:{toggle:noop}}));global.document={addEventListener:noop,createElement:()=>({getContext:()=>ctx,width:0,height:0,addEventListener:noop,classList:{toggle:noop}}),getElementById:el,querySelectorAll:()=>fabBtns};
global.location={hash:'',search:''};global.window={addEventListener:noop,devicePixelRatio:1};
global.Path2D=class{moveTo(){}lineTo(){}rect(){}closePath(){}quadraticCurveTo(){}};
global.performance={now:()=>T};
let cb=null,T=0;global.requestAnimationFrame=f=>{cb=f};
const cv=el('cv');cv.getBoundingClientRect=()=>{const d=(global.__fit||!(global.__dim&&__dim()[0]))?[720*(global.__asp||1.8),720]:__dim();return {left:0,top:0,width:d[0],height:d[1],right:d[0],bottom:d[1]};};Object.defineProperty(cv,'width',{get(){return this._w||720},set(v){this._w=v}});Object.defineProperty(cv,'height',{get(){return this._h||720},set(v){this._h=v}});
eval(js.replace('init(mapN>0);resize();','var __fit0=fitGrid;fitGrid=function(){global.__fit=1;try{return __fit0();}finally{global.__fit=0;}};global.__u=()=>units;global.__dim=()=>[WX,WY];global.__view=()=>view;global.__c=()=>cities;global.__h=()=>[];global.__g=()=>gold;global.__m=()=>menuRects;global.__map=(n,asp)=>{mapN=n;if(asp)global.__asp=asp;init(true);};global.__info=()=>({FLAGS,FABS,mapN,GX,GY,own,diag});global.__t=()=>({lake,road,river,water,town,terr,nb,GX,GY,hx,hy,WX,WY,townK,roadPaths,riverPath,getField});init(mapN>0);resize();'));
const HS_=720/21.5,HW_=HS_*Math.sqrt(3),cc_=(i,j)=>[HW_*(i+0.5)+((j&1)?HW_/2:0),HS_+j*1.5*HS_];
function click(x,y){cv.listeners.pointerdown({preventDefault:noop,button:0,clientX:x,clientY:y,pointerId:1});cv.listeners.pointerup({clientX:x,clientY:y,pointerId:1});}
{T+=16;const f0=cb;f0(T);const v=__view();v.z=1;v.ox=0;v.oy=0;T+=16;const f1=cb;f1(T);}

const mode=process.argv[3];
for(let i=0;i<60*60*25;i++){T+=1000/60;const f=cb;f(T);if(i%900===0){const us=__u();let ov=0;for(const a of us)for(const b of us)if(a.id<b.id&&!(a.c===b.c||a.fc===b.c||b.fc===a.c||(a.fc>=0&&a.fc===b.fc))&&Math.hypot(a.x-b.x,a.y-b.y)<(({inf:13,tank:16,at:14,amb:13}[a.type])+({inf:13,tank:16,at:14,amb:13}[b.type]))*1.27-1)ov++;if(ov)console.log('OVERLAP',ov);{const m={};let bug=0;for(const a of us){const e=m[a.c]||(m[a.c]={n:0,t:a.team});e.n++;if(e.t!==a.team)bug++;if(e.n>3)bug++;}if(bug)console.log('STACKBUG',bug);}const HS=720/21.5,HW=HS*Math.sqrt(3);let mid=0;for(const a of us){if(a.fight){const j=Math.round((a.y-HS)/(1.5*HS)),fx=(a.x-((j&1)?HW/2:0))/HW-0.5;if(Math.abs(fx-Math.round(fx))>0.02)mid++;}}if(mid)console.log('MIDWAY',mid);}
 if(mode==='def'&&i%300===150){
   const us=__u(),bl=us.filter(u=>u.team===0),rd=us.filter(u=>u.team===1);
   if(rd.length&&bl.length){let cx=0,cy=0;bl.forEach(u=>{cx+=u.x;cy+=u.y});cx/=bl.length;cy/=bl.length;
    let t=rd.reduce((a,b)=>Math.hypot(a.x-cx,a.y-cy)<Math.hypot(b.x-cx,b.y-cy)?a:b);
    cv.listeners.pointerdown({preventDefault:noop,button:0,shiftKey:true,clientX:1,clientY:1,pointerId:1});
    cv.listeners.pointermove({clientX:5000,clientY:5000,pointerId:1});
    cv.listeners.pointerup({clientX:5000,clientY:5000,pointerId:1});
    cv.listeners.pointerdown({preventDefault:noop,button:2,clientX:t.x,clientY:t.y,pointerId:2});cv.listeners.pointerup({button:2,clientX:t.x,clientY:t.y,pointerId:2});}
 }
 if(mode==='play'&&i%600===300){ // select all, attack-move toward Fragua-side cities
   global.window; el('cv'); 
   // drag-select whole map
   cv.listeners.pointerdown({preventDefault:noop,button:0,shiftKey:true,clientX:1,clientY:1,pointerId:1});
   cv.listeners.pointermove({clientX:5000,clientY:5000,pointerId:1});
   cv.listeners.pointerup({clientX:5000,clientY:5000,pointerId:1});
   const tx=[[638,385],[928,285],[928,486],[841,134],[1160,385]][Math.floor(i/7200)%5];
   cv.listeners.pointerdown({preventDefault:noop,button:2,clientX:tx[0],clientY:tx[1],pointerId:2});cv.listeners.pointerup({button:2,clientX:tx[0],clientY:tx[1],pointerId:2});
 }
 if(i%1800===0)console.log(el('clock').textContent,'B',el('bp').textContent,el('bc').textContent,el('bu').textContent,'R',el('rp').textContent,el('rc').textContent,el('ru').textContent,el('status').textContent);
 if(el('end').style.display==='flex'){console.log('END',el('endTitle').textContent,el('endText').textContent);break;}
}
