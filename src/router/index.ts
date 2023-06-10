//引入vue3.2的路由
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import nprogress from "nprogress"
import routes from './routes';
import { list } from "@/content/routeList"

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

//前置路由守卫，过滤没有token 的请求
router.beforeEach((to, from, next) => {
    // 获取token并且判断
    nprogress.start()
    let token = localStorage.getItem('token')

    if (token) {
        next()
    } else {
        if (list.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }

})
router.afterEach(() => {
    nprogress.done()
})

export default router;