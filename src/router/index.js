import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/DashboardPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
    },
    {
      path: '/login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/BlankLayout.vue')),
      },
    },
    {
      path: '/users',
      component: () => import('@/pages/UsersPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
    },
    {
      path: '/companies',
      component: () => import('@/pages/CompaniesPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
    },
    {
      path: '/customers',
      component: () => import('@/pages/CustomersPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
    },
    {
      path: '/settings',
      component: () => import('@/pages/SettingsPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
    }

  ],
})

export default router
