import { existsSync } from 'fs';
import { config } from 'dotenv';
import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';

import { prepareScriptable } from './tools/esbuild-plugin-scriptable.js';

const isDevMode = process.argv.includes('--dev');
const isWatchMode = process.argv.includes('--watch');

// provide env variables
config();

// allways add the vars, so the script doesn't fail
const env = { SWW_CONTEXT: '""', SWW_TOKEN: '""' };
let define = env;

// add env vars only for dev mode (to avoid exposing secrets)
if (isDevMode) {
  define = Object.entries(process.env).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: `"${value}"` }),
    env
  );
}

// define all build targets
const widgets = ['workhours-lockscreen', 'workhours-single', 'workhours-triplet'];

// check all necessary files to be present
// prettier-ignore
const missing = widgets
  .reduce((a, w) => [...a, `./src/${w}.ts`, `./${w}.scriptable.json`], [] as string[])
  .filter(file => !existsSync(file));
if (missing.length > 0) {
  console.error(`Missing some files:\n- ${missing.join('\n- ')}`);
  process.exit(1);
}

build({
  entryPoints: widgets.map(widget => `./src/${widget}.ts`),
  outdir: './dist',
  define,
  platform: 'node',
  format: 'esm',
  bundle: true,
  minify: !isWatchMode,
  treeShaking: !isWatchMode,
  sourcemap: isWatchMode,
  watch: isWatchMode,
  logLevel: isWatchMode ? 'info' : 'warning',
  plugins: [
    clean({ patterns: ['./dist'] }),
    ...widgets.map(widget =>
      prepareScriptable({
        scriptfile: `./dist/${widget}.js`,
        package: `./${widget}.scriptable.json`
      })
    )
  ]
})
  .then(() => !isWatchMode && process.exit(0))
  .catch(() => process.exit(1));
