// Извлекает программы/лайнеры/маршруты из исходных TS-файлов фронтенда
// (src/data/*.ts) и сохраняет их как чистый JSON для последующего сидинга в БД.
//
// В коде картинки подключены как `import img from "@/assets/x.jpg"` — здесь они
// превращаются в стабильные URL вида "/tour-assets/x.jpg" (эти файлы фронтенд
// будет отдавать из public/tour-assets). Внешние URL (Unsplash и т.п.) остаются как есть.
//
//   npm run import-data
import esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONT_ROOT = path.resolve(__dirname, "../.."); // корень репозитория (фронтенд)
const SRC = path.join(FRONT_ROOT, "src");
const OUT_DIR = path.join(__dirname, "data");

// Плагин: импорты картинок -> строка-URL "/tour-assets/<имя файла>"
const assetPlugin = {
  name: "asset-url",
  setup(build) {
    build.onResolve({ filter: /\.(jpe?g|png|svg|webp|gif|avif)$/ }, (args) => ({
      path: args.path,
      namespace: "asset-url",
    }));
    build.onLoad({ filter: /.*/, namespace: "asset-url" }, (args) => {
      const base = path.basename(args.path);
      return { contents: `export default ${JSON.stringify("/tour-assets/" + base)};`, loader: "js" };
    });
    // алиас "@/..." -> src/... (для не-картиночных импортов, если встретятся)
    build.onResolve({ filter: /^@\// }, (args) => ({
      path: path.join(SRC, args.path.slice(2)),
    }));
  },
};

async function loadModule() {
  const entry = `
    export * from ${JSON.stringify(path.join(SRC, "data/tours.ts"))};
    export { liners, getLinerBySlug } from ${JSON.stringify(path.join(SRC, "data/liners.ts"))};
    export { tourRoutes } from ${JSON.stringify(path.join(SRC, "data/tourRoutes.ts"))};
  `;
  const tmp = path.join(os.tmpdir(), `atc-import-${process.pid}.mjs`);
  const result = await esbuild.build({
    stdin: { contents: entry, resolveDir: SRC, sourcefile: "entry.ts", loader: "ts" },
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    plugins: [assetPlugin],
    logLevel: "warning",
  });
  fs.writeFileSync(tmp, result.outputFiles[0].text);
  const mod = await import(pathToFileURL(tmp).href);
  fs.unlinkSync(tmp);
  return mod;
}

// Наборы туров и их «происхождение» (для привязки к страницам-листингам)
const TOUR_SETS = [
  "tours",
  "japanTours",
  "koreaTours",
  "chinaTours",
  "northKoreaTours",
  "russiaTours",
  "eventTours",
];

function main() {
  loadModule()
    .then((mod) => {
      // --- Туры ---
      const tours = [];
      let order = 0;
      for (const setName of TOUR_SETS) {
        const arr = mod[setName];
        if (!Array.isArray(arr)) {
          console.warn(`!! Набор ${setName} не найден или не массив — пропускаю`);
          continue;
        }
        for (const t of arr) {
          tours.push({ ...t, __source: setName, __order: order++ });
        }
      }

      // --- Лайнеры ---
      const liners = Array.isArray(mod.liners) ? mod.liners : [];

      // --- Маршруты ---
      const tourRoutes = mod.tourRoutes && typeof mod.tourRoutes === "object" ? mod.tourRoutes : {};

      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(path.join(OUT_DIR, "tours.json"), JSON.stringify(tours, null, 2));
      fs.writeFileSync(path.join(OUT_DIR, "liners.json"), JSON.stringify(liners, null, 2));
      fs.writeFileSync(path.join(OUT_DIR, "tourRoutes.json"), JSON.stringify(tourRoutes, null, 2));

      console.log(`✓ Извлечено: ${tours.length} программ, ${liners.length} лайнеров, ${Object.keys(tourRoutes).length} маршрутов`);
      console.log(`  → ${path.relative(FRONT_ROOT, OUT_DIR)}/{tours,liners,tourRoutes}.json`);
      const byset = TOUR_SETS.map((s) => `${s}: ${tours.filter((t) => t.__source === s).length}`).join(", ");
      console.log(`  Программы по наборам: ${byset}`);
    })
    .catch((err) => {
      console.error("Ошибка извлечения данных:", err);
      process.exit(1);
    });
}

main();
