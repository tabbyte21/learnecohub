#!/usr/bin/env node
// Comprehensive Turkish character fixer v3 - fixes via admin REST API
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// IMPORTANT: Patterns sorted longest first (done automatically below).
// Only use patterns that won't cause false positives.
const REPLACEMENTS = [
  // === Fix v2 bugs first ===
  ["Galerişi", "Galerisi"],  // Revert wrong replacement from v2

  // === Multi-word / phrase fixes ===
  ["hazırliyoruz. asdfasdfasdf", "hazırlıyoruz."],
  ["asdfasdfasdf", ""],
  ["Cocuklari yasama", "Çocukları yaşama"],
  ["Çocuklari yaşama", "Çocukları yaşama"],
  ["Çocuklari yasama", "Çocukları yaşama"],

  // === Words with ş ===
  ["yasama", "yaşama"],
  ["yasamda", "yaşamda"],
  ["yasamak", "yaşamak"],
  ["yasamin", "yaşamın"],
  ["yasami", "yaşamı"],
  ["yasam", "yaşam"],
  ["basarilari", "başarıları"],
  ["basarili", "başarılı"],
  ["basari", "başarı"],
  ["Basari", "Başarı"],
  ["arastirmaya", "araştırmaya"],
  ["arastirma", "araştırma"],
  ["Arastirma", "Araştırma"],
  ["ulastirmay", "ulaştırmay"],
  ["ulastirma", "ulaştırma"],
  ["ulastirir", "ulaştırır"],
  ["ulastir", "ulaştır"],
  ["ulasabil", "ulaşabil"],
  ["ulasim", "ulaşım"],
  ["sekillendirmek", "şekillendirmek"],
  ["Sekillendirmek", "Şekillendirmek"],
  ["sekillend", "şekillend"],
  ["Sekillend", "Şekillend"],
  ["esliginde", "eşliğinde"],
  ["esligi", "eşliği"],
  ["Esligi", "Eşliği"],
  ["isbirligi", "işbirliği"],
  ["iletisime", "iletişime"],
  ["iletisim", "iletişim"],
  ["Iletisim", "İletişim"],
  ["cesitliligi", "çeşitliliği"],
  ["cesitlilik", "çeşitlilik"],
  ["erisebilmesidir", "erişebilmesidir"],
  ["erisebil", "erişebil"],
  ["erisim", "erişim"],
  ["Erisim", "Erişim"],
  ["iliskiler", "ilişkiler"],
  ["Iliskiler", "İlişkiler"],
  ["iliskisi", "ilişkisi"],
  ["gelisimini", "gelişimini"],
  ["gelisim", "gelişim"],
  ["gelistiren", "geliştiren"],
  ["gelistir", "geliştir"],
  ["Gelistir", "Geliştir"],
  ["gelismeler", "gelişmeler"],
  ["gelisme", "gelişme"],
  ["degisim", "değişim"],
  ["degistirir", "değiştirir"],
  ["olcme", "ölçme"],
  ["Olcme", "Ölçme"],
  ["olcul", "ölçül"],
  ["olcumleme", "ölçümleme"],
  ["gerceklestir", "gerçekleştir"],
  ["Gerceklestir", "Gerçekleştir"],
  ["gosterir", "gösterir"],
  ["gosterge", "gösterge"],
  ["kosullar", "koşullar"],
  ["Kosullar", "Koşullar"],
  ["disinda", "dışında"],
  ["disina", "dışına"],
  ["baslangic", "başlangıç"],
  ["Baslangic", "Başlangıç"],
  ["baslayan", "başlayan"],
  ["baslam", "başlam"],
  ["baslat", "başlat"],
  ["baslik", "başlık"],
  ["basla", "başla"],
  ["Basla", "Başla"],
  ["calisanlari", "çalışanları"],
  ["Calisanlari", "Çalışanları"],
  ["calisanlariniz", "çalışanlarınız"],
  ["Calisanlariniz", "Çalışanlarınız"],
  ["calisma", "çalışma"],
  ["Calisma", "Çalışma"],
  ["calisan", "çalışan"],
  ["Calisan", "Çalışan"],
  ["calis", "çalış"],
  ["Calis", "Çalış"],
  ["donusum", "dönüşüm"],
  ["Donusum", "Dönüşüm"],
  ["donusu", "dönüşü"],
  ["etkilesim", "etkileşim"],
  ["paylasim", "paylaşım"],
  ["Paylasim", "Paylaşım"],
  ["paylasan", "paylaşan"],
  ["karsilast", "karşılaşt"],
  ["karsisinda", "karşısında"],
  ["karsilik", "karşılık"],
  ["guclendiriyoruz", "güçlendiriyoruz"],
  ["Guclendiriyoruz", "Güçlendiriyoruz"],
  ["guclendir", "güçlendir"],
  ["Guclendir", "Güçlendir"],
  ["paylasiyoruz", "paylaşıyoruz"],
  ["hazirliyoruz", "hazırlıyoruz"],
  ["hazırliyoruz", "hazırlıyoruz"],

  // === Words with ğ ===
  ["cocugunuzun", "çocuğunuzun"],
  ["Cocugunuzun", "Çocuğunuzun"],
  ["cocugunuz", "çocuğunuz"],
  ["Cocugunuz", "Çocuğunuz"],
  ["cocugunun", "çocuğunun"],
  ["cocuklari", "çocukları"],
  ["Cocuklari", "Çocukları"],
  ["Çocuklari", "Çocukları"],
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
  ["toplulugu", "topluluğu"],

  // === Words with ı (dotless i) ===
  ["hazırli", "hazırlı"],
  ["katilin", "katılın"],
  ["Katilin", "Katılın"],
  ["katilim", "katılım"],
  ["Katilim", "Katılım"],
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
  ["araci", "aracı"],
  ["Araci", "Aracı"],
  ["rolunu", "rolünü"],
  ["Aninda", "Anında"],
  ["aninda", "anında"],
  ["yakindan", "yakından"],
  ["birligi", "birliği"],
  ["karti ", "kartı "],
  ["bakisi", "bakışı"],
  ["zekasini", "zekâsını"],

  // === Words with ç ===
  ["gercek", "gerçek"],
  ["Gercek", "Gerçek"],
  ["gecis", "geçiş"],
  ["Gecis", "Geçiş"],
  ["icerigi", "içeriği"],
  ["Icerigi", "İçeriği"],
  ["icerik", "içerik"],
  ["Icerik", "İçerik"],
  ["icinde", "içinde"],
  ["Icinde", "İçinde"],
  ["iceren", "içeren"],
  ["Iceren", "İçeren"],
  ["Gec ", "Geç "],
  ["gec ", "geç "],
  ["cozum", "çözüm"],
  ["Cozum", "Çözüm"],
  ["cozme", "çözme"],
  ["Cozme", "Çözme"],

  // === Words with İ (capital dotted I) ===
  ["Istatist", "İstatist"],
  ["Ilkeler", "İlkeler"],
  ["Ilke ", "İlke "],
  ["Is Birligi", "İş Birliği"],
  ["Is birligi", "İş birliği"],
  ["Icin ", "İçin "],

  // === Words with ö ===
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
  ["gozetim", "gözetim"],
  ["Gozetim", "Gözetim"],
  ["yontem", "yöntem"],
  ["Yontem", "Yöntem"],
  ["yonlend", "yönlend"],
  ["Yonlend", "Yönlend"],
  ["yonetim", "yönetim"],
  ["Yonetim", "Yönetim"],
  ["yoneticileri", "yöneticileri"],

  // === Words with ü ===
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

  // === Words with combined special chars ===
  ["egitimcileri", "eğitimcileri"],
  ["egitimci", "eğitimci"],
  ["Egitimci", "Eğitimci"],
  ["egitici", "eğitici"],
  ["egitim", "eğitim"],
  ["Egitim", "Eğitim"],
  ["olusturul", "oluşturul"],
  ["olustur", "oluştur"],
  ["Olustur", "Oluştur"],
  ["olusumu", "oluşumu"],
  ["etkinligi", "etkinliği"],
  ["programi", "programı"],

  // === Remaining patterns from content ===
  ["sorumlulugun", "sorumluluğun"],
  ["verimlilig", "verimliliğ"],
  ["destegi", "desteği"],
  ["uygulanabilirligi", "uygulanabilirliği"],

  // === Common word endings with ı ===
  ["ulasmayi", "ulaşmayı"],
  ["ulaştırmayi", "ulaştırmayı"],
  ["ulaştirmayı", "ulaştırmayı"],
  ["ulaştirmayi", "ulaştırmayı"],
  ["destekliyor", "destekliyor"],
  ["hedefliyoruz", "hedefliyoruz"],
];

