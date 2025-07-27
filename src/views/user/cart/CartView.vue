<template>
  <div class="cart-page">
    <h1>Giỏ hàng của bạn</h1>
    <div v-if="!isAuthenticated">
      <p>Vui lòng <router-link to="/login">đăng nhập</router-link> để xem giỏ hàng.</p>
    </div>
    <div v-else>
      <div v-if="loading">Đang tải...</div>
      <div v-else-if="cartItems.length === 0">Giỏ hàng của bạn đang trống.</div>
      <table v-else class="cart-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.CartItemID">
            <td>
              <img
                :src="item.product_variant?.product?.Image || '/images/no-image.png'"
                alt="Ảnh sản phẩm"
                class="cart-img"
              />
            </td>
            <td>
              {{ item.product_variant?.product?.Name || 'Sản phẩm' }}
            </td>
            <td>{{ formatPrice(item.product_variant?.Price) }}</td>
            <td>{{ item.Quantity }}</td>
            <td>{{ formatPrice(item.product_variant?.Price * item.Quantity) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:right"><strong>Tổng cộng:</strong></td>
            <td><strong>{{ formatPrice(totalPrice) }}</strong></td>
          </tr>
        </tfoot>
      </table>
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
    },
    totalPrice() {
      return this.cartItems.reduce((sum, item) => {
        return sum + (item.productVariant?.Price || 0) * item.Quantity;
      }, 0);
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.fetchCart();
    }
  },
  methods: {
    formatPrice(price) {
      if (!price) return '0₫';
      return price.toLocaleString('vi-VN') + '₫';
    },
    async fetchCart() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/api/carts', {
          headers: { 'Authorization': `Bearer ${token}` }
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
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.cart-table th, .cart-table td {
  border: 1px solid #eee;
  padding: 0.75rem;
  text-align: center;
}
.cart-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  background: #f5f5f5;
}
</style>