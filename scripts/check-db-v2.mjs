const ADMIN = "https://learnecohub-admin-production.up.railway.app";
const resp = await fetch(ADMIN + "/api/sayfalar");
const pages = await resp.json();
let totalIssues = 0;

// Map section types to their array field names
const arrayFields = {
  learning_steps: "steps",
  learning_map: "nodes",
  pricing: "plans",
  team: "members",
  team_grid: "members",
  badge_gallery: "categories",
};

for (const p of pages) {
  const r2 = await fetch(ADMIN + "/api/sayfalar/" + p.slug);
  const full = await r2.json();
  const sections = full.sections || [];
  const pageIssues = [];

  for (const s of sections) {
    let c = {};
    try { c = JSON.parse(s.content || "{}"); } catch(e) {}
    const st = s.sectionType;
    const issues = [];

    // Check items array (use correct field name)
    const arrField = arrayFields[st] || "items";
    const arr = c[arrField] || [];

    // Check for empty arrays where content is expected
    const needsArray = ["student_features","teacher_tools","school_features","family_features","skill_areas","faq","faq_parents","bento_grid","testimonials","badge_collection","materials","materials_scroll","badge_stats","learning_steps","learning_map","pricing","team","team_grid","badge_gallery"];
    if (arr.length === 0 && needsArray.includes(st)) issues.push("EMPTY_" + arrField.toUpperCase());

    // Check for missing descriptions in items (where relevant)
    const descNeeded = ["student_features","teacher_tools","school_features","family_features","skill_areas","bento_grid","testimonials","badge_collection","materials","materials_scroll"];
    if (arr.length > 0 && descNeeded.includes(st)) {
      const missing = arr.filter((item, i) => !item.description).length;
      if (missing > 0) issues.push(missing + "/" + arr.length + " items NO_DESC");
    }

    if (issues.length > 0) {
      pageIssues.push({ st, order: s.order, id: s.id, issues, count: arr.length });
      totalIssues += issues.length;
    }
  }

  if (pageIssues.length > 0) {
    console.log("\n=== " + p.slug + " ===");
    for (const pi of pageIssues) {
      console.log("  " + pi.st + " (order " + pi.order + ")" + (pi.count ? " [" + pi.count + " " + (arrayFields[pi.st]||"items") + "]" : "") + ": " + pi.issues.join(", "));
    }
  }
}

console.log("\n\nTotal real issues:", totalIssues);
