// Fix hakkımızda page: reorder sections, hide duplicate CTAs
import https from "https";

const ADMIN = "https://learnecohub-admin-production.up.railway.app";
const FRONTEND = "https://learnecohub-eta.vercel.app";

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch { reject(new Error(data.slice(0, 200))); }
      });
    }).on("error", reject);
  });
}

function put(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const opts = {
      hostname: u.hostname, port: 443, path: u.pathname, method: "PUT",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) },
    };
    const req = https.request(opts, (res) => {
      let b = "";
      res.on("data", (c) => (b += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(b) }); } catch { resolve({ status: res.statusCode, data: b }); }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const page = await fetch(`${FRONTEND}/api/pages/hakkimizda?t=${Date.now()}`);
  const sections = page.sections.sort((a, b) => a.order - b.order);

  console.log("=== Current sections ===");
  sections.forEach((s) => console.log(`  ${s.order}. [${s.sectionType}] ${s.title} (${s.visible ? "V" : "H"})`));

  const byId = {};
  sections.forEach((s) => { byId[s.id] = s; });
  const find = (titlePart) => sections.find((s) => s.title.includes(titlePart));

  // Desired visible order (logical flow)
  const visibleOrder = [
    find("Hakkımızda Hero"),                        // 1. Hero
    find("[misyonumuz] Neden Var"),                  // 2. Misyon - Neden Varız
    find("[misyonumuz] Misyon Madde"),               // 3. Misyon Maddeleri
    find("[akademik-yaklasimimiz] Öğrenme Döngüsü Adım"),  // 4. Adımlar (skill_areas)
    find("[akademik-yaklasimimiz] Pedagojik"),       // 5. Pedagojik Yaklaşımlar
    find("[ilkelerimiz] Temel"),                     // 6. Temel İlkeler
    find("[ilkelerimiz] Yaklaşım"),                  // 7. Yaklaşımımız (manifesto)
    find("[neden-learnecohub] Avantaj"),             // 8. Avantajlarımız (bento_grid)
    find("[ekibimiz] Ekibimiz"),                     // 9. Ekibimiz (team)
    find("[basari-hikayeleri] Etki"),                // 10. Etki Rakamları (badge_stats)
    find("[basari-hikayeleri] Referans"),            // 11. Referanslar
    find("[basari-hikayeleri] Partner"),             // 12. Partner Logolar
    find("[basari-hikayeleri] Son CTA"),             // 13. Final CTA (single)
    find("Footer"),                                  // 14. Footer
  ].filter(Boolean);

  // Sections to hide
  const hideSections = [
    find("[misyonumuz] Etki İst"),                  // duplicate stats
    find("[misyonumuz] Son CTA"),
    find("[akademik-yaklasimimiz] Öğrenme Döngüsü") && sections.find(s => s.title.includes("[akademik-yaklasimimiz] Öğrenme Döngüsü") && s.sectionType === "mission"),
    find("[akademik-yaklasimimiz] Son CTA"),
    find("[ilkelerimiz] Son CTA"),
    find("[neden-learnecohub] Rakamlarla"),          // duplicate stats
    find("[neden-learnecohub] Son CTA"),
    find("[ekibimiz] Son CTA"),
  ].filter(Boolean);

  // Remove hidden sections from visible (in case of overlap)
  const hideIds = new Set(hideSections.map(s => s.id));
  const finalVisible = visibleOrder.filter(s => !hideIds.has(s.id));

  console.log("\n=== New visible order ===");
  finalVisible.forEach((s, i) => console.log(`  ${i + 1}. [${s.sectionType}] ${s.title}`));

  console.log("\n=== Will hide ===");
  hideSections.forEach((s) => console.log(`  HIDE: [${s.sectionType}] ${s.title}`));

  // Apply visible order
  for (let i = 0; i < finalVisible.length; i++) {
    const s = finalVisible[i];
    console.log(`\nSetting order ${i + 1}: ${s.title}`);
    const res = await put(`${ADMIN}/api/sayfalar/hakkimizda/sections/${s.id}`, { order: i + 1, visible: true });
    console.log(`  → ${res.status === 200 ? "OK" : "FAIL " + res.status}`);
  }

  // Hide sections
  for (const s of hideSections) {
    console.log(`\nHiding: ${s.title}`);
    const res = await put(`${ADMIN}/api/sayfalar/hakkimizda/sections/${s.id}`, { visible: false, order: 99 });
    console.log(`  → ${res.status === 200 ? "OK" : "FAIL " + res.status}`);
  }

  console.log("\n=== DONE ===");
}

main().catch(console.error);
