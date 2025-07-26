<template>
  <div class="page-content">
    <div class="page-title">Quản Lý Danh Mục</div>

    <button class="btn-add" @click="addCategory">+ Thêm Danh Mục</button>

    <div v-if="showAlert" class="alert-success">{{ alertMessage }}</div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Danh Mục</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td class="actions">
            <button class="edit" @click="editCategory(category)">Sửa</button>
            <button class="delete" @click="deleteCategory(category)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CategoryPage',
  data() {
    return {
      categories: [
        { id: 1, name: 'sofa' },
        { id: 2, name: 'Bàn ghế' },
        { id: 3, name: 'Giường' },
      ],
      showAlert: false,
      alertMessage: ''
    };
  },
  methods: {
    addCategory() {
      alert('Chức năng thêm danh mục sẽ được phát triển!');
    },
    editCategory(category) {
      alert(`Bạn muốn sửa danh mục: ${category.name} (ID: ${category.id})`);
    },
    deleteCategory(category) {
      if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.name}" không?`)) {
        this.categories = this.categories.filter(cat => cat.id !== category.id);
        this.alertMessage = `Đã xóa danh mục "${category.name}" thành công!`;
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
/* Dán TOÀN BỘ CSS tôi đã cung cấp vào đây */


.page-title {
  font-size: 1.8em; /* Giảm kích thước font một chút cho tiêu đề */
 
  background-color: #5e4329; /* Đổi màu nền sang nâu đậm, khớp với tiêu đề trong ảnh */
  text-align: center; /* Giữ nguyên căn giữa */
  margin-bottom: 30px; /* Giữ nguyên khoảng cách dưới */
  font-weight: 600; /* Giảm độ đậm một chút */
  padding: 15px 0; /* Thay padding-bottom bằng padding trên dưới để tạo khối chữ nhật */
  border-bottom: none; /* Bỏ đường kẻ dưới tiêu đề vì đã có background-color */
  border-radius: 6px; /* Thêm bo tròn nhẹ cho khối tiêu đề */
}

.btn-add {
  background-color: #e09f3e; /* Đổi màu nút sang nâu cam, giống trong hình demo */
  
  padding: 10px 20px; /* Giảm padding một chút */
  border: none; /* Giữ nguyên bỏ viền */
  border-radius: 5px; /* Giảm bo tròn một chút */
  cursor: pointer; /* Giữ nguyên con trỏ */
  font-size: 1em; /* Giảm kích thước font một chút */
  font-weight: 500; /* Giảm độ đậm một chút */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Giữ nguyên hiệu ứng chuyển động */
  margin-bottom: 25px; /* Giữ nguyên khoảng cách dưới */
  display: block; /* Đảm bảo nút là block để căn giữa */
  width: fit-content; /* Chiều rộng vừa với nội dung */
  margin-left: auto; /* Căn giữa nút */
  margin-right: auto; /* Căn giữa nút */
}

.btn-add:hover {
  background-color: #cc8d2d; /* Màu hover tối hơn, phù hợp với màu nâu cam */
  transform: translateY(-1px); /* Giữ hiệu ứng nhích lên */
}

.alert-success {
  background-color: #e6ffed; /* Đổi màu nền sang xanh nhạt hơn, nhẹ nhàng hơn */
  color: #0c6a1e; /* Đổi màu chữ sang xanh đậm, dễ đọc */
  padding: 10px 15px; /* Giảm padding một chút */
  border: 1px solid #b3ecc3; /* Đổi màu viền xanh nhạt hơn */
  border-radius: 4px; /* Giảm bo tròn một chút */
  margin-bottom: 20px; /* Giữ nguyên khoảng cách dưới */
  text-align: center; /* Giữ nguyên căn giữa */
  font-weight: 500; /* Giữ nguyên độ đậm */
  opacity: 1; /* Giữ nguyên opacity */
  transition: opacity 0.5s ease-out; /* Giữ nguyên hiệu ứng chuyển động */
}

/* Ẩn alert khi không hiển thị */
.alert-success[style*="opacity: 0"] {
  display: none; /* Giữ nguyên quy tắc ẩn */
}


table {
  width: 100%; /* Giữ nguyên chiều rộng 100% */
  border-collapse: collapse; /* Giữ nguyên gộp viền */
  margin-top: 20px; /* Điều chỉnh khoảng cách trên cho phù hợp với bố cục mới */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03); /* Đổ bóng nhẹ hơn cho bảng */
  background-color: #fff; /* Giữ nguyên nền trắng */
  border-radius: 6px; /* Thêm bo tròn góc cho bảng */
  overflow: hidden; /* Đảm bảo bo tròn góc hoạt động tốt với border-collapse */
}

th, td {
  padding: 12px 18px; /* Điều chỉnh padding cho ô */
  text-align: left; /* Giữ nguyên căn trái */
  border-bottom: 1px solid #f0f0f0; /* Đổi màu đường kẻ dưới sang nhạt hơn và mỏng hơn */
}

th {
  background-color: #f9f9f9; /* Đổi màu nền tiêu đề hàng hơi xám nhạt */
  color: #555; /* Đổi màu chữ tiêu đề sang xám đậm hơn */
  font-weight: 600; /* Giữ nguyên độ đậm */
  text-transform: uppercase; /* Giữ nguyên chữ hoa */
  font-size: 0.85em; /* Giảm kích thước font một chút cho tiêu đề cột */
}

tr:hover {
  background-color: #fcfcfc; /* Giữ nguyên hiệu ứng hover */
}

/* Theo ảnh, không có màu nền xen kẽ, nên tôi sẽ không thay đổi phần này */
/* tr:nth-child(even) {
  background-color: #fafafa;
} */

.actions {
  display: flex; /* Giữ nguyên flexbox */
  gap: 8px; /* Giảm khoảng cách giữa các nút */
  justify-content: center; /* Giữ nguyên căn giữa */
  align-items: center; /* Giữ nguyên căn giữa */
}

.actions button {
  padding: 6px 12px; /* Giảm padding cho nút Sửa/Xóa */
  border: none; /* Giữ nguyên bỏ viền */
  border-radius: 4px; /* Giảm bo tròn một chút */
  cursor: pointer; /* Giữ nguyên con trỏ */
  font-size: 0.8em; /* Giảm kích thước font một chút */
  font-weight: 500; /* Giữ nguyên độ đậm */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Giữ nguyên hiệu ứng chuyển động */
  flex-shrink: 0; /* Giữ nguyên ngăn co lại */
}

.actions .edit {
  background-color: #f2c75a; /* Đổi màu nút Sửa sang vàng cam nhạt, giống trong hình */
  color: #333; /* Đổi màu chữ sang đen hoặc xám đậm để tương phản */
}

.actions .edit:hover {
  background-color: #e0b64d; /* Màu hover tối hơn */
  transform: translateY(-1px); /* Giữ hiệu ứng nhích lên */
}

.actions .delete {
  background-color: #e84c3d; /* Đổi màu nút Xóa sang đỏ tươi hơn, giống trong hình */
  color: white; /* Giữ nguyên màu chữ trắng */
}

.actions .delete:hover {
  background-color: #d13c2c; /* Màu hover tối hơn */
  transform: translateY(-1px); /* Giữ hiệu ứng nhích lên */
}
</style>