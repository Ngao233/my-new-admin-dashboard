import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  // Frontend routes
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'HomeView',
        component: () => import('@/views/user/home/HomeView.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/user/products/ProductView.vue')
      },
      {
        path: '/cart',
        component: () => import('@/views/user/cart/CartView.vue')
      }
      // {
      //   path: 'about',
      //   name: 'About',
      //   component: () => import('@/views/home/About.vue')
      // }
    ]
  },

  // Admin routes
  {
    path: '/admin',
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/DashboardView.vue')
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('@/views/admin/category/CategoryList.vue')
      },
      // ... các route admin khác
    ]
  },

  // Auth route
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/auth/LoginView.vue')
  }, 
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/user/auth/LogoutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Bảo vệ route admin
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router