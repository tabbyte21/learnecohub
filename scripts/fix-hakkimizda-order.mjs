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
  sections.forEach((s) => console.log(`  ${s.order}. [${s.sectionType}] ${s.title} (${s.visible ? "visible" : "hidden"})`));

  // Define desired order and visibility
  // Logical flow:
  // 1. Hero
  // 2. Mission (Neden Varız)
  // 3. Misyon Maddeleri (student_features)
  // 4. Akademik - Öğrenme Döngüsü (mission)
  // 5. Akademik - Adımlar (skill_areas)
  // 6. Pedagojik Yaklaşımlar (student_features)
  // 7. Temel İlkeler (student_features)
  // 8. Yaklaşımımız (manifesto)
  // 9. Avantajlarımız (bento_grid)
  // 10. Ekibimiz (team)
  // 11. Etki İstatistikleri (stats - one only)
  // 12. Etki Rakamları (badge_stats)
  // 13. Referanslar (student_features)
  // 14. Partner Logolar
  // 15. Final CTA (one only)
  // 16. Footer

  // Build a map by id
  const byId = {};
  sections.forEach((s) => { byId[s.id] = s; });

  // Find sections by their title prefix
  const find = (titlePart) => sections.find((s) => s.title.includes(titlePart));

  const hero = sections.find((s) => s.sectionType === "subpage_hero");
  const missionNeden = find("[misyonumuz] Neden Var");
  const missionMadde = find("[misyonumuz] Misyon Madde");
  const missionStats = find("[misyonumuz] Etki İst");
  const missionCta = find("[misyonumuz] Son CTA");

  const akadDongu = find("[akademik-yaklasimimiz] Öğrenme Döngüsü\x00") || find("[akademik-yaklasimimiz] Öğrenme Döng");
  // More precise: find mission type from akademik
  const akadDonguSection = sections.find((s) => s.title.includes("[akademik-yaklasimimiz]") && s.sectionType === "mission");
  const akadAdimlar = find("[akademik-yaklasimimiz] Öğrenme Döngüsü Adım");
  const akadPedagojik = find("[akademik-yaklasimimiz] Pedagojik");
  const akadCta = find("[akademik-yaklasimimiz] Son CTA");

  const ilkelerTemel = find("[ilkelerimiz] Temel");
  const ilkelerCta = find("[ilkelerimiz] Son CTA");
  const ilkelerYaklasim = find("[ilkelerimiz] Yaklaşım");

  const nedenBento = find("[neden-learnecohub] Avantaj");
  const nedenStats = find("[neden-learnecohub] Rakamlarla");
  const nedenCta = find("[neden-learnecohub] Son CTA");

  const ekibimiz = find("[ekibimiz] Ekibimiz");
  const ekibimizCta = find("[ekibimiz] Son CTA");

  const basariStats = find("[basari-hikayeleri] Etki");
  const basariRef = find("[basari-hikayeleri] Referans");
  const basariCta = find("[basari-hikayeleri] Son CTA");
  const basariPartner = find("[basari-hikayeleri] Partner");

  const footer = sections.find((s) => s.sectionType === "footer");

  // Desired visible order
  const visibleOrder = [
    hero,
    missionNeden,
    missionMadde,
    akadDonguSection,
    akadAdimlar,
    akadPedagojik,
    ilkelerTemel,
    ilkelerYaklasim,
    nedenBento,
    ekibimiz,
    missionStats,    // one stats
    basariStats,
    basariRef,
    basariPartner,
    basariCta,       // single final CTA
    footer,
  ].filter(Boolean);

  // Sections to hide
  const hideSections = [
    missionCta,
    akadCta,
    ilkelerCta,
    nedenCta,
    nedenStats,      // duplicate stats
    ekibimizCta,
  ].filter(Boolean);

  console.log("\n=== Applying new order ===");

  for (let i = 0; i < visibleOrder.length; i++) {
    const s = visibleOrder[i];
    const newOrder = i + 1;
    console.log(`  ${newOrder}. [${s.sectionType}] ${s.title} → VISIBLE`);
    const res = await put(`${ADMIN}/api/sayfalar/hakkimizda/sections/${s.id}`, { order: newOrder, visible: true });
    if (res.status !== 200) console.error(`    FAIL: ${res.status}`);
  }

  console.log("\n=== Hiding duplicate CTAs ===");
  for (const s of hideSections) {
    console.log(`  HIDE: [${s.sectionType}] ${s.title}`);
    const res = await put(`${ADMIN}/api/sayfalar/hakkimizda/sections/${s.id}`, { visible: false, order: 99 });
    if (res.status !== 200) console.error(`    FAIL: ${res.status}`);
  }

  console.log("\n=== DONE ===");
}

main().catch(console.error);
