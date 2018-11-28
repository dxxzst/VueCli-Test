import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/uaa/api/v1/uaa/login',
        method: 'post',
        data: {
            username,
            password
        }
    });
}

export function getInfo(token) {
    return request({
        url: '/uaa/api/v1/uaa/users/info',
        method: 'get',
        params: {token}
    });
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    });
}
