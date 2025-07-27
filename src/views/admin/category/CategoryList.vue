<template>
  <div>
    <h1>Danh sách Danh mục</h1>
    <button @click="showAddForm = true">Thêm danh mục</button>
    <table class="category-table">
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên danh mục</th>
          <th>Mô tả</th>
          <th>Ngày tạo</th>
          <th>Ngày cập nhật</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.CategoryID">
          <td>
            <img
              :src="cat.Image ? '/uploads/categories/' + cat.Image : '/images/no-image.png'"
              alt="Ảnh danh mục"
              class="cat-img"
            />
          </td>
          <td>
            <span v-if="editId !== cat.CategoryID">{{ cat.Name }}</span>
            <input v-else v-model="editName" />
          </td>
          <td>
            <span v-if="editId !== cat.CategoryID">{{ cat.Description }}</span>
            <input v-else v-model="editDesc" />
          </td>
          <td>{{ cat.Create_at }}</td>
          <td>{{ cat.Update_at }}</td>
          <td>
            <button v-if="editId !== cat.CategoryID" @click="startEdit(cat)">Sửa</button>
            <button v-else @click="saveEdit(cat.CategoryID)">Lưu</button>
            <button @click="deleteCategory(cat.CategoryID)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form thêm danh mục -->
    <div v-if="showAddForm" class="add-form">
      <h3>Thêm danh mục mới</h3>
      <input v-model="newName" placeholder="Tên danh mục" />
      <input v-model="newDesc" placeholder="Mô tả" />
      <input type="file" @change="onFileChange" accept="image/*" />
      <button @click="addCategory">Thêm</button>
      <button @click="showAddForm = false">Hủy</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      categories: [],
      showAddForm: false,
      newName: '',
      newDesc: '',
      selectedImage: null, // Declare selectedImage here
      editId: null,
      editName: '',
      editDesc: ''
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await fetch('http://localhost:8000/api/categories');
        const data = await res.json();
        if (data.success) {
          this.categories = data.data || [];
        } else {
          this.categories = [];
        }
      } catch (e) {
        this.categories = [];
      }
    },
    onFileChange(event) {
      this.selectedImage = event.target.files[0]; // Handle file selection
    },
    async addCategory() {
    try {
      const formData = new FormData();
      formData.append('Name', this.newName);
      formData.append('Description', this.newDesc);
      
      // Append the image file if it's selected
      if (this.selectedImage) {
        formData.append('Image', this.selectedImage);
      }

      const res = await fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        body: formData // Send FormData
      });

      const data = await res.json();
      console.log(data); // Log the response for debugging

      if (res.ok) {
        this.showAddForm = false;
        this.newName = '';
        this.newDesc = '';
        this.selectedImage = null; // Reset image selection
        this.fetchCategories();
      } else {
        alert(data.message || 'Thêm thất bại!');
      }
    } catch (e) {
      console.error('Error:', e); // Log the error for debugging
      alert('Lỗi kết nối!');
    }
  },
    startEdit(cat) {
      this.editId = cat.CategoryID;
      this.editName = cat.Name;
      this.editDesc = cat.Description;
    },
    async saveEdit(id) {
      try {
        const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Name: this.editName,
            Description: this.editDesc
          })
        });
        const data = await res.json();
        if (res.status === 200) {
          this.editId = null;
          this.editName = '';
          this.editDesc = '';
          this.fetchCategories();
        } else {
          alert(data.message || 'Sửa thất bại!');
        }
      } catch (e) {
        alert('Lỗi kết nối!');
      }
    },
    async deleteCategory(id) {
      if (!confirm('Bạn chắc chắn muốn xóa?')) return;
      try {
        const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (res.status === 200) {
          this.fetchCategories();
        } else {
          alert(data.message || 'Xóa thất bại!');
        }
      } catch (e) {
        alert('Lỗi kết nối!');
      }
    }
  }
}
</script>

<style scoped>
.category-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.category-table th, .category-table td {
  border: 1px solid #eee;
  padding: 0.75rem;
  text-align: center;
}
.cat-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  background: #f5f5f5;
}
.add-form {
  margin-top: 2rem;
  background: #fafafa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 400px;
}
.add-form input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
</style>