import request from "@/utils/request";

export function getUserList() {
    return request({
        url: '/uaa/api/v1/uaa/users',
        method: 'get'
    });
}