//引入路由组件
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Search from '@/views/home/Search.vue'
import Setting from '@/views/home/Setting.vue'
import Friends from '@/views/home/Friends.vue'
import Main from '@/views/home/Main.vue'
import bannerRoute from './bannerRoute'
import { RouteRecordRaw } from 'vue-router'

const route:Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect:"/home"
        
    },
    {
        path: '/home',
        name: 'Home',
        redirect:"/main",
        component: ()=>import('@/views/Home.vue'),
        children:[
            {
                path: '/main',
                name: 'main', //()=>import(),
                component: ()=>import('@/views/home/Main.vue'),
                meta:{
                    title:"主页",
                    icon:"home-o"
                },
                children: [
                    {
                        path:'/main/recommend',
                        name:'recommend',
                        component:()=>import('@/views/home/Main/recommend.vue'),
                        meta:{
                            title: '推荐'
                        }
                    

                    },
                    {
                        path:'/main/care',
                        name:'care',
                        component:()=>import('@/views/home/Main/care.vue'),
                        meta:{
                            title: '关注'
                        }
                    },
                    {
                        path:'/main/guide',
                        name:'guide',
                        component:()=>import('@/views/home/Main/guide.vue'),
                        meta:{
                            title: '指南'
                        }
                    },
                    {
                        path:'/main/hot',
                        name:'hot',
                        component:()=>import('@/views/home/Main/hot.vue'),
                        meta:{
                            title: '热点'
                        }
                    }
                ]
            },
            {
                path: '/search',
                name: 'search',
                component: ()=>import('@/views/home/Search.vue'),
                meta:{
                    title:"搜索",
                    icon:"search"
                }
            },
            {
                path: '/friends',
                name: 'friends',
                component: ()=>import('@/views/home/Friends.vue'),
                meta:{
                    title:"消息",
                    icon:"friends-o"
                }
            },
            {
                path: '/setting',
                name: 'setting',
                component: ()=>import('@/views/home/Setting.vue'),
                meta:{
                    title:"设置",
                    icon:"setting-o"
                }
            }
        ]
        
    },
    {
        path: '/login',
        name: 'Login',
        component: ()=>import('@/views/Login.vue'),
    },
    ...bannerRoute,
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/404.vue')
    },
    {
        path: '/editGood',
        name: 'editGood',
        props:true,
        component: ()=> import('@/views/editGood.vue')
    }
];

export default route;