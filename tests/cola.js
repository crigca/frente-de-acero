// cola y edificios: fábrica (tanque, antitanque, artillería) y cuartel (infantería, médico, comandante)
const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__menu=()=>menu;global.__sg=v=>{gold[0]=v};global.__ai=()=>ai;");
process.argv[2]='frente-de-acero.html';
eval(src+`
const step=n=>{for(let i=0;i<n;i++){T+=1000/60;const f=cb;f(T);}};
const rc=(x,y)=>{cv.listeners.pointerdown({preventDefault:noop,button:2,clientX:x,clientY:y,pointerId:2});cv.listeners.pointerup({button:2,clientX:x,clientY:y,pointerId:2});};
step(5);__ai().next=1e9;
const mine=__c().filter(c=>c.type&&c.owner===0),f=mine.find(c=>c.type==='fab'),h=mine.find(c=>c.type==='hq');
console.log('edificios azules:',mine.map(c=>c.type).join(','));
rc(f.x,f.y);step(2);console.log('menú de fábrica:',__m().filter(m=>m.type).map(m=>m.type).join(','));
__sg(3000);const btn=t=>__m().find(m=>m.type===t);
for(const t of ['art','tank','at']){const b=btn(t);click(b.x+2,b.y+2);step(1);}
console.log('cola fábrica:',f.queue.join(','));
click(5,5);step(2);rc(h.x,h.y);step(2);console.log('menú de cuartel:',__m().filter(m=>m.type).map(m=>m.type).join(','));
for(const t of ['cmd','cmd','inf','amb']){const b=btn(t);click(b.x+2,b.y+2);step(1);}
console.log('cola cuartel (2 clicks en comandante, entran los 2):',h.queue.join(','),'| oro',Math.round(__g()[0]),'(3000-130-150-60-300-300-30-200=1830)');
const ids=new Set(__u().map(u=>u.id));step(60*75);
const nu=__u().filter(u=>!ids.has(u.id)&&u.team===0);console.log('salieron:',nu.map(u=>u.type).sort().join(','));
rc(h.x,h.y);step(2);const b=btn('cmd');click(b.x+2,b.y+2);step(1);console.log('otro comandante con dos vivos (no hay límite) -> cola cuartel:',h.queue.join(',')||'(vacía)');
`);
