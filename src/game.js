import { C, POOL } from './data.js';


const norm=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/\bst\.?\s/g,"saint ").replace(/&/g,"and").replace(/^the\s+/,"").replace(/[^a-z0-9]/g,"");
const IDX=new Map(); C.forEach((c,i)=>{ IDX.set(norm(c.name),i); c.aliases.forEach(a=>{ const k=norm(a); if(k && !IDX.has(k)) IDX.set(k,i); }); });

// ---------- geometry ----------
const rad=d=>d*Math.PI/180;
function dist(a,b){ const R=6371, dLat=rad(b.lat-a.lat), dLng=rad(b.lng-a.lng);
  const h=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2; return 2*R*Math.asin(Math.sqrt(h)); }
function bearing(a,b){ const y=Math.sin(rad(b.lng-a.lng))*Math.cos(rad(b.lat)), x=Math.cos(rad(a.lat))*Math.sin(rad(b.lat))-Math.sin(rad(a.lat))*Math.cos(rad(b.lat))*Math.cos(rad(b.lng-a.lng));
  return (Math.atan2(y,x)*180/Math.PI+360)%360; }
const ARROWS=["↑","↗","→","↘","↓","↙","←","↖"], ARROW_EMOJI=["⬆️","↗️","➡️","↘️","⬇️","↙️","⬅️","↖️"];
const dirIdx=b=>Math.round(b/45)%8;
const flag=iso=>String.fromCodePoint(...[...iso].map(c=>0x1F1E6+c.charCodeAt(0)-65));

// ---------- compare ----------
function compare(g,a){
  if(g===a) return {win:true,cells:Array(6).fill({cls:"hit"})};
  const ratio=(x,y)=>Math.max(x,y)/Math.max(Math.min(x,y),0.001);
  const size=(gv,av)=>({cls: ratio(gv,av)<=1.5?"near":"", arrow: av>gv?"↑":"↓", e: ratio(gv,av)<=1.5?"🟨":(av>gv?"🔼":"🔽")});
  const km=dist(g,a), d=dirIdx(bearing(g,a));
  const shared=g.langs.some(l=>a.langs.includes(l));
  const hemi=(g.lat>=0)===(a.lat>=0);
  return {win:false, km, d, cells:[
    {cls:g.cont===a.cont?"hit":"", e:g.cont===a.cont?"🟩":"⬜"},
    {cls:hemi?"hit":"", e:hemi?"🟩":"⬜"},
    size(g.pop,a.pop), size(g.area,a.area),
    {cls:shared?"hit":"", e:shared?"🟩":"⬜"},
    {cls:km<1000?"hit":km<3000?"near":"", e:km<1000?"🟩":km<3000?"🟨":"⬜"}
  ]};
}

// ---------- state ----------
const EPOCH=new Date(2026,9,25), MAXG=5;
const dayNum=()=>{ const t=new Date(); return Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate())-EPOCH)/864e5)+1; };
function answerFor(n){ // deterministic shuffle of the pool, cycling
  const len=POOL.length, k=((n-1)%len+len)%len, order=POOL.map((_,i)=>i);
  let s=20261025; const R=()=>{ s=(s*1103515245+12345)&0x7fffffff; return s/0x7fffffff; };
  for(let i=len-1;i>0;i--){ const j=Math.floor(R()*(i+1)); [order[i],order[j]]=[order[j],order[i]]; }
  return C.findIndex(c=>c.iso===POOL[order[k]]);
}
const KEY="landfall:v1";
const load=()=>{ try{ return JSON.parse(localStorage.getItem(KEY))||{days:{}}; }catch(e){ return {days:{}}; } };
const save=d=>{ try{ localStorage.setItem(KEY,JSON.stringify(d)); }catch(e){} };

let S;
const $=id=>document.getElementById(id);

function start(mode,n,ans){
  S={mode,n,ans:ans??answerFor(n),guesses:[],status:"playing"};
  if(mode==="daily"){ const sv=load().days[n]; if(sv){ S.guesses=sv.g; S.status=sv.status; } }
  say(""); render(true);
}
function say(t,err){ const m=$("msg"); m.textContent=t; m.className="msg"+(err?" err":""); }

