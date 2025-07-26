<template>
  <div class="page-content">
    <div class="page-title">Quản Lý Đơn Hàng</div>
    <p>Trang này hiển thị danh sách các đơn hàng đã được tạo. Bạn có thể xem chi tiết và cập nhật trạng thái đơn hàng tại đây.</p>

    <div v-if="showAlert" :class="['alert', alertType]">{{ alertMessage }}</div>

    <table>
      <thead>
        <tr>
          <th>ID Đơn Hàng</th>
          <th>Khách Hàng</th>
          <th>Ngày Đặt</th>
          <th>Tổng Tiền</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ formatCurrency(order.totalAmount) }}</td>
          <td><span :class="['status', order.statusClass]">{{ order.statusText }}</span></td>
          <td class="actions">
            <button class="edit" @click="viewOrder(order)">Xem</button>
            <button class="delete" @click="cancelOrder(order)">Hủy</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OrderPage',
  data() {
    return {
      orders: [
        { id: '#DH001', customerName: 'Nguyễn Văn A', orderDate: '2023-11-01', totalAmount: 10000000, statusText: 'Đã giao', statusClass: 'done' },
        { id: '#DH002', customerName: 'Trần Thị B', orderDate: '2023-11-03', totalAmount: 5500000, statusText: 'Đang xử lý', statusClass: 'pending' },
        { id: '#DH003', customerName: 'Lê Văn C', orderDate: '2023-11-05', totalAmount: 2300000, statusText: 'Đã hủy', statusClass: 'cancelled' },
        { id: '#DH004', customerName: 'Phạm Thị D', orderDate: '2023-11-07', totalAmount: 8200000, statusText: 'Đã giao', statusClass: 'done' },
        { id: '#DH005', customerName: 'Hoàng Minh E', orderDate: '2023-11-08', totalAmount: 4100000, statusText: 'Đang xử lý', statusClass: 'pending' },
      ],
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-success' // Có thể là 'alert-success', 'alert-info', 'alert-warning', 'alert-error'
    };
  },
  methods: {
    formatCurrency(value) {
      // Định dạng tiền tệ Việt Nam Đồng
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    viewOrder(order) {
      // Logic để xem chi tiết đơn hàng
      this.alertMessage = `Xem chi tiết đơn hàng: ${order.id} của ${order.customerName}`;
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    cancelOrder(order) {
      if (confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${order.id} của "${order.customerName}" không?`)) {
        // Cập nhật trạng thái đơn hàng thành "Đã hủy"
        const index = this.orders.findIndex(o => o.id === order.id);
        if (index !== -1) {
          this.orders[index].statusText = 'Đã hủy';
          this.orders[index].statusClass = 'cancelled';
          // Có thể tạo một bản sao mới nếu không muốn thay đổi trực tiếp trên mảng data
          this.orders = [...this.orders]; 
        }
        this.alertMessage = `Đã hủy đơn hàng ${order.id} thành công!`;
        this.alertType = 'alert-warning'; // Sử dụng màu cảnh báo cho việc hủy
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
/* CSS cho trang Quản Lý Đơn Hàng (OrderPage.vue) */
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


/* CSS cho tiêu đề trang "Quản Lý Đơn Hàng" */
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

.alert-warning { /* Thêm màu cảnh báo cho trạng thái hủy */
    background-color: #fff3cd;
    color: #664d03;
    border-color: #ffecb5;
}

/* Ẩn alert khi không hiển thị */
.alert[style*="opacity: 0"] {
  display: none;
}

/* Bảng đơn hàng */
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

/* Các nút hành động trong bảng (Xem, Hủy) */
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

.actions .delete { /* Nút "Hủy" sẽ dùng màu tương tự "Xóa" */
    background-color: #e84c3d;
    color: white;
}

.actions .delete:hover {
    background-color: #d13c2c;
    transform: translateY(-1px);
}

/* CSS cho các thẻ trạng thái (status badges), copy từ DashboardPage */
.status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px; /* Hình viên thuốc */
    font-size: 0.8em;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
}

.status.done { /* Trạng thái "Đã giao" */
    background-color: #28a745; /* Xanh lá cây */
}

.status.pending { /* Trạng thái "Đang xử lý" */
    background-color: #ffc107; /* Vàng */
    color: #333; /* Chữ đen trên nền vàng */
}

.status.cancelled { /* Trạng thái "Đã hủy" */
    background-color: #dc3545; /* Đỏ */
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