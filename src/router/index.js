import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import home from '../views/home'
import zc from '../views/zc'
import top from '../components/top'
import timetable from '../views/timetable'
import courseQuery from '../views/courseQuery'
import firstPage from '../views/firstPage'
import jobDetails from "../views/jobDetails";
import homework from "../views/homework";
import reportCard from '../views/examine/reportCard'
import checkPub from '../views/examine/checkPub'
import Details from '../views/examine/Details'
import dailyTask from '../views/dailyTask'
import test from '../views/test'
//1 注入插件
Vue.use(VueRouter)

//2 定义路由
const routes =  [
    {
        path: '/',
        name:login,
        component: login
    },
    {
        path: '/login',
        name:login,
        component: login
    },
    {
        path: '/home',
        name:home,
        component: home,
        children: [
            {
                path: '/',
                component: firstPage
            },
            {
                path: '/firstPage',
                component: firstPage
            },
            {
                path: '/timetable',
                component: timetable
            },
            {
                path: '/courseQuery',
                component: courseQuery
            },
            {
                path: '/jobDetails',
                component: jobDetails
            },
            {
                path: '/homework',
                component: homework
            },
            {
                path: '/reportCard',
                component: reportCard
            },
            {
                path: '/checkPub',
                component: checkPub
            },
            {
                path: '/Details',
                component: Details
            },
            {
                path: '/dailyTask',
                component: dailyTask
            },
            {
                path: '/test',
                component: test
            },
        ]
    },
    {
        path: '/login',
        name:login,
        component: login
    },
    {
        path: '/zc',
        name:zc,
        component: zc
    },
    {
        path: '/top',
        name:top,
        component: top
    },

]

//3 创建router实例
const router = new VueRouter({
    routes
})

//路由拦截
router.beforeEach((to, from, next) => {
    if (to.path === '/login'||to.path === '/zc') {
        next();
    } else {
        let token = localStorage.getItem('passkey');
        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

//4 导出router实例
export default router
