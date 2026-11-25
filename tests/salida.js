const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
process.argv[2]='frente-de-acero.html';
eval(src+`
let bad=0;const seen=new Set();
for(let i=0;i<300;i++){
  __map(1+i%20);const us=__u(),cs=__c();
  for(const t of [0,1]){
    const m=us.filter(u=>u.team===t),c={inf:0,at:0,tank:0,amb:0};m.forEach(u=>c[u.type]++);
    if(m.length<5||m.length>6||!c.inf||!c.at||!c.tank||!c.amb||c.amb!==1)bad++;
    const per={};m.forEach(u=>{per[u.c]=(per[u.c]||0)+1;if(!cs.some(f=>f.type&&f.owner===t&&f.k===u.c))bad++;});
    if(Object.values(per).some(n=>n>3))bad++;
    if(t===0)seen.add(JSON.stringify(c));
  }
  const a=us.filter(u=>u.team===0).map(u=>u.type).sort().join(),b=us.filter(u=>u.team===1).map(u=>u.type).sort().join();if(a!==b)bad++;
}
console.log('300 arranques, con defectos:',bad,'| composiciones distintas:',[...seen].join(' '));
`);
