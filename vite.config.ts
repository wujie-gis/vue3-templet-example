import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import type { ConfigEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    server: {
      proxy: {
        // 使用 proxy 实例
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          // configure: (proxy, options) => {
          //   // proxy 是 'http-proxy' 的实例
          //   console.log(proxy, options);
          // },
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        css: {
          charset: false,
        },
        scss: {
          charset: false,
          additionalData: `@use "@/styles/element/index.scss" as *;
           @use "@/styles/global.scss" as *;
          `,
        },
      },
    },
    build: {
      outDir: 'dist/pro',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('styles/main.css')) {
              return 'tailwindcss';
            }
            if (id.includes('element-plus/theme-chalk/')) {
              // 当然也可以优化下这个判断，不过目前这样写足矣了。
              return 'element-plus';
            }
          },
        },
      },
    },
  };
});
