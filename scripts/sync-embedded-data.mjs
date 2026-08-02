import {readFile, writeFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dataPath = new URL('site/san_diego_budget_hierarchy.json', root);
const htmlPath = new URL('site/index.html', root);
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const html = await readFile(htmlPath, 'utf8');
const embedded = JSON.stringify(data).replaceAll('</script', '<\\/script');
const updated = html.replace(
  /(<script id="budget-data" type="application\/json">).*?(<\/script>)/s,
  `$1${embedded}$2`,
);

await writeFile(htmlPath, updated);
