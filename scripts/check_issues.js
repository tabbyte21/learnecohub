const ADMIN = 'https://learnecohub-admin-production.up.railway.app';

async function main() {
  const res = await fetch(ADMIN + '/api/sayfalar');
  const pages = await res.json();

  const issues = [];

  for (const page of pages) {
    const pageRes = await fetch(ADMIN + '/api/sayfalar/' + page.slug);
    const pageData = await pageRes.json();

    for (const section of (pageData.sections || [])) {
      let content;
      try {
        content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
      } catch(e) {
        issues.push({
          page: page.slug,
          section: section.sectionType,
          issue: 'PARSE_ERROR',
          field: 'content',
          value: (section.content || '').substring(0, 200)
        });
        continue;
      }

      function checkField(path, value) {
        if (typeof value === 'string' && value.length > 0) {
          const trimmed = value.trim();

          // 1. Missing Turkish chars (ı->i, ş->s, ç->c, ğ->g, ö->o, ü->u patterns in context)
          // Detect words that should have Turkish chars but don't
          const turkishMissing = [];
          const noTurkishPatterns = [
            { pattern: /\byakin\b/gi, fix: 'yakın' },
            { pattern: /\byasin\b/gi, fix: 'yaşın' },
            { pattern: /\byasi\b/gi, fix: 'yaşı' },
            { pattern: /\byasa\b/gi, fix: 'yaşa' },
            { pattern: /\byas\b/gi, fix: 'yaş' },
            { pattern: /\bCocug/g, fix: 'Çocuğ' },
            { pattern: /\bcocug/g, fix: 'çocuğ' },
            { pattern: /\bkayit\b/gi, fix: 'kayıt' },
            { pattern: /\btanis\b/gi, fix: 'tanış' },
            { pattern: /\bulasiy/gi, fix: 'ulaşıy' },
            { pattern: /\byurutu/gi, fix: 'yürütü' },
            { pattern: /\bdegis/gi, fix: 'değiş' },
            { pattern: /\bhikaye/gi, fix: 'hikâye' },
            { pattern: /\barkadsl/gi, fix: 'arkadaşl' },
            { pattern: /\bcatisma/gi, fix: 'çatışma' },
            { pattern: /\bsinrsiz\b/gi, fix: 'sınırsız' },
            { pattern: /\bicerig/gi, fix: 'içeriğ' },
            { pattern: /\bicin\b/gi, fix: 'için' },
            { pattern: /\bdokuman/gi, fix: 'doküman' },
            { pattern: /\bkucuk\b/gi, fix: 'küçük' },
            { pattern: /\bgecmis\b/gi, fix: 'geçmiş' },
            { pattern: /\bgore\b/gi, fix: 'göre' },
            { pattern: /\bozellestirilmis\b/gi, fix: 'özelleştirilmiş' },
          ];

          // 2. Check for truncated text ending with ...
          if (trimmed.endsWith('...')) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'TRUNCATED_TEXT',
              field: path,
              value: trimmed.substring(Math.max(0, trimmed.length - 80))
            });
          }

          // 3. Check for test/placeholder data
          if (/123123|test|lorem ipsum|placeholder|xxx/i.test(trimmed)) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'TEST_DATA',
              field: path,
              value: trimmed.substring(0, 120)
            });
          }

          // 4. Check for broken HTML tags
          const openTags = (trimmed.match(/<[a-z][^>]*>/gi) || []).length;
          const closeTags = (trimmed.match(/<\/[a-z]+>/gi) || []).length;
          if (openTags !== closeTags && trimmed.includes('<')) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'BROKEN_HTML',
              field: path,
              value: trimmed.substring(0, 150)
            });
          }

          // 5. Check for empty/very short text in description fields
          if ((path.includes('description') || path.includes('content')) && trimmed.length > 0 && trimmed.length < 10) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'VERY_SHORT_TEXT',
              field: path,
              value: trimmed
            });
          }

          // 6. Check for missing title field (empty title)
          if (path.includes('.title') && trimmed.length === 0) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'EMPTY_TITLE',
              field: path,
              value: '(empty)'
            });
          }

          // 7. Check for missing Turkish characters (ASCII-only Turkish words)
          const missingTurkish = /\b(Isbirligi|isbirligi|Yoneticisi|yoneticisi|Muduru|muduru|Tasarimcisi|tasarimcisi|onayli|Sifir|sifir|Planlari|planlari|Araclari|araclari|kagitlari|Kilavuzlari|kilavuzlari|Rehberligi|rehberligi|seanslari|Seanslari|Derinlesme|derinlesme|ortaminda|Eriselebilir|eriselebilir|Yukumluluk|yukumluluk|surmektedir|Aydin|Guven|Kubra|Ozcan|Calisiyoruz|Calışiyoruz)\b/g;
          const matches = trimmed.match(missingTurkish);
          if (matches) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'MISSING_TURKISH_CHARS',
              field: path,
              value: `Found: ${matches.join(', ')} in "${trimmed.substring(0, 80)}"`
            });
          }

          // 8. Check for typos
          if (/yapabilceginiz|oluştürün|anlayışımizi|anlayışımizi/i.test(trimmed)) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'TYPO',
              field: path,
              value: trimmed.substring(0, 120)
            });
          }

          // 9. Check for missing title in final_cta (title without content)
          if (section.sectionType === 'final_cta' && path.endsWith('.title') && trimmed.length < 3) {
            issues.push({
              page: page.slug,
              section: section.sectionType,
              issue: 'INCOMPLETE_FINAL_CTA_TITLE',
              field: path,
              value: trimmed
            });
          }

        } else if (Array.isArray(value)) {
          value.forEach((item, i) => {
            if (typeof item === 'object' && item !== null) {
              Object.entries(item).forEach(([k, v]) => checkField(path + '[' + i + '].' + k, v));
            } else if (typeof item === 'string') {
              checkField(path + '[' + i + ']', item);
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([k, v]) => checkField(path + '.' + k, v));
        }
      }

      checkField(section.sectionType, content);

      // Special: check for missing fields in final_cta sections
      if (section.sectionType === 'final_cta') {
        if (!content.title && !content.titleHighlight) {
          issues.push({
            page: page.slug,
            section: 'final_cta',
            issue: 'MISSING_TITLE',
            field: 'final_cta.title',
            value: JSON.stringify(content).substring(0, 150)
          });
        }
        // Check for structure inconsistency
        const hasCta = content.cta;
        const hasPrimary = content.primaryButton;
        // just note which structure is used
      }
    }
  }

  // Print issues grouped by type
  console.log('\n===== ISSUE SUMMARY =====\n');

  const byType = {};
  for (const issue of issues) {
    if (!byType[issue.issue]) byType[issue.issue] = [];
    byType[issue.issue].push(issue);
  }

  for (const [type, items] of Object.entries(byType)) {
    console.log(`\n--- ${type} (${items.length} occurrences) ---`);
    for (const item of items) {
      console.log(`  Page: ${item.page}`);
      console.log(`  Section: ${item.section}`);
      console.log(`  Field: ${item.field}`);
      console.log(`  Value: ${item.value}`);
      console.log('');
    }
  }

  // Also check for final_cta structure inconsistencies
  console.log('\n===== FINAL_CTA STRUCTURE ANALYSIS =====\n');
  for (const page of pages) {
    const pageRes = await fetch(ADMIN + '/api/sayfalar/' + page.slug);
    const pageData = await pageRes.json();
    for (const section of (pageData.sections || [])) {
      if (section.sectionType === 'final_cta') {
        let content;
        try {
          content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
        } catch(e) { continue; }

        const structure = [];
        if (content.title) structure.push('title');
        if (content.titleHighlight) structure.push('titleHighlight');
        if (content.description) structure.push('description');
        if (content.cta) structure.push('cta{}');
        if (content.primaryButton) structure.push('primaryButton{}');
        if (content.secondaryButton) structure.push('secondaryButton{}');
        if (content.phone) structure.push('phone{}');
        if (content.badges) structure.push('badges[]');
        if (content.checkmarks) structure.push('checkmarks[]');

        console.log(`  ${page.slug}: ${structure.join(', ')}`);
      }
    }
  }
}

main().catch(console.error);
