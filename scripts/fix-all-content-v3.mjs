#!/usr/bin/env node
/**
 * ROUND 3: Fix last remaining Turkish character issues.
 * Targeted fixes for yetkinlik-alanlarimiz and basari-hikayeleri pages.
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

const REPLACEMENTS = [
  // yetkinlik-alanlarimiz / student_features
  ["Duygulari tanıma, guclü yonleri bilme", "Duyguları tanıma, güçlü yönleri bilme"],
  ["oz disiplin", "öz disiplin"],
  ["baskalarini anlama", "başkalarını anlama"],
  ["yardim isteme", "yardım isteme"],
  ["sonuçlari düşünme", "sonuçları düşünme"],

  // basari-hikayeleri / subpage_hero
  ["kurumlarin hikâyeleri", "kurumların hikâyeleri"],
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
        const ok = await updateSection(page.slug, section.id, section.title, section.visible, fixed);
        if (ok) {
          console.log(`  ✓ ${page.slug} / ${section.sectionType}`);
          totalFixed++;
        } else {
          console.log(`  ✗ ${page.slug} / ${section.sectionType} — FAILED`);
        }
      }
    }
  }

  console.log(`\n✅ Done! Fixed ${totalFixed} sections.`);
}

main().catch(console.error);
