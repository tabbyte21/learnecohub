#!/usr/bin/env node
/**
 * Turkish character fixer v5 - Final fixes & remaining scan
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Fix remaining issues
const FIXES = [
  // Revert "gun" → "gün" false positive in "uygun"
  ["uygün", "uygun"],
  ["Uygün", "Uygun"],
  // "Gec" should be "Geç" when it means "pass/switch"
  ["İletişime Gec", "İletişime Geç"],
  ["iletişime Gec", "iletişime Geç"],
  // More specific "gün" fixes (safe contexts only)
  ["14 gun", "14 gün"],
  ["her gun", "her gün"],
  ["Her gun", "Her gün"],
  ["bir gun", "bir gün"],
  // Remove test content
  ["asdfasdf", ""],
  ["asdf\nASDF\nasDF\nAsDF\n\nSADF\nas", ""],
  ["asdf\\nASDF\\nasDF\\nAsDF\\n\\nSADF\\nas", ""],
  // Additional missing patterns found in content
  ["İletisime", "İletişime"],
  ["iletisime", "iletişime"],
  ["Bireysel Ilerleme", "Bireysel İlerleme"],
  ["BIZ", "BİZ"],
  ["hizinda", "hızında"],
  ["hizi", "hızı"],
];

FIXES.sort((a, b) => b[0].length - a[0].length);
const FILTERED = FIXES.filter(([w, c]) => w !== c);

function fix(text) {
  if (!text || typeof text !== "string") return text;
  let r = text;
  for (const [w, c] of FILTERED) {
    if (r.includes(w)) r = r.split(w).join(c);
  }
  return r;
}

function fixObj(obj) {
  if (typeof obj === "string") return fix(obj);
  if (Array.isArray(obj)) return obj.map(fixObj);
  if (obj && typeof obj === "object") {
    const o = {};
    for (const [k, v] of Object.entries(obj)) o[k] = fixObj(v);
    return o;
  }
  return obj;
}

async function main() {
  const pages = await (await fetch(`${ADMIN}/api/sayfalar`)).json();
  console.log(`Scanning ${pages.length} pages...\n`);

  let fixed = 0;

  for (const page of pages) {
    const full = await (await fetch(`${ADMIN}/api/sayfalar/${page.slug}`)).json();

    // Fix title
    const ft = fix(full.title);
    if (ft !== full.title) {
      console.log(`PAGE: "${full.title}" → "${ft}"`);
      await fetch(`${ADMIN}/api/sayfalar/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: ft, slug: page.slug }),
      });
    }

    for (const s of full.sections || []) {
      const fst = fix(s.title);
      let c;
      try { c = typeof s.content === "string" ? JSON.parse(s.content) : s.content; } catch { c = s.content; }

      const fc = fixObj(c);
      const cs = JSON.stringify(c);
      const fcs = JSON.stringify(fc);

      if (fst !== s.title || cs !== fcs) {
        console.log(`  [${page.slug}/${s.sectionType}] fixed`);
        await fetch(`${ADMIN}/api/sayfalar/${page.slug}/sections/${s.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: fst, visible: s.visible, content: fcs }),
        });
        fixed++;
      }
    }
  }

  console.log(`\n=== Fixed ${fixed} sections ===`);

  // Final comprehensive scan for remaining ASCII Turkish
  console.log("\n=== REMAINING ISSUES SCAN ===");
  const asciiTurkish = /(?:^|\s)([\w]*(?:(?<=[bcdfghjklmnpqrstvwxyz])i(?=[bcdfghjklmnpqrstvwxyz])|\b[A-Z](?=[a-z]))[\w]*)/g;

  // Simpler: just scan for known problem substrings
  const suspects = [
    "cocuk", "Cocuk", "basari", "Basari", "basla", "Basla", "calis", "Calis",
    "yasam", "iletisim", "Iletisim", "erisim", "Erisim", "gelisim",
    "gelistir", "Gelistir", "degisim", "donusum", "etkilesim",
    "karsilast", "ulastir", "sekillend", "Sekillend",
    "esligi", "isbirligi", "cesitlilik", "olcme", "Olcme",
    "disinda", "kosullar", "gosterir", "arastirma",
    // ğ
    "dagilim", "dogrulama", "dogru", "Dogru", "sagla", "Sagla",
    "gelecegi", "guvende", "guvenli", "toplulugu", "baglanma", "diger",
    // ı
    "kapsamli", "odakli", "oncelik", "farkindalik", "amacimiz", "Amacimiz",
    "sinif", "Sinif", "yakindan", "dayali", "Farkli", "farkli",
    "Kapsayici", "kapsayici", "hakkinda",
    // ç
    "gercek", "Gercek", "gecis", "icerigi", "icerik", "icinde", "iceren",
    "cozum", "Cozum", "sonuclar", "Coklu",
    // İ
    "Istatist", "Ilke", "NEDEN BIZ",
    // ö
    "ozel", "Ozel", "ogretmen", "Ogretmen", "ogrenci", "Ogrenci",
    "ogrenme", "Ogrenme", "gorev", "Gorev", "gorus", "yontem", "yonetim",
    // ü
    "ucretli", "Ucretli", "ucretsiz", "Ucretsiz", "duzey", "sureci",
    "dongu", "modul", "mufredat", "butun", "Butun", "kutuphane",
    "yuksek", "Yuksek", "guclu", "ozguven", "egitim", "Egitim",
    // corruptions
    "Becerişi", "becerişi", "Galerişi", "Yölçül", "yölçül",
    "tütörlar", "tütör", "mödül", "uygün", "Uygün",
  ];

  for (const page of pages) {
    const full = await (await fetch(`${ADMIN}/api/sayfalar/${page.slug}`)).json();
    for (const s of full.sections || []) {
      const text = JSON.stringify(s.content) + " " + s.title;
      const found = suspects.filter(p => text.includes(p));
      if (found.length > 0) {
        console.log(`  [${page.slug}/${s.sectionType}]: ${found.join(", ")}`);
      }
    }
  }

  console.log("\n=== Scan complete ===");
}

main().catch(console.error);
