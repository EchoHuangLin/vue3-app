//引入路由类型
import { RouteRecordRaw } from 'vue-router'


export default <RouteRecordRaw[]>[
    {
        path: '/xiangqin',
        name: 'xiangqin',
        component: () => import('@/views/home/xiangqin.vue'),
        meta: {
            title: '相亲',
            icon: 'banner/xiangqin.png',
        }
    },
    {
        path: '/zhaopin',
        name: 'zhaopin',
        component: () => import('@/views/home/zhaopin.vue'),
        meta: {
            title: '招聘',
            icon: 'banner/zhaopin.png',
        }
    },
    {
        path: '/shangchang',
        name: 'shangchang',
        component: () => import('@/views/home/shangchang.vue'),
        meta: {
            title: '商场',
            icon: 'banner/shangchang.png',
        }
    },
    {
        path: '/waimai',
        name: 'waimai',
        component: () => import('@/views/home/waimai.vue'),
        meta: {
            title: '外卖',
            icon: 'banner/waimai.png',
        }
    },
    {
        path: '/fangchan',
        name: 'fangchan',
        component: () => import('@/views/home/fangchan.vue'),
        meta: {
            title: '房产',
            icon: 'banner/fangchan.png',
        }
    },
    {
        path: '/jiaoyu',
        name: 'jiaoyu',
        component: () => import('@/views/home/jiaoyu.vue'),
        meta: {
            title: '教育',
            icon: 'banner/jiaoyu.png',
        }
    },
    {
        path: '/jiaju',
        name: 'jiaju',
        component: () => import('@/views/home/jiaju.vue'),
        meta: {
            title: '家居',
            icon: 'banner/jiaju.png',
        }
    },
    {
        path: '/yule',
        name: 'yule',
        component: () => import('@/views/home/yule.vue'),
        meta: {
            title: '娱乐',
            icon: 'banner/yule.png',
        }
    },
    {
        path: '/qiche',
        name: 'qiche',
        component: () => import('@/views/home/qiche.vue'),
        meta: {
            title: '汽车',
            icon: 'banner/qiche.png',
        }
    },
    {
        path: '/yiliao',
        name: 'yiliao',
        component: () => import('@/views/home/yiliao.vue'),
        meta: {
            title: '医疗',
            icon: 'banner/yiliao.png',
        }
    }
]