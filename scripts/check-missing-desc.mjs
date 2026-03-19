const ADMIN = "https://learnecohub-admin-production.up.railway.app";
const slugs = ["anasayfa", "ogrenciler-icin", "ogretmenler-icin", "sinif-seviyeleri", "ucretsiz-kaynaklar", "yetkinlik-alanlarimiz"];

for (const slug of slugs) {
  const r = await fetch(ADMIN + "/api/sayfalar/" + slug);
  const p = await r.json();
  console.log("\n=== " + slug + " ===");
  for (const s of (p.sections || [])) {
    const c = JSON.parse(s.content || "{}");
    const items = c.items || [];
    const noDesc = items.filter(i => !i.description);
    if (noDesc.length > 0) {
      console.log(s.sectionType, "id:", s.id);
      items.forEach((item, i) => {
        console.log("  [" + i + "]", item.title || item.name || "?", "| desc:", item.description ? "YES" : "MISSING");
      });
    }
  }
}
