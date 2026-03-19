const ADMIN = "https://learnecohub-admin-production.up.railway.app";

async function updateSection(slug, sectionId, content) {
  const res = await fetch(`${ADMIN}/api/sayfalar/${slug}/sections/${sectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: JSON.stringify(content) }),
  });
  if (!res.ok) {
    console.error(`FAIL: ${slug}/${sectionId}`, res.status, await res.text());
    return false;
  }
  console.log(`OK: ${slug} / ${sectionId}`);
  return true;
}

// 1. sinif-seviyeleri/skill_areas — add descriptions and icons
await updateSection("sinif-seviyeleri", "cmm81bk4e005fpa3w46nar8qg", {
  title: "Sınıf Seviyelerine Göre",
  titleHighlight: "İçerik Haritası",
  items: [
    {
      title: "Anasınıfı (5-6 yaş)",
      icon: "Heart",
      color: "#2ECC71",
      description: "Temel duygu tanıma, paylaşım, sıra bekleme ve basit empati becerileri. Hikâye temelli animasyonlarla öğrenme."
    },
    {
      title: "1-2. Sınıf (6-8 yaş)",
      icon: "Sparkles",
      color: "#EE7A45",
      description: "Duyguları ifade etme, arkadaşlık becerileri, öz kontrol ve temel iletişim yetkinlikleri. Oyun temelli aktiviteler."
    },
    {
      title: "3-4. Sınıf (8-10 yaş)",
      icon: "Users",
      color: "#7F63CB",
      description: "Empati geliştirme, takım çalışması, çatışma çözme ve sosyal farkındalık. Grup projeleri ve rol yapma etkinlikleri."
    },
    {
      title: "5-6. Sınıf (10-12 yaş)",
      icon: "Target",
      color: "#F5C518",
      description: "Öz yönetim, hedef belirleme, stres yönetimi ve eleştirel düşünme. Senaryoya dayalı karar verme egzersizleri."
    },
    {
      title: "7-8. Sınıf (12-14 yaş)",
      icon: "Shield",
      color: "#1B3A7B",
      description: "Dijital vatandaşlık, akran baskısıyla başa çıkma, liderlik ve ileri empati becerileri. Tartışma ve münazara."
    },
    {
      title: "9-12. Sınıf (14-18 yaş)",
      icon: "GraduationCap",
      color: "#2ECC71",
      description: "Kariyer planlama, ileri sosyal beceriler, toplumsal sorumluluk ve etik karar verme. Mentorluk ve topluluk projeleri."
    }
  ]
});

// 2. yetkinlik-alanlarimiz/skill_areas — add descriptions and icons
await updateSection("yetkinlik-alanlarimiz", "cmm81bjdf0056pa3wk0m61oe4", {
  title: "CASEL Çerçevesinde",
  titleHighlight: "5 Temel Yetkinlik",
  items: [
    {
      title: "Öz Farkındalık",
      icon: "Eye",
      color: "#1B3A7B",
      description: "Kendi duygularını, düşüncelerini ve değerlerini tanıma. Güçlü yönlerini ve gelişim alanlarını keşfetme becerisi."
    },
    {
      title: "Öz Yönetim",
      icon: "Target",
      color: "#2ECC71",
      description: "Duyguları düzenleme, stresle başa çıkma, öz motivasyon ve kişisel hedefler belirleme ile bu hedeflere ulaşma becerisi."
    },
    {
      title: "Sosyal Farkındalık",
      icon: "Globe",
      color: "#7F63CB",
      description: "Farklı bakış açılarını anlama, empati kurma, çeşitliliğe saygı gösterme ve toplumsal normlara uygun davranma."
    },
    {
      title: "İlişki Becerileri",
      icon: "Users",
      color: "#EE7A45",
      description: "Etkili iletişim kurma, iş birliği yapma, çatışmaları yapıcı şekilde çözme ve sağlıklı ilişkiler kurma becerisi."
    },
    {
      title: "Sorumlu Karar Verme",
      icon: "CheckCircle2",
      color: "#F5C518",
      description: "Etik ve güvenlik standartlarını gözeterek seçimler yapma, sonuçları değerlendirme ve bilinçli kararlar verme."
    }
  ]
});

console.log("\nAll content fixes applied!");
