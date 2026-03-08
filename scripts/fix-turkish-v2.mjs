#!/usr/bin/env node
// Comprehensive Turkish character fixer - works via admin REST API
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Word-level Turkish replacements: ASCII → proper Turkish
// Format: [wrong, correct]
const REPLACEMENTS = [
  // ---- ş replacements ----
  ["yasama", "yaşama"],
  ["yasam ", "yaşam "],
  ["yasamda", "yaşamda"],
  ["yasamak", "yaşamak"],
  ["yasamin", "yaşamın"],
  ["yasami", "yaşamı"],
  ["basari", "başarı"],
  ["Basari", "Başarı"],
  ["basarı", "başarı"],
  ["arastirma", "araştırma"],
  ["Arastirma", "Araştırma"],
  ["ulastir", "ulaştır"],
  ["ulastirir", "ulaştırır"],
  ["ulastirma", "ulaştırma"],
  ["sekillend", "şekillend"],
  ["Sekillend", "Şekillend"],
  ["sekillen", "şekillen"],
  ["esligi", "eşliği"],
  ["Esligi", "Eşliği"],
  ["esliginde", "eşliğinde"],
  ["isbirligi", "işbirliği"],
  ["Is Birligi", "İş Birliği"],
  ["iletisim", "iletişim"],
  ["Iletisim", "İletişim"],
  ["iletisime", "iletişime"],
  ["cesitliligi", "çeşitliliği"],
  ["cesitlilik", "çeşitlilik"],
  ["erisebil", "erişebil"],
  ["erisim", "erişim"],
  ["erisi", "erişi"],
  ["Erisim", "Erişim"],
  ["iliskiler", "ilişkiler"],
  ["Iliskiler", "İlişkiler"],
  ["iliskisi", "ilişkisi"],
  ["gelisim", "gelişim"],
  ["gelistir", "geliştir"],
  ["Gelistir", "Geliştir"],
  ["gelisme", "gelişme"],
  ["degisim", "değişim"],
  ["degistirir", "değiştirir"],
  ["olcme", "ölçme"],
  ["Olcme", "Ölçme"],
  ["olcul", "ölçül"],
  ["gerceklestir", "gerçekleştir"],
  ["Gerceklestir", "Gerçekleştir"],
  ["gosterir", "gösterir"],
  ["gosterge", "gösterge"],
  ["kosullar", "koşullar"],
  ["Kosullar", "Koşullar"],
  ["disinda", "dışında"],
  ["disina", "dışına"],
  ["basla", "başla"],
  ["Basla", "Başla"],
  ["baslang", "başlang"],
  ["Baslang", "Başlang"],
  ["baslat", "başlat"],
  ["baslayan", "başlayan"],
  ["baslam", "başlam"],
  ["baslık", "başlık"],
  ["calis", "çalış"],
  ["Calis", "Çalış"],
  ["calisan", "çalışan"],
  ["Calisan", "Çalışan"],
  ["calisma", "çalışma"],
  ["Calisma", "Çalışma"],
  ["uygulamasi", "uygulaması"],
  ["donusum", "dönüşüm"],
  ["Donusum", "Dönüşüm"],
  ["donusu", "dönüşü"],
  ["atölyelesi", "atölyesi"],
  ["etkilesim", "etkileşim"],
  ["paylasim", "paylaşım"],
  ["Paylasim", "Paylaşım"],
  ["paylasan", "paylaşan"],
  ["karsilast", "karşılaşt"],
  ["karsisinda", "karşısında"],
  ["karsılasılan", "karşılaşılan"],
  ["sasırtıcı", "şaşırtıcı"],
  ["guclendiriyoruz", "güçlendiriyoruz"],
  ["Guclendiriyoruz", "Güçlendiriyoruz"],
  ["guclend", "güçlend"],
  ["Guclend", "Güçlend"],

  // ---- ğ replacements ----
  ["cocuga", "çocuğa"],
  ["cocugu", "çocuğu"],
  ["cocugun", "çocuğun"],
  ["Cocugun", "Çocuğun"],
  ["cocugunuz", "çocuğunuz"],
  ["Cocugunuz", "Çocuğunuz"],
  ["cocuklari", "çocukları"],
  ["Cocuklari", "Çocukları"],
  ["cocuklar", "çocuklar"],
  ["Cocuklar", "Çocuklar"],
  ["dagilim", "dağılım"],
  ["dogru", "doğru"],
  ["Dogru", "Doğru"],
  ["dogrulama", "doğrulama"],
  ["programa", "programa"],
  ["programi", "programı"],
  ["ogretmen", "öğretmen"],
  ["Ogretmen", "Öğretmen"],
  ["ogrenci", "öğrenci"],
  ["Ogrenci", "Öğrenci"],
  ["ogrenme", "öğrenme"],
  ["Ogrenme", "Öğrenme"],
  ["ogrenim", "öğrenim"],
  ["uygulamalar", "uygulamalar"],
  ["degerlendirme", "değerlendirme"],
  ["Degerlendirme", "Değerlendirme"],
  ["deger", "değer"],
  ["Deger", "Değer"],
  ["sagla", "sağla"],
  ["Sagla", "Sağla"],
  ["saglam", "sağlam"],
  ["saglik", "sağlık"],
  ["saglık", "sağlık"],
  ["bilgi", "bilgi"],
  ["teknolojiy", "teknolojiy"],
  ["geleceg", "geleceg"],
  ["gelecegi", "geleceği"],
  ["gelecegini", "geleceğini"],
  ["stratejig", "stratejig"],
  ["guvende", "güvende"],
  ["guvenli", "güvenli"],
  ["Guvenli", "Güvenli"],
  ["guvenlig", "güvenliğ"],

  // ---- ı replacements ----
  ["Cocuklari", "Çocukları"],
  ["hazırliyoruz", "hazırlıyoruz"],
  ["basarilari", "başarıları"],
  ["karsılıyor", "karşılıyor"],
  ["karsilik", "karşılık"],
  ["katilin", "katılın"],
  ["Katilin", "Katılın"],
  ["katilim", "katılım"],
  ["Katilim", "Katılım"],
  ["yapilir", "yapılır"],
  ["yapilan", "yapılan"],
  ["alani", "alanı"],
  ["alanlar", "alanlar"],
  ["olanagi", "olanağı"],
  ["olanak", "olanak"],
  ["araci", "aracı"],
  ["Araci", "Aracı"],
  ["araciligi", "aracılığı"],
  ["sinifi", "sınıfı"],
  ["sinif", "sınıf"],
  ["Sinif", "Sınıf"],
  ["Sinifi", "Sınıfı"],
  ["takibi", "takibi"],
  ["takip", "takip"],
  ["karti ", "kartı "],
  ["Aninda", "Anında"],
  ["aninda", "anında"],
  ["yakindan", "yakından"],
  ["kapsamli", "kapsamlı"],
  ["Kapsamli", "Kapsamlı"],
  ["icin ", "için "],
  ["Icin ", "İçin "],
  ["oncelik", "öncelik"],
  ["Oncelik", "Öncelik"],
  ["oncelikli", "öncelikli"],
  ["odakli", "odaklı"],
  ["Odakli", "Odaklı"],
  ["uyumlu", "uyumlu"],
  ["ilkokul", "ilkokul"],
  ["ortaokul", "ortaokul"],
  ["farkindalik", "farkındalık"],
  ["Farkindalik", "Farkındalık"],
  ["farkindalıgi", "farkındalığı"],
  ["farkindali", "farkındalı"],
  ["Ozfarkindalik", "Öz Farkındalık"],
  ["zekasini", "zekâsını"],
  ["musteri", "müşteri"],
  ["Musteri", "Müşteri"],
  ["guclu", "güçlü"],
  ["Guclu", "Güçlü"],
  ["ozguven", "özgüven"],
  ["Ozguven", "Özgüven"],
  ["ucretsiz", "ücretsiz"],
  ["Ucretsiz", "Ücretsiz"],
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
  ["olustur", "oluştur"],
  ["Olustur", "Oluştur"],
  ["olusumu", "oluşumu"],
  ["egitim", "eğitim"],
  ["Egitim", "Eğitim"],
  ["egitimci", "eğitimci"],
  ["Egitimci", "Eğitimci"],
  ["egitici", "eğitici"],
  ["cozum", "çözüm"],
  ["Cozum", "Çözüm"],
  ["cozme", "çözme"],
  ["Cozme", "Çözme"],

  // ---- ç replacements ----
  ["gercek", "gerçek"],
  ["Gercek", "Gerçek"],
  ["gec ", "geç "],
  ["Gec ", "Geç "],
  ["gecis", "geçiş"],
  ["Gecis", "Geçiş"],
  ["icerigi", "içeriği"],
  ["icerik", "içerik"],
  ["Icerik", "İçerik"],
  ["Icerigi", "İçeriği"],
  ["icinde", "içinde"],
  ["Icinde", "İçinde"],
  ["iceren", "içeren"],
  ["Iceren", "İçeren"],
  ["ic ", "iç "],
  ["uc ", "üç "],
  ["yetkinlic", "yetkinliç"],

  // ---- İ/ı replacements ----
  ["Istatist", "İstatist"],
  ["Ilkeler", "İlkeler"],
  ["Ilke ", "İlke "],

  // ---- ö replacements ----
  ["ozel ", "özel "],
  ["Ozel ", "Özel "],
  ["ozeli", "özeli"],
  ["ogret", "öğret"],
  ["Ogret", "Öğret"],
  ["ogren", "öğren"],
  ["Ogren", "Öğren"],
  ["ogrenc", "öğrenc"],
  ["onderi", "önderi"],
  ["onder", "önder"],
  ["oneri", "öneri"],
  ["Oneri", "Öneri"],
  ["onem", "önem"],
  ["Onem", "Önem"],
  ["orneg", "örneğ"],
  ["Orneg", "Örneğ"],
  ["ornek", "örnek"],
  ["Ornek", "Örnek"],
  ["ortam", "ortam"],
  ["gorev", "görev"],
  ["Gorev", "Görev"],
  ["gorun", "görün"],
  ["gorus", "görüş"],

  // ---- ü replacements ----
  ["ustun", "üstün"],
  ["Ustun", "Üstün"],
  ["ustluk", "üstlük"],
  ["urun", "ürün"],
  ["Urun", "Ürün"],

  // ---- Whole word patterns ----
  ["Amacimiz", "Amacımız"],
  ["amacimiz", "amacımız"],
  ["amaci", "amacı"],
  ["Adimlari", "Adımları"],
  ["Adim ", "Adım "],
  ["adim", "adım"],
  ["Adimlari", "Adımları"],
  ["Haritasi", "Haritası"],
  ["haritasi", "haritası"],
  ["etkinligi", "etkinliği"],
  ["etkinlik", "etkinlik"],
  ["faaliyetleri", "faaliyetleri"],
  ["kazanimi", "kazanımı"],
  ["kazanim", "kazanım"],
  ["Kazanim", "Kazanım"],
  ["birligi", "birliği"],
  ["isbirligi", "işbirliği"],
  ["boyutlu", "boyutlu"],
  ["rolunu", "rolünü"],
  ["surdurulebilir", "sürdürülebilir"],
  ["Surdurulebilir", "Sürdürülebilir"],
  ["toplulugu", "topluluğu"],
  ["topluluk", "topluluk"],
  ["duygusal", "duygusal"],
  ["ulasabil", "ulaşabil"],
  ["ulasim", "ulaşım"],

  // ---- Specific phrases seen in content ----
  ["hazırliyoruz. asdfasdfasdf", "hazırlıyoruz."],
  ["asdfasdfasdf", ""],
  ["Calisanlari", "Çalışanları"],
  ["calisanlari", "çalışanları"],
  ["Calisanlariniz", "Çalışanlarınız"],
  ["calisanlariniz", "çalışanlarınız"],
  ["baslangic", "başlangıç"],
  ["Baslangic", "Başlangıç"],
  ["guclendir", "güçlendir"],
  ["Guclendir", "Güçlendir"],
  ["gozetim", "gözetim"],
  ["Gozetim", "Gözetim"],
  ["olcumleme", "ölçümleme"],
  ["yukselt", "yükselt"],
  ["Yukselt", "Yükselt"],
  ["yuksek", "yüksek"],
  ["Yuksek", "Yüksek"],
  ["uygulanabilirligi", "uygulanabilirliği"],
  ["belirlemesi", "belirlemesi"],
  ["dogrudan", "doğrudan"],
  ["butunlesik", "bütünleşik"],
  ["Butunlesik", "Bütünleşik"],
  ["butunsel", "bütünsel"],
  ["butun", "bütün"],
  ["Butun", "Bütün"],
  ["destegi", "desteği"],
  ["destek", "destek"],
  ["yontem", "yöntem"],
  ["Yontem", "Yöntem"],
  ["yonlend", "yönlend"],
  ["Yonlend", "Yönlend"],
  ["yonetim", "yönetim"],
  ["Yonetim", "Yönetim"],
  ["yoneticileri", "yöneticileri"],
  ["kutuphane", "kütüphane"],
  ["Kutuphane", "Kütüphane"],
  ["tutor", "tütör"],
  ["kutlama", "kutlama"],
  ["becerileriy", "becerileriy"],
  ["verimlilig", "verimliliğ"],
  ["verimlilik", "verimlilik"],
  ["sorumlulugun", "sorumluluğun"],
  ["sorumluluk", "sorumluluk"],
  ["grubu", "grubu"],
  ["grup", "grup"],
  ["ucretli", "ücretli"],
  ["Ucretli", "Ücretli"],
  ["ucret", "ücret"],
  ["uretken", "üretken"],
  ["Uretken", "Üretken"],
  ["saglıyor", "sağlıyor"],
  ["gucunu", "gücünü"],
  ["gucu", "gücü"],
  ["yururluge", "yürürlüğe"],
  ["guncelle", "güncelle"],
];

// Sort by length descending so longer matches take precedence
REPLACEMENTS.sort((a, b) => b[0].length - a[0].length);

function fixTurkish(text) {
  if (!text || typeof text !== "string") return text;
  let result = text;
  for (const [wrong, correct] of REPLACEMENTS) {
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
  // 1. Fetch all pages
  const pagesRes = await fetch(`${ADMIN}/api/sayfalar`);
  const pages = await pagesRes.json();
  console.log(`Found ${pages.length} pages\n`);

  let fixedSections = 0;
  let fixedPages = 0;

  for (const page of pages) {
    // 2. Fetch full page with sections
    const fullRes = await fetch(`${ADMIN}/api/sayfalar/${page.slug}`);
    const full = await fullRes.json();

    // 3. Fix page title
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

    // 4. Fix each section
    for (const section of full.sections || []) {
      // Fix section title
      const fixedSectionTitle = fixTurkish(section.title);

      // Fix section content
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
        console.log(`  SECTION [${section.sectionType}]: ${changes.join(", ")}`);

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
    console.log(`[${s.sectionType}] title: ${c.title || "(no title)"}`);
    if (c.description) console.log(`  desc: ${c.description.substring(0, 80)}...`);
  }
}

main().catch(console.error);
