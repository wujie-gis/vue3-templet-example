import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index.scss';
// 引入 vue-router
import router from './router';
// 引入 pinia
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
