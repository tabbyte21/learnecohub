#!/usr/bin/env node
/**
 * Add missing sections to anasayfa page and reorder all sections.
 *
 * Missing sections: piano_showcase, manifesto, impact_banner, testimonials, faq, footer
 *
 * Desired final order:
 *   1. hero
 *   2. stats
 *   3. youtube_showcase
 *   4. materials
 *   5. free_banner
 *   6. piano_showcase      (NEW)
 *   7. video_showcase
 *   8. learning_steps
 *   9. learning_map
 *  10. pricing
 *  11. manifesto            (NEW)
 *  12. team
 *  13. impact_banner        (NEW)
 *  14. testimonials         (NEW)
 *  15. faq                  (NEW)
 *  16. final_cta
 *  17. footer               (NEW)
 */

const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// ─── Content for each missing section (extracted from page.tsx defaults) ───

const pianoShowcaseContent = {
  tag: "İNTERAKTİF VİTRİN",
  title: 'Platformumuzu <span class="text-gradient">keşfedin</span>',
  description: "Her tuşa basın, farklı bir öğrenme deneyimini keşfedin.",
  items: [
    {
      title: "Tanıtım",
      description: "LearnecoHub platformunu yakından tanıyın",
      src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4",
    },
    {
      title: "Etkileşimli",
      description: "Hikayeleştirilmiş animasyon destekli içerikler",
      src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4",
    },
    {
      title: "Güvenlik",
      description: "Çocuklarınız için güvenli dijital ortam",
      src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4",
    },
    {
      title: "Empati",
      description: "Empati becerilerini geliştiren video dersler",
      src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4",
    },
    {
      title: "Duygular",
      description: "Duyguları tanıma ve yönetme stratejileri",
      src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4",
    },
  ],
};

const manifestoContent = {
  tag: "MİSYONUMUZ",
  title: 'Bütünsel bir müfredatla, çocuğunuzu <span class="text-gradient">yaşam becerileriyle</span> güçlendiriyoruz.',
  tabs: [
    {
      label: "Neden Önemli?",
      color: "#1B3A7B",
      bg: "#EBF2FB",
      accent: "#4D7EC4",
      content: "Her anne baba gibi biz de çocuklarımızın iyi okullarda okuyup yüksek notlar almasını isteriz. Ama bir noktada fark ederiz: Hayat sadece sınavlardan ibaret değildir.\n\nZor bir duygu yaşadıklarında, kendilerini yalnız hissettiklerinde ya da bir krizle karşılaştıklarında, çocuklarımızın karşısına çıkan şey bir test değil — hayatın ta kendisidir.\n\nO anlarda onları ayakta tutacak şey; sadece bilgi değil, özgüven, empati, farkındalık ve duygusal dayanıklılık olacaktır.",
    },
    {
      label: "Mevcut Durum",
      color: "#F5C518",
      bg: "#FFFBEB",
      accent: "#FFDF66",
      content: "Bugün Türkiye'de bu becerilere dair hâlâ sistemli, uygulanabilir ve sürdürülebilir bir eğitim modeli yok. Duygusal gelişim, ne yazık ki birçok okulda hâlâ \"ekstra\" bir konu olarak görülüyor.\n\nGeleceğin başarılı insanı, sadece akademik olarak donanımlı değil; aynı zamanda duygusal olarak güçlü, iletişim becerileri yüksek ve zor zamanlarda dirençli birey olacaktır.",
    },
    {
      label: "Çözümümüz",
      color: "#2ECC71",
      bg: "#ECFBF2",
      accent: "#69DC9A",
      content: "Ve biz diyoruz ki: Bu beceriler her çocuğun ve gencin hakkıdır. LearnecoHub olarak, bu eksik halkayı tamamlayan bütünsel bir öğrenme müfredatı sunuyoruz.\n\n• Sosyal-duygusal becerilere dayalı sadeleştirilmiş müfredat\n• Okullara özel içerik ve öğretmen destek sistemi\n• Uzman tutorlar eşliğinde bireysel ve grup uygulamaları\n• Ölçme-değerlendirme ve gelişim takibi\n• Ailelere özel rehberlik ve ev destek araçları",
    },
    {
      label: "Vizyonumuz",
      color: "#7F63CB",
      bg: "#F0EDF9",
      accent: "#9F8AD8",
      content: "Çocukların hem okulda hem evde ulaşabileceği, bilimsel temelli ve kolay uygulanabilir bir sosyal-duygusal öğrenme müfredatı oluşturduk.\n\nAmacımız: Çocuklara yalnızca bilgi değil, yaşamı taşıyacak beceriler kazandırmak.\n\nBugünün çocukları sınavlara hazırlanıyor… Ama biz onları hayata hazırlıyoruz.",
    },
  ],
};

