import pg from "pg";
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    // Find hakkimizda page
    const pageRes = await client.query(`SELECT id FROM "Page" WHERE slug = 'hakkimizda'`);
    if (pageRes.rows.length === 0) { console.log("hakkimizda page not found"); return; }
    const pageId = pageRes.rows[0].id;

    // Check if photo_album exists
    const existRes = await client.query(
      `SELECT id FROM "PageSection" WHERE "pageId" = $1 AND "sectionType" = 'photo_album'`,
      [pageId]
    );
    if (existRes.rows.length > 0) { console.log("photo_album already exists:", existRes.rows[0].id); return; }

    // Get hero order
    const heroRes = await client.query(
      `SELECT "order" FROM "PageSection" WHERE "pageId" = $1 AND "sectionType" = 'subpage_hero'`,
      [pageId]
    );
    const heroOrder = heroRes.rows[0]?.order ?? 0;

    // Shift sections after hero
    await client.query(
      `UPDATE "PageSection" SET "order" = "order" + 1 WHERE "pageId" = $1 AND "order" > $2`,
      [pageId, heroOrder]
    );

    // Create photo_album section
    const content = JSON.stringify({
      tag: "ALBÜM",
      title: "Eğitimlerimizden",
      titleHighlight: "Kareler",
      description: "Çocuklarla gerçekleştirdiğimiz sosyal-duygusal beceri eğitimlerinden anlar.",
      images: [],
    });

    const id = "cuid_photo_album_" + Date.now();
    const res = await client.query(
      `INSERT INTO "PageSection" (id, "pageId", "sectionType", title, "order", visible, content, "createdAt", "updatedAt")
       VALUES ($1, $2, 'photo_album', 'Eğitimlerimizden Kareler', $3, true, $4, NOW(), NOW())
       RETURNING id`,
      [id, pageId, heroOrder + 1, content]
    );
    console.log("photo_album section created:", res.rows[0].id);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
