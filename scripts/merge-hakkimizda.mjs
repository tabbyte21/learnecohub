// Merge 6 hakkımızda subpages into single "hakkimizda" page via admin API
import https from "https";

const ADMIN = "https://learnecohub-admin-production.up.railway.app";
const FRONTEND = "https://learnecohub-eta.vercel.app";

const subpages = [
  "misyonumuz",
  "akademik-yaklasimimiz",
  "ilkelerimiz",
  "neden-learnecohub",
  "ekibimiz",
  "basari-hikayeleri",
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch { reject(new Error(`Parse error: ${data.slice(0, 200)}`)); }
      });
    }).on("error", reject);
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) },
    };
    const req = https.request(opts, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); } catch { resolve({ status: res.statusCode, data: body }); }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log("=== Fetching all 6 subpages ===");

  const allSections = [];
  let order = 1;

  // Add a combined hero as first section
  allSections.push({
    sectionType: "subpage_hero",
    title: "Hakkımızda Hero",
    order: order++,
    content: JSON.stringify({
      breadcrumb: "Hakkımızda",
      tag: "HAKKIMIZDA",
      tagIcon: "Heart",
      title: "Bizi Yakından",
      titleHighlight: "Tanıyın",
      description: "Misyonumuz, ilkelerimiz, akademik yaklaşımımız, ekibimiz ve başarı hikayelerimiz.",
      theme: "brand",
    }),
  });

  for (const slug of subpages) {
    console.log(`\nFetching: ${slug}`);
    try {
      const page = await fetch(`${FRONTEND}/api/pages/${slug}?t=${Date.now()}`);
      if (!page?.sections) {
        console.log(`  SKIP - no sections found`);
        continue;
      }
      const sections = page.sections
        .sort((a, b) => a.order - b.order)
        .filter((s) => s.sectionType !== "subpage_hero" && s.sectionType !== "footer");

      console.log(`  Found ${sections.length} sections (excluding hero/footer)`);
      for (const s of sections) {
        allSections.push({
          sectionType: s.sectionType,
          title: `[${slug}] ${s.title}`,
          order: order++,
          content: s.content, // Already a JSON string
        });
        console.log(`    + ${s.sectionType}: ${s.title}`);
      }
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }
  }

  // Add footer at the end
  allSections.push({
    sectionType: "footer",
    title: "Footer",
    order: order++,
    content: "{}",
  });

  console.log(`\n=== Total sections to create: ${allSections.length} ===`);

  // Step 1: Create the hakkimizda page
  console.log("\n=== Creating 'hakkimizda' page ===");
  const createPage = await post(`${ADMIN}/api/sayfalar`, {
    title: "Hakkımızda",
    slug: "hakkimizda",
  });

  if (createPage.status === 409) {
    console.log("Page 'hakkimizda' already exists, will add sections to it");
  } else if (createPage.status === 201) {
    console.log("Page created:", createPage.data.id);
  } else {
    console.error("Failed to create page:", createPage.status, createPage.data);
    return;
  }

  // Step 2: Create all sections
  console.log("\n=== Creating sections ===");
  for (const s of allSections) {
    const res = await post(`${ADMIN}/api/sayfalar/hakkimizda/sections`, {
      sectionType: s.sectionType,
      title: s.title,
      visible: true,
      content: s.content,
    });
    if (res.status === 201) {
      console.log(`  OK: ${s.sectionType} - ${s.title}`);
    } else {
      console.error(`  FAIL: ${s.sectionType} - ${res.status}`, typeof res.data === 'string' ? res.data.slice(0, 100) : res.data);
    }
  }

  console.log("\n=== DONE ===");
  console.log("Admin: https://learnecohub-admin-production.up.railway.app/sayfalar/hakkimizda");
}

main().catch(console.error);
