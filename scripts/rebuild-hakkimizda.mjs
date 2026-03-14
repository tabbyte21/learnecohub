// Rebuild hakkımızda page from scratch
import https from "https";

const ADMIN = "https://learnecohub-admin-production.up.railway.app";

function req(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const u = new URL(`${ADMIN}${path}`);
    const opts = {
      hostname: u.hostname, port: 443, path: u.pathname, method,
      headers: { "Content-Type": "application/json" },
    };
    if (data) opts.headers["Content-Length"] = Buffer.byteLength(data);
    const r = https.request(opts, (res) => {
      let b = "";
      res.on("data", (c) => (b += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(b) }); }
        catch { resolve({ status: res.statusCode, data: b }); }
      });
    });
    r.on("error", reject);
    if (data) r.write(data);
    r.end();
  });
}

const ALL_IDS = [
  "cmmqeke5a000bpl3y5qcuep7c","cmmqekese000dpl3y8uyh6vv2","cmmqekfa5000fpl3yl5wa1okw",
  "cmmqekhcq000npl3y6xya3b5h","cmmqekhvi000ppl3yuzyejcft","cmmqekixp000tpl3yy9pokb9x",
  "cmmqekjz2000xpl3ycoyljnds","cmmqekkhs000zpl3y3pkgja19","cmmqekm1p0015pl3y1kivu271",
  "cmmqekn1o0019pl3ywolkgvpe","cmmqeknig001bpl3ypkc9q8r0","cmmqekokn001fpl3yx4ihu6wv",
  "cmmqeko14001dpl3ymqfdpopx","cmmqekp92001hpl3ynmnchbjk",
  // Hidden ones
  "cmmqekliv0013pl3yyh463oah","cmmqekgth000lpl3yb6jifsye","cmmqekkzo0011pl3yzuzr04m3",
  "cmmqekmhs0017pl3y1p00dgsc","cmmqekgb3000jpl3ybpydv62m","cmmqekjg3000vpl3yqp0g37qq",
  "cmmqekfss000hpl3yjl58x7vd","cmmqekif8000rpl3yusa9x9l7",
];

