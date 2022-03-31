import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// });
import { resolve } from 'path';
import type { ConfigEnv } from 'vite';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
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
          configure: (proxy, options) => {
            // proxy 是 'http-proxy' 的实例
            console.log(proxy, options);
          },
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [vue()],
  };
});
