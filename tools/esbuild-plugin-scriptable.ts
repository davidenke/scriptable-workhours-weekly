import { readFile, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';

import type { Plugin } from 'esbuild';
import { merge as _merge } from 'lodash-es';

import * as pkg from '../package.json' assert { type: 'json' };

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export type ScriptableMetadata = {
  always_run_in_app: boolean;
  icon: {
    color: string;
    glyph: string;
  };
  name: string;
  script: string;
  share_sheet_inputs: string[];
};

export type ScriptablePluginOptions = {
  scriptfile: string;
  outfile?: string;
  package?: string | DeepPartial<ScriptableMetadata>;
};

export const prepareScriptable = (options: ScriptablePluginOptions): Plugin => ({
  name: 'esbuild-plugin-scriptable',
  setup(build) {
    build.onEnd(async results => {
      // do not go on if there are errors
      if (results.errors.length > 0) return;

      // given package data can be set inline or as file
      let packageData: DeepPartial<ScriptableMetadata> | undefined;
      if (options.package) {
        // assume a file path
        if (typeof options.package === 'string') {
          const rawPackageData = await readFile(resolve(options.package), 'utf-8');
          packageData = JSON.parse(`${rawPackageData}`);
        }
        // assume inline data
        else {
          packageData = options.package;
        }
      }

      // prepare target
      const scriptName = packageData?.name ?? pkg.name;
      let { outdir, outfile } = build.initialOptions;
      let target: string;
      if (options.outfile) {
        target = resolve(options.outfile);
      } else if (outdir) {
        target = resolve(outdir, `${scriptName}.scriptable`);
      } else if (outfile) {
        target = resolve(dirname(outfile), `${scriptName}.scriptable`);
      } else {
        throw new Error('No output file could be determined');
      }

      // prepare package
      const script = await readFile(resolve(options.scriptfile), 'utf-8');
      const packageDefaults: ScriptableMetadata = {
        always_run_in_app: false,
        icon: {
          color: 'deep-blue',
          glyph: 'magic'
        },
        name: pkg.name,
        script,
        share_sheet_inputs: []
      };

      // build metadata
      const scriptable: ScriptableMetadata = _merge({}, packageDefaults, packageData);

      // write package to target
      return writeFile(target, JSON.stringify(scriptable, null, 2));
    });
  }
});
