module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/login': {
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/register': {
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/searchId': {
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/getCourse':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/addCourse':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/editCourse':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/page':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/dimCourse':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/getHomework':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/homepage':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/submit':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/addHome':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/getReportCard':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            //kaohe
            '/addChecK':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/sCheck':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/checkpage':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/getReportCard':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/editCheck':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/changeCheck':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
            '/score':{
                target: 'http://localhost:3000',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            },
        }
    }
}
