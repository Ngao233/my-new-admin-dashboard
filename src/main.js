// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // <<< QUAN TRỌNG: Import router đã cấu hình từ thư mục router
import './assets/styles/main.css'; // <<< QUAN TRỌNG: Import CSS toàn cục của bạn

const app = createApp(App); // Tạo ứng dụng Vue với component App
app.use(router);            // <<< QUAN TRỌNG: Sử dụng Vue Router trong ứng dụng
app.mount('#app');          // Gắn ứng dụng Vue vào phần tử có id là 'app' trong public/index.html
