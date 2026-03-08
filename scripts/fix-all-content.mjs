#!/usr/bin/env node
/**
 * Comprehensive content fix for all pages:
 * 1. Turkish character fixes across all pages
 * 2. final_cta Structure B → Structure A conversion (so FinalCTA component renders correctly)
 * 3. Test data cleanup (123123)
 * 4. Tag space fix (ÖĞRETMENLERİÇİN)
 * 5. Typo fixes
 * 6. href "#" → proper links
 */
const ADMIN = "https://learnecohub-admin-production.up.railway.app";

// ─── Turkish character replacements ───
function fixTurkish(text) {
  if (typeof text !== "string") return text;
  const map = {
    // Specific known broken words → correct forms
    "yapabilceginiz": "yapabileceğiniz",
    "anlayışımizin": "anlayışımızın",
    "anlayışımizi": "anlayışımızı",
    "oluştürün": "oluşturun",
    "yatirim": "yatırım",
    "yapin": "yapın",
    "yazin.": "yazın.",
    "dokunun.": "dokunun.",
    "hayatina": "hayatına",
    "Hizli": "Hızlı",
    "tanis.": "tanış.",
    "Sorulariniz": "Sorularınız",
    "ulasin.": "ulaşın.",
    "E-kitaplarimizi": "E-kitaplarımızı",
    "uyelik": "üyelik",
    "Uye Ol": "Üye Ol",
    "araçlarımizi": "araçlarımızı",
    "kesfet.": "keşfedin.",
    "seviyesini secin.": "seviyesini seçin.",
    "Yas grubuna": "Yaş grubuna",
    "Yasa uygun": "Yaşa uygun",
    "fazlasi için": "fazlası için",
    "Kayit": "Kayıt",
    "webinarimiza": "webinarımıza",
    "webinarlarimizdan": "webinarlarımızdan",
    "Gecmis": "Geçmiş",
    "onayli": "onaylı",
    "rehberligi": "rehberliği",
    "Sifir": "Sıfır",
    "Planlari": "Planları",
    "planlari": "planları",
    "ici aktivite": "içi aktivite",
    "Yazdirilabilir": "Yazdırılabilir",
    "kagitlari": "kağıtları",
    "Araclari": "Araçları",
    "Kilavuzlari": "Kılavuzları",
    "kilavuzlari": "kılavuzları",
    "Seanslari": "Seansları",
    "Derinlesme": "Derinleşme",
    "ortaminda": "ortamında",
    "Rehberligi": "Rehberliği",
    "Tasarimcisi": "Tasarımcısı",
    "Muduru": "Müdürü",
    "Yoneticisi": "Yöneticisi",
    "Derya Aydin": "Derya Aydın",
    "Kaan Mert Guven": "Kaan Mert Güven",
    "Kubra Demirci": "Kübra Demirci",
    "Sayid Ozcan": "Sayid Özcan",
    "seansları yaklasik": "seansları yaklaşık",
    "surmektedir": "sürmektedir",
    "yukumluluk": "yükümlülük",
    "icermez": "içermez",
    "eriselebilir": "erişilebilir",
    "icerige sinrsiz": "içeriğe sınırsız",
    "planlara goz atin": "planlara göz atın",
    "planları inceleyin": "planları inceleyin",
    "planlari inceleyin": "planları inceleyin",
    "Planlari İncele": "Planları İncele",
  };
  let result = text;
  for (const [bad, good] of Object.entries(map)) {
    if (result.includes(bad)) {
      result = result.split(bad).join(good);
    }
  }
  return result;
}

// ─── Deep fix all string values in an object ───
function deepFixTurkish(obj) {
  if (typeof obj === "string") return fixTurkish(obj);
  if (Array.isArray(obj)) return obj.map(deepFixTurkish);
  if (typeof obj === "object" && obj !== null) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = deepFixTurkish(v);
    }
    return result;
  }
  return obj;
}

// ─── Convert Structure B final_cta to Structure A ───
function convertFinalCta(content) {
  // Already Structure A
  if (content.cta || content.phone || content.badges) {
    return deepFixTurkish(content);
  }

  // Structure B → Structure A
  const result = {};

  // Title handling
  if (content.title && content.titleHighlight) {
    result.title = `${content.title} <span class="text-[#F5C518]">${content.titleHighlight}</span>`;
  } else if (content.title) {
    result.title = content.title;
  }

  result.description = content.description || "";

  // primaryButton → cta
  if (content.primaryButton) {
    result.cta = {
      label: content.primaryButton.text || "Hemen Başla",
      href: content.primaryButton.href === "#"
        ? "https://lms.learnecohub.com/login/index.php"
        : content.primaryButton.href || "https://lms.learnecohub.com/login/index.php",
    };
  } else {
    result.cta = {
      label: "Hemen Başla",
      href: "https://lms.learnecohub.com/login/index.php",
    };
  }

  // phone
  result.phone = { label: "0531 952 94 96", href: "tel:+905319529496" };

  // checkmarks → badges
  if (content.checkmarks?.length) {
    result.badges = content.checkmarks.map(c => ({ text: typeof c === "string" ? c : c.text || "" }));
  } else {
    result.badges = [
      { text: "Ücretsiz başlangıç" },
      { text: "Kredi kartı gerekmiyor" },
      { text: "Anında erişim" },
    ];
  }

  // Logo if exists
  if (content.logo) result.logo = content.logo;

  return deepFixTurkish(result);
}

// ─── Special fixes per page ───
const specialFixes = {
  "aileler-icin": {
    family_features: (content) => {
      if (content.items) {
        content.items = content.items.map(item => {
          if (typeof item.description === "string") {
            item.description = item.description.replace(/\s*123123\s*$/, "");
          }
          return item;
        });
      }
      return content;
    },
  },
  "ogretmenler-icin": {
    subpage_hero: (content) => {
      if (content.tag === "ÖĞRETMENLERİÇİN") {
        content.tag = "ÖĞRETMENLER İÇİN";
      }
      return content;
    },
  },
};

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
    let pageFixed = 0;

    for (const section of sections) {
      let content;
      try {
        content = typeof section.content === "string" ? JSON.parse(section.content) : section.content;
      } catch {
        continue;
      }

      const original = JSON.stringify(content);
      let fixed = content;

      // Apply special fixes if any
      const pageFixes = specialFixes[page.slug];
      if (pageFixes && pageFixes[section.sectionType]) {
        fixed = pageFixes[section.sectionType](fixed);
      }

      // Convert final_cta Structure B → A
      if (section.sectionType === "final_cta") {
        fixed = convertFinalCta(fixed);
      } else {
        // Deep fix Turkish for all other sections
        fixed = deepFixTurkish(fixed);
      }

      const fixedStr = JSON.stringify(fixed);
      if (fixedStr !== original) {
        const ok = await updateSection(page.slug, section.id, section.title, section.visible, fixed);
        if (ok) {
          console.log(`  ✓ ${page.slug} / ${section.sectionType} — fixed`);
          pageFixed++;
        } else {
          console.log(`  ✗ ${page.slug} / ${section.sectionType} — FAILED`);
        }
      }
    }

    if (pageFixed > 0) {
      console.log(`  ${page.slug}: ${pageFixed} section(s) fixed`);
      totalFixed += pageFixed;
    }
  }

  console.log(`\n✅ Done! Fixed ${totalFixed} sections across all pages.`);
}

main().catch(console.error);
