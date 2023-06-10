<template name="Lottie">
    <div class="box">
        <div id="lottie_box" ref="lottie_box"></div>
        <template v-if="showControl">
            <button @click="startFun">播放</button>
            <button @click="suspendFun">暂停</button>
        </template>
    </div>
</template>

<script setup lang="ts">
import lottie, { RendererType } from 'lottie-web';
import { onMounted, ref } from 'vue';
let props=defineProps({
    showControl: {
        type: Boolean,
        default: false
    },
    path: {
        type: String,
        default: ''
    },
    loop: {
        type: Boolean,
        default: true
    },
    autoplay: {
        type: Boolean,
        default: true
    },
    renderer: {
        type: String,
        default: 'svg'
    }
})
let anm: any = {}
let lottie_box = ref<HTMLElement>()
const startFun = () => {
    anm.play()
}
const suspendFun = () => {
    anm.pause()
}
onMounted(() => {
    anm = lottie.loadAnimation({
        container: lottie_box.value as HTMLElement, // 容器
        renderer: props.renderer as RendererType ,        // 渲染方式:svg：支持交互、不会失帧、canvas、html：支持3D，支持交互
        loop: props.loop,             // 循环播放，默认：true
        autoplay: props.autoplay,         // 自动播放 ，默认true
        path: props.path                // json 路径
    })
})

</script>

<style>
.box {
    width: 100%;
    height: 100%;
}

#lottie_box {
    width: 100%;
    height: 100%;
    margin: 0px auto;
}
</style>