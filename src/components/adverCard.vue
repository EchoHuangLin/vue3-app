<script setup lang="ts">
const props = defineProps<{
    title: string,
    desc: string,
    img: string
}>()
</script>
<template>
    <div class="adverCard">
        <div class="adverCard_info">
            <div class="adverCard_info_title">{{ title }}</div>
            <div class="adverCard_info_desc">{{ desc }}</div>
        </div>
        <div class="adverCard_img">
            <img :src="img" alt="">
        </div>
    </div>
</template>
<style scoped lang="scss">
.adverCard {
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    &_info_title {
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        padding:0 10px ;
    }

    &_info_desc {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-height: 60px;
        padding:0 10px ;
    }

    &_img {
        width: 100%;
        height: 70%;
        max-height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
            width: 100%;
            max-height: 80%;
        }
    }

}</style>