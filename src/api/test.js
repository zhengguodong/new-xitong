import myAxios from './axios';

// export function login(paramsList) {
//     return myAxios({
//         url: '/user/login/status',
//         method: 'post',
//         data:paramsList
//     })
// }
export function checktoken(paramsList) {
    return myAxios({
        url: '/checktoken',
        method: 'get',
        params:paramsList,
        headers:{
            token:sessionStorage.getItem("token")
        }
    })
}
export function login(paramsList) {
    return myAxios({
        url: '/login',
        method: 'post',
        data:paramsList,


    })
}
export function register(paramsList) {
    return myAxios({
        url: '/register',
        method: 'post',
        data:paramsList
    })
}
export function searchPerson(paramsList) {
    return myAxios({
        url: '/searchPerson',
        method: 'post',
        data:paramsList
    })
}
