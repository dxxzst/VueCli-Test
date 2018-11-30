import {login, getInfo} from '@/api/login';
import {getToken, setToken, removeToken} from '@/utils/auth';

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        // 登录
        Login({commit}, userInfo) {
            const accountId = userInfo.accountId.trim();
            return new Promise((resolve, reject) => {
                login(accountId, userInfo.password).then(response => {
                    const token = response.headers['authorization'];
                    setToken(token);
                    commit('SET_TOKEN', token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 获取用户信息
        GetInfo({commit}) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const data = response.data;
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles);
                    } else {
                        reject('getInfo: roles must be a non-null array !');
                    }
                    //commit('SET_ROLES', ['SuperAdmin']);
                    commit('SET_NAME', data.userName);
                    commit('SET_AVATAR', data.photoPath);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            })
        },
        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve();
            });
        }
    }
};

export default user;