<template>
  <div class="logout-container">
    <div class="spinner-border text-primary" role="status"></div>
    <p>Đang đăng xuất...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LogoutView',
  async created() {
    try {
      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Xóa dữ liệu đăng nhập
      ['authToken', 'user', 'permissions', 'is_admin'].forEach(item => {
        localStorage.removeItem(item);
      });
      
      // Chuyển hướng về trang đăng nhập
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
}
</style>