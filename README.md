# Garuda Dictionary App

A small Hindi/Sanskrit dictionary web app. 52 entries. Search works in Devanagari and in romanised spelling.

## How to run
No build step, no dependencies.
- Open `index.html` in a browser, or
- run `python3 -m http.server` in this folder and visit http://localhost:8000

## What it does
- Search by Devanagari (`धर्म`) or romanised input (`dharma`, `dharm`, `dharam`): the same entry comes back.
- Search by English meaning (`love` finds प्रेम).
- Typo-tolerant: `dharmma` (extra m) still finds धर्म under "did you mean". Different spellings such as `shaanthi` are matched directly by the phonetic key described below.
- Entry detail screen with every field: headword, IAST, part of speech, meanings, example, common spellings.
- Clear no-results state, mobile-first layout, light and dark mode.
- Recent searches and bookmarks (kept in the browser's localStorage).

## How romanised search works
People mostly type Roman, and the same word has many spellings, so the stored spelling list is not trusted alone.
Every spelling (the stored ones, the IAST form and whatever the user types) is turned into a loose phonetic key:
1. strip diacritics (ś, ṣ, ṛ, ā ... become plain letters), lowercase, letters only;
2. merge common variants: `w`->`v`, `ee`->`i`, `oo`->`u`, doubled vowels collapse (`aa`->`a`);
3. drop the `h` of aspirates (`dh`->`d`, `sh`->`s`) and map `gy`/`gn` -> `jn`;
4. `ri`/`ru` after a consonant -> `r` (vriksh ~ vruksh ~ vṛkṣa);
5. drop a final `a` on words longer than 3 letters (schwa deletion: `dharma` ~ `dharm`).
Results are ranked: exact stored spelling, exact phonetic key, prefix, substring and English-meaning matches, then fuzzy matches (1 edit allowed for 4-5 letter queries, 2 edits for 6 or more; queries of 3 letters or fewer must match exactly).
Devanagari input is normalised too (nukta and zero-width joiners removed, chandrabindu treated as anusvara) and matched against headwords, with a one-edit typo allowance for queries of 3 or more characters.

## Trade-offs
- Typo tolerance uses plain edit distance, so two swapped letters count as two edits and short words may not be rescued.
- The phonetic key is deliberately loose, so very short queries can match more words than expected. Ranking keeps the best match on top.
- No backend and no database: simple and fast for 52 words, but not meant for tens of thousands of entries.
- Plain JavaScript files (no framework or bundler) to keep the code easy to read.
- The dataset is small. Entries 11-52 were drafted with AI; transliterations and spellings were checked with a script, and genders and meanings were spot-checked against online dictionaries.
- Offline use is not built in yet: the app makes no network calls, but it needs a service worker to load without a connection.

## Links
- Deployed app: https://hoodaanshika0101-eng.github.io/dictionary/
- Demo video: <add link>

## AI use
Built with AI coding tools (Claude). Search behaviour was tested with real Devanagari and romanised examples, and the work was committed in small steps.

## With 2 more weeks
- Service worker and web manifest, so the app works offline and can be installed on a phone.
- A much larger dataset with an indexed search (for example a trie or a small search library).
- Better Devanagari matching (treat anusvara and the nasal consonants as equal, handle conjuncts).
- Unit tests for the search function using a list of real misspellings.
- Audio pronunciation, word of the day, and an API/embed so other apps can use the dictionary.
