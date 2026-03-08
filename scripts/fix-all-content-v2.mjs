#!/usr/bin/env node
/**
 * ROUND 2: Fix remaining Turkish character issues + typos across ALL pages.
 * Goes through every string in every section and applies replacements.
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// Word-level replacements (order matters - longer matches first)
const REPLACEMENTS = [
  // basari-hikayeleri
  ["HIKAYELERI", "HİKAYELERİ"],
  ["hikayeleri", "hikâyeleri"],
  ["hayatlari degisen", "hayatları değişen"],
  ["kurumlarin hikayeleri", "kurumların hikâyeleri"],
  ["yapiyoruz", "yapıyoruz"],
  ["yurutuyoruz", "yürütüyoruz"],
  ["ulasiyoruz", "ulaşıyoruz"],
  ["kuruluslari", "kuruluşları"],

  // demo
  ["taniyin", "tanıyın"],
  ["Hakkinda", "Hakkında"],
  ["suruyor", "sürüyor"],
  ["seanslari yaklasik", "seansları yaklaşık"],
  ["Demo sonrasi", "Demo sonrası"],
  ["sonrasinda", "sonrasında"],
  ["hazırlayip iletecegiz", "hazırlayıp ileteceğiz"],

  // ekibimiz
  ["Çalışiyoruz", "Çalışıyoruz"],
  ["EKIBIMIZ", "EKİBİMİZ"],

  // e-kitaplar
  ["E-KITAPLAR", "E-KİTAPLAR"],
  ["konularinda uzman yazarlarin hazırladigi", "konularında uzman yazarların hazırladığı"],
  ["El Kitabi", "El Kitabı"],
  ["uygulamalari için pratik kilavuz", "uygulamaları için pratik kılavuz"],
  ["regulasyonu", "regülasyonu"],
  ["Kucuk yastan", "Küçük yaştan"],
  ["uye olmaniz", "üye olmanız"],

  // ilkelerimiz
  ["yararıni on planda", "yararını ön planda"],
  ["standartlarinda", "standartlarında"],
  ["kanitlara dayanir", "kanıtlara dayanır"],
  ["Kapsayıcılik", "Kapsayıcılık"],
  ["Yenilikcilik", "Yenilikçilik"],
  ["Isbirliği", "İşbirliği"],

  // aileler-icin
  ["Birligi", "Birliği"],
  ["Aile ici iletişimi", "Aile içi iletişimi"],
  ["Kutlamalari", "Kutlamaları"],
  ["başarılarıni birlikte kutlayin", "başarılarını birlikte kutlayın"],
  ["Cocugumun gelişimini nasil takip ederim", "Çocuğumun gelişimini nasıl takip ederim"],
  ["raporlarıni ve rozet kazanımlarini gorebilirsiniz", "raporlarını ve rozet kazanımlarını görebilirsiniz"],
  ["Aile olarak ne yapmaliyiz", "Aile olarak ne yapmalıyız"],
  ["sunulmaktadir", "sunulmaktadır"],
  ["Hangi yas gruplarina uygun", "Hangi yaş gruplarına uygun"],
  ["K-12 yas grubuna yani", "K-12 yaş grubuna yani"],
  ["hitap ediyoruz", "hitap ediyoruz"],
  ["standartlarina uygun bir platformuz", "standartlarına uygun bir platformuz"],
  ["AILELER", "AİLELER"],

  // platform
  ["eglendiren", "eğlendiren"],
  ["oyunlari", "oyunları"],
  ["Başarılari", "Başarıları"],
  ["fazlasiyla", "fazlasıyla"],
  ["Sayfasi", "Sayfası"],

  // profesyoneller-icin
  ["araclar", "araçlar"],
  ["yapraklari", "yaprakları"],
  ["dokumanlari", "dokümanları"],
  ["Plani", "Planı"],

  // sinif-seviyeleri
  ["Her yasa uygun", "Her yaşa uygun"],
  ["gore özellestirilmis", "göre özelleştirilmiş"],
  ["5-6 yas", "5-6 yaş"],
  ["6-8 yas", "6-8 yaş"],
  ["8-10 yas", "8-10 yaş"],
  ["10-12 yas", "10-12 yaş"],
  ["12-14 yas", "12-14 yaş"],
  ["14-18 yas", "14-18 yaş"],
  ["tanima", "tanıma"],
  ["Ilk Yillar", "İlk Yıllar"],
  ["arkadsdlik", "arkadaşlık"],
  ["catisma çözme", "çatışma çözme"],
  ["On Ergenlik", "Ön Ergenlik"],
  ["Oz farkındalık derinlesmesi", "Öz farkındalık derinleşmesi"],
  ["vatandaslik", "vatandaşlık"],
  ["baskisi", "baskısı"],
  ["Genclik", "Gençlik"],

  // ucretsiz-kaynaklar
  ["eğitim kaynaklari", "eğitim kaynakları"],
  ["Indirilebilir", "İndirilebilir"],
  ["Yapraklari", "Yaprakları"],
  ["kilavuzu dahil", "kılavuzu dahil"],
  ["yas gruplari", "yaş grupları"],
  ["yazi desteği", "yazı desteği"],
  ["Sablonlari", "Şablonları"],
  ["kaynaklarimizdan", "kaynaklarımızdan"],
  ["bultenimize", "bültenimize"],

  // webinarlar
  ["kayitli", "kayıtlı"],
  ["Uzmanlarimizla", "Uzmanlarımızla"],
  ["konularinda derinlemesine", "konularında derinlemesine"],
  ["duygularini yonetmeyi", "duygularını yönetmeyi"],
  ["Arkadslik", "Arkadaşlık"],
  ["kullanimi", "kullanımı"],
  ["ici SEL uygulamalari", "içi SEL uygulamaları"],

  // okullar-icin
  ["okullari için", "okulları için"],
  ["tasarimi", "tasarımı"],

  // hikayemiz
  ["içerişinde", "içerisinde"],

  // kurslarimiz / genel
  ["KURSLARIMIZ", "KURSLARIMIZ"], // already correct
  ["ÇALIŞIR", "ÇALIŞIR"], // already correct in caps

  // Genel tekrar eden hatalar
  ["Cocuğ", "Çocuğ"],
  ["Canlı Grup Seanslari", "Canlı Grup Seansları"],
  ["Derinlesme", "Derinleşme"],
  ["ortaminda", "ortamında"],
  ["destekleyiçi", "destekleyici"],
  ["Koc Holding", "Koç Holding"],
  ["Basakşehir", "Başakşehir"],
  ["Luleburgaz", "Lüleburgaz"],

  // Alt yazi
  ["Alt yazi", "Alt yazı"],
];

function fixText(text) {
  if (typeof text !== "string") return text;
  let result = text;
  for (const [bad, good] of REPLACEMENTS) {
    if (result.includes(bad)) {
      result = result.split(bad).join(good);
    }
  }
  return result;
}

function deepFix(obj) {
  if (typeof obj === "string") return fixText(obj);
  if (Array.isArray(obj)) return obj.map(deepFix);
  if (typeof obj === "object" && obj !== null) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = deepFix(v);
    }
    return result;
  }
  return obj;
}

async function updateSection(slug, sectionId, title, visible, content) {
  const res = await fetch(`${ADMIN}/api/sayfalar/${slug}/sections/${sectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      visible,
      content: JSON.stringify(content),
    }),
  });
  return res.ok;
}

async function main() {
  console.log("Fetching all pages...");
  const pagesRes = await fetch(`${ADMIN}/api/sayfalar`);
  const pages = await pagesRes.json();
  console.log(`Found ${pages.length} pages.\n`);

  let totalFixed = 0;

  for (const page of pages) {
    const pageRes = await fetch(`${ADMIN}/api/sayfalar/${page.slug}`);
    const pageData = await pageRes.json();
    const sections = pageData.sections || [];

    for (const section of sections) {
      let content;
      try {
        content = typeof section.content === "string" ? JSON.parse(section.content) : section.content;
      } catch {
        continue;
      }

      const original = JSON.stringify(content);
      const fixed = deepFix(content);
      const fixedStr = JSON.stringify(fixed);

      if (fixedStr !== original) {
        const ok = await updateSection(page.slug, section.id, section.title, section.visible, fixed);
        if (ok) {
          console.log(`  ✓ ${page.slug} / ${section.sectionType}`);
          totalFixed++;
        } else {
          console.log(`  ✗ ${page.slug} / ${section.sectionType} — FAILED`);
        }
      }
    }
  }

  console.log(`\n✅ Done! Fixed ${totalFixed} sections.`);
}

main().catch(console.error);
