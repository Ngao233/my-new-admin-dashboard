<template>
  <div class="home-page">
    <section class="welcome-banner">
      <h1>Chào mừng đến với cửa hàng của chúng tôi</h1>
      <p>Khám phá các sản phẩm chất lượng cao</p>
      <router-link to="/products" class="btn">Xem sản phẩm</router-link>
    </section>
    <section class="featured-products">
      <!-- Hiển thị sản phẩm nổi bật -->
    </section>
  </div>
</template>
<script>
export default {
  name: 'HomeView',
}
</script>