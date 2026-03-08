#!/usr/bin/env node
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

function printAll(obj, path) {
  if (typeof obj === "string" && obj.trim().length > 0) {
    console.log("  " + path + " = " + obj);
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => printAll(item, path + "[" + i + "]"));
  } else if (typeof obj === "object" && obj !== null) {
    for (const [k, v] of Object.entries(obj)) {
      printAll(v, path + "." + k);
    }
  }
}

async function main() {
  const pagesRes = await fetch(ADMIN + "/api/sayfalar");
  const pages = await pagesRes.json();

  for (const page of pages) {
    const res = await fetch(ADMIN + "/api/sayfalar/" + page.slug);
    const data = await res.json();

    console.log("\n\n══════════════════════════════════════════");
    console.log("PAGE: " + page.slug + " (" + page.title + ")");
    console.log("══════════════════════════════════════════");

    for (const sec of (data.sections || [])) {
      let c;
      try { c = JSON.parse(sec.content); } catch { c = sec.content; }
      console.log("\n--- " + sec.sectionType + " ---");
      printAll(c, "");
    }
  }
}

main().catch(console.error);
