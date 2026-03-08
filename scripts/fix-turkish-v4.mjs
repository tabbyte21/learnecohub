#!/usr/bin/env node
/**
 * Turkish character fixer v4 - Comprehensive approach
 * 1. First reverts corruptions from v2/v3
 * 2. Then applies full-word Turkish replacements
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Step 1: Fix corruptions from previous runs
const CORRUPTION_FIXES = [
  // v2 "erisi" → "erişi" broke words containing "risi"
  ["Becerişi", "Becerisi"],
  ["becerişi", "becerisi"],
  ["Galerişi", "Galerisi"],
  ["galerişi", "galerisi"],
  // v2 "olcul" → "ölçül" broke "yolculuk"
  ["Yölçüluğun", "Yolculuğun"],
  ["yölçüluğun", "yolculuğun"],
  ["Yölçüluğunu", "Yolculuğunu"],
  ["yölçüluğunu", "yolculuğunu"],
  ["yölçüluğu", "yolculuğu"],
  ["Yölçüluk", "Yolculuk"],
  ["yölçüluk", "yolculuk"],
  // v2 "tutor" → "tütör" was wrong
  ["tütörlar", "tutorlar"],
  ["Tütörlar", "Tutorlar"],
  ["tütör", "tutor"],
  // v2 "modul" → "mödül" might have been wrong in some contexts
  ["mödülu", "modülü"],
  ["mödül", "modül"],
];

// Step 2: Comprehensive Turkish word-level replacements
// Using FULL WORDS or very distinctive patterns to avoid false positives
const WORD_REPLACEMENTS = [
  // --- Common words missing ş ---
  ["basari", "başarı"],
  ["Basari", "Başarı"],
  ["basarili", "başarılı"],
  ["basarilari", "başarıları"],
  ["baslangic", "başlangıç"],
  ["Baslangic", "Başlangıç"],
  ["baslangıc", "başlangıç"],
  ["başlangic", "başlangıç"],
  ["baslayin", "başlayın"],
  ["baslayabilirsiniz", "başlayabilirsiniz"],
  ["baslayan", "başlayan"],
  ["baslatmak", "başlatmak"],
  ["basla", "başla"],
  ["Basla", "Başla"],
  ["calisanlari", "çalışanları"],
  ["Calisanlari", "Çalışanları"],
  ["calisanlariniz", "çalışanlarınız"],
  ["Calisanlariniz", "Çalışanlarınız"],
  ["calisanlarin", "çalışanların"],
  ["calisma", "çalışma"],
  ["Calisma", "Çalışma"],
  ["calismalar", "çalışmalar"],
  ["çalışmalari", "çalışmaları"],
  ["calisan", "çalışan"],
  ["Calisan", "Çalışan"],
  ["calis", "çalış"],
  ["Calis", "Çalış"],
  ["yasama", "yaşama"],
  ["yasamda", "yaşamda"],
  ["yasamak", "yaşamak"],
  ["yasamin", "yaşamın"],
  ["yasami", "yaşamı"],
  ["yasam ", "yaşam "],
  ["yasam.", "yaşam."],
  ["yasayin", "yaşayın"],
  ["yasayarak", "yaşayarak"],
  ["arastirma", "araştırma"],
  ["Arastirma", "Araştırma"],
  ["arastirmaya", "araştırmaya"],
  ["ulastirmak", "ulaştırmak"],
  ["ulaştirmayi", "ulaştırmayı"],
  ["ulaştırmayi", "ulaştırmayı"],
  ["ulastirir", "ulaştırır"],
  ["ulastirma", "ulaştırma"],
  ["ulastir", "ulaştır"],
  ["ulasabil", "ulaşabil"],
  ["ulasim", "ulaşım"],
  ["ulasmayi", "ulaşmayı"],
  ["sekillendirmek", "şekillendirmek"],
  ["Sekillendirmek", "Şekillendirmek"],
  ["sekillend", "şekillend"],
  ["Sekillend", "Şekillend"],
  ["esliginde", "eşliğinde"],
  ["esligi", "eşliği"],
  ["Esligi", "Eşliği"],
  ["isbirligi", "işbirliği"],
  ["Isbirligi", "İşbirliği"],
  ["isbirligine", "işbirliğine"],
  ["Isbirlikci", "İşbirlikçi"],
  ["isbirlikci", "işbirlikçi"],
  ["iletisime", "iletişime"],
  ["iletisim", "iletişim"],
  ["Iletisim", "İletişim"],
  ["cesitliligi", "çeşitliliği"],
  ["cesitlilik", "çeşitlilik"],
  ["erisebilmesidir", "erişebilmesidir"],
  ["erisebilecegi", "erişebileceği"],
  ["Erisebilirlik", "Erişebilirlik"],
  ["erisebilir", "erişebilir"],
  ["erisebil", "erişebil"],
  ["erisim", "erişim"],
  ["Erisim", "Erişim"],
  ["iliskiler", "ilişkiler"],
  ["Iliskiler", "İlişkiler"],
  ["iliskisi", "ilişkisi"],
  ["gelisimini", "gelişimini"],
  ["gelisim", "gelişim"],
  ["gelistiren", "geliştiren"],
  ["gelistirmek", "geliştirmek"],
  ["gelistir", "geliştir"],
  ["Gelistir", "Geliştir"],
  ["gelismeler", "gelişmeler"],
  ["gelisme", "gelişme"],
  ["degisim", "değişim"],
  ["degistirir", "değiştirir"],
  ["olcme", "ölçme"],
  ["Olcme", "Ölçme"],
  ["olcumleme", "ölçümleme"],
  ["gerceklestir", "gerçekleştir"],
  ["Gerceklestir", "Gerçekleştir"],
  ["gosterir", "gösterir"],
  ["gosterge", "gösterge"],
  ["kosullar", "koşullar"],
  ["Kosullar", "Koşullar"],
  ["disinda", "dışında"],
  ["disina", "dışına"],
  ["donusum", "dönüşüm"],
  ["Donusum", "Dönüşüm"],
  ["donusumunu", "dönüşümünü"],
  ["donusu", "dönüşü"],
  ["etkilesim", "etkileşim"],
  ["etkilesimli", "etkileşimli"],
  ["paylasim", "paylaşım"],
  ["Paylasim", "Paylaşım"],
  ["paylasan", "paylaşan"],
  ["paylasiyoruz", "paylaşıyoruz"],
  ["karsilast", "karşılaşt"],
  ["karsisinda", "karşısında"],
  ["karsilik", "karşılık"],
  ["guclendiriyoruz", "güçlendiriyoruz"],
  ["Guclendiriyoruz", "Güçlendiriyoruz"],
  ["guclendir", "güçlendir"],
  ["Guclendir", "Güçlendir"],
  ["hazirliyoruz", "hazırlıyoruz"],
  ["hazırliyoruz", "hazırlıyoruz"],
  ["dongu", "döngü"],
  ["Dongu", "Döngü"],
  ["dongusü", "döngüsü"],
  ["döngüsü", "döngüsü"],
  ["tanitim", "tanıtım"],
  ["Tanitim", "Tanıtım"],
  ["pekistirme", "pekiştirme"],
  ["Pekistir", "Pekiştir"],
  ["pekistir", "pekiştir"],
  ["asamalarindan", "aşamalarından"],
  ["asamalari", "aşamaları"],
  ["Oyunlastirma", "Oyunlaştırma"],
  ["oyunlastirma", "oyunlaştırma"],
  ["Bireysellestirilmis", "Bireyselleştirilmiş"],
  ["bireysellestirilmis", "bireyselleştirilmiş"],
  ["Paylas", "Paylaş"],
  ["paylas", "paylaş"],
  ["oluşturulmus", "oluşturulmuş"],
  ["olusturulmus", "oluşturulmuş"],
  ["olustur", "oluştur"],
  ["Olustur", "Oluştur"],
  ["olusumu", "oluşumu"],
  ["olusur", "oluşur"],
  ["Sehir", "Şehir"],
  ["sehir", "şehir"],

  // --- Common words missing ğ ---
  ["cocuklari", "çocukları"],
  ["Cocuklari", "Çocukları"],
  ["Çocuklari", "Çocukları"],
  ["cocugunuzun", "çocuğunuzun"],
  ["Cocugunuzun", "Çocuğunuzun"],
  ["cocugunuz", "çocuğunuz"],
  ["Cocugunuz", "Çocuğunuz"],
  ["cocugunun", "çocuğunun"],
  ["cocuklar", "çocuklar"],
  ["Cocuklar", "Çocuklar"],
  ["cocuga", "çocuğa"],
  ["cocugu", "çocuğu"],
  ["cocugun", "çocuğun"],
  ["Cocugun", "Çocuğun"],
  ["dagilim", "dağılım"],
  ["dogrulama", "doğrulama"],
  ["dogrudan", "doğrudan"],
  ["dogru", "doğru"],
  ["Dogru", "Doğru"],
  ["degerlendirme", "değerlendirme"],
  ["Degerlendirme", "Değerlendirme"],
  ["degerli", "değerli"],
  ["Degerli", "Değerli"],
  ["deger", "değer"],
  ["Deger", "Değer"],
  ["saglıyor", "sağlıyor"],
  ["saglamak", "sağlamak"],
  ["saglayan", "sağlayan"],
  ["saglar", "sağlar"],
  ["sagla", "sağla"],
  ["Sagla", "Sağla"],
  ["saglam", "sağlam"],
  ["saglik", "sağlık"],
  ["saglık", "sağlık"],
  ["gelecegini", "geleceğini"],
  ["gelecegi", "geleceği"],
  ["guvende", "güvende"],
  ["guvenli", "güvenli"],
  ["Guvenli", "Güvenli"],
  ["guvenlik", "güvenlik"],
  ["güvenligi", "güvenliği"],
  ["toplulugu", "topluluğu"],
  ["baglanma", "bağlanma"],
  ["baglanti", "bağlantı"],
  ["diger", "diğer"],
  ["Diger", "Diğer"],
  ["etkinligi", "etkinliği"],
  ["etkinlikleri", "etkinlikleri"],
  ["sorumlulugun", "sorumluluğun"],
  ["verimlilig", "verimliliğ"],
  ["destegi", "desteği"],
  ["birligi", "birliği"],
  ["uygulanabilirligi", "uygulanabilirliği"],

  // --- Common words missing ı ---
  ["kapsamli", "kapsamlı"],
  ["Kapsamli", "Kapsamlı"],
  ["odakli", "odaklı"],
  ["Odakli", "Odaklı"],
  ["oncelikli", "öncelikli"],
  ["Oncelikli", "Öncelikli"],
  ["oncelik", "öncelik"],
  ["Oncelik", "Öncelik"],
  ["farkindalik", "farkındalık"],
  ["Farkindalik", "Farkındalık"],
  ["farkindali", "farkındalı"],
  ["amacimiz", "amacımız"],
  ["Amacimiz", "Amacımız"],
  ["amaci", "amacı"],
  ["Adimlari", "Adımları"],
  ["adimlari", "adımları"],
  ["Adim ", "Adım "],
  ["adim ", "adım "],
  ["Haritasi", "Haritası"],
  ["haritasi", "haritası"],
  ["kazanimi", "kazanımı"],
  ["kazanim", "kazanım"],
  ["Kazanim", "Kazanım"],
  ["sinifi", "sınıfı"],
  ["Sinifi", "Sınıfı"],
  ["sinif", "sınıf"],
  ["Sinif", "Sınıf"],
  ["araciligi", "aracılığı"],
  ["araciligıyla", "aracılığıyla"],
  ["araclari", "araçları"],
  ["araci", "aracı"],
  ["Araci", "Aracı"],
  ["rolunu", "rolünü"],
  ["Aninda", "Anında"],
  ["aninda", "anında"],
  ["yakindan", "yakından"],
  ["karti ", "kartı "],
  ["bakisi", "bakışı"],
  ["zekasini", "zekâsını"],
  ["katilin", "katılın"],
  ["Katilin", "Katılın"],
  ["katilim", "katılım"],
  ["Katilim", "Katılım"],
  ["Katılımi", "Katılımı"],
  ["katılımi", "katılımı"],
  ["dayali", "dayalı"],
  ["Dayali", "Dayalı"],
  ["Farkli", "Farklı"],
  ["farkli", "farklı"],
  ["Farki", "Farkı"],
  ["farki", "farkı"],
  ["farkini", "farkını"],
  ["Kapsayici", "Kapsayıcı"],
  ["kapsayici", "kapsayıcı"],
  ["yaklaşımi", "yaklaşımı"],
  ["yaklaşımızi", "yaklaşımızı"],
  ["yaklaşımımızi", "yaklaşımımızı"],
  ["müfredatımiz", "müfredatımız"],
  ["hakkinda", "hakkında"],
  ["alin", "alın"],
  ["Detayli", "Detaylı"],
  ["detayli", "detaylı"],
  ["Detaylı", "Detaylı"],
  ["gormeye", "görmeye"],
  ["gösterir", "gösterir"],
  ["yillik", "yıllık"],
  ["yillık", "yıllık"],
  ["hizinda", "hızında"],
  ["hizini", "hızını"],
  ["hizi", "hızı"],
  ["canli", "canlı"],
  ["Canli", "Canlı"],
  ["ayiran", "ayıran"],
  ["Avantajlarimiz", "Avantajlarımız"],
  ["avantajlarimiz", "avantajlarımız"],
  ["olusan", "oluşan"],
  ["Ilerleme", "İlerleme"],
  ["ilerleme", "ilerleme"],
  ["ilerleyebilecegi", "ilerleyebileceği"],
  ["ulaşabilecegi", "ulaşabileceği"],
  ["kisiselestirilmis", "kişiselleştirilmiş"],
  ["kisisel", "kişisel"],
  ["yollari", "yolları"],
  ["kuramina", "kuramına"],
  ["programi", "programı"],
  ["programlari", "programları"],

  // --- Words missing ç ---
  ["gecis", "geçiş"],
  ["Gecis", "Geçiş"],
  ["icerigi", "içeriği"],
  ["Icerigi", "İçeriği"],
  ["icerikler", "içerikler"],
  ["Icerikler", "İçerikler"],
  ["icerik", "içerik"],
  ["Icerik", "İçerik"],
  ["icinde", "içinde"],
  ["Icinde", "İçinde"],
  ["iceren", "içeren"],
  ["Iceren", "İçeren"],
  ["icin", "için"],
  ["Icin", "İçin"],
  ["gercek", "gerçek"],
  ["Gercek", "Gerçek"],
  ["Gec ", "Geç "],
  ["gec ", "geç "],
  ["Gec\"", "Geç\""],
  ["gec\"", "geç\""],
  ["cozum", "çözüm"],
  ["Cozum", "Çözüm"],
  ["cozme", "çözme"],
  ["Cozme", "Çözme"],
  ["sonuclar", "sonuçlar"],
  ["Sonuclar", "Sonuçlar"],
  ["Coklu", "Çoklu"],
  ["coklu", "çoklu"],

  // --- Words missing İ (capital) ---
  ["Istatist", "İstatist"],
  ["Ilkeler", "İlkeler"],
  ["Ilke ", "İlke "],
  ["Icin ", "İçin "],
  ["Is Birligi", "İş Birliği"],
  ["Interaktif", "İnteraktif"],
  ["interaktif", "interaktif"],
  ["NEDEN BIZ", "NEDEN BİZ"],
  ["Ilerleme", "İlerleme"],
  ["Iletisim", "İletişim"],
  ["Icerik", "İçerik"],
  ["Icerigi", "İçeriği"],

  // --- Words missing ö ---
  ["ozel ", "özel "],
  ["Ozel ", "Özel "],
  ["ozeli", "özeli"],
  ["ogretmen", "öğretmen"],
  ["Ogretmen", "Öğretmen"],
  ["ogrenci", "öğrenci"],
  ["Ogrenci", "Öğrenci"],
  ["ogrenme", "öğrenme"],
  ["Ogrenme", "Öğrenme"],
  ["ogrenim", "öğrenim"],
  ["oneri", "öneri"],
  ["Oneri", "Öneri"],
  ["onem", "önem"],
  ["Onem", "Önem"],
  ["orneg", "örneğ"],
  ["Orneg", "Örneğ"],
  ["ornek", "örnek"],
  ["Ornek", "Örnek"],
  ["gorev", "görev"],
  ["Gorev", "Görev"],
  ["gorun", "görün"],
  ["gorus", "görüş"],
  ["gormeye", "görmeye"],
  ["gozetim", "gözetim"],
  ["Gozetim", "Gözetim"],
  ["yontem", "yöntem"],
  ["Yontem", "Yöntem"],
  ["yonlend", "yönlend"],
  ["Yonlend", "Yönlend"],
  ["yonetim", "yönetim"],
  ["Yonetim", "Yönetim"],
  ["yoneticileri", "yöneticileri"],

  // --- Words missing ü ---
  ["ustun", "üstün"],
  ["Ustun", "Üstün"],
  ["urun", "ürün"],
  ["Urun", "Ürün"],
  ["ucretli", "ücretli"],
  ["Ucretli", "Ücretli"],
  ["ucretsiz", "ücretsiz"],
  ["Ucretsiz", "Ücretsiz"],
  ["ucret", "ücret"],
  ["uretken", "üretken"],
  ["Uretken", "Üretken"],
  ["duzeyi", "düzeyi"],
  ["Duzeyi", "Düzeyi"],
  ["duzey", "düzey"],
  ["Duzey", "Düzey"],
  ["sureci", "süreci"],
  ["surec", "süreç"],
  ["Sureci", "Süreci"],
  ["dongu", "döngü"],
  ["Dongu", "Döngü"],
  ["modulu", "modülü"],
  ["modul", "modül"],
  ["Modulu", "Modülü"],
  ["mufredati", "müfredatı"],
  ["mufredat", "müfredat"],
  ["Mufredati", "Müfredatı"],
  ["Mufredat", "Müfredat"],
  ["butunlesik", "bütünleşik"],
  ["Butunlesik", "Bütünleşik"],
  ["butunsel", "bütünsel"],
  ["butuncul", "bütüncül"],
  ["butun", "bütün"],
  ["Butun", "Bütün"],
  ["kutuphane", "kütüphane"],
  ["Kutuphane", "Kütüphane"],
  ["surdurulebilir", "sürdürülebilir"],
  ["Surdurulebilir", "Sürdürülebilir"],
  ["yukselt", "yükselt"],
  ["Yukselt", "Yükselt"],
  ["yuksek", "yüksek"],
  ["Yuksek", "Yüksek"],
  ["gucunu", "gücünü"],
  ["gucu", "gücü"],
  ["guclu", "güçlü"],
  ["Guclu", "Güçlü"],
  ["ozguven", "özgüven"],
  ["Ozguven", "Özgüven"],
  ["guncelle", "güncelle"],
  ["yururluge", "yürürlüğe"],

  // --- Words with combined issues ---
  ["egitimcileri", "eğitimcileri"],
  ["egitimci", "eğitimci"],
  ["Egitimci", "Eğitimci"],
  ["egitici", "eğitici"],
  ["egitim", "eğitim"],
  ["Egitim", "Eğitim"],

  // --- Common endings that are safe to fix ---
  ["gun ", "gün "],
  ["gun\"", "gün\""],
  ["gun.", "gün."],
  ["gun,", "gün,"],
];

// Sort by length descending
const ALL_REPLACEMENTS = [...CORRUPTION_FIXES, ...WORD_REPLACEMENTS];
ALL_REPLACEMENTS.sort((a, b) => b[0].length - a[0].length);

// Remove no-ops
const FILTERED = ALL_REPLACEMENTS.filter(([w, c]) => w !== c);

function fixTurkish(text) {
  if (!text || typeof text !== "string") return text;
  let result = text;
  for (const [wrong, correct] of FILTERED) {
    if (result.includes(wrong)) {
      result = result.split(wrong).join(correct);
    }
  }
  return result;
}

function fixContent(obj) {
  if (typeof obj === "string") return fixTurkish(obj);
  if (Array.isArray(obj)) return obj.map(fixContent);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = fixContent(v);
    }
    return out;
  }
  return obj;
}

async function main() {
  const pagesRes = await fetch(`${ADMIN}/api/sayfalar`);
  const pages = await pagesRes.json();
  console.log(`Found ${pages.length} pages\n`);

  let fixedSections = 0;
  let fixedPages = 0;
  let allIssues = [];

  for (const page of pages) {
    const fullRes = await fetch(`${ADMIN}/api/sayfalar/${page.slug}`);
    const full = await fullRes.json();

    // Fix page title
    const fixedTitle = fixTurkish(full.title);
    if (fixedTitle !== full.title) {
      console.log(`PAGE [${page.slug}]: "${full.title}" → "${fixedTitle}"`);
      await fetch(`${ADMIN}/api/sayfalar/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: fixedTitle, slug: page.slug }),
      });
      fixedPages++;
    }

    // Fix section titles
    const fixedSectionTitle0 = fixTurkish(full.title);

    // Fix each section
    for (const section of full.sections || []) {
      const fixedSectionTitle = fixTurkish(section.title);
      let content;
      try {
        content = typeof section.content === "string"
          ? JSON.parse(section.content)
          : section.content;
      } catch {
        content = section.content;
      }

      const fixedContent = fixContent(content);
      const contentStr = JSON.stringify(content);
      const fixedContentStr = JSON.stringify(fixedContent);

      if (fixedSectionTitle !== section.title || contentStr !== fixedContentStr) {
        console.log(`  [${page.slug}/${section.sectionType}] fixed`);

        await fetch(`${ADMIN}/api/sayfalar/${page.slug}/sections/${section.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: fixedSectionTitle,
            visible: section.visible,
            content: fixedContentStr,
          }),
        });
        fixedSections++;
      }

      // Also scan for remaining ASCII Turkish to report
      const allText = fixedContentStr + " " + fixedSectionTitle;
      const asciiPatterns = [
        /\b\w*[^a-zçğıöşüÇĞİÖŞÜ\s\d"':;.,!?\-\/\\@#$%^&*()_+=\[\]{}|<>~`]\w*\b/gi
      ];
      // Simple check: look for common Turkish words still in ASCII
      const remaining = [];
      const checks = [
        [/\bcocuk/gi, "çocuk"],
        [/[^ş]ama\b/gi, "check -ama ending"],
        [/[^ğçşöüı]li\b/gi, "check -li ending"],
      ];
    }
  }

  console.log(`\n=== Done: ${fixedPages} pages, ${fixedSections} sections fixed ===`);

  // Verify key pages
  console.log("\n--- Verifying misyonumuz ---");
  const v1 = await (await fetch(`${ADMIN}/api/sayfalar/misyonumuz`)).json();
  for (const s of v1.sections) {
    const c = typeof s.content === "string" ? JSON.parse(s.content) : s.content;
    console.log(`[${s.sectionType}] title: ${c.title || ""} | highlight: ${c.titleHighlight || ""}`);
    if (c.description) console.log(`  desc: ${c.description.substring(0, 100)}`);
    if (c.items) c.items.forEach(i => console.log(`  - ${i.title}: ${(i.description||"").substring(0,60)}`));
    if (c.checkmarks) console.log(`  checkmarks: ${c.checkmarks.join(", ")}`);
    if (c.checklist) console.log(`  checklist: ${c.checklist.join(", ")}`);
  }

  console.log("\n--- Verifying anasayfa stats ---");
  const v2 = await (await fetch(`${ADMIN}/api/sayfalar/anasayfa`)).json();
  const statsSection = v2.sections.find(s => s.sectionType === "stats");
  if (statsSection) {
    const sc = typeof statsSection.content === "string" ? JSON.parse(statsSection.content) : statsSection.content;
    sc.items.forEach(i => console.log(`  ${i.label}`));
  }
  const lsSection = v2.sections.find(s => s.sectionType === "learning_steps");
  if (lsSection) {
    const lc = typeof lsSection.content === "string" ? JSON.parse(lsSection.content) : lsSection.content;
    console.log(`  learning_steps desc: ${(lc.description||"").substring(0, 100)}`);
  }
  const lmSection = v2.sections.find(s => s.sectionType === "learning_map");
  if (lmSection) {
    const mc = typeof lmSection.content === "string" ? JSON.parse(lmSection.content) : lmSection.content;
    console.log(`  learning_map title: ${mc.title}`);
    console.log(`  learning_map desc: ${mc.description}`);
  }
}

main().catch(console.error);
