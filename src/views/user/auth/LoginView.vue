<template>
  <div class="login-page">
    <h1>Đăng nhập</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="login" type="text" placeholder="Email hoặc Username" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      <button type="submit">Đăng nhập</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      login: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.error = '';
      try {
        const res = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            login: this.login,
            Password: this.password
          })
        });
        const data = await res.json();
        if (!data.success) {
          this.error = data.message;
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Chuyển hướng theo role
        if (data.user.Role == 1) {
          window.location.replace('/admin/'); // Chỉ reload 1 lần và chuyển
        } else {
          window.location.replace('/'); // Chỉ reload 1 lần và chuyển
        }
      } catch (e) {
        this.error = 'Lỗi kết nối máy chủ';
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>