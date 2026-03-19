const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Fix the piano_showcase section that was created with encoding issues
const sectionId = "cmmhzn1hg000sqr3wk4o3stw2";

const content = {
  title: "İnteraktif",
  titleHighlight: "öğrenme deneyimi.",
  description: "Piyano tuşlarına tıklayarak her beceri alanının içeriğini keşfedin.",
  items: [
    {
      title: "Empati",
      description: "Başkalarının duygularını anlama ve paylaşma becerisi. Hikaye temelli videolar ve rol yapma etkinlikleriyle empati geliştirin.",
      color: "#EE7A45",
      videoId: "GcjqT6zb1Ts"
    },
    {
      title: "İletişim",
      description: "Etkili dinleme, kendini ifade etme ve diyalog kurma becerileri. Animasyonlu dersler ve interaktif oyunlarla iletişim becerilerini güçlendirin.",
      color: "#2ECC71",
      videoId: "GcjqT6zb1Ts"
    },
    {
      title: "Öz Farkındalık",
      description: "Kendi duygularını tanıma, güçlü yönlerini bilme ve özgüven geliştirme. Meditasyon ve farkındalık çalışmalarıyla öz farkındalığı artırın.",
      color: "#7F63CB",
      videoId: "GcjqT6zb1Ts"
    },
    {
      title: "Takım Çalışması",
      description: "İş birliği yapma, sorumluluk paylaşma ve ortak hedeflere ulaşma becerisi. Grup projeleri ve takım oyunlarıyla güçlendirin.",
      color: "#1B3A7B",
      videoId: "GcjqT6zb1Ts"
    },
    {
      title: "Öz Yönetim",
      description: "Duygu kontrolü, hedef belirleme ve motivasyon yönetimi. Nefes teknikleri ve planlama araçlarıyla öz yönetim becerilerini geliştirin.",
      color: "#F5C518",
      videoId: "GcjqT6zb1Ts"
    }
  ]
};

// Update the section content with proper encoding
const res = await fetch(`${ADMIN}/api/sayfalar/anasayfa/sections/${sectionId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ content: JSON.stringify(content), order: 5 }),
});

if (res.ok) {
  console.log("Piano section fixed with proper encoding and moved to order 5");
} else {
  console.error("Failed:", res.status, await res.text());
}

// Verify
const verifyRes = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
const page = await verifyRes.json();
console.log("\nAnasayfa sections after fix:");
page.sections.sort((a, b) => a.order - b.order).forEach(s => {
  console.log(s.order + ". " + s.sectionType + " | " + (JSON.parse(s.content || "{}").title || "(no title)"));
});
