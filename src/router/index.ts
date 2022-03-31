import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// 配置路由信息
// 配置路由信息
const routes: RouteRecordRaw[] = [
  // { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/store', component: () => import('@/views/store/index.vue') },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
