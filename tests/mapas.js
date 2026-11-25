// valida los 20 mapas en varias proporciones de pantalla
const fs=require('fs');let src=fs.readFileSync('tests/run.js','utf8');
src=src.slice(0,src.indexOf('const mode=process.argv[3];'));
process.argv[2]='frente-de-acero.html';
eval(src+`
const hdist=(t,a,b)=>Math.hypot(t.hx[a]-t.hx[b],t.hy[a]-t.hy[b])/HW_;
let tot=0,bad=0,lakes=0,dg=0;const lay={};const sigs=new Set();
for(const asp of [1.3,1.8,2.2]){
 for(let n=1;n<=20;n++){
  __map(n,asp);
  const t=__t(),I=__info(),cs=__c(),NC=t.GX*t.GY,errs=[];
  const chain=p=>{for(let i=1;i<p.length;i++)if(!t.nb[p[i-1]].includes(p[i]))return false;return true;};
  if(!t.roadPaths.every(chain))errs.push('camino cortado');
  if(!chain(t.riverPath))errs.push('río cortado');
  const rows=new Set(t.riverPath.map(k=>Math.floor(k/t.GX)));if(rows.size<t.GY-1)errs.push('río no cruza todo ('+rows.size+'/'+t.GY+')');
  const br=[];for(let k=0;k<NC;k++)if(t.river[k]&&t.road[k])br.push(k);
  for(const a of br)for(const b of br)if(a<b){const h=hdist(t,a,b);if(h<1.5)errs.push('puentes pegados');else if(h<5&&t.roadPaths.some(p=>p.includes(a)&&p.includes(b)))errs.push('puentes cerca ('+h.toFixed(1)+')');}
  if(br.length<1)errs.push('sin puentes');
  if(t.riverPath.some(k=>t.town[k]))errs.push('río en pueblo');
  const fl=cs.filter(c=>!c.type&&!c.town),fb=cs.filter(c=>c.type);
  if(fl.length!==10)errs.push('banderas='+fl.length);
  if(fb.length!==10||fb.filter(c=>c.type==='hq').length!==2)errs.push('fábricas='+fb.length);
  for(const c of fl.concat(fb)){
    if(t.river[c.k]||t.town[c.k]||t.terr[c.k]===1)errs.push((c.type?'fábrica':'bandera')+' sobre río/pueblo/bosque');
    if(c.type&&t.road[c.k])errs.push('fábrica sobre camino');
    if(c.type&&t.nb[c.k].some(n=>n>=0&&(t.river[n]||t.terr[n]===1||t.town[n])))errs.push('fábrica pegada a río/bosque/pueblo');
    if(!c.type&&t.nb[c.k].some(n=>n>=0&&t.river[n]))errs.push('bandera pegada al río');
  }
  const all=fl.concat(fb,cs.filter(c=>c.town));
  for(const a of all)for(const b of all)if(a.k<b.k&&hdist(t,a.k,b.k)<2)errs.push('dos lugares pegados');
  if(I.diag)dg++;{let b=0;for(let k=0;k<NC;k++)if(I.own[k]>0)b++;if(Math.abs(b/NC-0.5)>0.03)errs.push('reparto inicial '+Math.round(b/NC*100)+'%');}
  const lk=[];for(let k=0;k<NC;k++)if(t.lake[k])lk.push(k);
  if(lk.some(k=>t.road[k]||t.river[k]||t.town[k]||t.terr[k]===1))errs.push('laguna sobre camino/río/pueblo/bosque');
  if(all.some(c=>t.lake[c.k]||t.nb[c.k].some(n=>n>=0&&t.lake[n])))errs.push('lugar sobre o pegado a laguna');
  if(__u().some(u=>t.lake[u.c]))errs.push('ficha en laguna');
  lakes+=lk.length?1:0;lay[t.roadPaths.length]=(lay[t.roadPaths.length]||0)+1;
  // todos los hexágonos de camino conectados entre sí por camino
  {const rk=[];for(let k=0;k<NC;k++)if(t.road[k])rk.push(k);const seen=new Set([rk[0]]),st=[rk[0]];while(st.length){const c=st.pop();for(const n of t.nb[c])if(n>=0&&t.road[n]&&!seen.has(n)){seen.add(n);st.push(n);}}if(seen.size!==rk.length)errs.push('red de caminos partida ('+seen.size+'/'+rk.length+')');}
  if(!t.road[t.townK])errs.push('pueblo sin camino');
  if(cs.filter(c=>c.town).length!==3)errs.push('pueblos='+cs.filter(c=>c.town).length);
  const L=fl.filter(c=>c.x<t.WX/2).length;if(L<3||L>7)errs.push('banderas todas de un lado');
  if(fb.filter(c=>c.owner===0).some(c=>I.own[c.k]!==1)||fb.filter(c=>c.owner===1).some(c=>I.own[c.k]!==-1))errs.push('fábrica en territorio ajeno');
  const us=__u();if(us.length!==10&&us.length!==12)errs.push('fichas='+us.length);
  // se puede llegar de cada fábrica azul al pueblo y a cada fábrica roja
  const f=t.getField(t.townK,true);if(fb.some(c=>!(f[c.k]<1e8)))errs.push('fábrica sin ruta');
  tot++;if(errs.length){bad++;console.log('asp',asp,'mapa',n,t.GX+'x'+t.GY,[...new Set(errs)].join(' | '));}
  if(asp===1.8)sigs.add(t.riverPath.slice(0,12).join(',')+'/'+fl.map(c=>c.k).join(',')+'/'+t.roadPaths[0].slice(0,8).join(','));
  if(asp===1.8&&n<=3)console.log('mapa',n,t.GX+'x'+t.GY,'banderas',fl.map(c=>[c.k%t.GX,Math.floor(c.k/t.GX)].join(':')).join(' '),'puentes',br.length,'banderas lado azul',L);
 }
}
console.log('mapas en diagonal',dg,'de',tot);console.log('mapas con laguna',lakes,'de',tot,'| cantidad de tramos de camino -> mapas',JSON.stringify(lay));console.log('mapas revisados',tot,'con defectos',bad,'| mapas distintos entre sí (de 20):',sigs.size);
// mismo número = mismo mapa
global.__asp=1.8;__map(7);const a1=JSON.stringify([__t().riverPath,__info().FLAGS,[...__t().terr]]);__map(8);__map(7);const a2=JSON.stringify([__t().riverPath,__info().FLAGS,[...__t().terr]]);console.log('mapa 7 repetible:',a1===a2);
`);
