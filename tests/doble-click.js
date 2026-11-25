const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__x={spawn,get ai(){return ai}};");
process.argv[2]='frente-de-acero.html';
eval(src+`
const X=__x,step=n=>{for(let i=0;i<n;i++){T+=1000/60;const f=cb;f(T);}};
__map(3);step(3);X.ai.next=1e9;const v=__view();v.z=1;v.ox=0;v.oy=0;step(1);
const fabs=__c().filter(c=>c.type==='fab'&&c.owner===0);
// me aseguro de tener 3 infanterías repartidas
__u().filter(u=>u.team===0).forEach(u=>u.hp=0);step(2);
X.spawn(fabs[0],'inf');X.spawn(fabs[1],'inf');X.spawn(fabs[2],'inf');X.spawn(fabs[2],'tank');X.spawn(fabs[3],'at');step(200);
const inf=__u().find(u=>u.team===0&&u.type==='inf'&&u.c===fabs[0].k);
click(inf.x,inf.y);step(1);console.log('un click:',__u().filter(u=>u.sel).map(u=>u.type).join(','));
click(inf.x,inf.y);step(1);console.log('doble click (todo el mapa a la vista):',__u().filter(u=>u.sel).map(u=>u.type).join(','));
// con la vista acercada sobre esa fábrica, el doble click solo toma las que se ven
click(5,5);step(40);v.z=6;v.ox=inf.x-40;v.oy=inf.y-30;step(2);
const P=(x,y)=>[(x-v.ox)*v.z,(y-v.oy)*v.z];const [cx,cy]=P(inf.x,inf.y);
click(cx,cy);click(cx,cy);step(1);console.log('doble click con zoom (solo se ve una):',__u().filter(u=>u.sel).map(u=>u.type).join(','));
`);
