import axios from 'axios';
import {Message, MessageBox} from 'element-ui';
import store from '../store/store';
import {getToken} from '@/utils/auth';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
}, error => {
    // Do something with request error
    Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(response => {
    const type = response.headers['unauthorization-type'];
    if (type && type === 'expired') {
        MessageBox.confirm('登录超时，点击重新登录', '提示', {
            confirmButtonText: '重新登录',
            type: 'warning'
        }).then(() => {
            store.dispatch('FedLogOut').then(() => {
                location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
        });
    } else {
        return response;
    }
}, error => {
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    });
    return Promise.reject(error);
});

export default service;
