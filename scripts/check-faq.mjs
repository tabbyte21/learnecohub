const ADMIN = "https://learnecohub-admin-production.up.railway.app";
const slugs = ["sss", "aileler-icin", "iletisim", "kurslarimiz", "demo"];

for (const slug of slugs) {
  const r = await fetch(`${ADMIN}/api/sayfalar/${slug}`);
  const p = await r.json();
  for (const s of (p.sections || [])) {
    if (s.sectionType === "faq" || s.sectionType === "faq_parents") {
      const c = JSON.parse(s.content || "{}");
      const hasItems = Array.isArray(c.items) && c.items.length > 0;
      const hasQuestions = Array.isArray(c.questions) && c.questions.length > 0;
      console.log(`${slug} / ${s.sectionType} (id: ${s.id})`);
      console.log(`  items: ${hasItems ? c.items.length + " items, keys: " + Object.keys(c.items[0]).join(",") : "none"}`);
      console.log(`  questions: ${hasQuestions ? c.questions.length + " items, keys: " + Object.keys(c.questions[0]).join(",") : "none"}`);
      console.log();
    }
  }
}
