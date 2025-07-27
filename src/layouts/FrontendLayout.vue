<template>
  <div class="frontend-layout">
    <header class="frontend-header">
      <nav>
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/products">Sản phẩm</router-link>
        <router-link to="/about">Giới thiệu</router-link>
        <router-link to="/cart">Giỏ hàng</router-link>

        <router-link v-if="!isAuthenticated" to="/login">Đăng nhập</router-link>
        <template v-else>
          <span v-if="userRole !== 1">Tài khoản</span>
          <router-link v-if="userRole !== 1" to="/logout">Đăng xuất</router-link>
          <router-link v-else to="/admin">Quản trị</router-link>
        </template>
      </nav>
    </header>
    
    <main>
      <router-view></router-view>
    </main>
    
    <footer class="frontend-footer">
      <!-- Footer content -->
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      // Kiểm tra nếu có token trong localStorage
      return !!localStorage.getItem('token');
    },
    userRole() {
      const user = localStorage.getItem('user');
      if (!user) return null;
      try {
        return JSON.parse(user).Role;
      } catch {
        return null;
      }
    }
  }
}
</script>

<style scoped>
.frontend-header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}

.frontend-header nav {
  display: flex;
  gap: 1rem;
}

.frontend-header a {
  text-decoration: none;
  color: #333;
}

.frontend-header a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
</style>