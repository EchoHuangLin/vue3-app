<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
//import routes from "@/router/routes"
//let bannerRoute = routes.find(item => item.path == "/home").children?.find(item => item.path == "/main")?.children
import careVue from "@/views/home/Main/care.vue"
import recommendVue from "@/views/home/Main/recommend.vue"
import hotVue from "@/views/home/Main/hot.vue"
import guideVue from "@/views/home/Main/guide.vue"
let active = ref("main")
let bannerBox = ref<HTMLElement>()


let bannerList = reactive([
    { title: "推荐", com: recommendVue, name: "recommend" },
    { title: "关注", com: careVue, name: "care" },
    { title: "热点", com: hotVue, name: "hot" },
    { title: "指南", com: guideVue, name: "guide" },
])

// let comfn = (path) => {
//     return () => import(`@/views/home/Main/${path}.vue`)
// }



</script>
<template>
    <div class="father">
        <van-tabs sticky background="var(--bgColor)" v-model:active="active" swipeable>
            <van-tab class="main_tabs" v-for="item in bannerList" :name="item.name" :title="item.title">
                <component :is="item.com"></component>
            </van-tab>
        </van-tabs>
    </div>
</template>
<style scoped lang="scss">
.bannerBox {
    width: 100%;
}

.box-container {
    white-space: nowrap;
}

.father .main_tabs {
    background-color: var(--bgColor);
    color: var(--color)
}

.bannerItem {
    width: 80px;
    display: inline-block;
    height: 100px;
    background-color: red;
    border: 2px solid white;
    margin: 5px;
}
</style>