const ADMIN = "https://learnecohub-admin-production.up.railway.app";
const FRONTEND = "https://learnecohub-eta.vercel.app";

// 1. Get current aileler-icin hero
const r1 = await fetch(`${ADMIN}/api/sayfalar/aileler-icin`);
const page = await r1.json();
const hero = page.sections.find(s => s.sectionType === "subpage_hero");
const content = JSON.parse(hero.content);
console.log("Current title:", content.title, "|", content.titleHighlight);

// 2. Update title via admin API
const testMark = " [TEST-" + Date.now() + "]";
content.description = content.description.replace(/\[TEST-\d+\]/, "").trim() + testMark;
const updateRes = await fetch(`${ADMIN}/api/sayfalar/aileler-icin/sections/${hero.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: JSON.stringify(content) }),
});
console.log("Admin update:", updateRes.ok ? "OK" : "FAIL");

// 3. Check frontend API immediately
const r2 = await fetch(`${FRONTEND}/api/pages/aileler-icin?t=${Date.now()}`);
const frontPage = await r2.json();
const frontHero = frontPage.sections.find(s => s.sectionType === "subpage_hero");
const frontContent = JSON.parse(frontHero.content);
console.log("Frontend desc now:", frontContent.description);
console.log("Contains test mark?", frontContent.description.includes(testMark) ? "YES - SYNC WORKS!" : "NO - STILL CACHED");

// 4. Clean up - remove test mark
content.description = content.description.replace(testMark, "").trim();
await fetch(`${ADMIN}/api/sayfalar/aileler-icin/sections/${hero.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: JSON.stringify(content) }),
});
console.log("Cleanup done");
