#!/usr/bin/env node
/**
 * ROUND 4: Fix remaining content issues found in full DB review.
 * - /iletişim → /iletisim (broken URL paths, 9 occurrences)
 * - dökümanlar → dokümanlar (spelling error, 2 occurrences)
 * - Inovasyon → İnovasyon (Turkish capital İ)
 * - öğretmen destek → öğretmen desteği (missing suffix)
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

const REPLACEMENTS = [
  // Broken URL paths — /iletişim should be /iletisim
  ["/iletişim", "/iletisim"],

  // Spelling: döküman → doküman
  ["dökümanlar", "dokümanlar"],
  ["Dökümanlar", "Dokümanlar"],

  // Turkish capital İ (not I without dot)
  ["Inovasyon", "İnovasyon"],

  // Missing suffix: destek → desteği
  ["öğretmen destek\n", "öğretmen desteği\n"],
  ["öğretmen destek\"", "öğretmen desteği\""],
  ["ve öğretmen destek", "ve öğretmen desteği"],
];

function fixText(text) {
  if (typeof text !== "string") return text;
  let result = text;
  for (const [bad, good] of REPLACEMENTS) {
    if (result.includes(bad)) {
      result = result.split(bad).join(good);
    }
  }
  return result;
}

function deepFix(obj) {
  if (typeof obj === "string") return fixText(obj);
  if (Array.isArray(obj)) return obj.map(deepFix);
  if (typeof obj === "object" && obj !== null) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = deepFix(v);
    }
    return result;
  }
  return obj;
}

async function updateSection(slug, sectionId, title, visible, content) {
  const res = await fetch(`${ADMIN}/api/sayfalar/${slug}/sections/${sectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      visible,
      content: JSON.stringify(content),
    }),
  });
  return res.ok;
}

async function main() {
  console.log("Fetching all pages...");
  const pagesRes = await fetch(`${ADMIN}/api/sayfalar`);
  const pages = await pagesRes.json();
  console.log(`Found ${pages.length} pages.\n`);

  let totalFixed = 0;
  const fixDetails = [];

  for (const page of pages) {
    const pageRes = await fetch(`${ADMIN}/api/sayfalar/${page.slug}`);
    const pageData = await pageRes.json();
    const sections = pageData.sections || [];

    for (const section of sections) {
      let content;
      try {
        content = typeof section.content === "string" ? JSON.parse(section.content) : section.content;
      } catch {
        continue;
      }

      const original = JSON.stringify(content);
      const fixed = deepFix(content);
      const fixedStr = JSON.stringify(fixed);

      if (fixedStr !== original) {
        // Show what changed
        const changes = [];
        for (const [bad, good] of REPLACEMENTS) {
          if (original.includes(bad)) {
            changes.push(`"${bad}" → "${good}"`);
          }
        }

        const ok = await updateSection(page.slug, section.id, section.title, section.visible, fixed);
        if (ok) {
          console.log(`  ✓ ${page.slug} / ${section.sectionType}`);
          changes.forEach(c => console.log(`      ${c}`));
          fixDetails.push({ page: page.slug, section: section.sectionType, changes });
          totalFixed++;
        } else {
          console.log(`  ✗ ${page.slug} / ${section.sectionType} — FAILED`);
        }
      }
    }
  }

  console.log(`\n✅ Done! Fixed ${totalFixed} sections.`);
  if (fixDetails.length > 0) {
    console.log("\nSummary:");
    fixDetails.forEach(d => {
      console.log(`  ${d.page} / ${d.section}: ${d.changes.join(", ")}`);
    });
  }
}

main().catch(console.error);
