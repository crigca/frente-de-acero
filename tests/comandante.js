const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__sg=v=>{gold[0]=v};global.__x={spawn,get ai(){return ai}};");
process.argv[2]='frente-de-acero.html';
eval(src+`
const X=__x,step=n=>{for(let i=0;i<n;i++){T+=1000/60;const f=cb;f(T);}};
const rc=(x,y)=>{cv.listeners.pointerdown({preventDefault:noop,button:2,clientX:x,clientY:y,pointerId:2});cv.listeners.pointerup({button:2,clientX:x,clientY:y,pointerId:2});};
function setup(){__map(3);step(2);X.ai.next=1e9;__u().forEach(u=>u.hp=0);__c().forEach(c=>{if(c.queue)c.queue=[]});step(2);}
function at(k,team,type){X.spawn({k,owner:team},type);return __u()[__u().length-1];}
function line(k,dir,n){let c=k;for(let i=0;i<n;i++)c=__t().nb[c][dir];return c;}
for(const d of [0,1,2,3]){setup();const rf=__c().find(c=>c.type==='fab'&&c.owner===1);const o=line(rf.k,3,7);const tgt=at(o,1,'tank');const me=line(o,3,2);at(me,0,'tank');if(d)at(line(me,3,d),0,'cmd');const h=tgt.hp;step(60*1.2);
console.log(d?'comandante a '+d+' hex':'sin comandante','-> daño del disparo de tanque',Math.round((h-tgt.hp)*100)/100);}
setup();const hq=__c().find(c=>c.type==='hq'&&c.owner===0);__sg(1000);{const v=__view();v.z=1;v.ox=0;v.oy=0;}step(1);rc(hq.x,hq.y);step(2);const b=__m().find(m=>m.type==='cmd');for(let i=0;i<3;i++){click(b.x+1,b.y+1);step(1);}
console.log('3 clicks en comandante con 1000 de oro -> cola',hq.queue.join(','),'| oro',Math.round(__g()[0]));
`);
