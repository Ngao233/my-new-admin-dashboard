<template>
  <div class="page-content">
    <div class="page-title">Quản Lý Sản Phẩm</div>
    <p>Đây là trang quản lý sản phẩm. Bạn có thể xem, thêm, sửa, xóa sản phẩm tại đây.</p>

    <button class="btn-add" @click="addProduct">+ Thêm Sản Phẩm</button>

    <div v-if="showAlert" :class="['alert', alertType]">{{ alertMessage }}</div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Sản Phẩm</th>
          <th>Giá</th>
          <th>Danh Mục</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ product.category }}</td>
          <td class="actions">
            <button class="edit" @click="editProduct(product)">Sửa</button>
            <button class="delete" @click="deleteProduct(product)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  data() {
    return {
      products: [
        { id: 1, name: 'Sofa Da Hiện Đại', price: 15000000, category: 'Nội thất phòng khách' },
        { id: 2, name: 'Bàn Ăn Gỗ Sồi 6 Ghế', price: 12500000, category: 'Nội thất phòng ăn' },
        { id: 3, name: 'Tủ Quần Áo Gỗ Công Nghiệp', price: 7800000, category: 'Nội thất phòng ngủ' },
        { id: 4, name: 'Đèn Trang Trí Để Bàn', price: 850000, category: 'Phụ kiện' },
      ],
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-success' // Có thể là 'alert-success' hoặc 'alert-error'
    };
  },
  methods: {
    formatCurrency(value) {
      // Định dạng tiền tệ Việt Nam Đồng
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    addProduct() {
      // Logic để thêm sản phẩm
      this.alertMessage = 'Chức năng thêm sản phẩm sẽ được phát triển!';
      this.alertType = 'alert-info'; // Có thể dùng màu thông tin khác
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    editProduct(product) {
      // Logic để sửa sản phẩm
      this.alertMessage = `Bạn đang chỉnh sửa sản phẩm: "${product.name}" (ID: ${product.id})`;
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    deleteProduct(product) {
      if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}" không?`)) {
        this.products = this.products.filter(p => p.id !== product.id);
        this.alertMessage = `Đã xóa sản phẩm "${product.name}" thành công!`;
        this.alertType = 'alert-success';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    }
  }
};
</script>

<style scoped>
/* ------------------------------------ */
/* CSS cho trang Quản Lý Sản Phẩm (ProductPage.vue) */
/* ------------------------------------ */

/* Reset một số thuộc tính cơ bản */
* {
    box-sizing: border-box; /* Đảm bảo padding và border được tính vào chiều rộng/cao */
    margin: 0; /* Xóa margin mặc định của trình duyệt */
    padding: 0; /* Xóa padding mặc định của trình duyệt */
}

/* Lưu ý: CSS cho 'html' và 'body' thường được đặt trong một file CSS global (ví dụ: src/assets/styles/main.css) */
/* Tuy nhiên, nếu bạn muốn đặt ở đây cho mục đích demo, nó vẫn sẽ hoạt động */
/* Đảm bảo chiều cao đầy đủ cho html và body để các phần tử con có thể chiếm 100% chiều cao */
html, body {
    height: 100%; /* Đặt chiều cao 100% cho html và body */
    overflow-x: hidden; /* Ngăn chặn scroll ngang không mong muốn */
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Font chữ hiện đại, dễ đọc */
    background-color: #f4f6f9; /* Màu nền tổng thể nhẹ nhàng, khớp với Dashboard và các trang khác */
    color: #333; /* Màu chữ mặc định */
}

/* CSS cho khối nội dung chính của trang (cái "card" trắng bao quanh) */

/* CSS cho tiêu đề trang "Quản Lý Sản Phẩm" */
.page-title {
    font-size: 1.8em; /* Kích thước font của tiêu đề, vừa phải và dễ nhìn */
    color: #ffffff; /* Màu chữ trắng, nổi bật trên nền đậm */
    background-color: #5e4329; /* Màu nền nâu đậm, nhất quán với các trang quản lý khác */
    text-align: center; /* Căn giữa chữ trong tiêu đề */
    padding: 15px 0; /* Khoảng đệm trên dưới cho tiêu đề */
    margin-bottom: 30px; /* Khoảng cách với nội dung bên dưới tiêu đề */
    font-weight: 600; /* Độ đậm của chữ */
    border-radius: 6px; /* Bo tròn nhẹ các góc của khối tiêu đề */
}

/* Kiểu dáng cho đoạn văn bản mô tả ban đầu */
.page-content p {
    font-size: 1.1em; /* Kích thước font của đoạn văn bản */
    color: #555; /* Màu chữ xám đậm */
    text-align: center; /* Căn giữa đoạn văn bản */
    margin-bottom: 30px; /* Khoảng cách với các thành phần tiếp theo (nếu có) */
    line-height: 1.6; /* Chiều cao dòng để văn bản dễ đọc hơn */
}

/* ------------------------------------ */
/* CSS cho các thành phần chính (Nút, Bảng, Alert) */
/* ------------------------------------ */

/* Nút thêm sản phẩm */
.btn-add {
    background-color: #e09f3e; /* Màu nâu cam, nhất quán với nút thêm/sửa ở các trang khác */
    color: white; /* Màu chữ trắng */
    padding: 10px 20px; /* Khoảng đệm bên trong nút */
    border: none; /* Bỏ viền nút */
    border-radius: 5px; /* Bo tròn các góc nút */
    cursor: pointer; /* Thay đổi con trỏ thành bàn tay khi rê chuột */
    font-size: 1em; /* Kích thước font */
    font-weight: 500; /* Độ đậm của chữ */
    transition: background-color 0.3s ease, transform 0.2s ease; /* Hiệu ứng chuyển động mượt mà */
    margin-bottom: 25px; /* Khoảng cách với bảng (nếu có) */
    display: block; /* Đảm bảo nút là block-level để có thể căn giữa */
    width: fit-content; /* Chiều rộng vừa với nội dung */
    margin-left: auto; /* Căn giữa nút theo chiều ngang */
    margin-right: auto; /* Căn giữa nút theo chiều ngang */
}

.btn-add:hover {
    background-color: #cc8d2d; /* Màu tối hơn khi rê chuột qua */
    transform: translateY(-1px); /* Nút hơi nhích lên */
}

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

.alert-info { /* Thêm màu cho alert info nếu muốn thông báo khác */
    background-color: #d1ecf1;
    color: #0c5460;
    border-color: #bee5eb;
}

/* Ẩn alert khi không hiển thị */
.alert[style*="opacity: 0"] {
  display: none;
}

/* Bảng sản phẩm */
table {
    width: 100%; /* Chiếm toàn bộ chiều rộng có sẵn */
    border-collapse: collapse; /* Gộp các đường viền của ô */
    margin-top: 20px; /* Khoảng cách từ bảng đến các thành phần phía trên */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03); /* Đổ bóng nhẹ cho bảng */
    background-color: #fff; /* Nền trắng cho bảng */
    border-radius: 6px; /* Bo tròn các góc bảng */
    overflow: hidden; /* Đảm bảo nội dung không tràn ra khỏi các góc bo tròn */
}

