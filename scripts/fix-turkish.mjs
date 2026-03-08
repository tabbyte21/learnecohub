// Comprehensive Turkish character fixer via admin API
const BASE = "https://learnecohub-admin-production.up.railway.app";

const REPLACEMENTS = [
  // Page titles
  ["Sinif Seviyelerine Gore Mufredat", "Sınıf Seviyelerine Göre Müfredat"],
  ["Ucretsiz Kaynaklar ve Etkinlikler", "Ücretsiz Kaynaklar ve Etkinlikler"],
  ["Akademik Yaklasimimiz", "Akademik Yaklaşımımız"],
  ["Ogrenme Ekosistemi", "Öğrenme Ekosistemi"],
  ["Basari Hikayeleri", "Başarı Hikayeleri"],
  ["Yetkinlik Alanlarimiz", "Yetkinlik Alanlarımız"],
  ["Profesyoneller Icin", "Profesyoneller İçin"],
  ["Aileler Icin", "Aileler İçin"],
  ["Okullar Icin", "Okullar İçin"],
  ["Ilkelerimiz", "İlkelerimiz"],

  // Compound terms (longer first)
  ["sosyal-duygusal ogrenme", "sosyal-duygusal öğrenme"],
  ["Sosyal-Duygusal Ogrenme", "Sosyal-Duygusal Öğrenme"],
  ["sosyal-duygusal gelisim", "sosyal-duygusal gelişim"],
  ["Sosyal-Duygusal Gelisim", "Sosyal-Duygusal Gelişim"],
  ["surdurulebilir kalkinma", "sürdürülebilir kalkınma"],
  ["Surdurulebilir Kalkinma", "Sürdürülebilir Kalkınma"],
  ["surdurulebilirlik", "sürdürülebilirlik"],
  ["Surdurulebilirlik", "Sürdürülebilirlik"],
  ["SURDURULEBILIRLIK", "SÜRDÜRÜLEBİLİRLİK"],

  // İletişim
  ["Iletisim Becerileri", "İletişim Becerileri"],
  ["ILETISIM BECERILERI", "İLETİŞİM BECERİLERİ"],
  ["iletisim becerileri", "iletişim becerileri"],
  ["Iletisime Gecin", "İletişime Geçin"],
  ["iletisime gecin", "iletişime geçin"],
  ["Iletisime", "İletişime"],
  ["iletisime", "iletişime"],
  ["Iletisim", "İletişim"],
  ["iletisim", "iletişim"],
  ["ILETISIM", "İLETİŞİM"],

  // Öğrenme
  ["OGRENME EKOSISTEMI", "ÖĞRENME EKOSİSTEMİ"],
  ["OGRENME MODELI", "ÖĞRENME MODELİ"],
  ["ogrenme yolculugu", "öğrenme yolculuğu"],
  ["Ogrenme Yolculugu", "Öğrenme Yolculuğu"],
  ["ogrenme deneyimi", "öğrenme deneyimi"],
  ["Ogrenme Deneyimi", "Öğrenme Deneyimi"],
  ["ogrenme modeli", "öğrenme modeli"],
  ["ogrenme ortami", "öğrenme ortamı"],
  ["ogrenme", "öğrenme"],
  ["Ogrenme", "Öğrenme"],
  ["OGRENME", "ÖĞRENME"],

  // Öğretmen
  ["ogretmenler icin", "öğretmenler için"],
  ["Ogretmenler Icin", "Öğretmenler İçin"],
  ["OGRETMENLER ICIN", "ÖĞRETMENLER İÇİN"],
  ["ogretmenlere", "öğretmenlere"],
  ["ogretmenler", "öğretmenler"],
  ["ogretmen", "öğretmen"],
  ["Ogretmen", "Öğretmen"],
  ["OGRETMEN", "ÖĞRETMEN"],

  // Öğrenci
  ["ogrenciler icin", "öğrenciler için"],
  ["Ogrenciler Icin", "Öğrenciler İçin"],
  ["OGRENCILER ICIN", "ÖĞRENCİLER İÇİN"],
  ["ogrencinin", "öğrencinin"],
  ["ogrencilerin", "öğrencilerin"],
  ["ogrenciler", "öğrenciler"],
  ["ogrenci", "öğrenci"],
  ["Ogrenci", "Öğrenci"],
  ["OGRENCI", "ÖĞRENCİ"],

  // Gelişim
  ["gelisim haritasi", "gelişim haritası"],
  ["Gelisim Haritasi", "Gelişim Haritası"],
  ["GELISIM HARITASI", "GELİŞİM HARİTASI"],
  ["gelisim raporu", "gelişim raporu"],
  ["Gelisim Raporu", "Gelişim Raporu"],
  ["gelisimini", "gelişimini"],
  ["gelisimi", "gelişimi"],
  ["gelisim", "gelişim"],
  ["Gelisim", "Gelişim"],
  ["GELISIM", "GELİŞİM"],
  ["gelistirme", "geliştirme"],
  ["Gelistirme", "Geliştirme"],
  ["gelistiren", "geliştiren"],
  ["gelistir", "geliştir"],
  ["Gelistir", "Geliştir"],

  // Farkındalık
  ["Oz Farkindalik", "Öz Farkındalık"],
  ["oz farkindalik", "öz farkındalık"],
  ["OZ FARKINDALIK", "ÖZ FARKINDALIK"],
  ["Sosyal Farkindalik", "Sosyal Farkındalık"],
  ["sosyal farkindalik", "sosyal farkındalık"],
  ["farkindalik", "farkındalık"],
  ["Farkindalik", "Farkındalık"],
  ["FARKINDALIK", "FARKINDALIK"],

  // Yönetim
  ["Oz Yonetim", "Öz Yönetim"],
  ["oz yonetim", "öz yönetim"],
  ["OZ YONETIM", "ÖZ YÖNETİM"],
  ["stres yonetimi", "stres yönetimi"],
  ["Stres Yonetimi", "Stres Yönetimi"],
  ["duygu yonetimi", "duygu yönetimi"],
  ["Duygu Yonetimi", "Duygu Yönetimi"],
  ["yonetim", "yönetim"],
  ["Yonetim", "Yönetim"],
  ["YONETIM", "YÖNETİM"],

  // Çocuk
  ["Cocuk Merkezlilik", "Çocuk Merkezlilik"],
  ["cocuk merkezlilik", "çocuk merkezlilik"],
  ["cocugunuzun", "çocuğunuzun"],
  ["Cocugunuzun", "Çocuğunuzun"],
  ["cocuklarin", "çocukların"],
  ["Cocuklarin", "Çocukların"],
  ["cocuklara", "çocuklara"],
  ["Cocuklara", "Çocuklara"],
  ["cocuklar", "çocuklar"],
  ["Cocuklar", "Çocuklar"],
  ["cocugun", "çocuğun"],
  ["Cocugun", "Çocuğun"],
  ["cocugu", "çocuğu"],
  ["cocuk", "çocuk"],
  ["Cocuk", "Çocuk"],
  ["COCUK", "ÇOCUK"],

  // Güvenlik
  ["Guvenlik ve Gizlilik", "Güvenlik ve Gizlilik"],
  ["guvenligi", "güvenliği"],
  ["Guvenligi", "Güvenliği"],
  ["guvenlik", "güvenlik"],
  ["Guvenlik", "Güvenlik"],
  ["GUVENLIK", "GÜVENLİK"],
  ["guvenli", "güvenli"],
  ["Guvenli", "Güvenli"],

  // Başarı
  ["basarili", "başarılı"],
  ["Basarili", "Başarılı"],
  ["basarilari", "başarıları"],
  ["basari", "başarı"],
  ["Basari", "Başarı"],
  ["BASARI", "BAŞARI"],

  // Müfredat
  ["mufredati", "müfredatı"],
  ["Mufredati", "Müfredatı"],
  ["mufredat", "müfredat"],
  ["Mufredat", "Müfredat"],
  ["MUFREDAT", "MÜFREDAT"],

  // Etkileşim
  ["etkilesimli", "etkileşimli"],
  ["Etkilesimli", "Etkileşimli"],
  ["ETKILESIMLI", "ETKİLEŞİMLİ"],
  ["etkilesim", "etkileşim"],
  ["Etkilesim", "Etkileşim"],

  // Ölçme
  ["olcme ve degerlendirme", "ölçme ve değerlendirme"],
  ["Olcme ve Degerlendirme", "Ölçme ve Değerlendirme"],
  ["olculebilir", "ölçülebilir"],
  ["Olculebilir", "Ölçülebilir"],
  ["olcme", "ölçme"],
  ["Olcme", "Ölçme"],
  ["olcum", "ölçüm"],
  ["Olcum", "Ölçüm"],

  // Düşünme
  ["elestirel dusunme", "eleştirel düşünme"],
  ["Elestirel Dusunme", "Eleştirel Düşünme"],
  ["dusunme", "düşünme"],
  ["Dusunme", "Düşünme"],

  // Çerçeve
  ["CASEL cercevesi", "CASEL çerçevesi"],
  ["CASEL Cercevesi", "CASEL Çerçevesi"],
  ["cercevesine", "çerçevesine"],
  ["cercevesi", "çerçevesi"],
  ["cerceve", "çerçeve"],
  ["Cerceve", "Çerçeve"],

  // Eğitim
  ["egitim anlayisi", "eğitim anlayışı"],
  ["Egitim Anlayisi", "Eğitim Anlayışı"],
  ["egitimci", "eğitimci"],
  ["Egitimci", "Eğitimci"],
  ["egitim", "eğitim"],
  ["Egitim", "Eğitim"],
  ["EGITIM", "EĞİTİM"],

  // Değerlendirme / Değer
  ["degerlendirme", "değerlendirme"],
  ["Degerlendirme", "Değerlendirme"],
  ["degerlere", "değerlere"],
  ["degerler", "değerler"],
  ["Degerler", "Değerler"],
  ["degerleri", "değerleri"],
  ["deger", "değer"],
  ["Deger", "Değer"],

  // Çalışma
  ["Takim Calismasi", "Takım Çalışması"],
  ["takim calismasi", "takım çalışması"],
  ["calisanlarin", "çalışanların"],
  ["calisan", "çalışan"],
  ["Calisan", "Çalışan"],
  ["calisma", "çalışma"],
  ["Calisma", "Çalışma"],
  ["calisiyoruz", "çalışıyoruz"],

  // Çözme
  ["Problem Cozme", "Problem Çözme"],
  ["problem cozme", "problem çözme"],
  ["cozumleri", "çözümleri"],
  ["cozumler", "çözümler"],
  ["cozum", "çözüm"],
  ["Cozum", "Çözüm"],
  ["cozme", "çözme"],
  ["Cozme", "Çözme"],

  // İlke
  ["ILKELERIMIZ", "İLKELERİMİZ"],
  ["ilkelerimiz", "ilkelerimiz"],
  ["Ilkeleri", "İlkeleri"],

  // Ücretsiz
  ["ucretsiz", "ücretsiz"],
  ["Ucretsiz", "Ücretsiz"],
  ["UCRETSIZ", "ÜCRETSİZ"],

  // Yetkinlik
  ["YETKINLIK ALANLARI", "YETKİNLİK ALANLARI"],
  ["Yetkinlik Alanlari", "Yetkinlik Alanları"],
  ["yetkinlik alanlari", "yetkinlik alanları"],
  ["Yetkinlik", "Yetkinlik"],

  // Sınıf
  ["SINIF SEVIYELERI", "SINIF SEVİYELERİ"],
  ["Sinif Seviyeleri", "Sınıf Seviyeleri"],
  ["sinif seviyeleri", "sınıf seviyeleri"],
  ["sinif", "sınıf"],
  ["Sinif", "Sınıf"],

  // Various important words
  ["Butunsel", "Bütünsel"],
  ["butunsel", "bütünsel"],
  ["BUTUNSEL", "BÜTÜNSEL"],
  ["Iliski Becerileri", "İlişki Becerileri"],
  ["Iliski", "İlişki"],
  ["iliski", "ilişki"],
  ["ozguven", "özgüven"],
  ["Ozguven", "Özgüven"],
  ["ozdisiplin", "özdisiplin"],
  ["Ozdisiplin", "Özdisiplin"],
  ["guclendiren", "güçlendiren"],
  ["gucleri", "güçleri"],
  ["guclu", "güçlü"],
  ["Guclu", "Güçlü"],

  // Verb patterns
  ["olusturan", "oluşturan"],
  ["olusturulan", "oluşturulan"],
  ["olusturuyoruz", "oluşturuyoruz"],
  ["olusturuyor", "oluşturuyor"],
  ["olustur", "oluştur"],
  ["Olustur", "Oluştur"],
  ["kesfetmek", "keşfetmek"],
  ["kesfedin", "keşfedin"],
  ["kesfet", "keşfet"],
  ["Kesfet", "Keşfet"],
  ["gerceklestir", "gerçekleştir"],
  ["Gerceklestir", "Gerçekleştir"],
  ["gercek", "gerçek"],
  ["Gercek", "Gerçek"],
  ["tasarlanmis", "tasarlanmış"],
  ["Tasarlanmis", "Tasarlanmış"],
  ["zenginlestirilmis", "zenginleştirilmiş"],
  ["yapilmis", "yapılmış"],
  ["hazirlanmis", "hazırlanmış"],
  ["Hazirlanmis", "Hazırlanmış"],
  ["kazandirmak", "kazandırmak"],
  ["kazandirir", "kazandırır"],
  ["kazandiran", "kazandıran"],
  ["kolaylastiran", "kolaylaştıran"],
  ["Kolaylastiran", "Kolaylaştıran"],
  ["kolaylastirir", "kolaylaştırır"],
  ["kisisellestirilmis", "kişiselleştirilmiş"],
  ["Kisisellestirilmis", "Kişiselleştirilmiş"],
  ["kisisel", "kişisel"],
  ["Kisisel", "Kişisel"],
  ["yaklasimimiz", "yaklaşımımız"],
  ["Yaklasimimiz", "Yaklaşımımız"],
  ["yaklasim", "yaklaşım"],
  ["Yaklasim", "Yaklaşım"],
  ["YAKLASIM", "YAKLAŞIM"],
  ["paylasim", "paylaşım"],
  ["Paylasim", "Paylaşım"],
  ["erisim", "erişim"],
  ["Erisim", "Erişim"],

  // İçin / İçerik
  ["icerikler", "içerikler"],
  ["Icerikler", "İçerikler"],
  ["icerik", "içerik"],
  ["Icerik", "İçerik"],
  ["ICERIK", "İÇERİK"],
  ["isbirligi", "işbirliği"],
  ["is birligi", "iş birliği"],
  ["Is Birligi", "İş Birliği"],

  // Başla
  ["baslayabilirsiniz", "başlayabilirsiniz"],
  ["baslayabilir", "başlayabilir"],
  ["baslatilir", "başlatılır"],
  ["baslatma", "başlatma"],
  ["baslayin", "başlayın"],
  ["Baslayin", "Başlayın"],
  ["baslat", "başlat"],
  ["basla", "başla"],
  ["Basla", "Başla"],
  ["BASLA", "BAŞLA"],

  // Giriş/Geçiş
  ["Giris", "Giriş"],
  ["giris", "giriş"],
  ["Cikis", "Çıkış"],
  ["cikis", "çıkış"],
  ["gecis", "geçiş"],
  ["Gecis", "Geçiş"],

  // Suffix patterns
  ["yolculugu", "yolculuğu"],
  ["yolculuguna", "yolculuğuna"],
  ["anlayisi", "anlayışı"],
  ["gosterge", "gösterge"],
  ["Gosterge", "Gösterge"],
  ["donusum", "dönüşüm"],
  ["Donusum", "Dönüşüm"],
  ["donustur", "dönüştür"],
  ["programlari", "programları"],
  ["Programlari", "Programları"],
  ["programlarimiz", "programlarımız"],
  ["raporlari", "raporları"],
  ["cevrimici", "çevrimiçi"],
  ["Cevrimici", "Çevrimiçi"],
  ["cevrim ici", "çevrim içi"],

  // Misc
  ["Incele", "İncele"],
  ["INCELE", "İNCELE"],
  ["Inceleme", "İnceleme"],
  ["Ozel", "Özel"],
  ["ozel", "özel"],
  ["OZEL", "ÖZEL"],
  ["donem", "dönem"],
  ["Donem", "Dönem"],
  ["yuksek", "yüksek"],
  ["Yuksek", "Yüksek"],
  ["buyuyun", "büyüyün"],
  ["Buyuyun", "Büyüyün"],
  ["buyume", "büyüme"],
  ["yarari", "yararı"],
  ["Yarari", "Yararı"],
  ["Tanisma", "Tanışma"],
  ["tanisma", "tanışma"],
  ["gorusme", "görüşme"],
  ["Gorusme", "Görüşme"],
  ["gorus", "görüş"],
  ["Gorus", "Görüş"],

  // === ROUND 2 fixes ===
  // Adım
  ["Adimlari", "Adımları"],
  ["adimlari", "adımları"],
  ["Adimda", "Adımda"],
  ["adimda", "adımda"],
  ["adimini", "adımını"],
  ["adimi", "adımı"],
  ["adim", "adım"],
  ["Adim", "Adım"],

  // Kapsamlı
  ["kapsamli", "kapsamlı"],
  ["Kapsamli", "Kapsamlı"],
  ["KAPSAMLI", "KAPSAMLI"],

  // Harita
  ["Haritasi", "Haritası"],
  ["haritasi", "haritası"],

  // Döngü
  ["dongusel", "döngüsel"],
  ["Dongusel", "Döngüsel"],
  ["Dongusu", "Döngüsü"],
  ["dongusu", "döngüsü"],
  ["donguleri", "döngüleri"],
  ["dongu", "döngü"],
  ["Dongu", "Döngü"],

  // Düzey
  ["duzeyleri", "düzeyleri"],
  ["duzeyi", "düzeyi"],
  ["duzey", "düzey"],
  ["Duzey", "Düzey"],

  // Hazır
  ["hazirlanir", "hazırlanır"],
  ["hazirlanmis", "hazırlanmış"],
  ["hazirlanan", "hazırlanan"],
  ["hazirlik", "hazırlık"],
  ["hazir", "hazır"],
  ["Hazir", "Hazır"],

  // Katılım
  ["katilimli", "katılımlı"],
  ["katilimci", "katılımcı"],
  ["katilim", "katılım"],
  ["Katilim", "Katılım"],
  ["katilan", "katılan"],

  // Ödül
  ["odullu", "ödüllü"],
  ["odulleri", "ödülleri"],
  ["odul", "ödül"],
  ["Odul", "Ödül"],
  ["ODUL", "ÖDÜL"],

  // Dönüş
  ["donusumu", "dönüşümü"],
  ["donusum", "dönüşüm"],
  ["Donusum", "Dönüşüm"],
  ["donus", "dönüş"],
  ["Donus", "Dönüş"],

  // Oluştur (additional)
  ["olusturulur", "oluşturulur"],
  ["olusturma", "oluşturma"],

  // Seviye (actually correct Turkish, skip)
  // Bilimsel (actually correct Turkish, skip)
  // Toplumsal (actually correct Turkish, skip)

  // Planlı
  ["planliyoruz", "planlıyoruz"],
  ["planli", "planlı"],
  ["Planli", "Planlı"],

  // Sağlık
  ["saglikli", "sağlıklı"],
  ["saglik", "sağlık"],
  ["Saglik", "Sağlık"],

  // Artır
  ["arttiran", "arttıran"],
  ["arttir", "arttır"],
  ["artiran", "artıran"],
  ["artirir", "artırır"],
  ["artis", "artış"],
  ["Artis", "Artış"],

  // Sağla
  ["saglar", "sağlar"],
  ["saglayin", "sağlayın"],
  ["saglamak", "sağlamak"],
  ["saglayan", "sağlayan"],
  ["sagla", "sağla"],
  ["Sagla", "Sağla"],

  // Atölye
  ["atolye", "atölye"],
  ["Atolye", "Atölye"],

  // İçin (last, short match)
  ["Icin", "İçin"],
  ["icin", "için"],
  ["ICIN", "İÇİN"],
];

