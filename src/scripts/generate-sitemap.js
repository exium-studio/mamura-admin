import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ROUTE_PATHS } from "../constants/routePaths.js";

const baseUrl = "https://limitless.exclolab.com";

// __dirname versi ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cek apakah path dinamis (mengandung ":")
const isDynamicPath = (p) => typeof p === "string" && p.includes(":");

// Gabungkan semua path statis (filter dinamis & undefined/null)
const staticPaths = ROUTE_PATHS.filter(
  (p) => typeof p === "string" && !isDynamicPath(p)
);

export const generateSitemap = () => {
  const xmlEntries = staticPaths
    .map((p) => `<url><loc>${baseUrl}${p}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  const outputPath = path.resolve(__dirname, "../../public/sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf8");
  console.log("✅ Sitemap generated!");
};

generateSitemap();