const impactBannerContent = {
  title: 'Çocuğunuzun sosyal ve duygusal becerilerde <span class="highlight">zorlandığını</span> fark ediyor musunuz?',
  description: "Uzman ekibimizle, çocuğunuzun duygusal zeka, iletişim, stres yönetimi, özgüven ve liderlik gibi becerilerini geliştiriyoruz. Çocuğunuzun gelişimi için ilk adımı bugün atın!",
  cta: {
    label: "Ücretsiz Web Seminerine Kaydolun",
    href: "/demo",
  },
};

const testimonialsContent = {
  tag: "REFERANSLAR",
  title: 'Hakkımızda <span class="text-gradient">ne dediler?</span>',
  items: [
    {
      name: "Prof.Dr. Sevgi İrtegün Kandemir",
      role: "Dicle Üniversitesi Tıp Fakültesi",
      quote: "Bu program yalnızca çocuklarımıza değil, bize de çok şey öğretti. Ebeveyn kitlerini düzenli olarak uyguladıkça evde daha sakin, anlayışlı ve destekleyici bir iletişim ortamı kurduk. Tüm aile için bir dönüşüm süreci sundu.",
    },
    {
      name: "Klinik Psikolog Yılmaz Kaplan",
      role: "Munzur Üniversitesi Psikoloji Bölümü",
      quote: "Akademik ve çocuk gelişimi açısından bu kadar yoğun teoriyle şekillenen bir içeriği çocuklara bu kadar sade, anlaşılır ve uygulanabilir şekilde sunmak gerçekten büyük bir emek. Her kurumun altından kalkabileceği bir iş kesinlikle değil.",
    },
    {
      name: "Saliha Öztoprak",
      role: "CORENvision Kurucu",
      quote: "Canlı dersler ve uzman psikologların rehberliğindeki interaktif aktiviteler, çocuğumun sosyal ve duygusal becerilerini hızla geliştirdi. Etkileşimli oyunlar öğrenmeyi eğlenceli hale getiriyor. Gelişim portfolyosu sayesinde ilerlemesini anlık takip edebiliyoruz.",
    },
    {
      name: "Ayşe Demir",
      role: "Veli - 2 Çocuk Annesi",
      quote: "Çocuğumun empati ve iletişim becerilerindeki gelişimi inanılmazdı. Okul arkadaşlarıyla ilişkileri gözle görülür şekilde iyileşti. Artık duygularını çok daha sağlıklı ifade edebiliyor.",
    },
    {
      name: "Mehmet Yılmaz",
      role: "Rehber Öğretmen - Özel Okul",
      quote: "Sıfır hazırlıkla sosyal beceri dersi verebilmek benim için büyük kolaylık. Animasyonlu videolar ve hazır etkinlik setleri sayesinde öğrencilerim derslere aktif katılım sağlıyor. Gelişim raporları velilerle paylaşım için mükemmel.",
    },
    {
      name: "Zeynep Acar",
      role: "Çocuk Psikoloğu",
      quote: "Danışanlarıma terapi süreçleri arasında ev ödevi olarak veriyorum. Bilimsel temelli, yaşa uygun ve etkileşimli olması hem çocukların motivasyonunu artırıyor hem de terapötik süreci destekliyor.",
    },
    {
      name: "Burak Kaya",
      role: "İlkokul Müdürü",
      quote: "Okulumuzda 300 öğrenciyle kullanıyoruz. Kurum paneli sayesinde tüm sınıfları tek ekrandan takip edebiliyoruz. Öğretmenlerimiz hazır müfredatı çok seviyor. Veli memnuniyetinde ciddi artış gördük.",
    },
    {
      name: "Elif Şahin",
      role: "Veli - Lise Öğrenci Annesi",
      quote: "Kızım ergenlik döneminde çok zorlanıyordu. Bu programdaki stres yönetimi ve öz farkındalık modülleri sayesinde hem kendini hem de çevresini daha iyi anlamaya başladı. Sertifika sistemi de motivasyonunu artırdı.",
    },
  ],
};

