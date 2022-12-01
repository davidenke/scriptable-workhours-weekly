import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';

import { prepareScriptable } from './tools/esbuild-plugin-scriptable.js';

const isWatchMode = process.argv.includes('--watch');

const widgets = [
  'workhours-lockscreen',
  'workhours-single',
  'workhours-triplet'
];

build({
  entryPoints: widgets.map(widget => `./src/${widget}.ts`),
  outdir: './dist',
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