function guess(q){
  if(S.status!=="playing") return;
  const k=norm(q); let i=IDX.get(k);
  if(i===undefined){ const m=C.map((c,j)=>j).filter(j=>norm(C[j].name).startsWith(k)); if(m.length===1) i=m[0]; }
  if(i===undefined){ say(`“${q}” isn't on the list. Pick one from the suggestions.`,true); return; }
  if(S.guesses.includes(i)){ say(`You already guessed ${C[i].name}.`,true); return; }
  S.guesses.push(i); $("guess").value=""; hideSugg();
  if(i===S.ans) S.status="won"; else if(S.guesses.length>=MAXG) S.status="lost";
  say(S.status==="playing"?`Not ${C[i].name}. New clue unlocked.`:"");
  if(S.status!=="playing" && S.mode==="daily"){ const d=load(); d.days[S.n]={g:S.guesses,status:S.status}; save(d); }
  render(false);
}

// ---------- render ----------
const fmtPop=n=>n>=1e9?(Math.round(n/1e8)/10)+"B":n>=1e6?(Math.round(n/1e5)/10)+"M":n>=1e3?Math.round(n/1e3)+"K":String(n);
function render(fresh){
  const a=C[S.ans], misses=S.guesses.filter(g=>g!==S.ans).length, done=S.status!=="playing";
  $("meta").textContent=S.mode==="daily"?`#${S.n} · ${S.guesses.length}/${MAXG}`:`Practice · ${S.guesses.length}/${MAXG}`;

  const clues=[["Region",a.sub],["Language",a.langs.join(", ")],["Capital",a.cap],["Flag & letter",`<span class="flag">${flag(a.iso)}</span> starts with ${a.name[0]}`]];
  $("clues").innerHTML=clues.map(([label,val],k)=>{ const open=k<misses||done;
    const fresh2=!fresh && open && k===misses-1 && !done;
    return `<div class="clue ${open?"open":"locked"}${fresh2?" fresh":""}"><span class="eyebrow">${label}</span><span class="v">${open?val:`After miss ${k+1}`}</span></div>`; }).join("");

  let html="";
  S.guesses.forEach((gi,k)=>{ const g=C[gi], r=compare(g,a), isNew=!fresh&&k===S.guesses.length-1;
    const labels = r.win ? [a.cont,a.lat>=0?"N":"S",fmtPop(a.pop),"✓",a.langs[0],"🎯 0 km"] :
      [g.cont, g.lat>=0?"N":"S", `<span class="big">${r.cells[2].arrow}</span>${fmtPop(g.pop)}`, `<span class="big">${r.cells[3].arrow}</span>${shortArea(g.area)}`, r.cells[4].cls?"Shared":"No match", `<span class="big">${ARROWS[r.d]}</span>${Math.round(r.km).toLocaleString()} km`];
    html+=`<div class="grow${isNew?" new":""}"><div class="gname">${g.name}<small>${k+1}</small></div><div class="tiles">${r.cells.map((c,j)=>`<div class="tile ${c.cls}">${labels[j]}</div>`).join("")}</div></div>`; });
  for(let k=S.guesses.length;k<MAXG && !done;k++) html+=`<div class="grow"><div class="tiles">${Array(6).fill('<div class="tile empty"></div>').join("")}</div></div>`;
  $("rows").innerHTML=html;

  $("entry").hidden=done;
  const res=$("result");
  if(!done){ res.hidden=true; if(!fresh) $("guess").focus(); }
  else { res.hidden=false; res.innerHTML=resultHTML(); wire(); }
  renderStats();
}
const shortArea=v=>v>=1e6?(Math.round(v/1e5)/10)+"M km²":v>=1000?Math.round(v/1000)+"K km²":Math.round(v)+" km²";

