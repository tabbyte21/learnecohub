// Full comprehensive audit of all LearnecoHub pages
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// The frontend sectionRenderers map - these are the only types that will render
const VALID_SECTION_TYPES = new Set([
  "subpage_hero", "hero", "mission", "student_features", "teacher_tools",
  "school_features", "family_features", "skill_areas", "stats", "bento_grid",
  "faq", "faq_parents", "blog_list", "contact_form", "badge_collection",
  "free_banner", "final_cta", "footer", "testimonials", "team_grid",
  "youtube_showcase", "materials_scroll", "video_showcase", "learning_steps",
  "learning_map", "pricing", "team", "materials", "badge_stats", "badge_gallery",
  "piano_showcase", "manifesto", "impact_banner", "pdf_archive", "partner_logos"
]);

// Pages that are expected NOT to have subpage_hero (e.g., the homepage)
const HOMEPAGE_SLUGS = new Set(["anasayfa"]);

// Pages that might legitimately skip final_cta
const NO_CTA_EXCEPTIONS = new Set(["anasayfa"]);

// URL regex
const URL_REGEX = /https?:\/\/[^\s"',)}\]]+/g;

// ---- Helpers ----
function parseContent(raw) {
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return null; // indicates parse error
  }
}

function isEmptyContent(content) {
  if (!content) return true;
  if (typeof content === "object" && Object.keys(content).length === 0) return true;
  return false;
}

function findPlaceholderText(obj, path = "") {
  const hits = [];
  if (!obj || typeof obj !== "object") {
    if (typeof obj === "string" && /\bx{2,}\b/i.test(obj)) {
      hits.push({ path, value: obj });
    }
    return hits;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => hits.push(...findPlaceholderText(item, `${path}[${i}]`)));
  } else {
    for (const [k, v] of Object.entries(obj)) {
      hits.push(...findPlaceholderText(v, path ? `${path}.${k}` : k));
    }
  }
  return hits;
}

function findAllUrls(obj) {
  const urls = [];
  if (!obj) return urls;
  if (typeof obj === "string") {
    const matches = obj.match(URL_REGEX);
    if (matches) urls.push(...matches);
    return urls;
  }
  if (Array.isArray(obj)) {
    obj.forEach(item => urls.push(...findAllUrls(item)));
  } else if (typeof obj === "object") {
    for (const v of Object.values(obj)) {
      urls.push(...findAllUrls(v));
    }
  }
  return urls;
}

