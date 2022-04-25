import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// 配置路由信息
// 配置路由信息
const routes: RouteRecordRaw[] = [
  { path: '/login', component: () => import('@/pages/Login/index.vue') },
  {
    path: '/dashboard',
    component: () => import('@/pages/Home/index.vue'),
    children: [
      {
        path: '/dashboard/command',
        component: () => import('@/pages/Home/Command/index.vue'),
      },
      {
        path: '/dashboard/duty',
        component: () => import('@/pages/Home/Duty/index.vue'),
      },
      {
        path: '/dashboard/main',
        component: () => import('@/pages/Home/MainScreen/index.vue'),
      },
      {
        path: '/dashboard/monitor',
        component: () => import('@/pages/Home/Monitoring/index.vue'),
      },
    ],
  },
  {
    //在地址为空时，直接跳转Login路由
    path: '',
    redirect: '/dashboard/main',
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
