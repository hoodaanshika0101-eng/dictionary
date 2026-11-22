// APP: UI, bookmarks, recent searches, detail screen, events.
const $=id=>document.getElementById(id),esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const out=$("out"),q=$("q");
const card=e=>`<button class="card" data-id="${e.id}"><span class="hw dv">${e.headword}</span><span class="tr">${e.transliteration}</span><div class="mu">${e.pos} · ${esc(e.meanings.join(", "))}</div></button>`;
function render(){
 const v=q.value.trim();
 if(!v){out.innerHTML=D.map(card).join("");return}
 const r=search(v);
 if(!r.length){out.innerHTML="";return}
 out.innerHTML=`<h2>${r.length} result${r.length>1?"s":""}</h2>`+r.map(x=>card(x[1])).join("");
}
// ---- Events ----
q.addEventListener("input",()=>render());
render();
