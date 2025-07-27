<template>
  <div>
    <h1>Chi tiết đơn hàng #{{ $route.params.id }}</h1>
    <!-- Nội dung chi tiết đơn hàng -->
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  props: ['id']
}
</script>