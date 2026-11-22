// DATA: the dictionary entries.
// Each row: [headword, IAST, common romanised spellings, part of speech, meanings, example]
const RAW = [
    ["शिक्षा", "śikṣā", ["shiksha", "siksha", "shiksa"], "noun (f.)", ["education", "learning"], "शिक्षा हर बच्चे का अधिकार है।"],
    ["भाषा", "bhāṣā", ["bhasha", "bhasa", "bhaasha"], "noun (f.)", ["language", "speech"], "हिंदी भारत की एक प्रमुख भाषा है।"],
    ["शब्द", "śabda", ["shabd", "shabda", "sabd"], "noun (m.)", ["word", "sound"], "इस शब्द का अर्थ क्या है?"],
    ["प्रकाश", "prakāśa", ["prakash", "prakaash", "prakasha"], "noun (m.)", ["light", "brightness"], "सूरज का प्रकाश कमरे में फैल गया।"],
    ["वृक्ष", "vṛkṣa", ["vriksh", "vriksha", "vruksh"], "noun (m.)", ["tree"], "आँगन में एक पुराना वृक्ष है।"],
    ["समय", "samaya", ["samay", "samaya", "samai"], "noun (m.)", ["time", "occasion"], "समय का सही उपयोग करो।"],
    ["कर्म", "karma", ["karm", "karma"], "noun (m.)", ["action, deed", "duty"], "अच्छे कर्म का फल अच्छा होता है।"],
    ["शांति", "śānti", ["shanti", "shaanti", "santi"], "noun (f.)", ["peace", "calm"], "गाँव में शांति का माहौल है।"],
    ["प्रेम", "prema", ["prem", "prema"], "noun (m.)", ["love", "affection"], "माँ का प्रेम निस्वार्थ होता है।"],
    ["सत्य", "satya", ["satya", "saty"], "noun (m.)", ["truth"], "सत्य की हमेशा जीत होती है।"]
];
