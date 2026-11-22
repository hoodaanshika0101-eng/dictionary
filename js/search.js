// SEARCH: normalisation + ranking. No DOM code here, so it is easy to test.
// ---- Normalisation ----
// Devanagari: NFC, drop ZWJ/ZWNJ and nukta, chandrabindu -> anusvara
const nd=s=>s.normalize("NFC").replace(/[\u200c\u200d\u093c]/g,"").replace(/\u0901/g,"\u0902").trim();
// Romanised/IAST -> loose phonetic key, so shiksha / śikṣā / siksha / shiksa all collapse together
const fold=s=>{
 s=s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z]/g,"");
 s=s.replace(/w/g,"v").replace(/z/g,"j").replace(/x/g,"ks").replace(/q/g,"k")
  .replace(/ee/g,"i").replace(/oo/g,"u").replace(/([aeiou])\1+/g,"$1")
  .replace(/h+/g,"h").replace(/([kgcjtdpbs])h/g,"$1")
  .replace(/gy|gn/g,"jn").replace(/([bcdfghjklmnpqstvyz])r[iu]/g,"$1r").replace(/sv/g,"s");
 return s.length>3?s.replace(/a$/,""):s; // schwa deletion: dharma ~ dharm
};
const D=RAW.map(([headword,transliteration,romanised,pos,meanings,example],i)=>({id:i+1,headword,transliteration,romanised,pos,meanings,example,
 h:nd(headword),keys:[...new Set([...romanised,transliteration].map(fold))]}));
// ---- Search ----
function search(raw){
 const q0=raw.trim();if(!q0)return[];let res=[];
 if(/[\u0900-\u097F]/.test(q0)){
  const q=nd(q0);
  res=D.map(e=>{const h=e.h;let s=h===q?0:h.startsWith(q)?1:h.includes(q)?2:99;return[s,e]});
 }else{
  const lo=q0.toLowerCase(),q=fold(q0);if(!q)return[];
  res=D.map(e=>{let s=99;
   if(e.romanised.includes(lo))s=0;
   for(const k of e.keys){
    if(k===q)s=Math.min(s,.5);
    else if(q.length>=2&&k.startsWith(q))s=Math.min(s,1);
    else if(q.length>=3&&k.includes(q))s=Math.min(s,2)}
   return[s,e]});
 }
 return res.filter(r=>r[0]<99).sort((a,b)=>a[0]-b[0]||a[1].id-b[1].id).slice(0,25);
}
