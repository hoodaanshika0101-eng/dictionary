// APP: UI, bookmarks, recent searches, detail screen, events.
const $=id=>document.getElementById(id),esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const out=$("out"),q=$("q");
const card=e=>`<button class="card" data-id="${e.id}"><span class="hw dv">${e.headword}</span><span class="tr">${e.transliteration}</span><div class="mu">${e.pos} · ${esc(e.meanings.join(", "))}</div></button>`;
const chips=a=>`<div class="chips">${a.map(x=>`<button class="chip dv" data-q="${esc(x)}">${esc(x)}</button>`).join("")}</div>`;
function render(){
 const v=q.value.trim();
 if(!v){out.innerHTML=D.map(card).join("");return}
 const r=search(v);
 if(!r.length){out.innerHTML="";return}
 const fuzzy=r[0][0]>=3;
 out.innerHTML=(fuzzy?`<h2>No exact match — did you mean…</h2>`:`<h2>${r.length} result${r.length>1?"s":""}</h2>`)+r.map(x=>card(x[1])).join("");
}
// ---- Detail screen ----
function showDetail(id){
 const e=D[id-1];
 $("dbody").innerHTML=`<div class="bar"><button id="back">← Back</button></div>
 <div class="big dv">${e.headword}</div><div style="font-size:1.25rem;color:var(--ac)">${e.transliteration}</div><div class="mu">${e.pos}</div>
 <h2>Meanings</h2><div class="box"><ol style="margin:0;padding-left:22px">${e.meanings.map(m=>`<li>${esc(m)}</li>`).join("")}</ol></div>
 <h2>Example</h2><div class="box ex dv">${e.example}</div>
 <h2>Common spellings</h2>${chips(e.romanised)}
 <h2>Headword</h2><div class="box dv">${e.headword} · ${e.transliteration} · #${e.id}</div>`;
 $("detail").hidden=false;$("detail").scrollTop=0;document.body.style.overflow="hidden";
 $("back").onclick=()=>location.hash?history.back():closeDetail();
 $("dbody").querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{closeDetail();q.value=b.dataset.q;history.replaceState(null,"",location.pathname);render();scrollTo(0,0)});
}
function closeDetail(){$("detail").hidden=true;document.body.style.overflow="";if(location.hash)history.replaceState(null,"",location.pathname+location.search)}
function route(){const m=location.hash.match(/^#w(\d+)$/);if(m&&D[m[1]-1])showDetail(+m[1]);else{$("detail").hidden=true;document.body.style.overflow=""}}
addEventListener("hashchange",route);
// ---- Events ----
q.addEventListener("input",()=>render());
out.addEventListener("click",ev=>{
 const c=ev.target.closest(".card");
 if(c)location.hash="w"+c.dataset.id;
});
render();route();
