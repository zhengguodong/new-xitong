import myAxios from './axios';

export function login(paramsList) {
    return myAxios({
        url: '/user/login/status',
        method: 'post',
        data:paramsList
    })
}
