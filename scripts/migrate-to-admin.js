/**
 * Eski frontend dev.db → Admin learneco.db migration
 * Section.type → PageSection.sectionType
 * Section.data → PageSection.content
 */
const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const cuid = () => {
  const ts = Date.now().toString(36);
  const rnd = crypto.randomBytes(8).toString("hex").slice(0, 12);
  return "cm" + ts + rnd;
};

const OLD_DB = path.resolve(__dirname, "../../learneco-backup-20260228-161424/dev.db");
const ADMIN_DB = path.resolve(__dirname, "../../learneco-admin/data/learneco.db");

const oldDb = new Database(OLD_DB, { readonly: true });
const adminDb = new Database(ADMIN_DB);

// Get existing admin pages
const existingPages = adminDb.prepare("SELECT slug FROM Page").all().map(p => p.slug);
console.log("Admin'de mevcut sayfalar:", existingPages.join(", "));

// Get old pages
const oldPages = oldDb.prepare("SELECT * FROM Page ORDER BY title").all();

const insertPage = adminDb.prepare(`
  INSERT INTO Page (id, slug, title, createdAt, updatedAt)
  VALUES (?, ?, ?, datetime('now'), datetime('now'))
`);

const insertSection = adminDb.prepare(`
  INSERT INTO PageSection (id, pageId, sectionType, title, "order", visible, content, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, 1, ?, datetime('now'), datetime('now'))
`);

const updateSection = adminDb.prepare(`
  UPDATE PageSection SET sectionType = ?, title = ?, "order" = ?, content = ?, updatedAt = datetime('now')
  WHERE id = ?
`);

const deleteSections = adminDb.prepare("DELETE FROM PageSection WHERE pageId = ?");
const deletePage = adminDb.prepare("DELETE FROM Page WHERE slug = ?");

// Section type name mapping
const typeToTitle = {
  hero: "Hero",
  subpage_hero: "Hero",
  mission: "Misyon",
  student_features: "Öğrenci Özellikleri",
  teacher_tools: "Öğretmen Araçları",
  school_features: "Okul Özellikleri",
  family_features: "Aile Özellikleri",
  skill_areas: "Beceri Alanları",
  stats: "İstatistikler",
  bento_grid: "Özellikler",
  faq: "SSS",
  faq_parents: "Veli SSS",
  blog_list: "Blog Listesi",
  contact_form: "İletişim Formu",
  badge_collection: "Rozet Koleksiyonu",
  free_banner: "Ücretsiz Banner",
  final_cta: "Son CTA",
  testimonials: "Referanslar",
  team_grid: "Ekibimiz",
  youtube_showcase: "YouTube Tanıtım",
  materials_scroll: "Materyaller",
  video_showcase: "Video Dersler",
  learning_steps: "Öğrenme Adımları",
  learning_map: "Öğrenme Haritası",
  pricing: "Fiyatlandırma",
  team: "Ekibimiz",
  materials: "Materyaller",
  badge_stats: "Rozet İstatistikleri",
  badge_gallery: "Rozet Galerisi",
};

let created = 0;
let updated = 0;
let skipped = 0;

adminDb.exec("BEGIN TRANSACTION");

try {
  for (const page of oldPages) {
    const oldSections = oldDb.prepare('SELECT * FROM Section WHERE pageId = ? ORDER BY "order"').all(page.id);

    if (existingPages.includes(page.slug)) {
      // Page exists in admin - update sections
      const adminPage = adminDb.prepare("SELECT id FROM Page WHERE slug = ?").get(page.slug);

      // Delete existing sections
      deleteSections.run(adminPage.id);

      // Insert sections from old DB
      for (const s of oldSections) {
        const newId = cuid();
        const title = typeToTitle[s.type] || s.type;
        insertSection.run(newId, adminPage.id, s.type, title, s.order, s.data || "{}");
      }

      // Update page title
      adminDb.prepare("UPDATE Page SET title = ?, updatedAt = datetime('now') WHERE slug = ?").run(page.title, page.slug);

      updated++;
      console.log(`✓ Güncellendi: ${page.slug} (${page.title}) - ${oldSections.length} section`);
    } else {
      // Create new page
      const newPageId = cuid();
      insertPage.run(newPageId, page.slug, page.title);

      for (const s of oldSections) {
        const newId = cuid();
        const title = typeToTitle[s.type] || s.type;
        insertSection.run(newId, newPageId, s.type, title, s.order, s.data || "{}");
      }

      created++;
      console.log(`+ Oluşturuldu: ${page.slug} (${page.title}) - ${oldSections.length} section`);
    }
  }

  // Delete junk pages
  const junkSlugs = ["asdfasdf"];
  for (const slug of junkSlugs) {
    const p = adminDb.prepare("SELECT id FROM Page WHERE slug = ?").get(slug);
    if (p) {
      deleteSections.run(p.id);
      deletePage.run(slug);
      console.log(`✕ Silindi: ${slug}`);
    }
  }

  adminDb.exec("COMMIT");
  console.log(`\nToplam: ${created} oluşturuldu, ${updated} güncellendi`);
} catch (err) {
  adminDb.exec("ROLLBACK");
  console.error("HATA:", err);
}

oldDb.close();
adminDb.close();
