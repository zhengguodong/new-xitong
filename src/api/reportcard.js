import myAxios from "./axios";
export function getReportCard(paramsList) {
    return myAxios({
        url: '/getReportCard',
        method: 'post',
        data:paramsList
    })
}
export function score(paramsList) {
    return myAxios({
        url: '/score',
        method: 'post',
        data:paramsList
    })
}
export function pageReportCard(paramsList) {
    return myAxios({
        url: '/pageReportCard',
        method: 'post',
        data:paramsList
    })
}


