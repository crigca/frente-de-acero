const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__x={spawn,get ai(){return ai}};");
process.argv[2]='frente-de-acero.html';
eval(src+`
const X=__x,step=n=>{for(let i=0;i<n;i++){T+=1000/60;const f=cb;f(T);}};
function setup(){__map(3);step(2);X.ai.next=1e9;__u().forEach(u=>u.hp=0);step(2);}
setup();let f=__c().find(c=>c.type&&c.owner===0);X.spawn(f,'amb');step(300);let a=__u().find(u=>u.team===0);a.hp=20;step(60*6);
console.log('un médico solo, dañado, 6 s después: vida',Math.round(a.hp),'(no se cura solo)');
setup();f=__c().find(c=>c.type&&c.owner===0);X.spawn(f,'amb');X.spawn(f,'amb');step(300);const ms=__u().filter(u=>u.team===0);ms[0].hp=20;step(60*6);
console.log('dos médicos juntos, uno dañado, 6 s después: vida',Math.round(ms[0].hp),'de 60');
`);
