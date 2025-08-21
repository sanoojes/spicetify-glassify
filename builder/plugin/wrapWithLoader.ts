import Logger from '@builder/logger.ts';
import type { Plugin } from 'esbuild';

export function wrapWithLoader(): Plugin {
  return {
    name: 'wrap-with-glassify-loader',
    setup(build) {
      build.onEnd(async (res) => {
        try {
          if (res.errors.length > 0) return;
          const path = 'dist/theme.js';
          const themeCode = await Deno.readTextFile(path);
          const wrappedCode = `(function(){if(window.__glassifyLoaded)return;window.__glassifyLoaded=1;(function glassifyMain(){if(!Spicetify.React||!Spicetify.ReactDOM||!Spicetify.Platform||!Spicetify.Player){setTimeout(glassifyMain,100);return;}${themeCode}})();})();`;
          await Deno.writeTextFile(path, wrappedCode);
        } catch (e) {
          Logger.error('Error:', e);
        }
      });
    },
  };
}
