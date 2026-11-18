// Genera public/sitemap.xml a partir de los slugs de src/data/treatments.ts.
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://rejuvena.neal.pe";
const src = readFileSync(new URL("../src/data/treatments.ts", import.meta.url), "utf8");
const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);
const url = (loc, priority) =>
  `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[url(`${SITE}/`, "1.0"), ...slugs.map((s) => url(`${SITE}/tratamientos/${s}`, "0.8"))].join("\n")}
</urlset>
`;
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml: ${slugs.length + 1} URLs`);
