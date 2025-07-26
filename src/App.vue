<template>
  <div class="container">
    <aside class="sidebar">
      <div class="logo">
        <h2>☕</h2>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/" active-class="active" exact-active-class="active">Tổng quan</router-link>
          </li>
          <li>
            <router-link to="/categories" active-class="active">Danh mục</router-link>
          </li>
          <li>
            <router-link to="/products" active-class="active">Sản phẩm</router-link>
          </li>
          <li>
            <router-link to="/orders" active-class="active">Đơn hàng</router-link>
          </li>
          <li>
            <router-link to="/customers" active-class="active">Khách hàng</router-link>
          </li>
          <li>
            <router-link to="/vouchers" active-class="active">Voucher</router-link>
          </li>
          <li>
            <router-link to="/news" active-class="active">Tin tức</router-link>
          </li>
          <li>
            <router-link to="/favorite-products" active-class="active">SP Yêu Thích</router-link>
          </li>
          <li>
            <router-link to="/logout" active-class="active">Đăng xuất</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="main-content">
      <header class="header">
        <h1>{{ currentRouteName }}</h1>
        <div class="welcome">xin chào, Dũ Kiệt ▼</div>
      </header>

      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    // Hàm này sẽ trả về tên hiển thị cho tiêu đề dựa trên route hiện tại
    currentRouteName() {
      // this.$route là đối tượng route hiện tại được cung cấp bởi Vue Router
      // this.$route.name là tên của route đã định nghĩa trong router/index.js
      switch (this.$route.name) {
        case 'Dashboard': return 'Bảng điều khiển';
        case 'Categories': return 'Quản Lý Danh Mục';
        case 'Products': return 'Quản Lý Sản Phẩm';
        case 'Orders': return 'Quản Lý Đơn Hàng';
        case 'Customers': return 'Quản Lý Khách Hàng';
        case 'Vouchers': return 'Quản Lý Voucher';
        case 'News': return 'Quản Lý Tin Tức';
        case 'FavoriteProducts': return 'Sản Phẩm Yêu Thích';
        case 'Logout': return 'Đăng Xuất';
        default: return 'Trang Quản Trị';
      }
    }
  }
}
</script>

<style>
/* Toàn bộ CSS của bạn đã được chuyển sang src/assets/styles/main.css */
/* Không nên có CSS ở đây, trừ khi bạn muốn override hoặc thêm style rất cụ thể cho App.vue */
</style>
