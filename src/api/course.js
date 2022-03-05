import myAxios from './axios';
export function getCourse(paramsList) {
    return myAxios({
        url: '/getCourse',
        method: 'post',
        data:paramsList
    })
}
export function addCourse(paramsList) {
    return myAxios({
        url: '/addCourse',
        method: 'post',
        data:paramsList
    })
}
export function editCourse(paramsList) {
    return myAxios({
        url: '/editCourse',
        method: 'post',
        data:paramsList
    })
}
export function page(paramsList) {
    return myAxios({
        url: '/page',
        method: 'post',
        data:paramsList
    })
}
export function dimCourse(paramsList) {
    return myAxios({
        url: '/dimCourse',
        method: 'post',
        data:paramsList
    })
}
export function addHome(paramsList) {
    return myAxios({
        url: '/addHome',
        method: 'post',
        data:paramsList
    })
}
