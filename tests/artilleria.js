const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__x={spawn,order,get ai(){return ai}};");
process.argv[2]='frente-de-acero.html';
eval(src+`
const X=__x,step=n=>{for(let i=0;i<n;i++){T+=1000/60;const f=cb;f(T);}};
function setup(){__map(3);step(2);X.ai.next=1e9;__u().forEach(u=>u.hp=0);__c().forEach(c=>{if(c.queue)c.queue=[]});step(2);}
const t0=()=>__t();
function at(k,team,type){X.spawn({k,owner:team},type);const u=__u()[__u().length-1];return u;}
function lineFrom(k,dir,n){let c=k;for(let i=0;i<n;i++)c=__t().nb[c][dir];return c;}
// 1) artillería azul a 3 hexágonos de una infantería roja metida en SU fábrica (protección 50%)
setup();let rf=__c().find(c=>c.type==='fab'&&c.owner===1);
let tgt=at(rf.k,1,'inf');let a=at(lineFrom(rf.k,3,3),0,'art');const h0=tgt.hp;step(60*3.5);
console.log('1) artillería a 3 hex de infantería en su fábrica: daño del primer disparo',Math.round(h0-tgt.hp),'(26 sin cobertura; con cobertura serían 13)');
// 2) lo mismo con un tanque azul a 2 hexágonos (sí sufre la cobertura): 15*1.5*0.5=11
setup();rf=__c().find(c=>c.type==='fab'&&c.owner===1);tgt=at(rf.k,1,'inf');a=at(lineFrom(rf.k,3,2),0,'tank');let h1=tgt.hp;step(60*1.2);
console.log('2) tanque a 2 hex del mismo blanco: daño del primer disparo',Math.round((h1-tgt.hp)*10)/10,'(15 x1,5 x0,5 = 11,3)');
// 3) artillería con el enemigo pegado: no puede tirar
setup();rf=__c().find(c=>c.type==='fab'&&c.owner===1);const open=lineFrom(rf.k,3,4);tgt=at(open,1,'at');a=at(lineFrom(open,3,1),0,'art');h1=tgt.hp;const ah=a.hp;step(60*5);
console.log('3) artillería con un antitanque pegado: daño que hizo',Math.round(h1-tgt.hp),'| daño que recibió',Math.round(ah-a.hp));
// 4) comandante: tanque contra tanque a 2 hex, sin y con comandante al lado
for(const withC of [false,true]){setup();rf=__c().find(c=>c.type==='fab'&&c.owner===1);const o=lineFrom(rf.k,3,5);tgt=at(o,1,'tank');const me=lineFrom(o,3,2);a=at(me,0,'tank');if(withC)at(lineFrom(me,3,1),0,'cmd');h1=tgt.hp;step(60*1.2);
console.log('4) tanque contra tanque',withC?'CON':'sin','comandante al lado: daño del primer disparo',Math.round((h1-tgt.hp)*100)/100);}
`);
