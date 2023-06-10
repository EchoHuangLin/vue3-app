<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import routes from '@/router/routes';
import useTheme from "@/hooks/useTheme"
const onClickLeft = () => history.back();


//从路由获取信息
let mainList = routes.find((item) => item.path == "/home")?.children

let route = useRoute()

let routeActive = computed(() => {
    return route.path
})

let routeTitle = computed(() =>{
    return route?.meta?.title ?? ""
})

//渲染头部右上角气泡弹出框
const showPopover = ref(false);

// 通过 actions 属性来定义菜单选项
const actions = [
    { text: '个人中心' },
    { text: '切换主题' },
    { text: '退出' }
];

//引入路由
let router = useRouter()
let onSelect = function (params: any) {
    if (params.text == "退出") {
        localStorage.removeItem("token")
        router.push("/login")
    }
    if (params.text == "切换主题") {
        useTheme()
    }
}

</script>
<template>
    <div class="app_header">
        <van-nav-bar class="navBar" :title="routeTitle as string" left-text="返回" @click-left="onClickLeft" left-arrow>
            <template #right>
                <van-popover placement="bottom-end" v-model:show="showPopover" :actions="actions" @select="onSelect">
                    <template #reference>
                        <div>
                            <van-icon name="exchange" size="22" />
                        </div>
                    </template>
                </van-popover>
            </template>
        </van-nav-bar>
    </div>
    <div class="app_content">
        <RouterView></RouterView>
    </div>
    <div class="app_footer">
        <van-tabbar  v-model="routeActive">
            <van-tabbar-item background="var(--bgColor)" color="var(--color)" v-for="item in mainList" :name="item.path" :to="item.path" :icon="item.meta?.icon as string">
                {{ item.meta?.title }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style lang="scss">
html,
body,
#app {
    width: 100%;
    height: 100%;
    background-color: var(--bgColor);
    color:var(--color)
}

.navBar{
    background-color: var(--bgColor);
    color:var(--color)
}

.app_content {
    width: 100%;
    height: calc(100% - var(--van-tabbar-height) - var(--van-nav-bar-height));
    background-color: #ffffff;
    overflow: auto;
    background-color: var(--bgColor);
    color:var(--color)
}
</style>