th, td {
    padding: 12px 18px; /* Khoảng đệm bên trong mỗi ô */
    text-align: left; /* Căn trái nội dung trong ô */
    border-bottom: 1px solid #f0f0f0; /* Đường kẻ dưới mỗi hàng */
}

th {
    background-color: #f9f9f9; /* Nền xám nhạt cho hàng tiêu đề */
    color: #555; /* Màu chữ xám đậm cho tiêu đề */
    font-weight: 600; /* Độ đậm của chữ */
    text-transform: uppercase; /* Chuyển chữ thành chữ hoa */
    font-size: 0.85em; /* Kích thước font nhỏ hơn cho tiêu đề cột */
}

tr:hover {
    background-color: #fcfcfc; /* Hiệu ứng nền hơi sáng hơn khi rê chuột qua hàng */
}

/* Các nút hành động trong bảng (Sửa, Xóa) */
.actions { 
    display: flex; /* Sử dụng Flexbox để bố trí các nút */
    gap: 8px; /* Khoảng cách giữa các nút */
    justify-content: flex-start; /* Căn trái các nút hành động trong ô */
    align-items: center; /* Căn giữa các nút theo chiều dọc */
}

.actions button {
    padding: 6px 12px; /* Kích thước padding bên trong nút */
    border: none; /* Bỏ viền nút */
    border-radius: 4px; /* Bo tròn các góc nút */
    cursor: pointer; /* Thay đổi con trỏ thành bàn tay */
    font-size: 0.8em; /* Kích thước font nhỏ hơn */
    font-weight: 500; /* Độ đậm của chữ */
    transition: background-color 0.3s ease, transform 0.2s ease; /* Hiệu ứng chuyển động mượt mà */
    flex-shrink: 0; /* Ngăn không cho nút bị co lại */
}

.actions .edit {
    background-color: #f2c75a; /* Màu vàng cam nhạt, nhất quán */
    color: #333; /* Màu chữ đen hoặc xám đậm để tương phản */
}

.actions .edit:hover {
    background-color: #e0b64d; /* Màu tối hơn khi rê chuột qua */
    transform: translateY(-1px); /* Nút hơi nhích lên */
}

.actions .delete {
    background-color: #e84c3d; /* Màu đỏ tươi, nhất quán */
    color: white; /* Màu chữ trắng */
}

.actions .delete:hover {
    background-color: #d13c2c; /* Màu tối hơn khi rê chuột qua */
    transform: translateY(-1px); /* Nút hơi nhích lên */
}

/* Điều chỉnh responsive cho màn hình nhỏ hơn 768px */
@media (max-width: 768px) {
    .page-content {
        padding: 20px; /* Giảm padding trên màn hình nhỏ */
        margin: 20px auto; /* Giảm margin trên màn hình nhỏ */
    }

    .page-title {
        font-size: 1.5em; /* Giảm kích thước font tiêu đề */
        padding: 12px 0; /* Giảm padding tiêu đề */
    }

    .page-content p {
        font-size: 1em; /* Giảm kích thước font đoạn văn bản */
    }

    th, td {
        padding: 10px 15px; /* Giảm padding trong bảng */
        font-size: 0.85em; /* Giảm kích thước font trong bảng */
    }

    .btn-add {
        padding: 8px 15px; /* Giảm padding nút thêm */
        font-size: 0.9em; /* Giảm kích thước font nút thêm */
    }

    .actions button {
        padding: 5px 10px; /* Giảm padding nút hành động */
        font-size: 0.75em; /* Giảm kích thước font nút hành động */
    }
}
</style>