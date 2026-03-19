const resp = await fetch("https://learnecohub-admin-production.up.railway.app/api/sayfalar");
const pages = await resp.json();
console.log("Total pages:", pages.length);
let totalIssues = 0;

for (const p of pages) {
  const r2 = await fetch("https://learnecohub-admin-production.up.railway.app/api/sayfalar/" + p.slug);
  const full = await r2.json();
  const sections = full.sections || [];
  const pageIssues = [];

  for (const s of sections) {
    let c = {};
    try { c = JSON.parse(s.content || "{}"); } catch(e) {}
    const st = s.sectionType;
    const itemCount = (c.items || []).length;
    const hasTitle = !!c.title;
    const issues = [];
    const skip = ["footer", "hero", "subpage_hero", "contact_form", "blog_list", "pdf_archive", "partner_logos"];
    if (!hasTitle && !skip.includes(st)) issues.push("NO_TITLE");
    const needsItems = ["student_features","teacher_tools","school_features","family_features","skill_areas","faq","faq_parents","bento_grid","testimonials","badge_collection","pricing","team","team_grid","materials","materials_scroll","badge_gallery","badge_stats","learning_steps","learning_map"];
    if (itemCount === 0 && needsItems.includes(st)) issues.push("NO_ITEMS");
    if (c.items) {
      c.items.forEach((item, i) => {
        const noDescNeeded = ["pricing","team","team_grid","badge_gallery","badge_stats","learning_map","stats","partner_logos","faq","faq_parents"];
        if (!item.description && !noDescNeeded.includes(st)) {
          issues.push("ITEM_" + i + "_NO_DESC");
        }
      });
    }
    if (issues.length > 0) {
      pageIssues.push({ st, order: s.order, issues, itemCount });
      totalIssues += issues.length;
    }
  }

  if (pageIssues.length > 0) {
    console.log("\n=== " + p.slug + " (" + sections.length + " sections) ===");
    for (const pi of pageIssues) {
      console.log("  " + pi.st + " (order " + pi.order + ")" + (pi.itemCount ? " [" + pi.itemCount + " items]" : "") + ": " + pi.issues.join(", "));
    }
  }
}

console.log("\n\nTotal issues found:", totalIssues);
