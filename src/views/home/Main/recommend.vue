<script setup lang="ts">
import banners from '@/router/bannerRoute';
import adverCardVue from '@/components/adverCard.vue';
import { onMounted, ref } from "vue"
import useAdver from '@/store/useAdver';
import useGoods from '@/store/useGoods';
import { useRouter } from 'vue-router';
import goodVue from "@/components/good.vue"
const { getAdverList } = useAdver()
let router = useRouter()


//广告栏内容dom
let advers = ref()
onMounted(() => {
    advers.value.addEventListener("touchmove", function (e: TouchEvent) {
        e.stopPropagation();
    })
})



//添加商品条目
let { getGoodList } = useGoods();

const addGood = function () {
    router.push({
        path: "/editGood"
    })
}

</script>
<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in 4">
            <img :src="'/swiper/' + item + '.jpg'" alt=""></van-swipe-item>
    </van-swipe>
    <van-grid  :column-num="5">
        <van-grid-item class="grid" :to="item.path" v-for="item in banners">
            <template #icon>
                <div class="bannerItem">
                    <img :src="item.meta?.icon as string" alt="">
                    <div>{{ item.meta?.title }}</div>
                </div>
            </template>
        </van-grid-item>
    </van-grid>
    <div class="advers" ref="advers">
        <div class="cardContainer" v-for="item in getAdverList">
            <adverCardVue :title="item.title" :desc="item.desc" :img="item.img"></adverCardVue>
        </div>
    </div>
    <div class="goods">
        <div style="padding:0 10px;" v-role="'admin'">
            <van-button @click="addGood" plain icon="plus" block>添加</van-button>
        </div>
        <good-vue :obj="item" v-for="item in getGoodList"></good-vue>
    </div>
</template>
<style scoped lang="scss">
:root {
    --goodItemWidth: 200px;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    height: 180px;
    padding: 10px;
    box-sizing: border-box;

    img {
        width: 100%;
        height: 100%;
    }
}

.van-grid-item,.grid div{
    .bannerItem{
        background-color: var(--bgColor);
        color:var(--color)
    }
}
.bannerItem {
    text-align: center;
    padding: 0px 10px;

    img {
        width: 100%;
    }

    div {
        font-size: 32px;
        margin-top: 2px;
    }

}

.advers {
    white-space: nowrap;
    padding: 0px 10px;
    overflow: auto;

    .cardContainer {
        display: inline-block;
        width: 30%;
        height: 250px;
        padding: 5px 0px;
        border: 1px solid #ebebeb;
        margin: 10px;
        box-sizing: border-box;
        border-radius: 15px;
        box-shadow: 0px 0px 10px #bbbbbb;
    }
}

.goods {
    box-sizing: border-box;
    width: 100%;
}
</style>