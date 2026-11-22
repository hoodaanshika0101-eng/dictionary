// SEARCH: normalisation + ranking. No DOM code here, so it is easy to test.
// ---- Normalisation ----
// Devanagari: NFC, drop ZWJ/ZWNJ and nukta, chandrabindu -> anusvara
const nd = s => s.normalize("NFC").replace(/[\u200c\u200d\u093c]/g, "").replace(/\u0901/g, "\u0902").trim();
const D = RAW.map(([headword, transliteration, romanised, pos, meanings, example], i) => ({
    id: i + 1, headword, transliteration, romanised, pos, meanings, example,
    h: nd(headword)
}));
// ---- Search ----
function search(raw) {
    const q0 = raw.trim(); if (!q0) return []; let res = [];
    if (/[\u0900-\u097F]/.test(q0)) {
        const q = nd(q0);
        res = D.map(e => { const h = e.h; let s = h === q ? 0 : h.startsWith(q) ? 1 : h.includes(q) ? 2 : 99; return [s, e] });
    } else { return [] } // romanised search arrives in a later commit
    return res.filter(r => r[0] < 99).sort((a, b) => a[0] - b[0] || a[1].id - b[1].id).slice(0, 25);
}
