#!/usr/bin/env node
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Known ASCII Turkish patterns to check for
const SUSPECTS = [
  // Missing ş
  "yasam", "basari", "basla", "calis", "Calis", "arastirma", "ulastir",
  "sekillend", "esligi", "isbirligi", "iletisim", "Iletisim", "cesitlilik",
  "erisim", "Erisim", "iliskiler", "gelisim", "gelistir", "degisim",
  "olcme", "gerceklestir", "gosterir", "kosullar", "disinda", "donusum",
  "etkilesim", "paylasim", "karsilast", "guclendiriyoruz", "pekistir",
  "tanitim", "Oyunlastirma", "Bireysellestirilmis", "Paylas", "olusur",
  "Sehir", "sehir",
  // Missing ğ
  "cocuk", "Cocuk", "dagilim", "dogru", "Dogru", "deger", "Deger",
  "sagla", "Sagla", "gelecegi", "guvende", "guvenli", "toplulugu",
  "baglanma", "diger", "Diger",
  // Missing ı
  "kapsamli", "odakli", "oncelik", "farkindalik", "amacimiz", "Amacimiz",
  "sinif ", "Sinif", "dayali", "Farkli", "farkli", "Kapsayici", "hakkinda",
  "yaklaşımi", "yaklaşımızi", "müfredatımiz",
  // Missing ç
  "gercek", "Gercek", "gecis", "icerigi", "icerik", "icinde", "iceren",
  "cozum", "Cozum", "sonuclar", "Coklu", "araclari",
  // Missing İ
  "Istatist", " Ilke", "NEDEN BIZ", "Isbirlikci", "Interaktif",
  // Missing ö
  "ozel ", "Ozel", "ogretmen", "Ogretmen", "ogrenci", "Ogrenci",
  "ogrenme", "Ogrenme", "gorev", "Gorev", "yontem", "yonetim",
  // Missing ü
  "ucretli", "Ucretli", "ucretsiz", "Ucretsiz", "duzey", "sureci",
  "dongu", "modul ", "mufredat", "Mufredat", "butun", "Butun",
  "kutuphane", "yuksek", "Yuksek", "guclu", "ozguven", "egitim", "Egitim",
  // v2/v3 corruptions
  "Becerişi", "Galerişi", "Yölçül", "yölçül", "tütör", "mödül", "uygün",
  // Common ASCII endings
  "asamalari", "hizinda", "sinursiz",
  // Test content
  "asdfasdf", "asdf",
];

async function main() {
  const pages = await (await fetch(`${ADMIN}/api/sayfalar`)).json();
  let issues = 0;

  for (const page of pages) {
    const full = await (await fetch(`${ADMIN}/api/sayfalar/${page.slug}`)).json();

    // Check page title
    for (const suspect of SUSPECTS) {
      if (full.title.includes(suspect)) {
        console.log(`[${page.slug}] PAGE TITLE: "${full.title}" contains "${suspect}"`);
        issues++;
      }
    }

    for (const section of full.sections || []) {
      const content = typeof section.content === "string" ? section.content : JSON.stringify(section.content);
      const allText = content + " " + section.title;

      for (const suspect of SUSPECTS) {
        if (allText.includes(suspect)) {
          // Find the context
          const idx = allText.indexOf(suspect);
          const start = Math.max(0, idx - 20);
          const end = Math.min(allText.length, idx + suspect.length + 20);
          const context = allText.substring(start, end).replace(/\n/g, " ");
          console.log(`[${page.slug}/${section.sectionType}] Found "${suspect}" in: ...${context}...`);
          issues++;
          break; // Only report first match per section per suspect
        }
      }
    }
  }

  if (issues === 0) {
    console.log("✓ No remaining ASCII Turkish issues found!");
  } else {
    console.log(`\n=== ${issues} potential issues found ===`);
  }
}

main().catch(console.error);