const faqContent = {
  tag: "SSS",
  title: 'Sıkça Sorulan <span class="highlight">Sorular</span>',
  items: [
    {
      q: "Sosyal ve duygusal beceri müfredatınız gerçekten işe yarıyor mu?",
      a: "Bu soruya kocaman bir evet diyoruz. Tasarladığımız müfredat, 20 yılı aşkın bilimsel araştırmalara ve sosyal-duygusal öğrenme alanındaki uluslararası standartlara dayanıyor. Her beceri; yaş grubuna özel olarak hazırlanmış animasyon videolar, etkileşimli beceri oyunları ve uygulamalı etkinliklerle destekleniyor. Program; empati, öz düzenleme, iletişim, stres yönetimi gibi 100'den fazla sosyal ve duygusal beceriyi sistemli biçimde kazandırmak üzere kurgulandı.",
    },
    {
      q: "Bu program çocuğumun akademik başarısına da katkı sağlar mı?",
      a: "Kesinlikle katkı sağlar. Araştırmalar gösteriyor ki duygularını tanıyan, stresle başa çıkabilen, odaklanma ve öz düzenleme becerisi gelişmiş çocuklar, akademik alanda çok daha başarılı oluyor. Biz önce çocuğun duygusal ve sosyal temellerini güçlendiriyor, ardından bu gücü akademik başarıya ve yaşam becerilerine dönüştürüyoruz.",
    },
    {
      q: "Ders gibi mi yoksa oyun gibi mi?",
      a: "İkisi birden! Öğrenme süreci, hikayeleştirilmiş animasyon videolarla başlıyor, ardından oyunlarla pekiştiriliyor. Çocuklar hem eğleniyor hem de öğrendiklerini kalıcı şekilde içselleştiriyor. Müfredatımız kapsamında çocuklar, ruh sağlığı alanında çalışan uzman eğitmenlerle canlı sosyal beceri grup derslerine katılıyor; grup çalışmalarıyla becerilerini gerçek hayatta uygulama fırsatı buluyor.",
    },
    {
      q: "Evde destekleyici bir ortam oluşturmam gerekiyor mu?",
      a: "Ebeveynler olarak uzun uzun ders anlatmanıza ya da etkinlik hazırlamanıza gerek yok. Çocuğunuzun müfredatımız aracılığıyla öğrendiği sosyal ve duygusal becerileri evde nasıl destekleyebileceğinizi, size özel hazırlanmış basit öneriler ve yazdırılabilir materyallerle sunuyoruz. Aile-çocuk iş birliğini kolaylaştıran, yaşam becerilerini geliştiren zahmetsiz ama etkili bir dijital müfredat sizi bekliyor.",
    },
    {
      q: "Kazanılan beceriler sertifikalandırılıyor mu?",
      a: "Evet, öğrencilerin sosyal-duygusal beceri kazanımları sistemli şekilde takip edilip sertifikalandırılır. Her öğrenci için dijital olarak oluşturulan Gelişim Portfolyosu, tüm süreci görünür ve takip edilebilir hale getirir. Her beceri sonunda gelişim karnesi ve program bitiminde resmi bir başarı sertifikası sunulur. Bu portfolyo, hem yurt içi hem de yurt dışı okul ve program başvurularında çocuğun gelişimini belgeleyen interaktif bir CV niteliği taşır.",
    },
    {
      q: "Müfredatınız hangi aşamalardan oluşuyor?",
      a: "Müfredatımız 6 aşamadan oluşuyor: (1) Tanışma ve Profesyonel Değerlendirme, (2) Asenkron Öğrenme ile kendi hızında başlangıç, (3) 10-12 kişilik canlı grup seansları, (4) Uygulama ve derinleşme görevleri, (5) Ölçme-değerlendirme ve geri bildirim, (6) Aile katılımı ve destekleyici ev ortamı. Tüm süreç boyunca aileler sisteme anlık erişebilir ve çocuğun gelişimini takip edebilir.",
    },
  ],
};

