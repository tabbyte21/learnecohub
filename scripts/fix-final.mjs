#!/usr/bin/env node
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

const FIXES = [
  ["sinursiz", "sınırsız"],
  ["tum ", "tüm "],
  ["Tum ", "Tüm "],
];

FIXES.sort((a, b) => b[0].length - a[0].length);

function fix(text) {
  if (!text || typeof text !== "string") return text;
  let r = text;
  for (const [w, c] of FIXES) {
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
  // Fix platform/free_banner
  const platformRes = await fetch(`${ADMIN}/api/sayfalar/platform`);
  const platform = await platformRes.json();

  for (const s of platform.sections) {
    const content = typeof s.content === "string" ? JSON.parse(s.content) : s.content;
    const fixed = fixObj(content);
    const cs = JSON.stringify(content);
    const fcs = JSON.stringify(fixed);
    if (cs !== fcs) {
      console.log(`Fixing [platform/${s.sectionType}]`);
      await fetch(`${ADMIN}/api/sayfalar/platform/sections/${s.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: s.title, visible: s.visible, content: fcs }),
      });
    }
  }

  // Fix aileler-icin hero - remove "asdf" from description
  const ailelerRes = await fetch(`${ADMIN}/api/sayfalar/aileler-icin`);
  const aileler = await ailelerRes.json();
  const hero = aileler.sections.find(s => s.sectionType === "subpage_hero");
  if (hero) {
    const content = typeof hero.content === "string" ? JSON.parse(hero.content) : hero.content;
    console.log("aileler-icin hero description:", content.description);
    if (content.description && content.description.includes("asdf")) {
      // Remove asdf and clean up
      content.description = content.description.replace(/\s*asdf\s*/g, " ").trim();
      if (!content.description || content.description === "") {
        content.description = "Çocuğunuzun sosyal-duygusal gelişimini destekleyin.";
      }
      console.log("Fixed description:", content.description);
      await fetch(`${ADMIN}/api/sayfalar/aileler-icin/sections/${hero.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: hero.title, visible: hero.visible, content: JSON.stringify(content) }),
      });
    }
  }

  // Also check for "tum" across all pages
  const pages = await (await fetch(`${ADMIN}/api/sayfalar`)).json();
  for (const page of pages) {
    const full = await (await fetch(`${ADMIN}/api/sayfalar/${page.slug}`)).json();
    for (const s of full.sections || []) {
      const content = typeof s.content === "string" ? JSON.parse(s.content) : s.content;
      const fixed = fixObj(content);
      const cs = JSON.stringify(content);
      const fcs = JSON.stringify(fixed);
      if (cs !== fcs) {
        console.log(`Fixing [${page.slug}/${s.sectionType}]`);
        await fetch(`${ADMIN}/api/sayfalar/${page.slug}/sections/${s.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: fix(s.title), visible: s.visible, content: fcs }),
        });
      }
    }
  }

  console.log("\nDone! Running final scan...");

  // Quick verify
  const SUSPECTS = ["sinursiz", "asdf", "tum ", "Tum "];
  let issues = 0;
  for (const page of pages) {
    const full = await (await fetch(`${ADMIN}/api/sayfalar/${page.slug}`)).json();
    for (const s of full.sections || []) {
      const text = (typeof s.content === "string" ? s.content : JSON.stringify(s.content)) + " " + s.title;
      for (const suspect of SUSPECTS) {
        if (text.includes(suspect)) {
          console.log(`  Still found "${suspect}" in [${page.slug}/${s.sectionType}]`);
          issues++;
        }
      }
    }
  }
  console.log(issues === 0 ? "✓ All clean!" : `${issues} remaining`);
}

main().catch(console.error);
