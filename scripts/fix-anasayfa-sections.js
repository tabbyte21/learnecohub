/**
 * Fix anasayfa: add missing sections and update youtube_showcase with stats
 */
const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const cuid = () => {
  const ts = Date.now().toString(36);
  const rnd = crypto.randomBytes(8).toString("hex").slice(0, 12);
  return "cm" + ts + rnd;
};

const ADMIN_DB = path.resolve(__dirname, "../../learneco-admin/data/learneco.db");
const db = new Database(ADMIN_DB);

// Get anasayfa page
const page = db.prepare("SELECT * FROM Page WHERE slug = ?").get("anasayfa");
if (!page) {
  console.error("anasayfa sayfasi bulunamadi!");
  process.exit(1);
}
console.log("Page:", page.title, "(id:", page.id, ")");

// Get existing sections
const existing = db.prepare('SELECT sectionType, id, "order" FROM PageSection WHERE pageId = ? ORDER BY "order"').all(page.id);
console.log("Mevcut section'lar:");
existing.forEach(s => console.log(`  [${s.order}] ${s.sectionType}`));

const existingTypes = existing.map(s => s.sectionType);

// Update youtube_showcase - add stats and titleHighlight
const ytSection = existing.find(s => s.sectionType === "youtube_showcase");
if (ytSection) {
  const ytRow = db.prepare("SELECT content FROM PageSection WHERE id = ?").get(ytSection.id);
  let ytContent = {};
  try { ytContent = JSON.parse(ytRow.content); } catch {}

  if (!ytContent.stats) {
    ytContent.stats = [
      { value: "100+", label: "Beceri", color: "#2ECC71" },
      { value: "200+", label: "Video", color: "#F5C518" },
      { value: "10K+", label: "Öğrenci", color: "#4D7EC4" },
    ];
    console.log("✓ youtube_showcase'e stats eklendi");
  }
  if (!ytContent.titleHighlight) {
    ytContent.titleHighlight = "hazırlıyoruz.";
    console.log("✓ youtube_showcase'e titleHighlight eklendi");
  }

  db.prepare('UPDATE PageSection SET content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
    .run(JSON.stringify(ytContent), ytSection.id);
}

// Missing sections to add
const maxOrder = Math.max(...existing.map(s => s.order), 0);
let nextOrder = maxOrder + 1;

const insertSection = db.prepare(`
  INSERT INTO PageSection (id, pageId, sectionType, title, "order", visible, content, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, 1, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
`);

const missingSections = [
  {
    type: "video_showcase",
    title: "Video Dersler",
    content: {
      title: "Hikayeleştirilmiş video dersler",
      titleHighlight: "",
      description: "Yaş gruplarına özel, animasyon destekli ve oyunlaştırılmış video içeriklerimizi keşfedin.",
      items: [
        { title: "Tanıtım Videosu", description: "LearnecoHub platformunun kapsamlı sosyal beceri müfredatını ve öğrenme deneyimini keşfedin.", src: "https://learnecohub.com/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
        { title: "Etkileşimli Video", description: "Hikayeleştirilmiş, animasyon destekli ve oyunlaştırılmış etkileşimli video içeriklerimize göz atın.", src: "https://learnecohub.com/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
        { title: "Platform Güvenliği", description: "Çocuklarınız için güvenli ve kontrollü bir dijital öğrenme ortamı sunuyoruz.", src: "https://learnecohub.com/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4" },
        { title: "Empati Gelişimi", description: "Çocukların empati becerilerini hikayeler ve interaktif senaryolarla geliştiren video dersler.", src: "https://learnecohub.com/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
        { title: "Duygu Yönetimi", description: "Öfke, kaygı ve üzüntü gibi duyguları tanıma ve yönetme stratejilerini öğreten içerikler.", src: "https://learnecohub.com/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
        { title: "Sosyal Beceriler", description: "Arkadaşlık kurma, iş birliği ve iletişim becerilerini destekleyen animasyonlu dersler.", src: "https://learnecohub.com/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4" },
      ],
    },
  },
  {
    type: "learning_steps",
    title: "Öğrenme Adımları",
    content: {
      title: "6 Adımda Kapsamlı Müfredat",
      description: "Tanışmadan gelişim takibine kadar, her aşamada öğrencilerinize ve ailelerine bilimsel temelli destek sağlıyoruz.",
      items: [
        { title: "Tanışma ve Değerlendirme", description: "Alanında uzman psikologlar çocuğunuzun sosyal-duygusal gelişim ihtiyaçlarını kapsamlı değerlendirir. Yaşa ve ihtiyaca uygun gruplara yönlendirme yapılır." },
        { title: "Asenkron Öğrenme", description: "Çocuklar, animasyonlu hikayeleştirilmiş videolar ve oyunlarla becerileri bireysel olarak öğrenir. Aileye evde uygulayabileceği etkinlik önerileri sunulur." },
        { title: "Canlı Grup Seansları", description: "10-12 kişilik özel gruplarda yapılan canlı oturumlarda, öğrenciler öğrendikleri becerileri grup içinde aktif şekilde uygular." },
        { title: "Uygulama ve Derinleşme", description: "Canlı derslerde öğrencilere evde uygulayabilecekleri görevler verilir. Öğrenilen becerinin gerçek yaşamda pratiği sağlanır." },
        { title: "Ölçme ve Geri Bildirim", description: "Her beceri sonunda kısa değerlendirmelerle gelişim izlenir. İlerleme kişisel gelişim portfolyosuna yansır." },
        { title: "Aile Katılımı", description: "Velilere haftalık videolar, öneriler ve kolay uygulanabilir rehber materyaller sunulur. Çocuk evde de desteklenir." },
      ],
    },
  },
  {
    type: "learning_map",
    title: "Öğrenme Haritası",
    content: {
      title: "Adım adım ustalaşın",
      description: "Kademeli öğrenme yoluyla sosyal becerilerde ilerleme sağlayın.",
    },
  },
  {
    type: "pricing",
    title: "Fiyatlandırma",
    content: {
      title: "Planınızı seçin, hemen başlayın",
      description: "Herkesin öğrenme yolculuğu farklı. Size özel sosyal-duygusal gelişim planınızı seçin.",
      items: [
        {
          title: "Bireysel Kullanıcı",
          subtitle: "Aileler ve Öğrenciler İçin",
          features: [
            "Animasyonlarla öğrenme deneyimi",
            "100+ sosyal ve duygusal beceri müfredatı",
            "Psikolog eşliğinde 10-12 kişilik canlı grup dersleri",
            "Uluslararası geçerli dijital portfolyo",
            "Haftalık gelişim raporları ve ebeveyn içerikleri",
            "Günlük yaşama entegre eğitici oyunlar ve görevler",
          ],
          cta: "Detaylı Bilgi Al",
          popular: false,
        },
        {
          title: "Uzman Hesabı",
          subtitle: "Psikolog, Öğretmen ve PDR Uzmanları İçin",
          features: [
            "Sıfır hazırlık ile sosyal becerileri öğretme imkanı",
            "Her beceri için: animasyon video + oyun + etkinlik + ölçme aracı",
            "İçerik yönetimi, öğrenci gelişim takibi ve raporlama paneli",
            "500+ hazır etkinlik ve yazdırılabilir materyale erişim",
            "Birebir veya grup eğitimlerinde kullanıma uygun hazır müfredat",
          ],
          cta: "Detaylı Bilgi Al",
          popular: true,
        },
        {
          title: "Kurum Hesabı",
          subtitle: "Okullar, Kurumlar ve STK'lar İçin",
          features: [
            "Seviyeye özel yapılandırılmış, 100+ beceriyi kapsayan hazır müfredat",
            "Her beceri için modüler sistem (video + oyun + etkinlik + ölçme)",
            "Kurumsal dashboard ile çoklu kullanıcı yönetimi (1000+ kullanıcı)",
            "Öğrenci beceri CV'lerini kurumsal olarak raporlama",
            "Öğretmen ve PDR uzmanları için uygulama rehberleri",
          ],
          cta: "Bizimle İletişime Geçin",
          popular: false,
        },
      ],
    },
  },
  {
    type: "testimonials",
    title: "Referanslar",
    content: {
      title: "Hakkımızda ne dediler?",
      items: [
        { name: "Prof.Dr. Sevgi İrtegün Kandemir", role: "Dicle Üniversitesi Tıp Fakültesi", quote: "Bu program yalnızca çocuklarımıza değil, bize de çok şey öğretti. Ebeveyn kitlerini düzenli olarak uyguladıkça evde daha sakin, anlayışlı ve destekleyici bir iletişim ortamı kurduk. Tüm aile için bir dönüşüm süreci sundu." },
        { name: "Klinik Psikolog Yılmaz Kaplan", role: "Munzur Üniversitesi Psikoloji Bölümü", quote: "Akademik ve çocuk gelişimi açısından bu kadar yoğun teoriyle şekillenen bir içeriği çocuklara bu kadar sade, anlaşılır ve uygulanabilir şekilde sunmak gerçekten büyük bir emek. Her kurumun altından kalkabileceği bir iş kesinlikle değil." },
        { name: "Saliha Öztoprak", role: "CORENvision Kurucu", quote: "Canlı dersler ve uzman psikologların rehberliğindeki interaktif aktiviteler, çocuğumun sosyal ve duygusal becerilerini hızla geliştirdi. Etkileşimli oyunlar öğrenmeyi eğlenceli hale getiriyor. Gelişim portfolyosu sayesinde ilerlemesini anlık takip edebiliyoruz." },
        { name: "Ayşe Demir", role: "Veli - 2 Çocuk Annesi", quote: "Çocuğumun empati ve iletişim becerilerindeki gelişimi inanılmazdı. Okul arkadaşlarıyla ilişkileri gözle görülür şekilde iyileşti. Artık duygularını çok daha sağlıklı ifade edebiliyor." },
        { name: "Mehmet Yılmaz", role: "Rehber Öğretmen - Özel Okul", quote: "Sıfır hazırlıkla sosyal beceri dersi verebilmek benim için büyük kolaylık. Animasyonlu videolar ve hazır etkinlik setleri sayesinde öğrencilerim derslere aktif katılım sağlıyor. Gelişim raporları velilerle paylaşım için mükemmel." },
        { name: "Zeynep Acar", role: "Çocuk Psikoloğu", quote: "Danışanlarıma terapi süreçleri arasında ev ödevi olarak veriyorum. Bilimsel temelli, yaşa uygun ve etkileşimli olması hem çocukların motivasyonunu artırıyor hem de terapötik süreci destekliyor." },
        { name: "Burak Kaya", role: "İlkokul Müdürü", quote: "Okulumuzda 300 öğrenciyle kullanıyoruz. Kurum paneli sayesinde tüm sınıfları tek ekrandan takip edebiliyoruz. Öğretmenlerimiz hazır müfredatı çok seviyor. Veli memnuniyetinde ciddi artış gördük." },
        { name: "Elif Şahin", role: "Veli - Lise Öğrenci Annesi", quote: "Kızım ergenlik döneminde çok zorlanıyordu. Bu programdaki stres yönetimi ve öz farkındalık modülleri sayesinde hem kendini hem de çevresini daha iyi anlamaya başladı. Sertifika sistemi de motivasyonunu artırdı." },
      ],
    },
  },
];

// Also fix existing sections content:
// 1. faq_parents -> should have proper FAQ items
// 2. team_grid -> should have proper team members
// 3. Update hero to have proper content (remove test "asdf" values)

// Fix hero content
const heroSection = existing.find(s => s.sectionType === "hero");
if (heroSection) {
  const heroContent = {
    tag: "K-12 Sosyal Beceri Platformu",
    tagSecondary: "Bilimsel Temelli",
    title: "Sosyal becerileri çocuklara kazandırmanın",
    titleHighlight: "en kolay yolu.",
    description: 'Empati, duygu yönetimi ve öz farkındalık gibi <strong class="text-white font-semibold">60\'tan fazla</strong> sosyal-duygusal beceriyi çocuklara ve gençlere sistemli, kolay ve etkili biçimde kazandırıyoruz.',
    subtitle: "İlgi çekici videolar, etkileşimli oyunlar ve yazdırılabilir materyallerle kapsamlı bir sosyal beceri müfredatı sizi bekliyor.",
    cta1: { text: "Ücretsiz Başla", href: "#cta" },
    cta2: { text: "Nasıl Çalışır?", href: "#steps" },
  };
  db.prepare('UPDATE PageSection SET content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
    .run(JSON.stringify(heroContent), heroSection.id);
  console.log("✓ hero section içeriği düzeltildi (asdf'ler temizlendi)");
}

// Fix youtube_showcase with proper content
if (ytSection) {
  const ytContent = {
    tag: "TANITIM VİDEOSU",
    title: "Çocukları hayata",
    titleHighlight: "hazırlıyoruz.",
    description: "Sosyal-duygusal öğrenme müfredatımızın nasıl çalıştığını, çocuklara ne kazandırdığını ve platformumuzu yakından tanıyın.",
    videoId: "GcjqT6zb1Ts",
    thumbnail: "",
    stats: [
      { value: "100+", label: "Beceri", color: "#2ECC71" },
      { value: "200+", label: "Video", color: "#F5C518" },
      { value: "10K+", label: "Öğrenci", color: "#4D7EC4" },
    ],
    cta: { label: "Hemen Başla", href: "#cta" },
  };
  db.prepare('UPDATE PageSection SET content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
    .run(JSON.stringify(ytContent), ytSection.id);
  console.log("✓ youtube_showcase section tamamen düzeltildi (stats eklendi)");
}

// Fix faq_parents with full FAQ items
const faqSection = existing.find(s => s.sectionType === "faq_parents");
if (faqSection) {
  const faqContent = {
    title: "Sıkça Sorulan Sorular",
    items: [
      { q: "Sosyal ve duygusal beceri müfredatınız gerçekten işe yarıyor mu?", a: "Bu soruya kocaman bir evet diyoruz. Tasarladığımız müfredat, 20 yılı aşkın bilimsel araştırmalara ve sosyal-duygusal öğrenme alanındaki uluslararası standartlara dayanıyor. Her beceri; yaş grubuna özel olarak hazırlanmış animasyon videolar, etkileşimli beceri oyunları ve uygulamalı etkinliklerle destekleniyor." },
      { q: "Bu program çocuğumun akademik başarısına da katkı sağlar mı?", a: "Kesinlikle katkı sağlar. Araştırmalar gösteriyor ki duygularını tanıyan, stresle başa çıkabilen, odaklanma ve öz düzenleme becerisi gelişmiş çocuklar, akademik alanda çok daha başarılı oluyor." },
      { q: "Ders gibi mi yoksa oyun gibi mi?", a: "İkisi birden! Öğrenme süreci, hikayeleştirilmiş animasyon videolarla başlıyor, ardından oyunlarla pekiştiriliyor. Çocuklar hem eğleniyor hem de öğrendiklerini kalıcı şekilde içselleştiriyor." },
      { q: "Evde destekleyici bir ortam oluşturmam gerekiyor mu?", a: "Ebeveynler olarak uzun uzun ders anlatmanıza gerek yok. Çocuğunuzun öğrendiği becerileri evde nasıl destekleyebileceğinizi, size özel hazırlanmış basit öneriler ve yazdırılabilir materyallerle sunuyoruz." },
      { q: "Kazanılan beceriler sertifikalandırılıyor mu?", a: "Evet, öğrencilerin sosyal-duygusal beceri kazanımları sistemli şekilde takip edilip sertifikalandırılır. Her öğrenci için dijital Gelişim Portfolyosu oluşturulur." },
      { q: "Müfredatınız hangi aşamalardan oluşuyor?", a: "Müfredatımız 6 aşamadan oluşuyor: (1) Tanışma ve Profesyonel Değerlendirme, (2) Asenkron Öğrenme, (3) Canlı grup seansları, (4) Uygulama ve derinleşme, (5) Ölçme-değerlendirme, (6) Aile katılımı." },
    ],
  };
  db.prepare('UPDATE PageSection SET content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
    .run(JSON.stringify(faqContent), faqSection.id);
  console.log("✓ faq_parents section 6 soru ile güncellendi");
}

// Fix team_grid with real team members
const teamSection = existing.find(s => s.sectionType === "team_grid");
if (teamSection) {
  const teamContent = {
    title: "Tutkulu Bir Ekiple Çalışıyoruz",
    description: "Her biri alanında uzman, çocukların geleceğine inanan bir ekip.",
    items: [
      { name: "Dr. Melih Taha Aytep", role: "Psikiyatri / Tıp Doktoru & Kurucu", img: "/ekip/Dr.Melih Taha AYTEP.png" },
      { name: "Derya Aydın", role: "Operasyon Yöneticisi", img: "/ekip/Derya AYDIN.png" },
      { name: "Dr. Kaan Mert Güven", role: "Tıp Doktoru & Öğrenme Deneyimi Tasarımcısı", img: "/ekip/Dr.Kaan Mert GÜVEN.png" },
      { name: "Kübra Demirci", role: "Eğitsel İçerik & E-Öğrenme Tasarımcısı", img: "/ekip/Kübra DEMİRCİ.png" },
      { name: "Sayid Özcan", role: "Eğitim Teknolojileri Yöneticisi", img: "/ekip/Sayid ÖZCAN.png" },
      { name: "Buse Aksoy", role: "Psikolog & E-Öğrenme Tasarımcısı", img: "/ekip/Buse AKSOY.png" },
    ],
  };
  db.prepare('UPDATE PageSection SET content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
    .run(JSON.stringify(teamContent), teamSection.id);
  console.log("✓ team_grid section 6 üye ile güncellendi");
}

// Remove duplicate teacher_tools
const ttSections = existing.filter(s => s.sectionType === "teacher_tools");
if (ttSections.length > 1) {
  for (let i = 1; i < ttSections.length; i++) {
    db.prepare("DELETE FROM PageSection WHERE id = ?").run(ttSections[i].id);
    console.log("✕ Duplicate teacher_tools silindi (id:", ttSections[i].id, ")");
  }
}

// Now reorder all sections properly and add missing ones
// Desired order: hero(0), stats(1), youtube_showcase(2), materials_scroll(3), free_banner(4),
// video_showcase(5), learning_steps(6), learning_map(7), pricing(8), team_grid(9),
// testimonials(10), faq_parents(11), final_cta(12)
const desiredOrder = [
  "hero", "stats", "youtube_showcase", "materials_scroll", "free_banner",
  "video_showcase", "learning_steps", "learning_map", "pricing", "team_grid",
  "testimonials", "faq_parents", "final_cta"
];

// Add missing sections
db.exec("BEGIN TRANSACTION");
try {
  for (const ms of missingSections) {
    if (!existingTypes.includes(ms.type)) {
      const newId = cuid();
      const ord = desiredOrder.indexOf(ms.type);
      insertSection.run(newId, page.id, ms.type, ms.title, ord >= 0 ? ord : nextOrder++, JSON.stringify(ms.content));
      console.log(`+ Oluşturuldu: ${ms.type} - ${ms.title}`);
    } else {
      console.log(`~ Zaten var: ${ms.type}`);
    }
  }

  // Reorder existing sections
  const allSections = db.prepare('SELECT id, sectionType FROM PageSection WHERE pageId = ?').all(page.id);
  for (const s of allSections) {
    const ord = desiredOrder.indexOf(s.sectionType);
    if (ord >= 0) {
      db.prepare('UPDATE PageSection SET "order" = ? WHERE id = ?').run(ord, s.id);
    }
  }
  console.log("✓ Tüm section sıralamaları güncellendi");

  // Remove teacher_tools (not used on homepage)
  const ttRemaining = db.prepare("SELECT id FROM PageSection WHERE pageId = ? AND sectionType = 'teacher_tools'").all(page.id);
  for (const tt of ttRemaining) {
    db.prepare("DELETE FROM PageSection WHERE id = ?").run(tt.id);
    console.log("✕ teacher_tools silindi (anasayfada kullanılmıyor)");
  }

  db.exec("COMMIT");

  // Final check
  const final = db.prepare('SELECT sectionType, title, "order" FROM PageSection WHERE pageId = ? ORDER BY "order"').all(page.id);
  console.log("\nSonuç - Anasayfa section'ları:");
  final.forEach(s => console.log(`  [${s.order}] ${s.sectionType} - ${s.title}`));

} catch (err) {
  db.exec("ROLLBACK");
  console.error("HATA:", err);
}

db.close();
