const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__menu=()=>menu;global.__sg=v=>{gold[0]=v};global.__x={order,get hx(){return hx},get hy(){return hy},get nb(){return nb},hexAt};");
process.argv[2]='frente-de-acero.html';
eval(src+`
const X=__x,step=n=>{for(let i=0;i<n;i++){T+=1000/60;const f=cb;f(T);}};
const rc=(x,y)=>{cv.listeners.pointerdown({preventDefault:noop,button:2,clientX:x,clientY:y,pointerId:2});cv.listeners.pointerup({button:2,clientX:x,clientY:y,pointerId:2});};
step(3);const f=__c().filter(c=>c.type&&c.owner===0)[2];
// oro: saco todas las fichas de las fábricas y mido 10 s
const g0=__g()[0];
const mine=__u().filter(u=>u.team===0);X.order(mine,f.x+X.hx[1]*8-X.hx[0]*8,f.y+200);step(60*12);
const empty=__c().filter(c=>c.type&&c.owner===0&&!__u().some(u=>u.c===c.k)).length;
const a=__g()[0];step(600);const b=__g()[0];console.log('fábricas propias vacías:',empty,'de 4 | oro en 10 s:',(b-a).toFixed(1),'(4 fábricas x 6 = 24)');
rc(f.x,f.y);step(2);const tx=f.x+X.hx[1]*4-X.hx[0]*4,ty=f.y+X.hy[38*2]-X.hy[0];
rc(tx,ty);step(2);console.log('menú abierto:',__menu()===f,'| punto de reunión:',f.rally,'= hex clickeado',X.hexAt(tx,ty),'| menú sigue abierto:',__menu()===f);
__sg(500);const bi=__m().find(m=>m.type==='at');click(bi.x+2,bi.y+2);click(bi.x+2,bi.y+2);step(2);
const ids=new Set(__u().map(u=>u.id));step(60*40);
const nu=__u().filter(u=>!ids.has(u.id)&&u.team===0);
console.log('fichas nuevas:',nu.length,'| en el punto de reunión o al lado:',nu.filter(u=>u.c===f.rally||X.nb[f.rally].includes(u.c)).length,'| quedaron en la fábrica:',nu.filter(u=>u.c===f.k).length);
rc(f.x,f.y);step(2);console.log('click der. en la fábrica con menú abierto -> reunión:',f.rally);
`);