const footerContent = {
  logo: "/logo.png",
  description: "Çocuklar ve gençler için sosyal becerileri öğrenmenin en kolay yolu. Hazırlık gerekmeden hemen kullanabileceğiniz dijital müfredat.",
  socials: [
    { platform: "facebook", href: "https://www.facebook.com/learnecohub" },
    { platform: "instagram", href: "https://www.instagram.com/learnecohub" },
    { platform: "youtube", href: "https://www.youtube.com/@learnecohub" },
    { platform: "linkedin", href: "https://www.linkedin.com/company/learnecohub" },
  ],
  menuTitle: "Site Menü",
  menuLinks: [
    { label: "Ana Sayfa", href: "/" },
    { label: "Misyonumuz", href: "/misyonumuz" },
    { label: "Ekibimiz", href: "/ekibimiz" },
    { label: "Platform", href: "/platform" },
    { label: "Blog", href: "/blog" },
    { label: "SSS", href: "/sss" },
    { label: "İletişim", href: "/iletisim" },
  ],
  col2Title: "Çözümlerimiz",
  col2Links: [
    { label: "Aileler İçin", href: "/aileler-icin" },
    { label: "Profesyoneller İçin", href: "/profesyoneller-icin" },
    { label: "Okullar İçin", href: "/okullar-icin" },
    { label: "Kurumlar İçin", href: "/kurumlar-icin" },
    { label: "Başarı Hikayeleri", href: "/basari-hikayeleri" },
  ],
  companyName: "Learneco Eğitim ve Danışmanlık",
  address: "İstanbul, Başakşehir",
  phone: "0850 302 36 00",
  phoneHref: "tel:+908503023600",
  email: "info@learnecohub.com",
  hours: "Pazartesi - Pazar / 09.00 - 21.00",
  copyright: "© 2026 LearnecoHub. Tüm hakları saklıdır.",
  legalLinks: [
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
    { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
    { label: "KVKK", href: "/kvkk" },
  ],
};

// ─── Sections to create ───
const newSections = [
  {
    sectionType: "piano_showcase",
    title: "Piyano Vitrin",
    content: JSON.stringify(pianoShowcaseContent),
  },
  {
    sectionType: "manifesto",
    title: "Manifesto",
    content: JSON.stringify(manifestoContent),
  },
  {
    sectionType: "impact_banner",
    title: "Etki Bannerı",
    content: JSON.stringify(impactBannerContent),
  },
  {
    sectionType: "testimonials",
    title: "Referanslar",
    content: JSON.stringify(testimonialsContent),
  },
  {
    sectionType: "faq",
    title: "Sıkça Sorulan Sorular",
    content: JSON.stringify(faqContent),
  },
  {
    sectionType: "footer",
    title: "Footer",
    content: JSON.stringify(footerContent),
  },
];

// ─── Desired final order (sectionType list) ───
const DESIRED_ORDER = [
  "hero",            // 1
  "stats",           // 2
  "youtube_showcase",// 3
  "materials",       // 4  (might also be materials_scroll)
  "free_banner",     // 5
  "piano_showcase",  // 6
  "video_showcase",  // 7
  "learning_steps",  // 8
  "learning_map",    // 9
  "pricing",         // 10
  "manifesto",       // 11
  "team",            // 12  (might also be team_grid)
  "impact_banner",   // 13
  "testimonials",    // 14
  "faq",             // 15  (might also be faq_parents)
  "final_cta",       // 16
  "footer",          // 17
];

// Aliases: the DB may have different names for some section types
const TYPE_ALIASES = {
  materials_scroll: "materials",
  team_grid: "team",
  faq_parents: "faq",
};

async function main() {
  console.log("=== Add Missing Anasayfa Sections ===\n");

  // 1. Fetch current anasayfa page
  console.log("Fetching anasayfa page...");
  const pageRes = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
  if (!pageRes.ok) {
    console.error("Failed to fetch anasayfa:", pageRes.status, await pageRes.text());
    process.exit(1);
  }
  const page = await pageRes.json();
  console.log(`Found ${page.sections?.length || 0} existing sections.\n`);

  // Build a map of existing sectionTypes
  const existingTypes = new Set();
  for (const s of page.sections || []) {
    existingTypes.add(s.sectionType);
    // Also add canonical name if it's an alias
    const canonical = TYPE_ALIASES[s.sectionType];
    if (canonical) existingTypes.add(canonical);
  }

  console.log("Existing types:", [...existingTypes].join(", "));
  console.log("");

  // 2. Create missing sections
  const createdIds = {};
  for (const sec of newSections) {
    if (existingTypes.has(sec.sectionType)) {
      console.log(`SKIP: ${sec.sectionType} already exists.`);
      continue;
    }

    console.log(`CREATING: ${sec.sectionType} — "${sec.title}"...`);
    const res = await fetch(`${ADMIN}/api/sayfalar/anasayfa/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        sectionType: sec.sectionType,
        title: sec.title,
        content: sec.content,
      }),
    });

    if (!res.ok) {
      console.error(`  FAILED: ${res.status}`, await res.text());
    } else {
      const result = await res.json();
      createdIds[sec.sectionType] = result.id;
      console.log(`  OK: id=${result.id}`);
    }
  }

  console.log("\n--- Creation phase complete ---\n");

  // 3. Re-fetch page to get all sections including newly created ones
  console.log("Re-fetching anasayfa for reordering...");
  const page2Res = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
  const page2 = await page2Res.json();
  const allSections = page2.sections || [];

  console.log(`Total sections now: ${allSections.length}\n`);

  // Build lookup: canonical type -> section object
  // For alias types, map them to their canonical name
  const typeToSection = {};
  for (const s of allSections) {
    const canonical = TYPE_ALIASES[s.sectionType] || s.sectionType;
    // Prefer the first occurrence (avoid duplicates)
    if (!typeToSection[canonical]) {
      typeToSection[canonical] = s;
    }
    // Also keep original type mapping
    if (!typeToSection[s.sectionType]) {
      typeToSection[s.sectionType] = s;
    }
  }

  // 4. Build ordered ID list for reordering
  const orderedIds = [];
  const orderedLog = [];
  for (let i = 0; i < DESIRED_ORDER.length; i++) {
    const type = DESIRED_ORDER[i];
    const section = typeToSection[type];
    if (section) {
      orderedIds.push(section.id);
      orderedLog.push(`  ${i + 1}. ${section.sectionType} (id: ${section.id})`);
    } else {
      console.warn(`  WARNING: No section found for type "${type}" — skipping in order.`);
    }
  }

  // Also include any sections NOT in our desired order at the end (partner_logos etc.)
  const orderedSet = new Set(orderedIds);
  for (const s of allSections) {
    if (!orderedSet.has(s.id)) {
      orderedIds.push(s.id);
      orderedLog.push(`  ${orderedIds.length}. ${s.sectionType} (id: ${s.id}) [extra]`);
    }
  }

  console.log("Desired order:");
  orderedLog.forEach((l) => console.log(l));
  console.log("");

  // 5. Apply reorder via PUT on the sections endpoint
  console.log("Applying reorder...");
  const reorderRes = await fetch(`${ADMIN}/api/sayfalar/anasayfa/sections`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderedIds }),
  });

  if (!reorderRes.ok) {
    console.error("Reorder FAILED:", reorderRes.status, await reorderRes.text());
    // Fallback: update each section order individually
    console.log("\nFalling back to individual order updates...");
    for (let i = 0; i < orderedIds.length; i++) {
      const res = await fetch(`${ADMIN}/api/sayfalar/anasayfa/sections/${orderedIds[i]}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: i + 1 }),
      });
      const status = res.ok ? "OK" : "FAIL";
      console.log(`  ${i + 1}. ${orderedIds[i]} -> order ${i + 1} (${status})`);
    }
  } else {
    console.log("Reorder OK!");
  }

  // 6. Final verification
  console.log("\n=== FINAL VERIFICATION ===\n");
  const verifyRes = await fetch(`${ADMIN}/api/sayfalar/anasayfa`);
  const verified = await verifyRes.json();
  console.log(`Page: ${verified.title} (${verified.slug})`);
  console.log(`Total sections: ${verified.sections?.length}\n`);

  const sorted = (verified.sections || []).sort((a, b) => a.order - b.order);
  for (const s of sorted) {
    let contentPreview = "";
    try {
      const c = JSON.parse(s.content || "{}");
      contentPreview = c.title || c.tag || "(no title)";
      if (contentPreview.length > 60) contentPreview = contentPreview.slice(0, 60) + "...";
    } catch {
      contentPreview = "(parse error)";
    }
    console.log(`  ${String(s.order).padStart(2)}. ${s.sectionType.padEnd(20)} | ${contentPreview}`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
