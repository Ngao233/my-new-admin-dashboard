<template>
  <div>
    <h1 v-if="!id">Thêm sản phẩm mới</h1>
    <h1 v-else>Chỉnh sửa sản phẩm</h1>
    <!-- Form sản phẩm -->
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  props: {
    id: String
  }
}
</script>