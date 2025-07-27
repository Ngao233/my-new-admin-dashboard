import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import store

const app = createApp(App);

app.use(router);
app.use(store); // Sử dụng store

app.mount('#app');