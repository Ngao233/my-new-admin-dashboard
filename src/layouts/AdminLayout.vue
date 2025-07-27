<template>
  <div class="container">
    <aside class="sidebar">
      <div class="logo">
        <h2>☕</h2>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/admin/" active-class="active" exact-active-class="active">Tổng quan</router-link>
          </li>
          <li>
            <router-link to="/admin/categories" active-class="active">Danh mục</router-link>
          </li>
          <li>
            <router-link to="/admin/products" active-class="active">Sản phẩm</router-link>
          </li>
          <li>
            <router-link to="/admin/orders" active-class="active">Đơn hàng</router-link>
          </li>
          <li>
            <router-link to="/admin/customers" active-class="active">Khách hàng</router-link>
          </li>
          <li>
            <router-link to="/admin/vouchers" active-class="active">Voucher</router-link>
          </li>
          <li>
            <router-link to="/admin/news" active-class="active">Tin tức</router-link>
          </li>
          <li>
            <router-link to="/admin/favorite-products" active-class="active">SP Yêu Thích</router-link>
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
  computed: {
    currentRouteName() {
      switch (this.$route.name) {
        case 'AdminDashboard': return 'Bảng điều khiển';
        case 'AdminCategories': return 'Quản Lý Danh Mục';
        case 'AdminProducts': return 'Quản Lý Sản Phẩm';
        case 'AdminOrders': return 'Quản Lý Đơn Hàng';
        case 'AdminCustomers': return 'Quản Lý Khách Hàng';
        case 'AdminVouchers': return 'Quản Lý Voucher';
        case 'AdminNews': return 'Quản Lý Tin Tức';
        case 'AdminFavoriteProducts': return 'Sản Phẩm Yêu Thích';
        case 'AdminLogout': return 'Đăng Xuất';
        default: return 'Trang Quản Trị';
      }
    }
  }
}
</script>