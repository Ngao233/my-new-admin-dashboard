<template>
  <div class="page-content">
    <div class="page-title">Đăng Xuất</div>
    <p>Chào mừng bạn đã trở lại! Bạn có thể đăng xuất khỏi hệ thống bất cứ lúc nào.</p>
    <p>Nhấn vào nút bên dưới để kết thúc phiên làm việc của bạn.</p>
    
    <div v-if="showAlert" :class="['alert', alertType]">{{ alertMessage }}</div>

    <button @click="handleLogout" class="btn-logout">Đăng xuất ngay</button>
  </div>
</template>

<script>
export default {
  name: 'LogoutPage',
  data() {
    return {
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-info'
    };
  },
  methods: {
    handleLogout() {
      // Trong một ứng dụng thực tế, logic đăng xuất sẽ bao gồm:
      // 1. Xóa token xác thực (JWT, session ID) khỏi Local Storage, Session Storage hoặc Cookie.
      // 2. Gửi yêu cầu đến API backend để vô hiệu hóa session nếu cần.
      // 3. Chuyển hướng người dùng về trang đăng nhập hoặc trang chủ.

      this.alertMessage = 'Bạn đã đăng xuất thành công!';
      this.alertType = 'alert-success';
      this.showAlert = true;

      // Giả lập quá trình đăng xuất bằng một timeout
      setTimeout(() => {
        // Trong môi trường thực, bạn sẽ xóa token và điều hướng
        // Ví dụ: localStorage.removeItem('authToken');
        // this.$router.push('/login'); // Sử dụng Vue Router để chuyển hướng
        
        console.log('Đã thực hiện logic đăng xuất (giả lập).');
        this.alertMessage = 'Bạn đã được chuyển hướng về trang đăng nhập (giả lập)!';
        this.alertType = 'alert-info';
        
        // Ẩn alert sau thêm 2 giây nữa
        setTimeout(() => {
            this.showAlert = false;
        }, 2000);

      }, 1500); // Ẩn thông báo và giả lập chuyển hướng sau 1.5 giây
    }
  }
};
</script>

<style scoped>
/* ------------------------------------ */
/* CSS cho trang Đăng Xuất (LogoutPage.vue) */
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


/* CSS cho tiêu đề trang "Đăng Xuất" */
.page-title {
    font-size: 2em; /* Lớn hơn một chút cho tiêu đề trang đơn lẻ */
    color: #ffffff;
    background-color: #5e4329; /* Màu nền nâu đậm, nhất quán */
    text-align: center;
    padding: 18px 0; /* Padding lớn hơn */
    margin-bottom: 30px;
    font-weight: 700; /* Đậm hơn */
    border-radius: 6px;
}

/* Kiểu dáng cho đoạn văn bản mô tả */
.page-content p {
    font-size: 1.15em; /* Kích thước font lớn hơn một chút */
    color: #555;
    margin-bottom: 20px; /* Khoảng cách giữa các đoạn văn bản */
    line-height: 1.6;
}

/* Nút Đăng xuất */
.btn-logout {
    background-color: #e84c3d; /* Màu đỏ nổi bật cho hành động đăng xuất */
    color: white;
    padding: 12px 30px; /* Padding lớn hơn cho nút quan trọng */
    border: none;
    border-radius: 6px; /* Bo tròn lớn hơn một chút */
    cursor: pointer;
    font-size: 1.1em; /* Font lớn hơn */
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 30px; /* Khoảng cách từ văn bản đến nút */
}

.btn-logout:hover {
    background-color: #d13c2c; /* Màu tối hơn khi hover */
    transform: translateY(-2px); /* Nhấn nhá hơn một chút */
    box-shadow: 0 4px 10px rgba(232, 76, 61, 0.3); /* Thêm bóng khi hover */
}

/* Hộp thông báo (alert) - style đã có từ các trang trước */
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

/* Ẩn alert khi không hiển thị */
.alert[style*="opacity: 0"] {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .page-content {
        padding: 25px;
        margin: 40px auto;
        max-width: 90%; /* Giới hạn chiều rộng trên mobile */
    }

    .page-title {
        font-size: 1.7em;
        padding: 15px 0;
    }

    .page-content p {
        font-size: 1em;
    }

    .btn-logout {
        padding: 10px 25px;
        font-size: 1em;
    }
}
</style>