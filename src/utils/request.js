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
    const status = response.status;
    if (status === 200) {
        return response;
    }

    // 请求出错
    MessageBox.confirm('请求出错，是否重新登录？', '错误', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'error'
    }).then(() => {
        store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
    });
}, error => {
    const response = error.response;
    const type = response.headers['unauthorization-type'];
    let message = error.message;

    if (type && type === 'expired') {
        MessageBox.confirm('登录超时，点击重新登录', '提示', {
            confirmButtonText: '重新登录',
            showCancelButton: false,
            closeOnClickModal: false,
            showClose: false,
            closeOnPressEscape: false,
            type: 'warning'
        }).then(() => {
            store.dispatch('FedLogOut').then(() => {
                location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
        });
    } else {
        const status = response.status;
        switch (status) {
            case 401:
                message = '错误401，抱歉，请求需要授权';
                break;
            case 403:
                message = '错误403，抱歉，您没有权限.接口：' + response.data.path;
                break;
            case 404:
                message = '错误404，抱歉，请求未找到';
                break;
            default:
                break;
        }
        Message({
            message,
            type: 'error',
            duration: 5 * 1000
        });
    }
    return Promise.reject(error);
});

export default service;
