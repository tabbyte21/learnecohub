const ADMIN = 'https://learnecohub-admin-production.up.railway.app';

async function main() {
  const res = await fetch(ADMIN + '/api/sayfalar');
  const pages = await res.json();

  console.log('===== DETAILED FINAL_CTA CONTENT =====\n');

  for (const page of pages) {
    const pageRes = await fetch(ADMIN + '/api/sayfalar/' + page.slug);
    const pageData = await pageRes.json();

    for (const section of (pageData.sections || [])) {
      if (section.sectionType === 'final_cta') {
        let content;
        try {
          content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
        } catch(e) { continue; }

        console.log(`--- ${page.slug} ---`);
        console.log(JSON.stringify(content, null, 2));
        console.log('');
      }
    }
  }

  // Also check for pages with missing icon fields in items
  console.log('\n===== MISSING ICON FIELDS IN ITEMS =====\n');
  for (const page of pages) {
    const pageRes = await fetch(ADMIN + '/api/sayfalar/' + page.slug);
    const pageData = await pageRes.json();

    for (const section of (pageData.sections || [])) {
      let content;
      try {
        content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
      } catch(e) { continue; }

      // Check items arrays
      for (const key of Object.keys(content)) {
        const val = content[key];
        if (Array.isArray(val)) {
          val.forEach((item, i) => {
            if (typeof item === 'object' && item !== null) {
              // If some items have icon and some don't
              if (item.title && !item.icon && val.some(v => v && v.icon)) {
                console.log(`  ${page.slug} [${section.sectionType}] ${key}[${i}]: has title "${item.title}" but missing icon (other items have icons)`);
              }
            }
          });
        }
      }
    }
  }

  // Check ogretmenler-icin tag (missing space)
  console.log('\n===== SPECIFIC TAG ISSUES =====\n');
  for (const page of pages) {
    const pageRes = await fetch(ADMIN + '/api/sayfalar/' + page.slug);
    const pageData = await pageRes.json();
    for (const section of (pageData.sections || [])) {
      if (section.sectionType === 'subpage_hero') {
        let content;
        try {
          content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
        } catch(e) { continue; }
        if (content.tag && !/\s/.test(content.tag) && content.tag.length > 12) {
          console.log(`  ${page.slug}: tag="${content.tag}" (possibly missing space)`);
        }
      }
    }
  }
}

main().catch(console.error);
