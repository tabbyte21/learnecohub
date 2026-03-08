const ADMIN = 'https://learnecohub-admin-production.up.railway.app';

async function main() {
  const res = await fetch(ADMIN + '/api/sayfalar');
  const pages = await res.json();

  for (const page of pages) {
    const pageRes = await fetch(ADMIN + '/api/sayfalar/' + page.slug);
    const pageData = await pageRes.json();

    console.log('\n========== ' + page.slug + ' (' + page.title + ') ==========');

    for (const section of (pageData.sections || [])) {
      let content;
      try {
        content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
      } catch(e) {
        console.log('  [' + section.sectionType + '] PARSE ERROR: ' + (section.content || '').substring(0, 200));
        continue;
      }

      function checkField(path, value) {
        if (typeof value === 'string' && value.length > 0) {
          const trimmed = value.trim();
          if (trimmed.length > 5) {
            console.log('  [' + section.sectionType + '] ' + path + ': ' + trimmed.substring(0, 150) + (trimmed.length > 150 ? '...' : ''));
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
    }
  }
}

main().catch(console.error);
