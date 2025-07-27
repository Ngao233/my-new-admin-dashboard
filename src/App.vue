<template>
  <div id="app">
    <!-- Chọn layout dựa trên route -->
    <AdminLayout v-if="isAdminRoute" />
    <FrontendLayout v-else />
  </div>
</template>

<script>
import AdminLayout from '@/layouts/AdminLayout.vue'
import FrontendLayout from '@/layouts/FrontendLayout.vue'

export default {
  components: { AdminLayout, FrontendLayout },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith('/admin')
    }
  }
}
</script>