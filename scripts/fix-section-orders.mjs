const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Desired order for anasayfa sections
const desiredOrder = [
  { type: "hero", order: 1 },
  { type: "stats", order: 2 },
  { type: "youtube_showcase", order: 3 },
  { type: "piano_showcase", order: 4 },
  { type: "materials", order: 5 },
  { type: "partner_logos", order: 6 },
  { type: "free_banner", order: 7 },
  { type: "video_showcase", order: 8 },
  { type: "learning_steps", order: 9 },
  { type: "learning_map", order: 10 },
  { type: "pricing", order: 11 },
  { type: "team", order: 12 },
  { type: "final_cta", order: 13 },
];

const resp = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
const page = await resp.json();

for (const s of page.sections) {
  const target = desiredOrder.find(d => d.type === s.sectionType);
  if (target && s.order !== target.order) {
    const res = await fetch(`${ADMIN}/api/sayfalar/anasayfa/sections/${s.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: target.order }),
    });
    console.log(`${s.sectionType}: order ${s.order} -> ${target.order} (${res.ok ? "OK" : "FAIL"})`);
  } else if (target) {
    console.log(`${s.sectionType}: already order ${s.order}`);
  }
}

// Verify
const verify = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
const p2 = await verify.json();
console.log("\nFinal order:");
p2.sections.sort((a, b) => a.order - b.order).forEach(s => {
  console.log(s.order + ". " + s.sectionType);
});