function fixTurkish(text) {
  let result = text;
  for (const [from, to] of REPLACEMENTS) {
    if (from === to) continue;
    while (result.includes(from)) {
      result = result.split(from).join(to);
    }
  }
  return result;
}

async function main() {
  console.log("Fetching all pages...");

  // Get all page slugs
  const listRes = await fetch(`${BASE}/api/sayfalar`);
  const pages = await listRes.json();
  console.log(`Found ${pages.length} pages\n`);

  let pagesFixed = 0;
  let sectionsFixed = 0;

  for (const page of pages) {
    // Fetch full page with sections
    const pageRes = await fetch(`${BASE}/api/sayfalar/${page.slug}`);
    const fullPage = await pageRes.json();

    // Fix page title
    const newTitle = fixTurkish(fullPage.title);
    if (newTitle !== fullPage.title) {
      console.log(`PAGE: "${fullPage.title}" → "${newTitle}"`);
      const putRes = await fetch(`${BASE}/api/sayfalar/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, slug: page.slug }),
      });
      if (putRes.ok) {
        pagesFixed++;
      } else {
        console.log(`  ERROR updating page: ${putRes.status}`);
      }
    }

    // Fix sections
    for (const section of fullPage.sections || []) {
      const newSectionTitle = fixTurkish(section.title);
      const newContent = fixTurkish(section.content);

      if (newSectionTitle !== section.title || newContent !== section.content) {
        if (newSectionTitle !== section.title) {
          console.log(`  SECTION: "${section.title}" → "${newSectionTitle}"`);
        }
        if (newContent !== section.content) {
          console.log(`  CONTENT: [${page.slug}/${section.sectionType}] fixed`);
        }

        const putRes = await fetch(`${BASE}/api/sayfalar/${page.slug}/sections/${section.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newSectionTitle,
            visible: section.visible,
            content: newContent,
          }),
        });
        if (putRes.ok) {
          sectionsFixed++;
        } else {
          console.log(`  ERROR updating section: ${putRes.status}`);
        }
      }
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Pages fixed: ${pagesFixed}`);
  console.log(`Sections fixed: ${sectionsFixed}`);
}

main().catch(console.error);