// Sort by length descending so longer matches take precedence
REPLACEMENTS.sort((a, b) => b[0].length - a[0].length);

// Remove entries where wrong === correct (no-ops)
const FILTERED = REPLACEMENTS.filter(([w, c]) => w !== c);

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

  for (const page of pages) {
    const fullRes = await fetch(`${ADMIN}/api/sayfalar/${page.slug}`);
    const full = await fullRes.json();

    // Fix page title
    const fixedTitle = fixTurkish(full.title);
    if (fixedTitle !== full.title) {
      console.log(`PAGE: "${full.title}" → "${fixedTitle}"`);
      await fetch(`${ADMIN}/api/sayfalar/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: fixedTitle, slug: page.slug }),
      });
      fixedPages++;
    }

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
        const changes = [];
        if (fixedSectionTitle !== section.title) changes.push(`title: "${section.title}" → "${fixedSectionTitle}"`);
        if (contentStr !== fixedContentStr) changes.push("content updated");
        console.log(`  [${page.slug}/${section.sectionType}] ${changes.join(", ")}`);

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
    }
  }

  console.log(`\n=== Done: ${fixedPages} pages, ${fixedSections} sections fixed ===`);

  // Verify misyonumuz
  console.log("\n--- Verifying misyonumuz ---");
  const verifyRes = await fetch(`${ADMIN}/api/sayfalar/misyonumuz`);
  const verify = await verifyRes.json();
  for (const s of verify.sections) {
    const c = typeof s.content === "string" ? JSON.parse(s.content) : s.content;
    console.log(`\n[${s.sectionType}]`);
    if (c.title) console.log(`  title: ${c.title}`);
    if (c.titleHighlight) console.log(`  titleHighlight: ${c.titleHighlight}`);
    if (c.description) console.log(`  desc: ${c.description}`);
    if (c.items) {
      for (const item of c.items.slice(0, 3)) {
        if (item.title) console.log(`  - ${item.title}: ${(item.description || "").substring(0, 60)}`);
      }
    }
  }
}

main().catch(console.error);
