import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';

import { prepareScriptable } from './tools/esbuild-plugin-scriptable.js';

const isWatchMode = process.argv.includes('--watch');

build({
  entryPoints: [
    './src/workhours-lockscreen.ts',
    './src/workhours-single.ts',
    './src/workhours-triplet.ts'
  ],
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
    prepareScriptable({
      scriptfile: './dist/workhours-lockscreen.js',
      package: './workhours-lockscreen.scriptable.json'
    }),
    prepareScriptable({
      scriptfile: './dist/workhours-single.js',
      package: './workhours-single.scriptable.json'
    }),
    prepareScriptable({
      scriptfile: './dist/workhours-triplet.js',
      package: './workhours-triplet.scriptable.json'
    })
  ]
})
  .then(() => !isWatchMode && process.exit(0))
  .catch(() => process.exit(1));