function resultHTML(){
  const a=C[S.ans], won=S.status==="won", n=S.guesses.length;
  const head=won?(["","Landfall in one","Sharp eyes","Right on course","Close call","Last-gasp landing"][n]):`It was ${a.name}`;
  return `<h2 class="${won?"win":"lose"}">${head}</h2>
    <p class="facts">${flag(a.iso)} ${a.name} · ${a.sub} · capital ${a.cap} · ${fmtPop(a.pop)} people · ${shortArea(a.area)}</p>
    <pre class="share" id="share">${shareText()}</pre>
    <div class="row"><button type="button" id="copy">Copy result</button><button type="button" class="ghost" id="practice">Practice round</button>${S.mode!=="daily"?'<button type="button" class="ghost" id="daily">Back to today</button>':""}</div>`;
}
function shareText(){
  const a=C[S.ans], tag=S.mode==="daily"?`Landfall #${S.n}`:"Landfall (practice)";
  const lines=S.guesses.map(gi=>{ const r=compare(C[gi],a); return r.win?"🟩🟩🟩🟩🟩 🎯":r.cells.slice(0,5).map(c=>c.e).join("")+" "+ARROW_EMOJI[r.d]; });
  return `${tag} ${S.status==="won"?S.guesses.length:"X"}/${MAXG}\n${lines.join("\n")}`;
}
function wire(){
  $("copy").onclick=async()=>{ try{ await navigator.clipboard.writeText(shareText()); $("copy").textContent="Copied"; }catch(e){ const r=document.createRange(); r.selectNodeContents($("share")); const s=getSelection(); s.removeAllRanges(); s.addRange(r); $("copy").textContent="Selected, now copy it"; } };
  $("practice").onclick=()=>{ let i; do{ i=C.findIndex(c=>c.iso===POOL[Math.floor(Math.random()*POOL.length)]); }while(i===S.ans); start("practice",0,i); };
  if($("daily")) $("daily").onclick=()=>start("daily",dayNum());
}
function renderStats(){
  const days=load().days, keys=Object.keys(days).map(Number); if(!keys.length){ $("stats").innerHTML=""; return; }
  const wins=keys.filter(k=>days[k].status==="won");
  let streak=0,d=dayNum(); if(!days[d]) d--; while(days[d]&&days[d].status==="won"){ streak++; d--; }
  const avg=wins.length?(wins.reduce((s,k)=>s+days[k].g.length,0)/wins.length).toFixed(1):"–";
  $("stats").innerHTML=`<div><b>${keys.length}</b>played</div><div><b>${Math.round(wins.length/keys.length*100)}%</b>found</div><div><b>${streak}</b>streak</div><div><b>${avg}</b>avg guesses</div>`;
}

// ---------- suggestions ----------
let sel=-1, opts=[];
function showSugg(){
  const k=norm($("guess").value); const ul=$("sugg");
  if(!k){ hideSugg(); return; }
  opts=C.map((c,i)=>i).filter(i=>norm(C[i].name).includes(k)||C[i].aliases.some(a=>norm(a).startsWith(k)))
    .sort((x,y)=>(norm(C[y].name).startsWith(k))-(norm(C[x].name).startsWith(k))||C[x].name.localeCompare(C[y].name)).slice(0,7);
  if(!opts.length){ hideSugg(); return; }
  sel=Math.min(sel,opts.length-1);
  ul.innerHTML=opts.map((i,j)=>`<li role="option" data-i="${i}" aria-selected="${j===sel}" class="${S.guesses.includes(i)?"used":""}">${C[i].name}</li>`).join("");
  ul.hidden=false;
}
function hideSugg(){ $("sugg").hidden=true; sel=-1; opts=[]; }
$("guess").addEventListener("input",()=>{ sel=-1; showSugg(); });
$("guess").addEventListener("keydown",e=>{
  if($("sugg").hidden) return;
  if(e.key==="ArrowDown"){ e.preventDefault(); sel=(sel+1)%opts.length; showSugg(); }
  else if(e.key==="ArrowUp"){ e.preventDefault(); sel=(sel-1+opts.length)%opts.length; showSugg(); }
  else if(e.key==="Escape"){ hideSugg(); }
});
$("sugg").addEventListener("mousedown",e=>{ const li=e.target.closest("li"); if(!li) return; e.preventDefault(); guess(C[+li.dataset.i].name); });
$("guess").addEventListener("blur",()=>setTimeout(hideSugg,120));
$("form").addEventListener("submit",e=>{ e.preventDefault(); if(sel>=0&&opts[sel]!==undefined){ guess(C[opts[sel]].name); return; } const v=$("guess").value.trim(); if(v) guess(v); });

start("daily",dayNum());
