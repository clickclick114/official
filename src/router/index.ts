/**
 * router/index.ts
 *
 * Automatic routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes as autoRoutes } from 'vue-router/auto-routes' // 這裡改為 autoRoutes，避免衝突

const customRoutes = [
  {
    path: '/form',
    name: 'FormPage',
    component: () => import('@/pages/FormPage.vue'), // 根據你的頁面文件
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/pages/Tests.vue'),
  },
  // 其他路由
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...autoRoutes, ...customRoutes]), // 合併自動路由和自定義路由
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        setTimeout(() => {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.scrollY;
          const middleOfScreen = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
          window.scrollTo({ top: middleOfScreen, behavior: 'smooth' });
        }, 100);
        return false; // 避免 Vue Router 預設滾動行為
      }
    }
    return savedPosition || { top: 0 }; // 預設行為
  },
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
});

export default router