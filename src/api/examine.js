import myAxios from "./axios";
export function addChecK(paramsList) {
    return myAxios({
        url: '/addChecK',
        method: 'post',
        data:paramsList
    })
}
export function editCheck(paramsList) {
    return myAxios({
        url: '/editCheck',
        method: 'post',
        data:paramsList
    })
}
export function changeCheck(paramsList) {
    return myAxios({
        url: '/changeCheck',
        method: 'post',
        data:paramsList
    })
}
export function sCheck(paramsList) {
    return myAxios({
        url: '/sCheck',
        method: 'post',
        data:paramsList
    })
}
export function checkpage(paramsList) {
    return myAxios({
        url: '/checkpage',
        method: 'post',
        data:paramsList
    })
}
export function getOne(paramsList) {
    return myAxios({
        url: '/getOne',
        method: 'post',
        data:paramsList
    })
}
export function changeStatus(paramsList) {
    return myAxios({
        url: '/changeStatus',
        method: 'post',
        data:paramsList
    })
}

