#!/usr/bin/env node
/**
 * Scan all pages for remaining Turkish character issues.
 * Flags words that look like they should have Turkish chars but don't.
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Common Turkish character patterns that indicate missing chars
const SUSPECT_PATTERNS = [
  // Missing ı (dotless i) - common words that should have ı
  /\b(\w*[bcdfghjklmnpqrstvwxyz])i([bcdfghjklmnpqrstvwxyz]\w*)\b/gi, // too broad, skip
];

// Specific suspect words (ASCII form → should have Turkish chars)
const SUSPECT_WORDS = [
  "aciklama", "baslik", "basari", "degisen", "degerlen",
  "hazirlik", "ilerleme", "iletisim", "icin", "icerik",
  "kilavuz", "ogretmen", "ogrenci", "olcme", "ozellest",
  "sinif", "surdurulebilir", "ucretsi", "yazdirilab",
  "yonet", "yuksek",
  // Simple non-Turkish patterns
  "isi ", "asi ", "ari ", "ini ", "igi ",
];

function collectStrings(obj, path, results) {
  if (typeof obj === "string" && obj.trim().length > 3) {
    results.push({ path, value: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectStrings(item, `${path}[${i}]`, results));
  } else if (typeof obj === "object" && obj !== null) {
    for (const [k, v] of Object.entries(obj)) {
      collectStrings(v, `${path}.${k}`, results);
    }
  }
}

// Known Turkish-character-missing patterns
const TURKISH_ISSUES = [
  [/\bici\b/g, "içi"],
  [/\bisi\b/g, "işi?/ısı?"],
  [/\basi\b/g, "ası?"],
  [/\bari\b/g, "arı?"],
  [/\bini\b/g, "ını?"],
  [/\bigi\b/g, "iği?"],
  [/\bugu\b/g, "uğu?"],
  [/\bonu\b/g, "önü?"],
];

async function main() {
  const pagesRes = await fetch(`${ADMIN}/api/sayfalar`);
  const pages = await pagesRes.json();

  let issues = 0;

  for (const page of pages) {
    const res = await fetch(`${ADMIN}/api/sayfalar/${page.slug}`);
    const data = await res.json();

    for (const sec of (data.sections || [])) {
      let content;
      try { content = JSON.parse(sec.content); } catch { continue; }

      const strings = [];
      collectStrings(content, sec.sectionType, strings);

      for (const { path, value } of strings) {
        // Check for words ending without proper Turkish chars
        // Simple heuristic: look for common wrong patterns
        const wrongPatterns = [
          // Words that should NOT exist in correct Turkish
          /\byapabilce/i,
          /\bolustür/i,
          /\btasarim(?!cı)/i,
          /\bkilavuz/i,
          /\byazdiril/i,
          /\bicerik(?!ler)/i,
          /\bicermez/i,
          /\byukuml/i,
          /\bsinrsiz/i,
          /\bregulasyon/i,
          /\bkucuk\b/i,
          /\bcatisma/i,
          /\barkadsdl/i,
          /\bvatandas(?!lık)/i,
          /\bbaskisi/i,
          /\bdestekleyiçi/i,
          /[a-zA-Z]lari\b/,    // -ları ending without ı→i
          /[a-zA-Z]leri\b/,    // usually ok but check
          /[a-zA-Z]mizi\b/,    // -mızı ending wrong
          /[a-zA-Z]nizi\b/,    // -nızı ending wrong
          /[a-zA-Z]rini\b/,    // could be wrong
          /\bDers Plan[ıi]\b(?!ar)/i,
        ];

        for (const pat of wrongPatterns) {
          const match = value.match(pat);
          if (match) {
            console.log(`⚠ ${page.slug} / ${path}: "${match[0]}" in "${value.substring(0, 100)}"`);
            issues++;
          }
        }
      }
    }
  }

  if (issues === 0) {
    console.log("✅ No obvious Turkish character issues found!");
  } else {
    console.log(`\n⚠ Found ${issues} potential issues to review.`);
  }
}

main().catch(console.error);
