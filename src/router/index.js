// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// Import TẤT CẢ các component trang của bạn vào đây
// Đảm bảo đường dẫn đúng đến các file .vue của bạn trong thư mục src/components/
import DashboardPage from '../components/DashboardPage.vue';
import CategoryPage from '../components/CategoryPage.vue';
import ProductPage from '../components/ProductPage.vue';
import OrderPage from '../components/OrderPage.vue';
import CustomerPage from '../components/CustomerPage.vue';
import VoucherPage from '../components/VoucherPage.vue';
import NewsPage from '../components/NewsPage.vue';
import FavoriteProductPage from '../components/FavoriteProductPage.vue';
import LogoutPage from '../components/LogoutPage.vue';

// Định nghĩa các "routes" (đường dẫn) của ứng dụng
const routes = [
  { path: '/', name: 'Dashboard', component: DashboardPage },
  { path: '/categories', name: 'Categories', component: CategoryPage },
  { path: '/products', name: 'Products', component: ProductPage },
  { path: '/orders', name: 'Orders', component: OrderPage },
  { path: '/customers', name: 'Customers', component: CustomerPage },
  { path: '/vouchers', name: 'Vouchers', component: VoucherPage },
  { path: '/news', name: 'News', component: NewsPage },
  { path: '/favorite-products', name: 'FavoriteProducts', component: FavoriteProductPage },
  { path: '/logout', name: 'Logout', component: LogoutPage }
];

// Tạo bộ định tuyến (router instance)
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Export router để có thể sử dụng nó trong main.js
export default router;