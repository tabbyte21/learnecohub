const ADMIN = "https://learnecohub-admin-production.up.railway.app";

async function updateSection(slug, sectionId, content) {
  const res = await fetch(`${ADMIN}/api/sayfalar/${slug}/sections/${sectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ content: JSON.stringify(content) }),
  });
  console.log(`${slug}/${sectionId}: ${res.ok ? "OK" : "FAIL " + res.status}`);
}

// 1. anasayfa hero — fix "xx" in title
let r = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
let page = await r.json();

for (const s of page.sections) {
  const c = JSON.parse(s.content || "{}");

  if (s.sectionType === "hero") {
    // "Sosyal ve duygusal becerileri öğrencilere kazandırmanın xx" -> proper title
    c.title = "Sosyal ve duygusal becerileri öğrencilere kazandırmanın";
    c.titleHighlight = "en etkili yolu.";
    await updateSection("anasayfa", s.id, c);
  }

  if (s.sectionType === "video_showcase") {
    // "Hikâyeleştirilmiş xxx" -> proper title
    c.title = "Hikâyeleştirilmiş";
    c.titleHighlight = "video derslerimiz.";
    await updateSection("anasayfa", s.id, c);
  }
}

// 2. aileler-icin family_features — fix "xx" placeholders in descriptions
r = await fetch(`${ADMIN}/api/sayfalar/aileler-icin`);
page = await r.json();

for (const s of page.sections) {
  if (s.sectionType === "family_features") {
    const c = JSON.parse(s.content);
    // Fix items with "xx" at end of descriptions
    const fixes = {
      "Gelişim Takibi": "Çocuğunuzun ilerlemesini detaylı raporlarla takip edin ve gelişim alanlarını belirleyin.",
      "Uzman Rehberlik": "Psikolog ve pedagoglardan kişisel rehberlik alın, sorularınıza profesyonel yanıtlar bulun.",
      "Güvenli Platform": "KVKK uyumlu, çocuk dostu dijital ortamda güvenle öğrenme deneyimi yaşayın.",
      "Aile Birliği": "Aile içi iletişimi güçlendiren aktivitelerle birlikte kaliteli zaman geçirin.",
    };
    c.items = c.items.map(item => {
      if (fixes[item.title]) {
        item.description = fixes[item.title];
      }
      return item;
    });
    // Also add title if missing
    if (!c.title) {
      c.title = "Aileler İçin";
      c.titleHighlight = "Neler Sunuyoruz?";
    }
    await updateSection("aileler-icin", s.id, c);
  }
}

// 3. Add final_cta to demo, iletisim, sss pages
const ctaContent = {
  demo: {
    title: 'Hemen <span class="text-[#F5C518]">başlayın.</span>',
    description: "Demo talebinizi oluşturduktan sonra ekibimiz sizinle en kısa sürede iletişime geçecektir.",
    cta: { label: "Bizi Arayın", href: "tel:+905319529496" },
    badges: [{ text: "Ücretsiz demo" }, { text: "30 dakika" }, { text: "Canlı sunum" }],
  },
  iletisim: {
    title: 'Birlikte <span class="text-[#F5C518]">çalışalım.</span>',
    description: "Sorularınız için bizimle iletişime geçin, size en uygun çözümü birlikte bulalım.",
    cta: { label: "Demo Talep Et", href: "/demo" },
    badges: [{ text: "Hızlı yanıt" }, { text: "Uzman destek" }, { text: "Ücretsiz danışmanlık" }],
  },
  sss: {
    title: 'Başka sorunuz mu <span class="text-[#F5C518]">var?</span>',
    description: "Aradığınız cevabı bulamadıysanız bizimle iletişime geçin.",
    cta: { label: "İletişime Geç", href: "/iletisim" },
    badges: [{ text: "7/24 destek" }, { text: "Hızlı yanıt" }],
  },
};

for (const [slug, content] of Object.entries(ctaContent)) {
  const r = await fetch(`${ADMIN}/api/sayfalar/${slug}`);
  const p = await r.json();
  const hasCta = p.sections.some(s => s.sectionType === "final_cta");
  if (!hasCta) {
    const maxOrder = Math.max(...p.sections.map(s => s.order), 0);
    const res = await fetch(`${ADMIN}/api/sayfalar/${slug}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        sectionType: "final_cta",
        title: "Final CTA",
        order: maxOrder + 1,
        content: JSON.stringify(content),
      }),
    });
    console.log(`Added final_cta to ${slug}: ${res.ok ? "OK" : "FAIL"}`);
  } else {
    console.log(`${slug} already has final_cta`);
  }
}

console.log("\nAll placeholder fixes applied!");
