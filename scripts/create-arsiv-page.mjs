#!/usr/bin/env node
/**
 * Create "Arşiv" page with sections: subpage_hero, pdf_archive, final_cta
 * Uses the admin API to create the page and sections.
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

async function main() {
  // 1. Check if arsiv page already exists
  console.log("Checking if arsiv page exists...");
  const checkRes = await fetch(`${ADMIN}/api/sayfalar/arsiv`);
  if (checkRes.ok) {
    const existing = await checkRes.json();
    console.log("Arsiv page already exists with", existing.sections?.length, "sections.");
    console.log("Sections:", existing.sections?.map(s => s.sectionType).join(", "));
    console.log("Skipping creation. Delete it first if you want to recreate.");
    return;
  }

  // 2. Create the page
  console.log("Creating arsiv page...");
  const createRes = await fetch(`${ADMIN}/api/sayfalar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: "arsiv",
      title: "Arşiv",
    }),
  });

  if (!createRes.ok) {
    console.error("Page creation failed:", createRes.status, await createRes.text());
    process.exit(1);
  }

  const page = await createRes.json();
  console.log("Page created:", page.id);

  // 3. Create sections
  const sections = [
    {
      sectionType: "subpage_hero",
      title: "Arşiv Hero",
      content: JSON.stringify({
        breadcrumb: "Arşiv",
        tag: "ARŞİV",
        tagIcon: "FileText",
        title: "Materyal",
        titleHighlight: "Kütüphanesi",
        description: "Eğitim materyallerimizi indirin, sınıfınızda veya evinizde kullanın. Tüm dökümanlar PDF formatında sunulmaktadır.",
        theme: "lavender",
      }),
    },
    {
      sectionType: "pdf_archive",
      title: "PDF Arşivi",
      content: JSON.stringify({
        title: "İndirilebilir Materyaller",
        description: "Sosyal beceri eğitim materyallerimizi aşağıdan indirebilirsiniz. Tüm dökümanlar yazdırılabilir PDF formatındadır.",
        folderName: "arsiv",
      }),
    },
    {
      sectionType: "final_cta",
      title: "Son CTA",
      content: JSON.stringify({
        title: "Daha fazla materyal mi <span class=\"text-[#F5C518]\">istiyorsunuz?</span>",
        description: "LearnecoHub platformuna kayıt olarak tüm dijital içeriklere, video derslere ve etkileşimli materyallere erişebilirsiniz.",
        cta: { label: "Hemen Başla", href: "https://lms.learnecohub.com/login/index.php" },
        phone: { label: "0531 952 94 96", href: "tel:+905319529496" },
        badges: [
          { text: "Ücretsiz başlangıç" },
          { text: "Kredi kartı gerekmiyor" },
          { text: "Anında erişim" },
        ],
      }),
    },
  ];

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    console.log(`Creating section ${i + 1}/${sections.length}: ${sec.sectionType}...`);
    const secRes = await fetch(`${ADMIN}/api/sayfalar/arsiv/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sectionType: sec.sectionType,
        title: sec.title,
        content: sec.content,
      }),
    });

    if (!secRes.ok) {
      console.error(`Section ${sec.sectionType} creation failed:`, secRes.status, await secRes.text());
    } else {
      const result = await secRes.json();
      console.log(`  ✓ Created: ${result.id}`);
    }
  }

  // 4. Verify
  console.log("\nVerifying...");
  const verifyRes = await fetch(`${ADMIN}/api/sayfalar/arsiv`);
  const verified = await verifyRes.json();
  console.log("Page:", verified.title, `(${verified.slug})`);
  console.log("Sections:");
  verified.sections?.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.sectionType} — ${s.title}`);
  });

  console.log("\n✅ Arsiv page created successfully!");
}

main().catch(console.error);
