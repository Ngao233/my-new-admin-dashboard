<template>
  <div class="page-content">
    <div class="page-title">Quản Lý Tin Tức</div>
    <p>Trang này cho phép bạn quản lý các bài viết tin tức, bao gồm việc thêm mới, chỉnh sửa và quản lý trạng thái hiển thị.</p>

    <button class="btn-add" @click="addArticle">+ Thêm Bài Viết</button>

    <div v-if="showAlert" :class="['alert', alertType]">{{ alertMessage }}</div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tiêu Đề</th>
          <th>Ngày Đăng</th>
          <th>Người Đăng</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.id }}</td>
          <td>{{ article.title }}</td>
          <td>{{ article.publishDate }}</td>
          <td>{{ article.author }}</td>
          <td><span :class="['status', article.statusClass]">{{ article.statusText }}</span></td>
          <td class="actions">
            <button class="edit" @click="editArticle(article)">Sửa</button>
            <button class="delete" @click="toggleArticleStatus(article)">
              {{ article.statusText === 'Đã đăng' ? 'Ẩn' : 'Đăng' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  data() {
    return {
      articles: [
        { id: 1, title: 'Xu hướng nội thất 2024: Đơn giản và Đa năng', publishDate: '2024-07-20', author: 'Admin', statusText: 'Đã đăng', statusClass: 'active' },
        { id: 2, title: 'Mẹo giữ gìn đồ gỗ nội thất luôn bền đẹp', publishDate: '2024-07-15', author: 'Biên tập viên', statusText: 'Đã đăng', statusClass: 'active' },
        { id: 3, title: 'Phong thủy trong thiết kế nhà ở: Những điều cần biết', publishDate: '2024-07-10', author: 'Chuyên gia', statusText: 'Bản nháp', statusClass: 'draft' },
        { id: 4, title: 'Top 5 loại cây cảnh phù hợp với không gian văn phòng', publishDate: '2024-07-05', author: 'Admin', statusText: 'Đã ẩn', statusClass: 'hidden' },
      ],
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-success'
    };
  },
  methods: {
    addArticle() {
      this.alertMessage = 'Chức năng thêm bài viết mới sẽ được phát triển!';
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    editArticle(article) {
      this.alertMessage = `Bạn đang chỉnh sửa bài viết: "${article.title}" (ID: ${article.id})`;
      this.alertType = 'alert-info';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    toggleArticleStatus(article) {
      let newStatusText;
      let newStatusClass;
      let confirmMessage;
      let alertMsg;
      let alertType;

      if (article.statusText === 'Đã đăng') {
        newStatusText = 'Đã ẩn';
        newStatusClass = 'hidden';
        confirmMessage = `Bạn có chắc chắn muốn ẩn bài viết "${article.title}" không?`;
        alertMsg = `Đã ẩn bài viết "${article.title}" thành công!`;
        alertType = 'alert-warning';
      } else {
        newStatusText = 'Đã đăng';
        newStatusClass = 'active';
        confirmMessage = `Bạn có chắc chắn muốn đăng lại bài viết "${article.title}" không?`;
        alertMsg = `Đã đăng lại bài viết "${article.title}" thành công!`;
        alertType = 'alert-success';
      }

      if (confirm(confirmMessage)) {
        const index = this.articles.findIndex(a => a.id === article.id);
        if (index !== -1) {
          this.articles[index].statusText = newStatusText;
          this.articles[index].statusClass = newStatusClass;
          this.articles = [...this.articles]; // Đảm bảo Vue cập nhật reactive
        }
        this.alertMessage = alertMsg;
        this.alertType = alertType;
      } else {
        this.alertMessage = `Đã hủy thao tác cho bài viết "${article.title}".`;
        this.alertType = 'alert-info';
      }
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
/* ------------------------------------ */
/* CSS cho trang Quản Lý Tin Tức (NewsPage.vue) */
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

/* CSS cho tiêu đề trang "Quản Lý Tin Tức" */
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

/* Nút thêm bài viết */
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

/* Bảng tin tức */
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

/* Các nút hành động trong bảng (Sửa, Đăng/Ẩn) */
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

.actions .delete { /* Nút "Ẩn" hoặc "Đăng" */
    background-color: #e84c3d; /* Màu đỏ cho ẩn */
    color: white;
}
.actions .delete:hover {
    background-color: #d13c2c;
    transform: translateY(-1px);
}
/* Nếu muốn nút "Đăng" có màu xanh khác */
/* .actions .publish {
    background-color: #28a745;
    color: white;
}
.actions .publish:hover {
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

.status.active { /* Trạng thái "Đã đăng" */
    background-color: #28a745; /* Xanh lá cây */
}

.status.draft { /* Trạng thái "Bản nháp" */
    background-color: #ffc107; /* Vàng */
    color: #333;
}

.status.hidden { /* Trạng thái "Đã ẩn" */
    background-color: #6c757d; /* Xám */
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