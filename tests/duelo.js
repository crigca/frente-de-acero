// Partida IA roja (la del juego) contra un bot azul que juega con las mismas reglas y la misma táctica (espejo de aiThink).
// El bot usa las funciones del juego: cola de fábrica (pagando), order(), y nada más.
const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__x={PROD,set level(v){level=v},get mix(){return ai.mix},order,COST,SUPPLY,pending,queued,QMAX,BUILD,buildTime,get time(){return time},get over(){return over},get pct(){return pct},U,HW,fabCount};");
const SEED=+process.argv[2]||1;{let a=SEED*2654435761>>>0;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
process.argv[2]='frente-de-acero.html';
eval(src+`
const X=__x,d2=(a,b)=>(a.x-b.x)**2+(a.y-b.y)**2;
if(process.env.LV)X.level=+process.env.LV;
const bot={nq:0,cool:0},PAT=['inf','inf','at','inf','tank'],redMade={inf:0,at:0,tank:0,amb:0,art:0,cmd:0},ids=new Set();
const st={bought:{inf:0,at:0,tank:0,amb:0,art:0,cmd:0},caps:0,recaps:0,slowOK:0,slowBad:0,maxQ:0,qLost:0,over3:0,ovl:0,mid:0,negGold:0};
function botThink(){
  const us=__u(),mine=us.filter(u=>u.team===0),foes=us.filter(u=>u.team===1),cs=__c();
  const myC=cs.filter(c=>c.owner===0),enC=cs.filter(c=>c.owner!==0),g=__g();
  // compras: como la IA
  const rt0=fabsWant(us);
  const fabs=myC.filter(c=>c.type&&X.PROD[c.type].includes(rt0)&&c.queue.length<2).sort((a,b)=>a.queue.length-b.queue.length);
  if(fabs.length&&mine.length+X.pending(0)<myC.length*X.SUPPLY){
    const rt=rt0;
    if(g[0]>=X.COST[rt]){g[0]-=X.COST[rt];fabs[0].queue.push(rt);st.bought[rt]++;if(rt!=='at'||PAT[bot.nq%5]==='at')bot.nq++;}
  }
  if(!myC.length||!enC.length)return;
  let target=null,stage=null,bd=1e18;
  enC.forEach(e=>myC.forEach(m=>{const dd=d2(e,m);if(dd<bd){bd=dd;target=e;stage=m;}}));
  const L=Math.sqrt(bd)||1,sx=stage.x+(target.x-stage.x)/L*X.HW,sy=stage.y+(target.y-stage.y)/L*X.HW;
  mine.forEach(u=>{if(u.job==='gar'&&!myC.some(c=>c.k===u.garK))u.job=null;if(u.job==='def')u.job=null;});
  myC.forEach(c=>{
    let gq=mine.find(u=>u.job==='gar'&&u.garK===c.k);
    if(!gq){gq=mine.find(u=>u.c===c.k&&u.type!=='amb'&&u.job!=='gar');
      if(!gq){let b=1e18;mine.forEach(u=>{if(!u.job&&!u.fight&&u.type!=='amb'){const dd=d2(u,c);if(dd<b){b=dd;gq=u;}}});}
      if(!gq)return;gq.job='gar';gq.garK=c.k;}
    if(gq.c!==c.k&&gq.dc!==c.k&&!gq.fight)X.order([gq],c.x,c.y);
  });
  myC.forEach(c=>{
    const thr=foes.filter(f=>d2(f,c)<(140*X.U)**2).length;if(!thr)return;
    const cand=mine.filter(u=>u.type!=='amb'&&!u.job&&d2(u,c)<(270*X.U)**2).sort((a,b)=>d2(a,c)-d2(b,c)).slice(0,thr+1);
    cand.forEach(u=>u.job='def');
    X.order(cand.filter(u=>!u.fight&&u.dc<0&&d2(u,c)>(95*X.U)**2),c.x,c.y);
  });
  const pool=mine.filter(u=>!u.job),atk=mine.filter(u=>u.job==='atk');
  const far=(u,R)=>(u.x-sx)**2+(u.y-sy)**2>R*R;
  X.order(pool.filter(u=>!u.fight&&u.dc<0&&far(u,135*X.U)),sx,sy);
  if(X.time>=45){
    const ready=pool.filter(u=>u.type!=='amb'&&!u.fight&&u.dc<0&&!far(u,140*X.U));
    if(ready.length>=4&&X.time>=bot.cool){const w=ready.slice(0,5);w.forEach(u=>u.job='atk');X.order(w,target.x,target.y,true);bot.cool=X.time+45;}
    X.order(atk.filter(u=>!u.fight&&u.dc<0&&u.c!==target.k),target.x,target.y,true);
  }
}
function fabsWant(us){
  let rt=0,ba=0;us.forEach(u=>{if(u.team===1&&u.type==='tank')rt++;else if(u.team===0&&u.type==='at')ba++;});
  if(rt>ba+X.queued(0,'at'))return 'at';
  return PAT[bot.nq%5];
}
const prevOwner=new Map(),prevQ=new Map(),spawnT=new Map();let seen=new Set(),res='TIEMPO';
for(let i=0;i<60*60*40;i++){
  step1();
  if(i%240===120)botThink();
  if(i%30===0)for(const u of __u())if(!ids.has(u.id)){ids.add(u.id);if(u.team===1)redMade[u.type]++;}
  const cs=__c(),us=__u();
  if(__g()[0]<-0.001||__g()[1]<-0.001)st.negGold++;
  for(const c of cs){
    if(!c.type)continue;
    const po=prevOwner.get(c.k);
    if(po!==undefined&&po!==c.owner){st.caps++;if(c.owner===c.home)st.recaps++;if((prevQ.get(c.k)||0)>0){st.qLost++;if(c.queue.length)console.log('BUG cola no se perdió');}}
    prevOwner.set(c.k,c.owner);prevQ.set(c.k,c.queue.length);st.maxQ=Math.max(st.maxQ,c.queue.length);
    // tiempo real de fabricación: al empezar un encargo anoto la hora; al salir comparo
    if(c.queue.length&&c.bt>0&&c.bt<0.02)spawnT.set(c.k,{t:X.time,type:c.queue[0],slow:c.home!==c.owner});
  }
  if(true){
    const m={};for(const a of us){const e=m[a.c]||(m[a.c]={n:0,t:a.team});e.n++;if(e.t!==a.team||e.n>3){st.over3++;if(st.over3<4)console.log('PILA t='+X.time.toFixed(1),'hex',a.c,us.filter(b=>b.c===a.c||b.fc===a.c).map(b=>['id'+b.id,'T'+b.team,b.type,'c'+b.c,'fc'+b.fc,'dc'+b.dc,b.x.toFixed(1),b.y.toFixed(1),b.fight?'F':'',b.job||''].join(' ')).join(' ; '));}}
  }
  if(el('end').style.display==='flex'){res=el('endTitle').textContent+' '+el('endText').textContent;break;}
}
function step1(){T+=1000/60;const f=cb;f(T);}
const f=X.fabCount();
console.log('seed',SEED,'doctrina',JSON.stringify(X.mix),res,'| terr azul',Math.round(X.pct[0])+'%','fabs',f.join('/'),'| compró',JSON.stringify(st.bought),'| IA fabricó',JSON.stringify(redMade),'| capturas de fábrica',st.caps,'(recuperadas',st.recaps+')','colas perdidas',st.qLost,'maxCola',st.maxQ,'| pilas>3/mezcladas',st.over3,'oro<0',st.negGold);
`);
