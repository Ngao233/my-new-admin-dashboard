<template>
  <div>Đang đăng xuất...</div>
</template>

<script>
export default {
  name: 'LogoutView',
  created() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace('/login'); // Chỉ reload 1 lần và chuyển
  }
}
</script>