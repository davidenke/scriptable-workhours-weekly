import { copyFile } from 'fs/promises';
import { homedir } from 'os';
import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';

import { prepareScriptable } from './tools/esbuild-plugin-scriptable.js';

const isWatchMode = process.argv.includes('--watch');

build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
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
      scriptfile: './dist/index.js',
      package: './scriptable.json'
    }),
    {
      name: 'Copy target',
      setup(build) {
        build.onEnd(() => {
          // copyFile(
          //   resolve('./dist/index.js'),
          //   resolve(
          //     homedir(),
          //     './Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/Workhours Weekly.js'
          //   )
          // );
        });
      }
    }
  ]
})
  .then(() => !isWatchMode && process.exit(0))
  .catch(() => process.exit(1));
