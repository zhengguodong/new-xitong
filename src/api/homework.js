import myAxios from "./axios";
export function selectHomework(paramsList) {
    return myAxios({
        url: '/selectHomework',
        method: 'post',
        data:paramsList
    })
}
export function pageHomework(paramsList) {
    return myAxios({
        url: '/pageHomework',
        method: 'post',
        data:paramsList
    })
}
export function submitHomework(paramsList) {
    return myAxios({
        url: '/submitHomework',
        method: 'post',
        data:paramsList
    })
}
export function getHomework(paramsList) {
    return myAxios({
        url: '/getHomework',
        method: 'post',
        data:paramsList
    })
}