// ---- Main Audit ----
async function main() {
  console.log("=== LearnecoHub Full Database Audit ===\n");

  // Step 1: Fetch all pages
  const resp = await fetch(ADMIN + "/api/sayfalar");
  if (!resp.ok) {
    console.error("Failed to fetch pages list:", resp.status, resp.statusText);
    process.exit(1);
  }
  const pages = await resp.json();
  console.log(`Total pages found: ${pages.length}\n`);

  const allIssues = [];
  const summary = {
    totalPages: pages.length,
    totalSections: 0,
    unknownTypes: new Map(),
    missingSubpageHero: [],
    missingFinalCta: [],
    emptyContent: [],
    parseErrors: [],
    missingRequiredArrays: [],
    placeholderText: [],
    brokenUrls: [],
    pagesWithNoSections: [],
  };

  // Step 2: Fetch each page's full data
  for (const page of pages) {
    const slug = page.slug;
    const r2 = await fetch(ADMIN + "/api/sayfalar/" + slug);
    if (!r2.ok) {
      allIssues.push({ page: slug, issue: `Failed to fetch page data: ${r2.status}` });
      continue;
    }
    const full = await r2.json();
    const sections = full.sections || [];
    summary.totalSections += sections.length;

    if (sections.length === 0) {
      summary.pagesWithNoSections.push(slug);
    }

    const sectionTypes = sections.map(s => s.sectionType);

    // (b) Check for missing subpage_hero
    if (!HOMEPAGE_SLUGS.has(slug) && !sectionTypes.includes("subpage_hero")) {
      summary.missingSubpageHero.push(slug);
    }

    // (c) Check for missing final_cta
    if (!NO_CTA_EXCEPTIONS.has(slug) && !sectionTypes.includes("final_cta")) {
      summary.missingFinalCta.push(slug);
    }

    // Step 3: Check each section
    for (const section of sections) {
      const st = section.sectionType;
      const sLabel = `[${slug}] section #${section.order} (${st})`;

      // (a) Unknown section type
      if (!VALID_SECTION_TYPES.has(st)) {
        const existing = summary.unknownTypes.get(st) || [];
        existing.push(slug);
        summary.unknownTypes.set(st, existing);
        allIssues.push({ page: slug, section: st, order: section.order, issue: `Unknown section type "${st}" - will NOT render` });
      }

      // Parse content
      const content = parseContent(section.content);

      if (content === null) {
        summary.parseErrors.push({ page: slug, section: st, order: section.order });
        allIssues.push({ page: slug, section: st, order: section.order, issue: `Content JSON parse error` });
        continue;
      }

      // (d) Empty content
      if (isEmptyContent(content)) {
        summary.emptyContent.push({ page: slug, section: st, order: section.order });
        allIssues.push({ page: slug, section: st, order: section.order, issue: `Empty content "{}"` });
        continue;
      }

      // (e) learning_steps: must have "steps" array
      if (st === "learning_steps") {
        if (!Array.isArray(content.steps)) {
          const hasItems = Array.isArray(content.items);
          summary.missingRequiredArrays.push({ page: slug, section: st, field: "steps", hasAlternate: hasItems ? "items" : null });
          allIssues.push({ page: slug, section: st, order: section.order, issue: `learning_steps missing "steps" array${hasItems ? ' (has "items" instead)' : ''}` });
        }
      }

      // (f) learning_map: must have "nodes" array
      if (st === "learning_map") {
        if (!Array.isArray(content.nodes)) {
          summary.missingRequiredArrays.push({ page: slug, section: st, field: "nodes" });
          allIssues.push({ page: slug, section: st, order: section.order, issue: `learning_map missing "nodes" array` });
        }
      }

      // (g) pricing: must have "plans" array
      if (st === "pricing") {
        if (!Array.isArray(content.plans)) {
          summary.missingRequiredArrays.push({ page: slug, section: st, field: "plans" });
          allIssues.push({ page: slug, section: st, order: section.order, issue: `pricing missing "plans" array` });
        }
      }

      // (h) team: must have "members" array
      if (st === "team" || st === "team_grid") {
        if (!Array.isArray(content.members)) {
          summary.missingRequiredArrays.push({ page: slug, section: st, field: "members" });
          allIssues.push({ page: slug, section: st, order: section.order, issue: `${st} missing "members" array` });
        }
      }

      // (i) faq/faq_parents: must have "questions" array
      if (st === "faq" || st === "faq_parents") {
        if (!Array.isArray(content.questions)) {
          const hasItems = Array.isArray(content.items);
          const hasFaqs = Array.isArray(content.faqs);
          let alt = null;
          if (hasItems) alt = "items";
          else if (hasFaqs) alt = "faqs";
          summary.missingRequiredArrays.push({ page: slug, section: st, field: "questions", hasAlternate: alt });
          allIssues.push({ page: slug, section: st, order: section.order, issue: `${st} missing "questions" array${alt ? ` (has "${alt}" instead)` : ''}` });
        }
      }

      // (j) Placeholder text with "xxx" or "xx"
      const placeholders = findPlaceholderText(content);
      for (const ph of placeholders) {
        summary.placeholderText.push({ page: slug, section: st, path: ph.path, value: ph.value });
        allIssues.push({ page: slug, section: st, order: section.order, issue: `Placeholder text at ${ph.path}: "${ph.value.substring(0, 80)}"` });
      }

      // (k) Collect URLs for checking (we'll batch-check after)
      const urls = findAllUrls(content);
      for (const url of urls) {
        // Quick heuristic checks for obviously broken URLs
        if (url.includes("example.com") || url.includes("placeholder") || url.includes("xxx")) {
          summary.brokenUrls.push({ page: slug, section: st, url, reason: "Placeholder URL" });
          allIssues.push({ page: slug, section: st, order: section.order, issue: `Placeholder URL: ${url}` });
        }
        // Check for common broken patterns
        if (url.match(/https?:\/\/$/)) {
          summary.brokenUrls.push({ page: slug, section: st, url, reason: "Incomplete URL" });
          allIssues.push({ page: slug, section: st, order: section.order, issue: `Incomplete URL: ${url}` });
        }
      }
    }
  }

  // ---- Now let's also do a batch URL check for unique URLs ----
  console.log("Collecting all unique URLs for validation...\n");
  const allUrlsMap = new Map(); // url -> [{page, section}]
  for (const page of pages) {
    const r2 = await fetch(ADMIN + "/api/sayfalar/" + page.slug);
    if (!r2.ok) continue;
    const full = await r2.json();
    for (const section of (full.sections || [])) {
      const content = parseContent(section.content);
      if (!content) continue;
      const urls = findAllUrls(content);
      for (const url of urls) {
        if (!allUrlsMap.has(url)) allUrlsMap.set(url, []);
        allUrlsMap.get(url).push({ page: page.slug, section: section.sectionType });
      }
    }
  }

  console.log(`Found ${allUrlsMap.size} unique URLs across all pages.`);
  console.log("Checking URLs (HEAD requests, 5s timeout)...\n");

  let checkedCount = 0;
  let brokenCount = 0;
  const urlEntries = [...allUrlsMap.entries()];

  // Check in batches of 5
  for (let i = 0; i < urlEntries.length; i += 5) {
    const batch = urlEntries.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(async ([url]) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        try {
          const r = await fetch(url, { method: "HEAD", signal: controller.signal, redirect: "follow" });
          clearTimeout(timeout);
          return { url, status: r.status, ok: r.ok };
        } catch (e) {
          clearTimeout(timeout);
          // Try GET if HEAD fails (some servers don't support HEAD)
          try {
            const controller2 = new AbortController();
            const timeout2 = setTimeout(() => controller2.abort(), 5000);
            const r = await fetch(url, { method: "GET", signal: controller2.signal, redirect: "follow" });
            clearTimeout(timeout2);
            // consume body to avoid leak
            await r.text().catch(() => {});
            return { url, status: r.status, ok: r.ok };
          } catch (e2) {
            return { url, status: 0, ok: false, error: e2.message || String(e2) };
          }
        }
      })
    );

    for (const result of results) {
      checkedCount++;
      if (result.status === "fulfilled") {
        const { url, status, ok, error } = result.value;
        if (!ok) {
          brokenCount++;
          const locations = allUrlsMap.get(url);
          const reason = error ? `Error: ${error}` : `HTTP ${status}`;
          for (const loc of locations) {
            // Avoid duplicating placeholder URL issues
            if (!url.includes("example.com") && !url.includes("placeholder") && !url.includes("xxx")) {
              summary.brokenUrls.push({ page: loc.page, section: loc.section, url, reason });
              allIssues.push({ page: loc.page, section: loc.section, issue: `Broken URL (${reason}): ${url}` });
            }
          }
        }
      } else {
        // Promise rejected entirely
        brokenCount++;
      }
    }
  }

  console.log(`URL check complete: ${checkedCount} checked, ${brokenCount} broken.\n`);

  // ---- Print Report ----
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║              LEARNECOHUB FULL AUDIT REPORT                  ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  console.log(`Total pages: ${summary.totalPages}`);
  console.log(`Total sections: ${summary.totalSections}`);
  console.log(`Total issues found: ${allIssues.length}\n`);

  // --- (a) Unknown section types ---
  console.log("─── (a) UNKNOWN SECTION TYPES (will NOT render) ───");
  if (summary.unknownTypes.size === 0) {
    console.log("  None found. All section types are valid.\n");
  } else {
    for (const [type, pages] of summary.unknownTypes) {
      console.log(`  Type: "${type}" -> used on: ${pages.join(", ")}`);
    }
    console.log();
  }

  // --- (b) Missing subpage_hero ---
  console.log("─── (b) PAGES MISSING subpage_hero ───");
  if (summary.missingSubpageHero.length === 0) {
    console.log("  None found. All subpages have a subpage_hero.\n");
  } else {
    for (const slug of summary.missingSubpageHero) {
      console.log(`  - ${slug}`);
    }
    console.log();
  }

  // --- (c) Missing final_cta ---
  console.log("─── (c) PAGES MISSING final_cta ───");
  if (summary.missingFinalCta.length === 0) {
    console.log("  None found. All pages have a final_cta.\n");
  } else {
    for (const slug of summary.missingFinalCta) {
      console.log(`  - ${slug}`);
    }
    console.log();
  }

  // --- (d) Empty content ---
  console.log("─── (d) SECTIONS WITH EMPTY CONTENT ───");
  if (summary.emptyContent.length === 0) {
    console.log("  None found.\n");
  } else {
    for (const e of summary.emptyContent) {
      console.log(`  - [${e.page}] ${e.section} (order: ${e.order})`);
    }
    console.log();
  }

  // --- Parse errors ---
  if (summary.parseErrors.length > 0) {
    console.log("─── JSON PARSE ERRORS ───");
    for (const e of summary.parseErrors) {
      console.log(`  - [${e.page}] ${e.section} (order: ${e.order})`);
    }
    console.log();
  }

  // --- (e-i) Missing required arrays ---
  console.log("─── (e-i) MISSING REQUIRED ARRAYS ───");
  if (summary.missingRequiredArrays.length === 0) {
    console.log("  None found. All sections have their required arrays.\n");
  } else {
    for (const m of summary.missingRequiredArrays) {
      let msg = `  - [${m.page}] ${m.section}: missing "${m.field}"`;
      if (m.hasAlternate) msg += ` (has "${m.hasAlternate}" instead)`;
      console.log(msg);
    }
    console.log();
  }

  // --- (j) Placeholder text ---
  console.log("─── (j) PLACEHOLDER TEXT (contains 'xx' or 'xxx') ───");
  if (summary.placeholderText.length === 0) {
    console.log("  None found.\n");
  } else {
    for (const ph of summary.placeholderText) {
      console.log(`  - [${ph.page}] ${ph.section} at ${ph.path}: "${ph.value.substring(0, 100)}"`);
    }
    console.log();
  }

  // --- (k) Broken URLs ---
  console.log("─── (k) BROKEN OR SUSPICIOUS URLs ───");
  if (summary.brokenUrls.length === 0) {
    console.log("  None found.\n");
  } else {
    // Deduplicate by url
    const seen = new Set();
    for (const b of summary.brokenUrls) {
      const key = `${b.page}|${b.section}|${b.url}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`  - [${b.page}] ${b.section}: ${b.url}`);
      console.log(`    Reason: ${b.reason}`);
    }
    console.log();
  }

  // --- Pages with no sections ---
  if (summary.pagesWithNoSections.length > 0) {
    console.log("─── PAGES WITH NO SECTIONS ───");
    for (const slug of summary.pagesWithNoSections) {
      console.log(`  - ${slug}`);
    }
    console.log();
  }

  // --- Per-page detail ---
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("                    PER-PAGE DETAIL");
  console.log("═══════════════════════════════════════════════════════════════\n");

  // Group issues by page
  const issuesByPage = new Map();
  for (const issue of allIssues) {
    if (!issuesByPage.has(issue.page)) issuesByPage.set(issue.page, []);
    issuesByPage.get(issue.page).push(issue);
  }

  for (const page of pages) {
    const pageIssues = issuesByPage.get(page.slug) || [];
    const marker = pageIssues.length > 0 ? `[${pageIssues.length} issues]` : "[OK]";
    console.log(`  ${page.slug} ${marker}`);
    for (const issue of pageIssues) {
      const sectionInfo = issue.section ? ` (${issue.section})` : "";
      console.log(`    - ${issue.issue}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log(`  AUDIT COMPLETE: ${allIssues.length} total issues across ${issuesByPage.size} pages`);
  console.log("═══════════════════════════════════════════════════════════════\n");
}

main().catch(err => {
  console.error("Audit failed:", err);
  process.exit(1);
});
