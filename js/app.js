// APP: UI, bookmarks, recent searches, detail screen, events.
// ---- Storage (per-viewer convenience; try/catch everywhere) ----
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let recents=store.get("gd_recent",[]),saved=store.get("gd_saved",[]),tab="s";
const $=id=>document.getElementById(id),esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const out=$("out"),q=$("q");
const card=e=>`<button class="card" data-id="${e.id}"><span class="hw dv">${e.headword}</span><span class="tr">${e.transliteration}</span><div class="mu">${e.pos} · ${esc(e.meanings.join(", "))}</div></button>`;
const chips=a=>`<div class="chips">${a.map(x=>`<button class="chip dv" data-q="${esc(x)}">${esc(x)}</button>`).join("")}</div>`;
function render(){
 $("nsv").textContent=saved.length?"("+saved.length+")":"";
 $("t1").setAttribute("aria-pressed",tab==="s");$("t2").setAttribute("aria-pressed",tab==="b");
 if(tab==="b"){out.innerHTML=saved.length?saved.map(id=>card(D[id-1])).join(""):`<div class="empty"><b>No saved words yet</b>Open a word and tap ☆ Save.</div>`;return}
 const v=q.value.trim();
 if(!v){out.innerHTML=`<h2>Try these</h2>${chips(["धर्म","dharma","dharm","gyan","vriksh","shanti","love","tree"])}`+
  (recents.length?`<h2>Recent searches</h2>${chips(recents)}<button class="chip" id="clr">Clear recent</button>`:"")+
  `<h2>All words (${D.length})</h2>`+D.map(card).join("");return}
 const r=search(v);
 if(!r.length){out.innerHTML=`<div class="empty"><b>No results for “${esc(v)}”</b>Check the spelling, or try a different form, e.g. <i>dharm</i> for <span class="dv">धर्म</span>, or an English word like “tree”.<div style="margin-top:14px"><button class="chip" id="all">Browse all words</button></div></div>`;return}
 const fuzzy=r[0][0]>=3;
 out.innerHTML=(fuzzy?`<h2>No exact match — did you mean…</h2>`:`<h2>${r.length} result${r.length>1?"s":""}</h2>`)+r.map(x=>card(x[1])).join("");
}
function pushRecent(v){v=v.trim();if(!v)return;recents=[v,...recents.filter(x=>x!==v)].slice(0,6);store.set("gd_recent",recents)}
// ---- Detail screen ----
function showDetail(id){
 const e=D[id-1],on=saved.includes(id);
 $("dbody").innerHTML=`<div class="bar"><button id="back">← Back</button><button id="sv">${on?"★ Saved":"☆ Save"}</button></div>
 <div class="big dv">${e.headword}</div><div style="font-size:1.25rem;color:var(--ac)">${e.transliteration}</div><div class="mu">${e.pos}</div>
 <h2>Meanings</h2><div class="box"><ol style="margin:0;padding-left:22px">${e.meanings.map(m=>`<li>${esc(m)}</li>`).join("")}</ol></div>
 <h2>Example</h2><div class="box ex dv">${e.example}</div>
 <h2>Common spellings</h2>${chips(e.romanised)}
 <h2>Headword</h2><div class="box dv">${e.headword} · ${e.transliteration} · #${e.id}</div>`;
 $("detail").hidden=false;$("detail").scrollTop=0;document.body.style.overflow="hidden";
 $("back").onclick=()=>location.hash?history.back():closeDetail();
 $("sv").onclick=()=>{saved=on?saved.filter(x=>x!==id):[id,...saved];store.set("gd_saved",saved);showDetail(id);render()};
 $("dbody").querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{closeDetail();tab="s";q.value=b.dataset.q;history.replaceState(null,"",location.pathname);render();scrollTo(0,0)});
}
function closeDetail(){$("detail").hidden=true;document.body.style.overflow="";if(location.hash)history.replaceState(null,"",location.pathname+location.search)}
function route(){const m=location.hash.match(/^#w(\d+)$/);if(m&&D[m[1]-1])showDetail(+m[1]);else{$("detail").hidden=true;document.body.style.overflow=""}}
addEventListener("hashchange",route);
// ---- Events ----
q.addEventListener("input",()=>{tab="s";render()});
q.addEventListener("keydown",e=>{if(e.key==="Enter"){pushRecent(q.value);q.blur();render()}});
$("t1").onclick=()=>{tab="s";render()};$("t2").onclick=()=>{tab="b";render()};
out.addEventListener("click",ev=>{
 const c=ev.target.closest(".card"),ch=ev.target.closest("[data-q]");
 if(c){pushRecent(q.value);location.hash="w"+c.dataset.id}
 else if(ch){q.value=ch.dataset.q;tab="s";render();scrollTo(0,0)}
 else if(ev.target.id==="clr"){recents=[];store.set("gd_recent",[]);render()}
 else if(ev.target.id==="all"){q.value="";render()}
});
render();route();
