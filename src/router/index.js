import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const requireAuth = () => !!localStorage.getItem("token");

const ifAuthorized = () => {
  return requireAuth() ? true : "/login";
};

const ifNotAuthorized = () => {
  return !requireAuth() ? true : "/";
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/DashboardPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
      beforeEnter: ifAuthorized
    },
    {
      path: '/login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/BlankLayout.vue')),
      },
      beforeEnter: ifNotAuthorized
    },
    {
      path: '/users',
      component: () => import('@/pages/UsersPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
      beforeEnter: ifAuthorized
    },
    {
      path: '/companies',
      component: () => import('@/pages/CompaniesPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
      beforeEnter: ifAuthorized
    },
    {
      path: '/customers',
      component: () => import('@/pages/CustomersPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
      beforeEnter: ifAuthorized
    },
    {
      path: '/settings',
      component: () => import('@/pages/SettingsPage.vue'),
      meta: {
        layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
      },
      beforeEnter: ifAuthorized
    }

  ],
})

export default router
