#!/usr/bin/env node
/**
 * Fix akademik-yaklasimimiz skill_areas section:
 * - Set title to "Öğrenme Döngüsü Adımları"
 * - Add meaningful descriptions to each item (Keşfet, Anla, Uygula, Pekiştir, Değerlendir, Paylaş)
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

async function main() {
  console.log("Fetching akademik-yaklasimimiz page...");
  const res = await fetch(`${ADMIN}/api/sayfalar/akademik-yaklasimimiz`);
  if (!res.ok) {
    console.error("Page fetch failed:", res.status);
    process.exit(1);
  }
  const page = await res.json();

  const skillSection = page.sections.find(s => s.sectionType === "skill_areas");
  if (!skillSection) {
    console.error("skill_areas section not found!");
    console.log("Available sections:", page.sections.map(s => `${s.sectionType} (${s.id})`).join(", "));
    process.exit(1);
  }

  console.log("Found skill_areas section:", skillSection.id);
  console.log("Current title:", skillSection.title);

  const parsed = typeof skillSection.content === "string"
    ? JSON.parse(skillSection.content)
    : skillSection.content;

  console.log("Current items count:", parsed.items?.length || 0);

  // New content with meaningful descriptions
  const fixedContent = {
    title: "Öğrenme Döngüsü Adımları",
    items: [
      {
        icon: "Search",
        title: "Keşfet",
        description: "Merak uyandıran hikâyeler, senaryolar ve deneyimlerle konuya ilk adımı at. Farkındalık çalışmalarıyla öğrenmeye hazırlan.",
        color: "peach"
      },
      {
        icon: "BookOpen",
        title: "Anla",
        description: "Animasyonlar, uzman videoları ve dijital içeriklerle becerinin teorik temelini kavra. Bilimsel çerçeveyi öğren.",
        color: "brand"
      },
      {
        icon: "Gamepad2",
        title: "Uygula",
        description: "Etkileşimli oyunlar, rol yapma etkinlikleri ve grup çalışmalarıyla öğrendiğin beceriyi güvenli ortamda dene.",
        color: "mint"
      },
      {
        icon: "Target",
        title: "Pekiştir",
        description: "Çalışma sayfaları, tekrar egzersizleri ve bireysel görevlerle beceriyi kalıcı hale getir. Tekrarla güçlendir.",
        color: "lavender"
      },
      {
        icon: "BarChart3",
        title: "Değerlendir",
        description: "Öz değerlendirme araçları, akran geri bildirimi ve öğretmen gözlemleriyle gelişimini ölç ve takip et.",
        color: "gold"
      },
      {
        icon: "Users",
        title: "Paylaş",
        description: "Öğrendiklerini arkadaşlarınla, ailenle ve çevrenle paylaş. Becerini gerçek hayata aktar ve topluma katkı sağla.",
        color: "mint"
      }
    ]
  };

  const contentStr = JSON.stringify(fixedContent);

  console.log("\nUpdating section...");
  const putRes = await fetch(`${ADMIN}/api/sayfalar/akademik-yaklasimimiz/sections/${skillSection.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Öğrenme Döngüsü Adımları",
      visible: skillSection.visible,
      content: contentStr,
    }),
  });

  if (!putRes.ok) {
    console.error("PUT failed:", putRes.status, await putRes.text());
    process.exit(1);
  }

  console.log("PUT status:", putRes.status, "✓");

  // Verify
  const verifyRes = await fetch(`${ADMIN}/api/sayfalar/akademik-yaklasimimiz`);
  const verified = await verifyRes.json();
  const verifiedSection = verified.sections.find(s => s.sectionType === "skill_areas");
  const verifiedParsed = JSON.parse(verifiedSection.content);
  console.log("\n=== Verified title:", verifiedParsed.title);
  console.log("=== Verified items:");
  verifiedParsed.items.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title}: ${item.description.substring(0, 50)}...`);
  });
  console.log("\n✅ skill_areas section fixed successfully!");
}

main().catch(console.error);
