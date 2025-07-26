<template>
  <section class="stats">
    <div class="stat-card orange">Tổng sản phẩm<br><strong>{{ totalProducts }}</strong></div>
    <div class="stat-card purple">Đơn hàng mới<br><strong>{{ newOrders }}</strong></div>
    <div class="stat-card green">Doanh thu<br><strong>{{ revenue }}</strong></div>
    <div class="stat-card yellow">Khách hàng<br><strong>{{ customers }}</strong></div>
  </section>

  <section class="activity">
    <h2>Hoạt động gần đây</h2>
    <table>
      <thead>
        <tr>
          <th>Khách hàng</th>
          <th>Hành động</th>
          <th>Ngày</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in recentActivities" :key="index">
          <td>{{ activity.customer }}</td>
          <td>{{ activity.action }}</td>
          <td>{{ activity.date }}</td>
          <td><span :class="['status', activity.statusClass]">{{ activity.statusText }}</span></td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="dashboard">
    <h2>Thống kê sản phẩm theo loại</h2>
    <canvas id="categoryChart" width="300" height="300"></canvas>
  </section>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'DashboardPage',
  data() {
    return {
      totalProducts: 3,
      newOrders: 120,
      revenue: '₫75,000,000',
      customers: 6,
      recentActivities: [
        { customer: 'Nguyễn Văn A', action: 'Đặt hàng mới', date: '2023-11-01', statusText: 'Hoàn tất', statusClass: 'done' },
        { customer: 'Trần Thị B', action: 'Thêm sản phẩm vào giỏ', date: '2023-11-03', statusText: 'Chưa xử lý', statusClass: 'pending' },
        { customer: 'Lê Văn C', action: 'Đăng ký tài khoản', date: '2023-11-05', statusText: 'Kích hoạt', statusClass: 'active' },
      ],
      categoryChartData: {
        labels: ['Ghế sofa', 'Bàn ăn', 'Tủ quần áo', 'Bàn làm việc'],
        datasets: [{
          data: [25, 35, 20, 20],
          backgroundColor: ['#007bff', '#ff4d4d', '#28a745', '#ffc107'],
          borderColor: '#fff',
          borderWidth: 2
        }]
      }
    };
  },
  mounted() {
    this.createCategoryChart();
  },
  methods: {
    createCategoryChart() {
      const ctx = document.getElementById('categoryChart');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: this.categoryChartData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    size: 14
                  }
                }
              },
              tooltip: {
                enabled: true
              }
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