// ═══ NEW SECTIONS ═══
const newSections = [
  // 1. HERO
  {
    sectionType: "subpage_hero",
    title: "Hakkımızda Hero",
    content: JSON.stringify({
      breadcrumb: "Hakkımızda",
      tag: "HAKKIMIZDA",
      tagIcon: "Heart",
      title: "Bizi Yakından",
      titleHighlight: "Tanıyın",
      description: "Çocukların sosyal-duygusal gelişimini bilimsel temelli, etkileşimli ve ölçülebilir yöntemlerle destekliyoruz. Misyonumuz, ekibimiz ve başarı hikayelerimizi keşfedin.",
      theme: "brand",
    }),
  },

  // 2. MİSYONUMUZ — mission (ClipboardSection)
  {
    sectionType: "mission",
    title: "Misyonumuz",
    content: JSON.stringify({
      icon: "Heart",
      title: "Çocuğunuzu yaşam becerileriyle",
      titleHighlight: "güçlendiriyoruz.",
      content: "LearnecoHub olarak her çocuğun empati, iletişim, öz farkındalık ve işbirliği gibi temel yaşam becerilerine erişebilmesini sağlıyoruz. Bilimsel temelli müfredatımız, sosyal-duygusal becerileri oyun, animasyon ve etkileşimli içeriklerle çocuklara kazandırır.",
      checklist: [
        "Sosyal-duygusal becerilere dayalı kapsamlı müfredat",
        "Okullara özel içerik ve öğretmen desteği",
        "Uzman tutorlar eşliğinde canlı uygulamalar",
        "Ölçme-değerlendirme ve gelişim takibi",
        "Ailelere özel rehberlik ve ev etkinlikleri",
      ],
    }),
  },

  // 3. İSTATİSTİKLER — stats (StatsSection — animated counters)
  {
    sectionType: "stats",
    title: "Etki İstatistikleri",
    content: JSON.stringify({
      items: [
        { value: 10000, suffix: "+", label: "Öğrenci" },
        { value: 200, suffix: "+", label: "Okul & Kurum" },
        { value: 98, suffix: "%", label: "Memnuniyet" },
        { value: 100, suffix: "+", label: "Beceri Modülü" },
      ],
    }),
  },

  // 4. AKADEMİK YAKLAŞIMIMIZ — manifesto (ManifestoSection — tabs)
  {
    sectionType: "manifesto",
    title: "Akademik Yaklaşımımız",
    content: JSON.stringify({
      tag: "AKADEMİK YAKLAŞIMIMIZ",
      title: 'Bilimsel temelli bir müfredatla <span class="text-gradient">yaşam becerilerini</span> öğretiyoruz.',
      tabs: [
        {
          label: "Pedagojik Temel",
          content: "Müfredatımız deneyimsel öğrenme, işbirlikçi öğrenme ve oyunlaştırma metodolojilerini birlikte kullanır.\n\nHer beceri modülü; animasyonlu video ders, etkileşimli oyun, çalışma sayfası ve ölçme aracından oluşan bütünsel bir yapıdadır.\n\n• Hikaye temelli animasyonlarla empatik bağlanma\n• Etkileşimli oyunlarla güvenli deneyimleme\n• Veri destekli bireyselleştirilmiş öğrenme yolları",
        },
        {
          label: "Öğrenme Döngüsü",
          content: "6 adımlı öğrenme döngümüz her becerinin kalıcı olarak kazanılmasını sağlar:\n\n• Keşfet — Merak uyandıran hikayeler ve senaryolarla konuya ilk adım\n• Anla — Animasyonlar ve uzman videoları ile teorik temel\n• Uygula — Etkileşimli oyunlar ve rol yapma etkinlikleri\n• Pekiştir — Çalışma sayfaları ve tekrar egzersizleri\n• Değerlendir — Öz değerlendirme ve akran geri bildirimi\n• Paylaş — Öğrenilenleri gerçek hayata aktarma",
        },
        {
          label: "Bilimsel Çerçeve",
          content: "Tüm içeriklerimiz uluslararası geçerliliğe sahip bilimsel çerçevelere dayanır.\n\nCASEL (Collaborative for Academic, Social, and Emotional Learning) çerçevesi, OECD sosyal-duygusal beceriler araştırmaları ve MEB kazanımları temel referanslarımızdır.\n\n• CASEL 5 yetkinlik alanı: Öz farkındalık, öz yönetim, sosyal farkındalık, ilişki becerileri, sorumlu karar verme\n• Uluslararası geçerli dijital portfolyo sistemi\n• Kanıta dayalı müfredat geliştirme süreci",
        },
        {
          label: "Ölçme & Değerlendirme",
          content: "Her öğrencinin gelişimini bilimsel araçlarla takip ediyoruz.\n\nBeceri ölçüm testleri, gelişim takip raporları ve öğrenci portfolyoları ile ilerlemeyi somut verilerle ölçüyoruz.\n\n• Haftalık gelişim raporları ve trend analizi\n• Öğretmen gözlem formları\n• Veli bilgilendirme ve gelişim paylaşımı\n• Sınıf bazlı karşılaştırmalı analiz",
        },
      ],
    }),
  },

  // 5. İLKELERİMİZ — bento_grid (BentoGridSection)
  {
    sectionType: "bento_grid",
    title: "İlkelerimiz",
    content: JSON.stringify({
      title: "Temel",
      titleHighlight: "İlkelerimiz",
      items: [
        { title: "Çocuk Merkezlilik", description: "Her kararda çocuğun yüksek yararını ön planda tutuyoruz. Tüm içerikler çocukların gelişim ihtiyaçlarına göre tasarlanır.", icon: "Heart", color: "peach" },
        { title: "Güvenlik ve Gizlilik", description: "KVKK uyumlu, çocuk güvenliği standartlarında bir platform sunuyoruz. Verileriniz bizimle güvende.", icon: "Shield", color: "brand" },
        { title: "Bilimsellik", description: "Tüm içeriklerimiz CASEL çerçevesine dayalı araştırma ve kanıtlara dayanır. Bilimsel geçerliliği kanıtlanmış yöntemler kullanırız.", icon: "BookOpen", color: "mint" },
        { title: "Kapsayıcılık", description: "Her çocuğun sosyal becerilere ulaşabileceği demokratik ve erişilebilir bir eğitim ortamı yaratıyoruz.", icon: "Globe", color: "lavender" },
        { title: "Yenilikçilik", description: "Teknoloji ve pedagojiyi birlikte ilerletiyoruz. Animasyon, oyunlaştırma ve yapay zeka destekli öğrenme yolları sunuyoruz.", icon: "Sparkles", color: "gold" },
        { title: "İşbirliği", description: "Aile, okul ve toplumla birlikte çalışarak çocukların gelişimini bütünsel olarak destekliyoruz.", icon: "Users", color: "brand" },
      ],
    }),
  },

  // 6. NEDEN LEARNECOHUB — teacher_tools (ToolkitSection — farklı görsel!)
  {
    sectionType: "teacher_tools",
    title: "Neden LearnecoHub?",
    content: JSON.stringify({
      title: "Neden",
      titleHighlight: "LearnecoHub?",
      items: [
        { title: "Bilimsel Temelli Müfredat", description: "CASEL çerçevesine dayalı, 20+ yıllık araştırma birikimiyle oluşturulmuş 100+ beceri modülü", icon: "BookOpen", color: "#1B3A7B" },
        { title: "İnteraktif Öğrenme", description: "Animasyonlu video dersler, beceri oyunları ve canlı grup seanslarıyla zenginleştirilmiş deneyim", icon: "Gamepad2", color: "#2ECC71" },
        { title: "Bireyselleştirilmiş İlerleme", description: "Her çocuğun kendi hızında ilerleyebileceği kişiselleştirilmiş öğrenme yolları ve AI destekli öneriler", icon: "TrendingUp", color: "#7F63CB" },
        { title: "Uzman Kadro", description: "Psikiyatrist, psikolog, pedagog ve içerik tasarımcılarından oluşan deneyimli ekip", icon: "Award", color: "#EE7A45" },
        { title: "Aile Katılımı", description: "Ebeveynlere özel rehberlik materyalleri, haftalık gelişim raporları ve ev etkinlik önerileri", icon: "Heart", color: "#F5C518" },
        { title: "Ölçülebilir Sonuçlar", description: "Detaylı beceri ölçüm testleri, gelişim takip raporları ve dijital portfolyo sistemi", icon: "BarChart3", color: "#1B3A7B" },
      ],
    }),
  },

  // 7. EKİBİMİZ — team (TeamSection — marquee)
  {
    sectionType: "team",
    title: "Ekibimiz",
    content: JSON.stringify({
      tag: "EKİBİMİZ",
      title: "Tutkulu Bir",
      titleHighlight: "Ekiple Çalışıyoruz",
      description: "Her biri alanında uzman, çocukların geleceğine inanan bir ekip.",
      members: [
        { name: "Dr. Melih Taha Aytep", role: "Psikiyatrist / Kurucu", image: "/ekip/Melih.png", color: "#1B3A7B" },
        { name: "Derya Aydın", role: "Operasyon Müdürü", image: "/ekip/Derya.png", color: "#2ECC71" },
        { name: "Dr. Kaan Mert Güven", role: "Doktor / Öğrenme Tasarımcısı", image: "/ekip/Kaan.png", color: "#7F63CB" },
        { name: "Kübra Demirci", role: "İçerik Tasarımcısı", image: "/ekip/Kubra.png", color: "#EE7A45" },
        { name: "Sayid Özcan", role: "EdTech Yöneticisi", image: "/ekip/Sayid.png", color: "#F5C518" },
        { name: "Buse Aksoy", role: "Psikolog / E-Öğrenme Tasarımcısı", image: "/ekip/Buse.png", color: "#1B3A7B" },
      ],
    }),
  },

  // 8. BAŞARI HİKAYELERİ — badge_stats (BadgeStatsSection)
  {
    sectionType: "badge_stats",
    title: "Başarı Rakamları",
    content: JSON.stringify({
      items: [
        { value: "10K+", label: "Ulaşılan Öğrenci" },
        { value: "200+", label: "Partner Okul" },
        { value: "98%", label: "Memnuniyet Oranı" },
        { value: "50+", label: "Kurumsal İşbirliği" },
      ],
    }),
  },

  // 9. REFERANSLAR — family_features (WarmCardsSection — farklı görsel!)
  {
    sectionType: "family_features",
    title: "Referanslarımız",
    content: JSON.stringify({
      title: "Birlikte",
      titleHighlight: "Çalıştığımız Kurumlar",
      description: "Türkiye'nin önde gelen kurumları ile çocukların sosyal-duygusal gelişimi için birlikte çalışıyoruz.",
      items: [
        { icon: "Award", title: "Koç Holding", description: "Kurumsal sosyal sorumluluk projelerinde LearnecoHub ile işbirliği yapıyoruz.", color: "#1B3A7B" },
        { icon: "Zap", title: "Penta Teknoloji", description: "Teknoloji destekli eğitim çözümlerinde güçlü bir iş ortağı.", color: "#2ECC71" },
        { icon: "Sparkles", title: "Başakşehir Living Lab", description: "İnovasyon ve eğitim alanında ortak projeler yürütüyoruz.", color: "#7F63CB" },
        { icon: "MapPin", title: "Lüleburgaz Belediyesi", description: "Yerel yönetimlerle birlikte çocuklara ulaşıyoruz.", color: "#EE7A45" },
        { icon: "MapPin", title: "Kocaeli Belediyesi", description: "Toplumsal gelişim projelerinde kurumsal işbirliği.", color: "#F5C518" },
        { icon: "Heart", title: "YEKUV", description: "Sivil toplum kuruluşları ile ortak sosyal sorumluluk projeleri.", color: "#1B3A7B" },
      ],
    }),
  },

  // 10. PARTNER LOGOLAR — partner_logos
  {
    sectionType: "partner_logos",
    title: "Partner Logolar",
    content: JSON.stringify({
      title: "Güvenilir",
      titleHighlight: "İş Ortaklarımız",
    }),
  },

  // 11. FINAL CTA
  {
    sectionType: "final_cta",
    title: "Son CTA",
    content: JSON.stringify({
      title: 'Siz de başarı <span class="text-[#F5C518]">hikayenizi yazın.</span>',
      description: "LearnecoHub ile çocukların hayatına dokunun.",
      cta: { label: "Hemen Başla", href: "https://lms.learnecohub.com/login/index.php" },
      phone: { label: "0531 952 94 96", href: "tel:+905319529496" },
      badges: [
        { text: "Ücretsiz başlangıç" },
        { text: "Hızlı kurulum" },
        { text: "Uzman destek" },
      ],
    }),
  },

  // 12. FOOTER
  {
    sectionType: "footer",
    title: "Footer",
    content: "{}",
  },
];

async function main() {
  // STEP 1: Delete all existing sections
  console.log("=== DELETING ALL 22 SECTIONS ===");
  for (const id of ALL_IDS) {
    const res = await req("DELETE", `/api/sayfalar/hakkimizda/sections/${id}`);
    console.log(`  DELETE ${id} → ${res.status === 200 ? "OK" : "FAIL " + res.status}`);
  }

  // STEP 2: Create new sections
  console.log("\n=== CREATING NEW SECTIONS ===");
  for (let i = 0; i < newSections.length; i++) {
    const s = newSections[i];
    const res = await req("POST", "/api/sayfalar/hakkimizda/sections", {
      sectionType: s.sectionType,
      title: s.title,
      visible: true,
      order: i + 1,
      content: s.content,
    });
    const status = res.status === 201 ? "OK" : `FAIL ${res.status}`;
    console.log(`  ${i + 1}. [${s.sectionType}] ${s.title} → ${status}`);
  }

  console.log("\n=== DONE — 12 sections created ===");
  console.log("Page: https://learnecohub-eta.vercel.app/hakkimizda");
  console.log("Admin: https://learnecohub-admin-production.up.railway.app/sayfalar/hakkimizda");
}

main().catch(console.error);
