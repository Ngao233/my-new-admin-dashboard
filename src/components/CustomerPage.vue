<template>
  <div class="page-content">
    <div class="page-title">Quản Lý Khách Hàng</div>
    <p>Trang này hiển thị danh sách các khách hàng đã đăng ký hoặc đã tương tác với hệ thống của bạn.</p>

    <div v-if="showAlert" :class="['alert', alertType]">{{ alertMessage }}</div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Khách Hàng</th>
          <th>Email</th>
          <th>Số Điện Thoại</th>
          <th>Ngày Đăng Ký</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.registrationDate }}</td>
          <td class="actions">
            <button class="edit" @click="viewCustomer(customer)">Xem</button>
            <button class="delete" @click="deleteCustomer(customer)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CustomerPage',
  data() {
    return {
      customers: [
        { id: 101, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0901234567', registrationDate: '2023-01-15' },
        { id: 102, name: 'Trần Thị B', email: 'tranhtb@example.com', phone: '0912345678', registrationDate: '2023-02-20' },
        { id: 103, name: 'Lê Văn C', email: 'levanc@example.com', phone: '0987654321', registrationDate: '2023-03-10' },
        { id: 104, name: 'Phạm Thu D', email: 'phamthud@example.com', phone: '0976543210', registrationDate: '2023-04-01' },
      ],
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-success' // Có thể là 'alert-success', 'alert-info', 'alert-warning', 'alert-error'
    };
  },
  methods: {
    viewCustomer(customer) {
      // Logic để xem chi tiết khách hàng
      this.alertMessage = `Xem chi tiết khách hàng: ${customer.name} (ID: ${customer.id})`;
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    deleteCustomer(customer) {
      if (confirm(`Bạn có chắc chắn muốn xóa khách hàng "${customer.name}" (ID: ${customer.id}) không?`)) {
        this.customers = this.customers.filter(c => c.id !== customer.id);
        this.alertMessage = `Đã xóa khách hàng "${customer.name}" thành công!`;
        this.alertType = 'alert-success'; // Hoặc 'alert-warning' nếu bạn muốn cảnh báo việc xóa
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
/* CSS cho trang Quản Lý Khách Hàng (CustomerPage.vue) */
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


/* CSS cho tiêu đề trang "Quản Lý Khách Hàng" */
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

.alert-warning { /* Thêm màu cảnh báo cho trạng thái hủy/xóa */
    background-color: #fff3cd;
    color: #664d03;
    border-color: #ffecb5;
}

/* Ẩn alert khi không hiển thị */
.alert[style*="opacity: 0"] {
  display: none;
}

/* Bảng khách hàng */
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

/* Các nút hành động trong bảng (Xem, Xóa) */
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

.actions .edit { /* Nút "Xem" sẽ dùng màu tương tự "Sửa" */
    background-color: #f2c75a;
    color: #333;
}

.actions .edit:hover {
    background-color: #e0b64d;
    transform: translateY(-1px);
}

.actions .delete { /* Nút "Xóa" */
    background-color: #e84c3d;
    color: white;
}

.actions .delete:hover {
    background-color: #d13c2c;
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