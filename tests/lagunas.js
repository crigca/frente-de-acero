const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
src=src.replace("global.__m=()=>menuRects;","global.__m=()=>menuRects;global.__x={order,hexAt,get time(){return time}};");
process.argv[2]='frente-de-acero.html';
eval(src+`
const X=__x,step=n=>{for(let i=0;i<n;i++){T+=1000/60;const f=cb;f(T);}};
let bad=0,games=0,orders=0,stuck=0;
for(const n of [2,4,5,6,7,9,10,15,16,19]){
  __map(n);step(2);const t=__t();const lk=[];for(let k=0;k<t.GX*t.GY;k++)if(t.lake[k])lk.push(k);if(!lk.length)continue;games++;
  // ordeno a todas mis fichas ir al medio de la laguna propia, y después al otro lado de ella
  const mine=()=>__u().filter(u=>u.team===0);const L=lk.filter(k=>t.hx[k]<t.WX/2);const c=L[0];
  X.order(mine(),t.hx[c],t.hy[c]);orders++;
  for(let s=0;s<60*330;s++){step(1);if(s%20===0)for(const u of __u())if(t.lake[u.c]||t.lake[X.hexAt(u.x,u.y)])bad++;
    if(s===60*60){const far=L.reduce((a,b)=>t.hx[b]>t.hx[a]?b:a);X.order(mine(),t.hx[far]+HW_*3,t.hy[far]);}}
  mine().filter(u=>u.dc>=0).forEach(u=>console.log('  mapa',n,u.type,'c',u.c,'dc',u.dc,'pelea',!!u.fight,'tgt',!!u.tgt,'hp',Math.round(u.hp),'enemigos cerca',__u().filter(e=>e.team===1&&Math.hypot(e.x-u.x,e.y-u.y)<HW_*3).length));stuck+=mine().filter(u=>u.dc>=0).length;
}
console.log('mapas con laguna probados',games,'| veces que una ficha (propia o de la IA) pisó laguna:',bad,'| fichas propias que quedaron sin llegar:',stuck);
`);
