<template>
  <div>Đang đăng xuất...</div>
</template>

<script>
export default {
  name: 'LogoutView',
  created() {
    // Xử lý đăng xuất
    this.$store.dispatch('logout')
    this.$router.push('/login')
  }
}
</script>