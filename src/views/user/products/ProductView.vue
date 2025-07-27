<template>
  <div class="product-page">
    <h1>Sản phẩm</h1>
    <div v-if="loading">Đang tải...</div>
    <div v-else>
      <div v-if="products.length === 0">Không có sản phẩm nào.</div>
      <div class="product-list">
        <div v-for="product in products" :key="product.ProductID" class="product-card">
          <img
            :src="product.variants && product.variants[0]?.Image ? '/uploads/products/' + product.variants[0].Image : '/images/no-image.png'"
            alt="Ảnh sản phẩm"
            class="product-img"
          />
          <h3>{{ product.Name }}</h3>
          <div v-if="product.variants && product.variants.length">
            <div class="variant-row">
              <span>Giá: {{ formatPrice(product.variants[0].Price) }}</span>
              <button @click="addToCart(product.variants[0].ProductVariantID)">Thêm vào giỏ hàng</button>
            </div>
          </div>
          <div v-else>
            <span>Chưa có biến thể</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  data() {
    return {
      products: [],
      loading: false
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    formatPrice(price) {
      if (!price) return '0₫';
      return price.toLocaleString('vi-VN') + '₫';
    },
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await fetch('http://localhost:8000/api/products');
        const data = await res.json();
        if (data.success) {
          this.products = data.data || [];
        } else {
          this.products = [];
        }
      } catch (e) {
        this.products = [];
      }
      this.loading = false;
    },
    async addToCart(variantId) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bạn cần đăng nhập để thêm vào giỏ hàng!');
        return;
      }
      try {
        const res = await fetch('http://localhost:8000/api/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ProductVariantID: variantId,
            Quantity: 1
          })
        });
        const data = await res.json();
        if (res.status === 200) {
          alert('Đã thêm vào giỏ hàng!');
        } else {
          alert(data.message || 'Thêm vào giỏ hàng thất bại!');
        }
      } catch (e) {
        alert('Lỗi kết nối máy chủ!');
      }
    }
  }
}
</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.product-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1rem;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  background: #f5f5f5;
  margin-bottom: 1rem;
}
.desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
}
.variant-row {
  font-size: 13px;
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>