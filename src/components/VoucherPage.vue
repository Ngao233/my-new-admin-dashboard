<template>
  <div class="page-content">
    <div class="page-title">Quản Lý Voucher</div>
    <p>Trang này cho phép bạn quản lý các mã giảm giá (voucher), bao gồm tạo mới, chỉnh sửa và kích hoạt/hủy kích hoạt.</p>

    <button class="btn-add" @click="addVoucher">+ Thêm Voucher</button>

    <div v-if="showAlert" :class="['alert', alertType]">{{ alertMessage }}</div>

    <table>
      <thead>
        <tr>
          <th>Mã Voucher</th>
          <th>Giá Trị</th>
          <th>Ngày Hết Hạn</th>
          <th>Tối Thiểu Đơn Hàng</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="voucher in vouchers" :key="voucher.code">
          <td>{{ voucher.code }}</td>
          <td>{{ formatValue(voucher.value, voucher.type) }}</td>
          <td>{{ voucher.expiryDate }}</td>
          <td>{{ formatCurrency(voucher.minOrder) }}</td>
          <td><span :class="['status', voucher.statusClass]">{{ voucher.statusText }}</span></td>
          <td class="actions">
            <button class="edit" @click="editVoucher(voucher)">Sửa</button>
            <button class="delete" @click="toggleVoucherStatus(voucher)">
              {{ voucher.statusText === 'Hoạt động' ? 'Hủy kích hoạt' : 'Kích hoạt' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VoucherPage',
  data() {
    return {
      vouchers: [
        { code: 'SALE20', value: 20, type: 'percent', expiryDate: '2025-12-31', minOrder: 1000000, statusText: 'Hoạt động', statusClass: 'active' },
        { code: 'FREESHIP', value: 30000, type: 'amount', expiryDate: '2024-07-20', minOrder: 500000, statusText: 'Hết hạn', statusClass: 'expired' },
        { code: 'VIP100K', value: 100000, type: 'amount', expiryDate: '2025-10-01', minOrder: 2000000, statusText: 'Hoạt động', statusClass: 'active' },
        { code: 'OFF50', value: 50000, type: 'amount', expiryDate: '2025-08-15', minOrder: 0, statusText: 'Không hoạt động', statusClass: 'inactive' },
      ],
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-success'
    };
  },
  methods: {
    formatCurrency(value) {
      if (value === 0) return 'Không yêu cầu';
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    formatValue(value, type) {
      if (type === 'percent') {
        return `${value}%`;
      } else if (type === 'amount') {
        return this.formatCurrency(value);
      }
      return value;
    },
    addVoucher() {
      this.alertMessage = 'Chức năng thêm voucher mới sẽ được phát triển!';
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    editVoucher(voucher) {
      this.alertMessage = `Bạn đang chỉnh sửa voucher: "${voucher.code}"`;
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    toggleVoucherStatus(voucher) {
      if (voucher.statusClass === 'expired') {
        this.alertMessage = `Voucher "${voucher.code}" đã hết hạn, không thể thay đổi trạng thái.`;
        this.alertType = 'alert-warning';
      } else {
        const newStatusText = voucher.statusText === 'Hoạt động' ? 'Không hoạt động' : 'Hoạt động';
        const newStatusClass = voucher.statusText === 'Hoạt động' ? 'inactive' : 'active';
        
        if (confirm(`Bạn có chắc chắn muốn thay đổi trạng thái voucher "${voucher.code}" thành "${newStatusText}" không?`)) {
          const index = this.vouchers.findIndex(v => v.code === voucher.code);
          if (index !== -1) {
            this.vouchers[index].statusText = newStatusText;
            this.vouchers[index].statusClass = newStatusClass;
            this.vouchers = [...this.vouchers]; // Đảm bảo Vue cập nhật reactive
          }
          this.alertMessage = `Đã cập nhật trạng thái voucher "${voucher.code}" thành "${newStatusText}"!`;
          this.alertType = 'alert-success';
        } else {
            this.alertMessage = `Đã hủy thao tác cập nhật trạng thái voucher "${voucher.code}".`;
            this.alertType = 'alert-info';
        }
      }
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  },
  // Có thể thêm mounted hook để kiểm tra và cập nhật trạng thái "Hết hạn" dựa trên ngày hiện tại
  mounted() {
    this.vouchers.forEach(voucher => {
      const expiryDate = new Date(voucher.expiryDate);
      const today = new Date();
      // Đặt giờ về 00:00:00 để so sánh chính xác theo ngày
      expiryDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (voucher.statusClass !== 'expired' && expiryDate < today) {
        voucher.statusText = 'Hết hạn';
        voucher.statusClass = 'expired';
      }
    });
    // Đảm bảo Vue cập nhật lại mảng sau khi duyệt
    this.vouchers = [...this.vouchers];
  }
};
</script>

<style scoped>
/* ------------------------------------ */
/* CSS cho trang Quản Lý Voucher (VoucherPage.vue) */
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

/* CSS cho tiêu đề trang "Quản Lý Voucher" */
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
/* CSS cho các thành phần chính (Nút, Bảng, Alert) */
/* ------------------------------------ */

/* Nút thêm voucher */
.btn-add {
    background-color: #e09f3e; /* Màu nâu cam, nhất quán */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: 500;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-bottom: 25px;
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.btn-add:hover {
    background-color: #cc8d2d;
    transform: translateY(-1px);
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

.alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border-color: #bee5eb;
}

.alert-warning {
    background-color: #fff3cd;
    color: #664d03;
    border-color: #ffecb5;
}

/* Ẩn alert khi không hiển thị */
.alert[style*="opacity: 0"] {
  display: none;
}

/* Bảng voucher */
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

/* Các nút hành động trong bảng (Sửa, Kích hoạt/Hủy kích hoạt) */
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

.actions .edit { /* Nút "Sửa" */
    background-color: #f2c75a;
    color: #333;
}

.actions .edit:hover {
    background-color: #e0b64d;
    transform: translateY(-1px);
}

/* Nút thay đổi trạng thái (Kích hoạt/Hủy kích hoạt) */
.actions .delete { /* Dùng màu đỏ cho hành động hủy kích hoạt/xóa */
    background-color: #e84c3d; /* Màu đỏ */
    color: white;
}
.actions .delete:hover {
    background-color: #d13c2c;
    transform: translateY(-1px);
}
/* Nếu muốn nút "Kích hoạt" có màu xanh khác */
/* .actions .activate {
    background-color: #28a745;
    color: white;
}
.actions .activate:hover {
    background-color: #218838;
} */


/* CSS cho các thẻ trạng thái (status badges) */
.status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px; /* Hình viên thuốc */
    font-size: 0.8em;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
}

.status.active { /* Trạng thái "Hoạt động" */
    background-color: #28a745; /* Xanh lá cây */
}

.status.expired { /* Trạng thái "Hết hạn" */
    background-color: #6c757d; /* Xám */
}

.status.inactive { /* Trạng thái "Không hoạt động" (tạm dừng) */
    background-color: #ffc107; /* Vàng */
    color: #333; /* Chữ đen trên nền vàng */
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

    .btn-add {
        padding: 8px 15px;
        font-size: 0.9em;
    }

    .actions button {
        padding: 5px 10px;
        font-size: 0.75em;
    }
}
</style>