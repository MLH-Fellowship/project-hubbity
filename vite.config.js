import { fileURLToPath, URL } from 'url';
import mix from 'vite-plugin-mix';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const plugins = [vue(), vueJsx()];

  if (mode === 'development') {
    plugins.push(
      mix({
        handler: './server/api.js',
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
