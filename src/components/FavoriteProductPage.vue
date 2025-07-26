<template>
  <div class="page-content">
    <div class="page-title">Sản Phẩm Yêu Thích</div>
    <p>Trang này hiển thị danh sách các sản phẩm được người dùng yêu thích nhất, được sắp xếp theo số lượt yêu thích.</p>

    <div v-if="showAlert" :class="['alert', alertType]">{{ alertMessage }}</div>

    <table>
      <thead>
        <tr>
          <th>ID Sản Phẩm</th>
          <th>Tên Sản Phẩm</th>
          <th>Danh Mục</th>
          <th>Số Lượt Yêu Thích</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in favoriteProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.favoritesCount }}</td>
          <td class="actions">
            <button class="edit" @click="viewProductDetails(product)">Xem Chi Tiết</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FavoriteProductsPage',
  data() {
    return {
      favoriteProducts: [
        { id: 101, name: 'Ghế bành thư giãn Lười', category: 'Nội thất phòng khách', favoritesCount: 250 },
        { id: 102, name: 'Bàn trà mặt đá cẩm thạch', category: 'Nội thất phòng khách', favoritesCount: 180 },
        { id: 103, name: 'Kệ sách đa năng gỗ tự nhiên', category: 'Nội thất phòng làm việc', favoritesCount: 150 },
        { id: 104, name: 'Đèn sàn hiện đại LED', category: 'Phụ kiện trang trí', favoritesCount: 120 },
        { id: 105, name: 'Giường ngủ thông minh tích hợp tủ', category: 'Nội thất phòng ngủ', favoritesCount: 95 },
      ],
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-info'
    };
  },
  methods: {
    viewProductDetails(product) {
      this.alertMessage = `Bạn đang xem chi tiết sản phẩm: "${product.name}" (ID: ${product.id})`;
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    // Trong một ứng dụng thực tế, bạn có thể thêm logic để:
    // - Lấy dữ liệu sản phẩm yêu thích từ API.
    // - Cập nhật số lượt yêu thích.
    // - Sắp xếp lại danh sách nếu số lượt yêu thích thay đổi.
  },
  mounted() {
    // Sắp xếp sản phẩm yêu thích theo số lượt giảm dần khi component được mount
    this.favoriteProducts.sort((a, b) => b.favoritesCount - a.favoritesCount);
  }
};
</script>

<style scoped>
/* ------------------------------------ */
/* CSS cho trang Sản Phẩm Yêu Thích (FavoriteProductsPage.vue) */
/* ------------------------------------ */

/* Reset một số thuộc tính cơ bản */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Lưu ý: CSS cho 'html' và 'body' thường được đặt trong một file CSS global (ví dụ: src/assets/styles/main.css) */
/* Tuy nhiên, nếu bạn muốn đặt ở đây cho mục đích demo, nó vẫn sẽ hoạt động */
html, body {
    height: 100%;
    overflow-x: hidden;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f6f9;
    color: #333;
}

/* CSS cho khối nội dung chính của trang (cái "card" trắng) */

/* CSS cho tiêu đề trang "Sản Phẩm Yêu Thích" */
.page-title {
    font-size: 1.8em;
    color: #ffffff;
    background-color: #5e4329; /* Màu nền nâu đậm, nhất quán */
    text-align: center;
    padding: 15px 0;
    margin-bottom: 30px;
    font-weight: 600;
    border-radius: 6px;
}

/* Kiểu dáng cho đoạn văn bản mô tả ban đầu */
.page-content p {
    font-size: 1.1em;
    color: #555;
    text-align: center;
    margin-bottom: 30px;
    line-height: 1.6;
}

/* ------------------------------------ */
/* CSS cho các thành phần chính (Bảng, Alert) */
/* ------------------------------------ */

/* Hộp thông báo (alert) */
.alert {
    padding: 12px 20px;
    border: 1px solid transparent;
    border-radius: 5px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 500;
    opacity: 1;
    transition: opacity 0.5s ease-out;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
}

.alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border-color: #bee5eb;
}

/* Thêm alert-warning và alert-error nếu chưa có ở global CSS */
.alert-warning {
    background-color: #fff3cd;
    color: #664d03;
    border-color: #ffecb5;
}

.alert-error {
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
}

/* Ẩn alert khi không hiển thị */
.alert[style*="opacity: 0"] {
  display: none;
}

/* Bảng sản phẩm yêu thích */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
}

th, td {
    padding: 12px 18px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
}

th {
    background-color: #f9f9f9;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85em;
}

tr:hover {
    background-color: #fcfcfc;
}

/* Các nút hành động trong bảng */
.actions {
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    align-items: center;
}

.actions button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8em;
    font-weight: 500;
    transition: background-color 0.3s ease, transform 0.2s ease;
    flex-shrink: 0;
}

.actions .edit { /* Sử dụng màu vàng cam cho nút "Xem Chi Tiết" */
    background-color: #f2c75a;
    color: #333;
}

.actions .edit:hover {
    background-color: #e0b64d;
    transform: translateY(-1px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .page-content {
        padding: 20px;
        margin: 20px auto;
    }

    .page-title {
        font-size: 1.5em;
        padding: 12px 0;
    }

    .page-content p {
        font-size: 1em;
    }

    th, td {
        padding: 10px 15px;
        font-size: 0.85em;
    }

    .actions button {
        padding: 5px 10px;
        font-size: 0.75em;
    }
}
</style>