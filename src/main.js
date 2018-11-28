import Vue from 'vue';
import ElementUI from 'element-ui';

import App from './App';
import router from './router/router';
import store from './store/store';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css

import '@/icons'; // icon
import '@/permission'; // permission control

Vue.use(ElementUI);
console.log(process.env.VUE_APP_BASE_API);
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});