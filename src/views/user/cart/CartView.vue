<template>
  <div class="cart-page">
    <h1>Giỏ hàng của bạn</h1>
    <div v-if="!isAuthenticated">
      <p>Vui lòng <router-link to="/login">đăng nhập</router-link> để xem giỏ hàng.</p>
    </div>
    <div v-else>
      <div v-if="loading">Đang tải...</div>
      <div v-else-if="cartItems.length === 0">Giỏ hàng của bạn đang trống.</div>
      <ul v-else>
        <li v-for="item in cartItems" :key="item.CartID">
          <strong>{{ item.product_variant?.ProductName || 'Sản phẩm' }}</strong>
          <span> - Số lượng: {{ item.Quantity }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartView',
  data() {
    return {
      cartItems: [],
      loading: false
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.fetchCart();
    }
  },
  methods: {
    async fetchCart() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/api/cart/view', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.status === 200) {
          this.cartItems = data.cart_items || [];
        } else {
          this.cartItems = [];
        }
      } catch (e) {
        this.cartItems = [];
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>