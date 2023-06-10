<script setup lang="ts">
import { ref,computed } from 'vue';
import useGoods from '@/store/useGoods';
import goodVue from "@/components/good.vue"


let { getGoodList } = useGoods();
let goodLists = computed(() => {
    return getGoodList.filter((item: Good) => {
        console.log(text.value);
        return item.name.includes(text.value)
    })
})

let searchValue=ref("")
let text=ref("")
let timer:any=null;
let laterFn = function () {
    timer && clearTimeout(timer);
    timer=setTimeout(() => {
        text.value = searchValue.value
    }, 200);
}
</script>
<template>
    <form action="/">
        <van-search v-model="searchValue" @input="laterFn" placeholder="请输入搜索关键词" input-align="left" />
    </form>
    <div class="goods">
        <good-vue :obj="item" v-for="item in goodLists"></good-vue>
    </div>
</template>
<style scoped lang="scss"></style>