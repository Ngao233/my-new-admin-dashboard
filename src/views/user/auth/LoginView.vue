<template>
  <div class="login-container">
    <h1>Đăng nhập hệ thống</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email hoặc Username</label>
        <input type="text" v-model="form.login" required>
      </div>
      <div class="form-group">
        <label>Mật khẩu</label>
        <input type="password" v-model="form.password" required>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Đang xử lý...' : 'Đăng nhập' }}
      </button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        login: '',  // Nhận cả email hoặc username
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = '';
      
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          login: this.form.login,
          Password: this.form.password
        });

        if (response.data.success) {
          // Lưu token và user info vào Vuex/localStorage
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Chuyển hướng sau khi đăng nhập thành công
          this.$router.push('/');
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        if (error.response) {
          // Lỗi từ phản hồi API
          this.error = error.response.data.message || 'Đăng nhập thất bại';
        } else {
          this.error = 'Lỗi kết nối đến máy chủ';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 1rem;
}
</style>