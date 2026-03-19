const ADMIN = "https://learnecohub-admin-production.up.railway.app";

const resp = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
const page = await resp.json();

// Map current sections by sectionType
const sectionMap = {};
for (const s of page.sections) {
  sectionMap[s.sectionType] = s;
}

// Desired order
const order = [
  "hero",
  "stats",
  "youtube_showcase",
  "piano_showcase",
  "materials",
  "partner_logos",
  "free_banner",
  "video_showcase",
  "learning_steps",
  "learning_map",
  "pricing",
  "team",
  "final_cta",
];

for (let i = 0; i < order.length; i++) {
  const type = order[i];
  const s = sectionMap[type];
  if (!s) {
    console.log(`MISSING: ${type}`);
    continue;
  }
  const newOrder = (i + 1) * 10; // Use 10, 20, 30... to avoid conflicts
  const res = await fetch(`${ADMIN}/api/sayfalar/anasayfa/sections/${s.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order: newOrder }),
  });
  console.log(`${type}: order ${s.order} -> ${newOrder} (${res.ok ? "OK" : "FAIL"})`);
}

// Now set final orders 1,2,3...
console.log("\nSetting final sequential orders...");
for (let i = 0; i < order.length; i++) {
  const type = order[i];
  const s = sectionMap[type];
  if (!s) continue;
  const res = await fetch(`${ADMIN}/api/sayfalar/anasayfa/sections/${s.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order: i + 1 }),
  });
  console.log(`${type}: -> ${i + 1} (${res.ok ? "OK" : "FAIL"})`);
}

// Verify
const verify = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
const p2 = await verify.json();
console.log("\nFinal:");
p2.sections.sort((a, b) => a.order - b.order).forEach(s => {
  console.log(s.order + ". " + s.sectionType);
});
