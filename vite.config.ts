import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';
import type { ConfigEnv } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import cesium from 'vite-plugin-mars3d';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';

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
          target: env.VITE_BASE_URL,
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
      AutoImport(),
      cesium(),
      PkgConfig(),
      OptimizationPersist(),
      VueSetupExtend(),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        css: {
          charset: false,
        },
        scss: {
          charset: false,
        },
      },
    },
    build: {
      outDir: 'dist/emergency-fuling',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('styles/main.css')) {
              return 'tailwind';
            }
            if (id.includes('bitmap3d')) {
              return 'bitmap3d';
            }
            // if (id.includes('naive-ui')) {
            //   return 'naive-ui';
            // }
          },
          entryFileNames: 'js/[name].[hash].js', // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          chunkFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
          assetFileNames: '[ext]/[name].[hash].[ext]', // 用于输出静态资源的命名，[ext]表示文件扩展名
        },
      },
      target: 'esnext',
    },
  };
});
